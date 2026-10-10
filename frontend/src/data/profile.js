// The questions a student answers, and helpers to read their answers (the "profile").
// The profile lives in the guide's URL (?nationality=eu&programme=degree&…), so a checklist can be bookmarked or shared.
// Everyone answers nationality and programme. Swiss students then get their own follow-up questions (`ask`),
// because their rules come from a separate rulebook. An option with `only` is offered only for some answers.

const swiss = (answers) => answers.nationality === "ch";
const international = (answers) => answers.nationality !== "ch";

export const QUESTIONS = [
  {
    key: "nationality",
    question: "What is your nationality?",
    options: [
      { value: "ch", label: "Switzerland", short: "Switzerland" },
      { value: "eu", label: "An EU or EFTA country", short: "EU/EFTA" },
      { value: "uk", label: "United Kingdom", short: "United Kingdom" },
      {
        value: "apac",
        label: "Australia, Japan, Malaysia, New Zealand or Singapore",
        short: "Australia, Japan, Malaysia, New Zealand or Singapore",
        hint: "HSG handles exchange students from these countries like UK students.",
      },
      { value: "other", label: "Another country", short: "Another country" },
    ],
  },
  {
    key: "programme",
    question: "What brings you to HSG?",
    // "degree" (PhD or another full degree) keeps its old value so bookmarked checklists still open.
    options: [
      { value: "bachelor", label: "A Bachelor's programme", short: "Bachelor's programme" },
      { value: "master", label: "A Master's programme", short: "Master's programme" },
      { value: "degree", label: "A PhD or another degree programme", short: "PhD or other degree" },
      {
        value: "exchange",
        label: "An exchange semester",
        short: "Exchange semester",
        hint: "For stays of more than 90 days.",
        // The rulebooks only cover exchange students coming from abroad.
        only: international,
      },
    ],
  },
  {
    key: "residence",
    ask: swiss,
    question: "Where will your main residence be?",
    options: [
      {
        value: "main",
        label: "In St.Gallen",
        short: "Main residence in St.Gallen",
        hint: "You move your main residence (Hauptwohnsitz) here.",
      },
      {
        value: "weekly",
        label: "Elsewhere in Switzerland",
        short: "Weekly resident in St.Gallen",
        hint: "You keep it there and register in St.Gallen as a weekly resident.",
      },
    ],
  },
  {
    key: "military",
    ask: swiss,
    question: "Are you liable for military service?",
    options: [
      {
        value: "yes",
        label: "Yes",
        short: "Liable for military service",
        hint: "All Swiss men are. Swiss women only if they volunteered.",
      },
      { value: "no", label: "No", short: "Not liable for military service" },
    ],
  },
  {
    key: "from",
    ask: international,
    question: "Where are you moving from?",
    options: [
      { value: "abroad", label: "From abroad", short: "Moving from abroad" },
      { value: "ch", label: "From somewhere else in Switzerland", short: "Moving within Switzerland" },
    ],
  },
  {
    key: "work",
    ask: international,
    question: "Do you plan to work while you study?",
    options: [
      { value: "yes", label: "Yes", short: "Plans to work" },
      { value: "no", label: "No", short: "No job planned" },
    ],
  },
];

// The questions to ask, and the options to offer, given the answers so far.
export const visibleQuestions = (answers) => QUESTIONS.filter((q) => !q.ask || q.ask(answers));
export const visibleOptions = (q, answers) => q.options.filter((option) => !option.only || option.only(answers));

// Reads a profile from URLSearchParams. Returns null unless every question it needs has a valid answer.
export function parseProfile(params) {
  const profile = {};
  for (const q of QUESTIONS) {
    if (q.ask && !q.ask(profile)) continue;
    const value = params.get(q.key);
    if (!visibleOptions(q, profile).some((option) => option.value === value)) return null;
    profile[q.key] = value;
  }
  return profile;
}

export function toQuery(profile) {
  return new URLSearchParams(visibleQuestions(profile).map(({ key }) => [key, profile[key]])).toString();
}

// Short labels of the answers, e.g. ["EU/EFTA", "Degree programme", …].
export function describeProfile(profile) {
  return visibleQuestions(profile).map(({ key, options }) => options.find((option) => option.value === profile[key]).short);
}

// Every possible profile, for tests.
export function allProfiles() {
  return QUESTIONS.reduce(
    (profiles, q) =>
      profiles.flatMap((profile) =>
        q.ask && !q.ask(profile)
          ? [profile]
          : visibleOptions(q, profile).map((option) => ({ ...profile, [q.key]: option.value })),
      ),
    [{}],
  );
}

// The rulebooks group people differently depending on the rule:
// - permits, visas and canton changes: EU/EFTA, the UK, and "other countries" (the UK guide has its own rules for the UK);
// - the HSG exchange guide (S4): EU/EFTA; Australia, Japan, Malaysia, New Zealand, Singapore and the UK; everyone else;
// - Swiss students: main residence or weekly resident, and whether they are liable for military service.
export const isSwiss = (p) => p.nationality === "ch";
export const isForeign = (p) => !isSwiss(p);
export const isEu = (p) => p.nationality === "eu";
export const isNonEu = (p) => isForeign(p) && !isEu(p);
export const isUk = (p) => p.nationality === "uk";
export const isOtherCountry = (p) => p.nationality === "apac" || p.nationality === "other";
export const inExchangeUkGroup = (p) => p.nationality === "uk" || p.nationality === "apac";
export const isDegree = (p) => ["bachelor", "master", "degree"].includes(p.programme);
export const isBachelor = (p) => p.programme === "bachelor";
export const isMaster = (p) => p.programme === "master";
export const isExchange = (p) => p.programme === "exchange";
export const fromAbroad = (p) => p.from === "abroad";
export const fromSwitzerland = (p) => p.from === "ch";
export const plansToWork = (p) => p.work === "yes";
export const mainResidence = (p) => p.residence === "main";
export const weeklyResident = (p) => p.residence === "weekly";
export const liableForService = (p) => p.military === "yes";
