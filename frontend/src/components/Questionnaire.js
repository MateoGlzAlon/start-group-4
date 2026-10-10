"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { toQuery, visibleQuestions } from "@/data/profile";
import { loadProfileQuery } from "@/lib/storage";
import { East, West } from "./Icons";
import styles from "./Questionnaire.module.css";

const HOW_IT_WORKS = [
  {
    title: "Answer a few questions",
    text: "Your nationality, then two or three questions about your studies and your move.",
  },
  {
    title: "Get your steps, in order",
    text: "Before you arrive, your first 14 days, while you study, and before you leave.",
  },
  {
    title: "Check every rule",
    text: "Each step names the official City, Canton or HSG page it comes from, with the exact sentence.",
  },
];

export default function Questionnaire() {
  const router = useRouter();
  const [index, setIndex] = useState(-1); // -1 is the intro, 0… the questions
  const [answers, setAnswers] = useState({});
  const [savedQuery, setSavedQuery] = useState(null);
  const headingRef = useRef(null);

  useEffect(() => setSavedQuery(loadProfileQuery()), []);

  // Start each new question at the top of the screen, with focus on it for keyboard and screen-reader users.
  useEffect(() => {
    window.scrollTo(0, 0);
    if (index >= 0) headingRef.current?.focus({ preventScroll: true });
  }, [index]);

  // Which questions come next depends on the answers so far (Swiss students get their own).
  const questions = visibleQuestions(answers);

  function choose(key, value) {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    if (index < visibleQuestions(next).length - 1) setIndex(index + 1);
    else router.push(`/guide/?${toQuery(next)}`);
  }

  if (index < 0) {
    return (
      <div className={styles.intro}>
        <p className="meta">For students moving to St.Gallen to study at HSG</p>
        <h1 className="giant">Your move to St.Gallen, step by step</h1>
        <p className="lead">
          Answer a few questions. You get the steps that apply to you, in order, each with its deadline, what to bring,
          and the official source.
        </p>
        <div className={styles.actions}>
          <button type="button" className="btn btn-primary" onClick={() => setIndex(0)}>
            Start
            <East />
          </button>
          {savedQuery && (
            <Link href={`/guide/?${savedQuery}`} className="btn-link">
              Open my checklist
              <East size={20} />
            </Link>
          )}
        </div>

        <ol className={styles.how}>
          {HOW_IT_WORKS.map((item) => (
            <li key={item.title}>
              <h2 className={styles.howTitle}>{item.title}</h2>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  const { key, question, options } = questions[index];

  return (
    <div className={styles.question}>
      <div className={styles.topRow}>
        <button type="button" className="btn-link" onClick={() => setIndex(index - 1)}>
          <West size={20} />
          Back
        </button>
        <p className="meta">
          Question {index + 1} of {questions.length}
        </p>
      </div>
      <div className={styles.progress} aria-hidden="true">
        {questions.map((q, i) => (
          <span key={q.key} className={i <= index ? styles.barOn : styles.bar} />
        ))}
      </div>
      <h1 ref={headingRef} tabIndex={-1} className={styles.heading}>
        {question}
      </h1>

      <ul className={styles.options}>
        {options.map((option) => (
          <li key={option.value}>
            <button
              type="button"
              className={answers[key] === option.value ? `${styles.option} ${styles.selected}` : styles.option}
              aria-pressed={answers[key] === option.value}
              onClick={() => choose(key, option.value)}
            >
              <span>
                <span className={styles.optionLabel}>{option.label}</span>
                {option.hint && <span className={styles.optionHint}>{option.hint}</span>}
              </span>
              <East className={styles.optionArrow} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
