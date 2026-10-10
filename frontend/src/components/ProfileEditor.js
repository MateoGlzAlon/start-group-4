"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { QUESTIONS, parseProfile, toQuery, visibleOptions, visibleQuestions } from "@/data/profile";
import { loadProfileQuery } from "@/lib/storage";
import { Check } from "./Icons";
import styles from "./ProfileEditor.module.css";

// Drops answers that no longer fit, e.g. "exchange" after switching the nationality to Swiss. Answers to
// questions that are hidden for now are kept, so switching the nationality back restores them.
function clean(answers) {
  const kept = { ...answers };
  for (const q of QUESTIONS) {
    if (q.ask && !q.ask(kept)) continue;
    if (!visibleOptions(q, kept).some((option) => option.value === kept[q.key])) delete kept[q.key];
  }
  return kept;
}

// "Customise profile": every question on one page with the current answers selected, so the student only
// changes what is different and saves. Questions appear or disappear as the answers change.
export default function ProfileEditor() {
  const router = useRouter();
  const [saved, setSaved] = useState(null); // the current profile's query string
  const [answers, setAnswers] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const query = loadProfileQuery();
    setSaved(query);
    if (query) setAnswers(clean(Object.fromEntries(new URLSearchParams(query))));
    setLoaded(true);
  }, []);

  const questions = visibleQuestions(answers);
  const complete = parseProfile(new URLSearchParams(toQuery(answers))) !== null;
  const changed = complete && toQuery(answers) !== saved;

  function choose(key, value) {
    setAnswers(clean({ ...answers, [key]: value }));
  }

  function save(event) {
    event.preventDefault();
    if (complete) router.push(`/guide/?${toQuery(answers)}`);
  }

  if (!loaded) return null;

  return (
    <form onSubmit={save} className={styles.editor}>
      <p className="meta">Customise profile</p>
      <h1 className={styles.heading}>Your answers</h1>
      <p className={styles.intro}>
        {saved
          ? "Change what is different, then save. Your checklist is updated, and steps you already ticked stay ticked."
          : "Answer each question, then save to get your checklist."}
      </p>

      {questions.map((q) => (
        <fieldset key={q.key} className={styles.question}>
          <legend className={styles.legend}>{q.question}</legend>
          <div className={styles.options}>
            {visibleOptions(q, answers).map((option) => {
              const selected = answers[q.key] === option.value;
              return (
                <label key={option.value} className={selected ? `${styles.option} ${styles.selected}` : styles.option}>
                  <input
                    type="radio"
                    name={q.key}
                    value={option.value}
                    checked={selected}
                    onChange={() => choose(q.key, option.value)}
                    className="sr-only"
                  />
                  <span className={styles.optionText}>
                    <span className={styles.optionLabel}>{option.label}</span>
                    {option.hint && <span className={styles.optionHint}>{option.hint}</span>}
                  </span>
                  <span className={styles.tick} aria-hidden="true">
                    {selected && <Check size={20} />}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className={styles.actions}>
        <button type="submit" className="btn btn-primary" disabled={!complete}>
          {saved ? "Save changes" : "Show my checklist"}
        </button>
        {saved && (
          <Link href={`/guide/?${saved}`} className="btn-link">
            {changed ? "Cancel" : "Back to my checklist"}
          </Link>
        )}
      </div>
    </form>
  );
}
