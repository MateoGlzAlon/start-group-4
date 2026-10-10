import assert from "node:assert/strict";
import { test } from "node:test";

import { allProfiles, parseProfile } from "../src/data/profile.js";
import { SOURCES } from "../src/data/sources.js";
import { PHASES, STEPS, stepsFor } from "../src/data/steps.js";

// The rows of docs/context_1.md (1–30) and of docs/rulebook-swiss-students-stgallen.md (A1–A17, B1–B3, C1–C21).
const range = (prefix, n) => Array.from({ length: n }, (_, i) => `${prefix}${i + 1}`);
const ROWS = range("", 30).map(Number);
const CH_ROWS = [...range("A", 17), ...range("B", 3), ...range("C", 21)];
// The Swiss rulebook's appendix (I1–I11) repeats rules for international students; steps may cite it, but need not.
const CH_APPENDIX = range("I", 11);
// The rows of docs/rulebook-eu-efta-students-stgallen.md (A1–M13). Section G has no rows, there is no I11,
// and K12b sits between K12 and K13.
const EU_ROWS = [
  ...range("A", 5),
  ...range("B", 13),
  ...range("C", 10),
  ...range("D", 11),
  ...range("E", 5),
  ...range("F", 2),
  ...range("H", 10),
  ...range("I", 17).filter((row) => row !== "I11"),
  ...range("J", 11),
  ...range("K", 17),
  "K12b",
  ...range("L", 18),
  ...range("M", 13),
];
// The numbered steps (1–20) of the UK guide, docs/Studying at HSG as a UK citizen — Step-by-step admin guide.md.
const UK_STEPS = range("", 20).map(Number);

test("step ids are unique", () => {
  const ids = STEPS.map((step) => step.id);
  assert.deepEqual(ids, [...new Set(ids)]);
});

for (const step of STEPS) {
  test(`${step.id} cites an official source`, () => {
    assert.ok(step.sources?.length > 0, "has no source");
    for (const source of step.sources) {
      assert.ok(SOURCES[source.id], `unknown source ${source.id}`);
      assert.ok(source.where || source.quote, `${source.id} gives neither the place on the page nor a quote`);
      if (source.lang === "de") assert.ok(source.translation, `German quote from ${source.id} has no translation`);
      if (source.translation) assert.ok(source.quote, `${source.id} has a translation but no quote`);
    }
  });

  test(`${step.id} is complete`, () => {
    assert.ok(PHASES.some((phase) => phase.id === step.phase), `unknown phase ${step.phase}`);
    assert.ok(step.title && step.summary, "needs a title and a summary");
    assert.equal(typeof step.when, "function");
    const named = ["rows", "chRows", "euRows", "ukSteps"].reduce((n, field) => n + (step[field]?.length ?? 0), 0);
    assert.ok(named > 0, "names no rulebook row");
  });
}

test("every row of docs/context_1.md is covered by a step", () => {
  const covered = new Set(STEPS.flatMap((step) => step.rows ?? []));
  assert.deepEqual(ROWS.filter((row) => !covered.has(row)), []);
  assert.deepEqual([...covered].filter((row) => !ROWS.includes(row)), [], "a step names a row that does not exist");
});

test("every row of docs/rulebook-swiss-students-stgallen.md is covered by a step", () => {
  const covered = new Set(STEPS.flatMap((step) => step.chRows ?? []));
  assert.deepEqual(CH_ROWS.filter((row) => !covered.has(row)), []);
  const known = [...CH_ROWS, ...CH_APPENDIX];
  assert.deepEqual([...covered].filter((row) => !known.includes(row)), [], "a step names a row that does not exist");
});

test("every row of docs/rulebook-eu-efta-students-stgallen.md is covered by a step", () => {
  const covered = new Set(STEPS.flatMap((step) => step.euRows ?? []));
  assert.deepEqual(EU_ROWS.filter((row) => !covered.has(row)), []);
  assert.deepEqual([...covered].filter((row) => !EU_ROWS.includes(row)), [], "a step names a row that does not exist");
});

test("every numbered step of the UK guide is covered by a step", () => {
  const covered = new Set(STEPS.flatMap((step) => step.ukSteps ?? []));
  assert.deepEqual(UK_STEPS.filter((n) => !covered.has(n)), []);
  assert.deepEqual([...covered].filter((n) => !UK_STEPS.includes(n)), [], "a step names a step that does not exist");
});

test("links and offices are complete", () => {
  for (const step of STEPS) {
    for (const link of step.links ?? []) {
      assert.ok(link.label, `${step.id}: a link has no label`);
      assert.match(link.url, /^(https:\/\/|mailto:)/, `${step.id}: ${link.label} is not an https or mailto link`);
    }
    for (const place of step.places ?? []) {
      assert.ok(place.name && place.address, `${step.id}: an office needs a name and an address`);
    }
  }
});

test("every source is used by a step", () => {
  const used = new Set(STEPS.flatMap((step) => step.sources.map((source) => source.id)));
  assert.deepEqual(Object.keys(SOURCES).filter((id) => !used.has(id)), []);
});

for (const profile of allProfiles()) {
  test(`checklist for ${JSON.stringify(profile)}`, () => {
    const steps = stepsFor(profile);
    for (const phase of ["before", "arrival", "studies"]) {
      assert.ok(steps.some((step) => step.phase === phase), `nothing to do in phase "${phase}"`);
    }
    for (const step of steps) {
      for (const field of ["todo", "documents", "fees", "notes", "missing"]) {
        assert.ok(step[field].every((item) => typeof item === "string"), `${step.id}.${field} has an unresolved item`);
      }
      assert.equal(typeof step.summary, "string", `${step.id}.summary is not resolved`);
      assert.ok(step.deadline === undefined || typeof step.deadline === "string", `${step.id}.deadline is not resolved`);
    }
  });
}

test("Master students get Master rules, not Bachelor ones", () => {
  // What the student reads: everything except the citations (their quotes are not shown)
  const text = (profile) => JSON.stringify(stepsFor(profile).map(({ sources, ...shown }) => shown));
  const master = text({ nationality: "eu", programme: "master", from: "abroad", work: "no" });
  const bachelor = text({ nationality: "eu", programme: "bachelor", from: "abroad", work: "no" });
  assert.ok(master.includes("CHF 3,557.50") && !master.includes("CHF 3,343.50"), "Master tuition");
  assert.ok(!master.includes("selection procedure"), "the selection procedure is for Bachelor applicants");
  assert.ok(master.includes("31 March for MBI") && !bachelor.includes("31 March for MBI"), "Master deadlines");
});

test("Swiss students get the shared steps for their level, without permit steps", () => {
  const ids = (profile) => stepsFor(profile).map((step) => step.id);
  const swissMaster = { nationality: "ch", programme: "master", residence: "main", military: "no" };
  const steps = ids(swissMaster);
  for (const id of ["apply-hsg", "budget", "daily-life", "ch-register-main"]) assert.ok(steps.includes(id), `missing ${id}`);
  for (const id of ["register", "id-appointment", "deregister-abroad", "health-insurance", "extend-permit"]) {
    assert.ok(!steps.includes(id), `${id} is for international students`);
  }
  const budget = stepsFor(swissMaster).find((step) => step.id === "budget");
  assert.match(budget.fees.join(" "), /Swiss students: CHF 1,524\.50/);
  assert.equal(parseProfile(new URLSearchParams("nationality=ch&programme=exchange&residence=main&military=no")), null);
});
