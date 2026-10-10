// Turns e-mail addresses, Swiss phone numbers and web addresses in a step's text into links,
// so a student can tap to write, call or open the page straight from their phone.

const PATTERN = new RegExp(
  [
    /([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/.source, // e-mail
    /(\+41 \d{2} \d{3} \d{2} \d{2}|0\d{2} \d{3} \d{2} \d{2}|0848 \d{3} \d{3})/.source, // phone
    /((?:[a-z0-9-]+\.)+(?:ch|swiss)(?:\/[\w/-]*)?)/.source, // web address
  ].join("|"),
  "gi",
);

function href(email, phone, domain) {
  if (email) return `mailto:${email}`;
  if (phone) return `tel:${phone.replace(/\s/g, "").replace(/^0/, "+41")}`;
  return `https://${domain}`;
}

export default function Linkify({ text }) {
  const parts = [];
  let last = 0;
  for (const match of text.matchAll(PATTERN)) {
    const [found, email, phone, domain] = match;
    if (match.index > last) parts.push(text.slice(last, match.index));
    const external = Boolean(domain);
    parts.push(
      <a
        key={match.index}
        href={href(email, phone, domain)}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        style={phone ? { whiteSpace: "nowrap" } : { overflowWrap: "anywhere" }}
      >
        {found}
      </a>,
    );
    last = match.index + found.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}
