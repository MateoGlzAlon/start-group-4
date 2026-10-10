import { mapsUrl } from "@/data/links";
import { SOURCES } from "@/data/sources";
import { Check, Description, East, Info, Mail, OpenInNew, Place } from "./Icons";
import Linkify from "./Linkify";
import styles from "./StepCard.module.css";

// One step of the checklist, built on the event card of docs/style.md: a grey card with a green
// block on the left (the step number) and a green arrow square that opens the details.
// On phones the "Mark as done" button lives in the Guide's dock (a bar at the bottom of the screen) instead.
export default function StepCard({ step, number, done, open, onToggleOpen, onToggleDone }) {
  const detailsId = `step-${step.id}`;
  const classes = [styles.card, open && styles.open, done && styles.done].filter(Boolean).join(" ");
  // Link each source page once (quotes stay in the data, not on screen). Show the first page and fold the
  // others away so the card stays short on a phone.
  const [primary, ...more] = [...new Set(step.sources.map((source) => source.id))];

  return (
    <article id={`card-${step.id}`} className={classes}>
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
        <Links links={step.links} />
        <List label="Cost" items={step.fees} />
        {(step.office || step.places.length > 0) && (
          <Section label="Where">
            {step.office && (
              <p>
                <Linkify text={step.office} />
              </p>
            )}
            <Places places={step.places} />
          </Section>
        )}
        <List label="Good to know" items={step.notes} />

        <Section label="Official source">
          <SourceLink id={primary} />
          {more.length > 0 && (
            <details className={styles.more}>
              <summary>
                <East size={18} />
                {more.length === 1 ? "1 more source" : `${more.length} more sources`}
              </summary>
              {more.map((id) => (
                <SourceLink key={id} id={id} />
              ))}
            </details>
          )}
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
          <li key={item}>
            <Linkify text={item} />
          </li>
        ))}
      </Tag>
    </Section>
  );
}

// Forms and online services, as large tap targets
function Links({ links }) {
  if (links.length === 0) return null;
  return (
    <Section label="Forms and links">
      <ul className={styles.links}>
        {links.map(({ label, url }) => {
          const mail = url.startsWith("mailto:");
          const Icon = mail ? Mail : /\.pdf$/i.test(url) ? Description : OpenInNew;
          return (
            <li key={url}>
              <a href={url} {...(mail ? {} : { target: "_blank", rel: "noreferrer" })}>
                <Icon size={20} className={styles.linkIcon} />
                <span>{label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

// Office addresses, each opening Google Maps
function Places({ places }) {
  if (places.length === 0) return null;
  return (
    <ul className={styles.links}>
      {places.map((place) => (
        <li key={place.address}>
          <a href={mapsUrl(place)} target="_blank" rel="noreferrer">
            <Place size={20} className={styles.linkIcon} />
            <span>
              <span className={styles.placeName}>{place.name}</span>
              <span className={styles.placeAddress}>{place.address} · Open in Google Maps</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function SourceLink({ id }) {
  const page = SOURCES[id];
  return (
    <div className={styles.source}>
      <p className={styles.cite}>
        <span className={styles.tag}>{id}</span>
        <a href={page.url} target="_blank" rel="noreferrer">
          {page.publisher}: {page.title}
          <OpenInNew size={14} className={styles.external} />
        </a>
        {page.urlEn && (
          <>
            {" · "}
            <a href={page.urlEn} target="_blank" rel="noreferrer">
              English version
            </a>
          </>
        )}
      </p>
    </div>
  );
}
