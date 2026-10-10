"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { describeProfile, parseProfile, toQuery } from "@/data/profile";
import { RULES_AS_OF, SOURCES } from "@/data/sources";
import { PHASES, stepsFor } from "@/data/steps";
import { loadDone, saveDone, saveProfileQuery } from "@/lib/storage";
import { Check, OpenInNew } from "./Icons";
import StepCard from "./StepCard";
import styles from "./Guide.module.css";


export default function Guide() {
  const params = useSearchParams();
  const query = params.toString();
  const profile = useMemo(() => parseProfile(new URLSearchParams(query)), [query]);
  const steps = useMemo(() => (profile ? stepsFor(profile) : []), [profile]);
  const todo = steps.filter((step) => !step.optional);

  const [done, setDone] = useState(() => new Set());
  const [openId, setOpenId] = useState(null);
  const [dockVisible, setDockVisible] = useState(false);
  const scrollToOpen = useRef(false); // set when the student opens a step, not when the page loads

  // Remember this checklist and restore ticked-off steps. Every step starts closed.
  useEffect(() => {
    if (!profile) return;
    saveProfileQuery(toQuery(profile));
    setDone(loadDone());
    setOpenId(null);
  }, [profile]);

  // Opening a step closes the one above it, which moves everything up. Bring the opened step to the top
  // of the screen when it is no longer near the top, so the student does not lose their place.
  useEffect(() => {
    if (!scrollToOpen.current || !openId) return;
    scrollToOpen.current = false;
    const card = document.getElementById(`card-${openId}`);
    const top = card?.getBoundingClientRect().top ?? 0;
    if (top < 0 || top > window.innerHeight / 3) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      card.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
    }
  }, [openId]);

  // On phones the dock, a bar at the bottom of the screen, offers "Mark as done" for the open step.
  // It shows only while that step is on screen.
  useEffect(() => {
    const card = openId && document.getElementById(`card-${openId}`);
    if (!card || !("IntersectionObserver" in window)) {
      setDockVisible(Boolean(card));
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setDockVisible(entry.isIntersecting), {
      rootMargin: "0px 0px -96px 0px", // ignore the part of the screen behind the dock
    });
    observer.observe(card);
    return () => observer.disconnect();
  }, [openId]);

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
      // Close the finished step; the student picks the next one themselves.
      setOpenId(null);
      // Closing a long step moves the page up. If its header ends up above the screen, bring it back.
      requestAnimationFrame(() => {
        const card = document.getElementById(`card-${id}`);
        if (card && card.getBoundingClientRect().top < 0) {
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          card.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
        }
      });
    }
    setDone(next);
    saveDone(next);
  }

  function toggleOpen(id) {
    scrollToOpen.current = true;
    setOpenId(openId === id ? null : id);
  }

  const doneCount = todo.filter((step) => done.has(step.id)).length;
  const numbers = new Map(todo.map((step, i) => [step.id, i + 1]));
  const openStep = todo.find((step) => step.id === openId); // optional steps have nothing to mark
  const usedSources = Object.keys(SOURCES).filter((id) =>
    steps.some((step) => step.sources.some((source) => source.id === id)),
  );

  return (
    <div>
      <section className={styles.top}>
        <p className="meta">Your checklist</p>
        <h1>Your move to St.Gallen</h1>
        {/* The answers this checklist is built from. They are changed with "Customise profile" in the header. */}
        <ul className={styles.profile} aria-label="Your profile">
          {describeProfile(profile).map((answer) => (
            <li key={answer}>{answer}</li>
          ))}
        </ul>

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
                    onToggleOpen={() => toggleOpen(step.id)}
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
          Every step is based on these official pages, as of {RULES_AS_OF}.
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

      {openStep && (
        <div
          className={dockVisible ? styles.dock : `${styles.dock} ${styles.dockHidden}`}
          inert={!dockVisible}
          aria-label="Current step"
          role="region"
        >
          <div className={styles.dockInfo}>
            <span className={styles.dockStep}>Step {numbers.get(openStep.id)}</span>
            <span className={styles.dockCount}>
              {doneCount} of {todo.length} done
            </span>
          </div>
          <button
            type="button"
            className={done.has(openStep.id) ? "btn btn-outline" : "btn btn-primary"}
            aria-pressed={done.has(openStep.id)}
            onClick={() => toggleDone(openStep.id)}
          >
            {done.has(openStep.id) && <Check />}
            {done.has(openStep.id) ? "Done" : "Mark as done"}
          </button>
        </div>
      )}
    </div>
  );
}
