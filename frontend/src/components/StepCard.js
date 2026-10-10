import { SOURCES } from "@/data/sources";
import { Check, East, Info, OpenInNew } from "./Icons";
import styles from "./StepCard.module.css";

// One step of the checklist, built on the event card of docs/style.md: a grey card with a green
// block on the left (the step number) and a green arrow square that opens the details.
export default function StepCard({ step, number, done, open, onToggleOpen, onToggleDone }) {
  const detailsId = `step-${step.id}`;
  const classes = [styles.card, open && styles.open, done && styles.done].filter(Boolean).join(" ");

  return (
    <article className={classes}>
      <h3 className={styles.heading}>
        <button type="button" className={styles.toggle} aria-expanded={open} aria-controls={detailsId} onClick={onToggleOpen}>
          <span className={styles.num}>
            {step.optional ? <Info /> : done ? <Check size={32} /> : number}
            {done && <span className="sr-only">Done: </span>}
          </span>
          <span className={styles.body}>
            <span className={styles.meta}>{step.deadline ?? "No deadline in the official sources"}</span>
            <span className={styles.title}>{step.title}</span>
            <span className={styles.summary}>{step.summary}</span>
          </span>
          <span className={styles.arrow}>
            <East />
          </span>
        </button>
      </h3>

      <div id={detailsId} className={styles.details} hidden={!open}>
        <List label="What to do" items={step.todo} ordered />
        <List label="What to bring" items={step.documents} />
        <List label="Cost" items={step.fees} />
        {step.office && (
          <Section label="Where">
            <p>{step.office}</p>
          </Section>
        )}
        <List label="Good to know" items={step.notes} />

        {step.missing.length > 0 && (
          <div className={styles.gaps}>
            <h4 className={styles.label}>Not in the official sources</h4>
            <ul>
              {step.missing.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>Ask the office before you go.</p>
          </div>
        )}

        <Section label={step.sources.length > 1 ? "Sources" : "Source"}>
          {step.sources.map((source, i) => (
            <SourceQuote key={i} source={source} />
          ))}
        </Section>

        {!step.optional && (
          <div className={`${styles.actions} no-print`}>
            <button
              type="button"
              className={done ? "btn btn-primary" : "btn btn-outline"}
              aria-pressed={done}
              onClick={onToggleDone}
            >
              {done && <Check />}
              {done ? "Done" : "Mark as done"}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

function Section({ label, children }) {
  return (
    <section className={styles.section}>
      <h4 className={styles.label}>{label}</h4>
      {children}
    </section>
  );
}

function List({ label, items, ordered = false }) {
  if (items.length === 0) return null;
  const Tag = ordered && items.length > 1 ? "ol" : "ul";
  return (
    <Section label={label}>
      <Tag className={Tag === "ul" && items.length === 1 ? styles.single : undefined}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </Tag>
    </Section>
  );
}

function SourceQuote({ source }) {
  const page = SOURCES[source.id];
  return (
    <figure className={styles.source}>
      {source.quote && (
        <blockquote className={styles.quote} lang={source.lang ?? "en"}>
          “{source.quote}”
        </blockquote>
      )}
      {source.translation && <p className={styles.translation}>In English: “{source.translation}”</p>}
      <figcaption className={styles.cite}>
        <span className={styles.tag}>{source.id}</span>
        <a href={page.url} target="_blank" rel="noreferrer">
          {page.publisher}: {page.title}
          <OpenInNew size={14} className={styles.external} />
        </a>
        {source.where && `, ${source.where}`}
        {page.urlEn && (
          <>
            {" · "}
            <a href={page.urlEn} target="_blank" rel="noreferrer">
              English version
            </a>
          </>
        )}
      </figcaption>
      {page.notice && <p className={styles.notice}>{page.notice}</p>}
    </figure>
  );
}
