import assert from "node:assert/strict";
import { test } from "node:test";

import { allProfiles } from "../src/data/profile.js";
import { SOURCES } from "../src/data/sources.js";
import { PHASES, STEPS, stepsFor } from "../src/data/steps.js";

// The rows of docs/context_1.md (1–30) and of docs/rulebook-swiss-students-stgallen.md (A1–A17, B1–B3, C1–C21).
const range = (prefix, n) => Array.from({ length: n }, (_, i) => `${prefix}${i + 1}`);
const ROWS = range("", 30).map(Number);
const CH_ROWS = [...range("A", 17), ...range("B", 3), ...range("C", 21)];
// The Swiss rulebook's appendix (I1–I11) repeats rules for international students; steps may cite it, but need not.
const CH_APPENDIX = range("I", 11);

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
    assert.ok((step.rows?.length ?? 0) + (step.chRows?.length ?? 0) > 0, "names no rulebook row");
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
    }
  });
}
