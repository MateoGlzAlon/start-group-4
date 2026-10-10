"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { describeProfile, parseProfile, toQuery } from "@/data/profile";
import { RULES_AS_OF, SOURCES } from "@/data/sources";
import { PHASES, stepsFor } from "@/data/steps";
import { loadDone, saveDone, saveProfileQuery } from "@/lib/storage";
import { OpenInNew } from "./Icons";
import StepCard from "./StepCard";
import styles from "./Guide.module.css";

const firstOpenStep = (steps, done) => steps.find((step) => !step.optional && !done.has(step.id));

export default function Guide() {
  const params = useSearchParams();
  const query = params.toString();
  const profile = useMemo(() => parseProfile(new URLSearchParams(query)), [query]);
  const steps = useMemo(() => (profile ? stepsFor(profile) : []), [profile]);
  const todo = steps.filter((step) => !step.optional);

  const [done, setDone] = useState(() => new Set());
  const [openId, setOpenId] = useState(null);

  // Remember this checklist, restore ticked-off steps and open the first step still to do.
  useEffect(() => {
    if (!profile) return;
    saveProfileQuery(toQuery(profile));
    const saved = loadDone();
    setDone(saved);
    setOpenId(firstOpenStep(steps, saved)?.id ?? null);
  }, [profile, steps]);

  if (!profile) {
    return (
      <div>
        <h1>We need a few answers first</h1>
        <p>This link does not include all the answers your checklist is built from.</p>
        <Link href="/" className="btn btn-primary">
          Answer the questions
        </Link>
      </div>
    );
  }

  function toggleDone(id) {
    const next = new Set(done);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
      // Step by step: close this one and open the next step still to do.
      const after = todo.slice(todo.findIndex((step) => step.id === id) + 1);
      setOpenId(firstOpenStep(after, next)?.id ?? null);
    }
    setDone(next);
    saveDone(next);
  }

  const doneCount = todo.filter((step) => done.has(step.id)).length;
  const numbers = new Map(todo.map((step, i) => [step.id, i + 1]));
  const usedSources = Object.keys(SOURCES).filter((id) =>
    steps.some((step) => step.sources.some((source) => source.id === id)),
  );

  return (
    <div>
      <section className={styles.top}>
        <p className="meta">Your checklist</p>
        <h1>Your move to St.Gallen</h1>
        <p className={styles.profile}>
          {describeProfile(profile).join(" · ")}
          <Link href="/" className={`btn-link ${styles.change} no-print`}>
            Change answers
          </Link>
        </p>

        <div className={styles.progress}>
          <p className={styles.progressText} aria-live="polite">
            {doneCount === todo.length
              ? `All ${todo.length} steps done.`
              : `${doneCount} of ${todo.length} steps done`}
          </p>
          <div className={styles.bars} aria-hidden="true">
            {todo.map((step) => (
              <span key={step.id} className={done.has(step.id) ? styles.barOn : styles.bar} />
            ))}
          </div>
        </div>
      </section>

      {PHASES.map((phase) => {
        const phaseSteps = steps.filter((step) => step.phase === phase.id);
        if (phaseSteps.length === 0) return null;
        return (
          <section key={phase.id} className={styles.phase} aria-labelledby={`phase-${phase.id}`}>
            <h2 id={`phase-${phase.id}`} className={styles.phaseTitle}>
              {phase.title}
            </h2>
            <p className={styles.phaseIntro}>{phase.intro}</p>
            <ol className={styles.list}>
              {phaseSteps.map((step) => (
                <li key={step.id}>
                  <StepCard
                    step={step}
                    number={numbers.get(step.id)}
                    done={done.has(step.id)}
                    open={openId === step.id}
                    onToggleOpen={() => setOpenId(openId === step.id ? null : step.id)}
                    onToggleDone={() => toggleDone(step.id)}
                  />
                </li>
              ))}
            </ol>
          </section>
        );
      })}

      <section className={styles.sources} aria-labelledby="sources">
        <h2 id="sources">Where these rules come from</h2>
        <p>
          Every step is based on these official pages, as of {RULES_AS_OF}. Where a page does not say something, the
          step lists it under “Not in the official sources” instead of guessing.
        </p>
        <ul className={styles.sourceList}>
          {usedSources.map((id) => {
            const page = SOURCES[id];
            return (
              <li key={id}>
                <span className={styles.tag}>{id}</span>
                <span>
                  <a href={page.url} target="_blank" rel="noreferrer">
                    {page.title}
                    <OpenInNew size={14} className={styles.external} />
                  </a>
                  <span className={styles.sourceMeta}>
                    {page.publisher}
                    {page.date && `, ${page.date}`}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
