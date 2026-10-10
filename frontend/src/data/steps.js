// The checklist. Every step comes from one of the two rulebooks:
// - `rows` are the rows of docs/context_1.md it covers, `chRows` the rows of docs/rulebook-swiss-students-stgallen.md
//   (the tests check that every row of both is covered);
// - `sources` cite the page the rule comes from, with the section (`where`) and/or the exact sentence (`quote`)
//   where the rulebook gives one, and an English translation of German quotes (`lang: "de"`);
// - `missing` lists what the official sources do not say. Never fill these gaps from general knowledge.
// List items (todo, documents, fees, notes, missing) are strings, or { text, when } to show them only to some profiles.

import {
  fromAbroad,
  fromSwitzerland,
  inExchangeUkGroup,
  isDegree,
  isEu,
  isExchange,
  isForeign,
  isNonEu,
  isOtherCountry,
  isSwiss,
  liableForService,
  mainResidence,
  plansToWork,
  weeklyResident,
} from "./profile.js";

export const PHASES = [
  { id: "before", title: "Before you arrive", intro: "Start these before you travel to St.Gallen." },
  { id: "arrival", title: "Your first 14 days", intro: "Most deadlines here count from the day you move in." },
  { id: "studies", title: "While you study", intro: "Rules that apply during your stay." },
  { id: "leaving", title: "When you move out", intro: "What to do when you move or your studies end." },
  { id: "ifneeded", title: "Only if you need it", intro: "Not on your to-do list, but good to know." },
];

const everyone = () => true;
const RESIDENTS_OFFICE = "Residents' Office, Rathaus, Poststrasse 28, St.Gallen";

// The fine for registering late, from the Swiss rulebook (row A16, which applies to everyone).
const LATE_FINE = {
  id: "CH-S1",
  quote: "Erfolgt die Meldung später als 14 Tage, kann dies mit einer Busse von bis zu Fr. 200.00 geahndet werden.",
  lang: "de",
  translation: "If you register later than 14 days, you can be fined up to CHF 200.",
};

export const STEPS = [
  // --- Before you arrive ---------------------------------------------------
  {
    id: "permit-before-entry",
    phase: "before",
    rows: [1, 2],
    when: (p) => isNonEu(p) && fromAbroad(p),
    title: "Get your residence permit before you enter Switzerland",
    summary:
      "You will stay longer than three months and you are not an EU/EFTA citizen, so your permit must be issued before you travel.",
    deadline: "Before you enter Switzerland",
    office: "Migrationsamt (cantonal migration office)",
    todo: [
      { when: isDegree, text: "Apply for the residence permit before you travel." },
      { when: isExchange, text: "How this works for exchange students depends on your nationality. See the next step." },
    ],
    missing: [
      "Which documents the permit application needs",
      "How long it takes, and the earliest date you can apply",
      {
        when: (p) => p.nationality === "uk" && isDegree(p),
        text: "The steps for UK degree students: the official sources only describe them for UK exchange students",
      },
    ],
    sources: [
      {
        id: "S7",
        where: "p. 2, “Personen aus anderen Ländern”",
        quote: "Die Bewilligung muss vor der Einreise in die Schweiz ausgestellt worden sein.",
        lang: "de",
        translation: "The permit must have been issued before you enter Switzerland.",
      },
      { id: "S6", where: "FAQ “Brauche ich … eine Aufenthaltsbewilligung?”, sentences 1–2" },
    ],
  },
  {
    id: "visa-d",
    phase: "before",
    rows: [18, 19],
    when: (p) => isDegree(p) && isOtherCountry(p) && fromAbroad(p),
    title: "Apply for a national visa D",
    summary:
      "Whether you need a visa depends on your nationality. If you do, apply early at the Swiss representation in your country.",
    deadline: "Early. The source gives no fixed date",
    office: "Swiss embassy or consulate abroad. It forwards your application to the Migrationsamt St.Gallen",
    todo: [
      "Apply at the Swiss embassy or consulate with the documents below.",
      "You may also have to confirm that you will leave Switzerland after your studies.",
    ],
    documents: [
      "Colour printout of your HSG admission decision (Zulassungsverfügung)",
      "Your semester invoice and proof that you paid it",
      "Your enrolment confirmation, if they ask for it",
      "Bank statements showing at least CHF 24,000, from an account in your own name at a Swiss bank or a bank with a Swiss branch, in German or English",
    ],
    missing: [
      "Which nationalities need a visa (HSG links to a list from the State Secretariat for Migration, which is not in our sources)",
      "The document list and deadline for the permit application of non-EU/EFTA degree students",
    ],
    sources: [
      {
        id: "S6",
        where: "FAQ “Wo beantrage ich ein Visum?” and “Welche Dokumente stellt die Universität … zur Verfügung?”",
      },
      { id: "S6", where: "FAQ “Werden weitere Nachweise verlangt?”" },
    ],
  },
  {
    id: "exchange-permit-grant",
    phase: "before",
    rows: [13],
    when: (p) => isExchange(p) && inExchangeUkGroup(p),
    title: "Pay for your permit grant",
    summary:
      "HSG Student Mobility applies to the Migrationsamt for your residence permit grant (Zusicherung). You pay the fee back to HSG.",
    deadline: "Pay before you arrive",
    office: "HSG Student Mobility, which applies to the Migrationsamt",
    todo: [
      "Wait for your grant. HSG sends it by the end of June for the autumn semester, or by mid-November for the spring semester.",
      "Pay HSG back online, by credit card only.",
    ],
    fees: ["CHF 96. You owe it even if your exchange is cancelled"],
    sources: [{ id: "S4", where: "§1, table row 2 and footnote" }],
  },
  {
    id: "exchange-visa",
    phase: "before",
    rows: [15, 16],
    when: (p) => isExchange(p) && p.nationality === "other",
    title: "Get your visa",
    summary:
      "There are two routes, depending on your nationality. HSG's exchange guide lists 22 nationalities that apply in person.",
    deadline: "As soon as possible after you are accepted",
    office: "Swiss embassy or consulate; HSG Student Mobility",
    todo: [
      "If your nationality is one of the 22 in HSG's list: apply for the visa in person at the Swiss embassy or consulate in your country of residence, with your HSG acceptance letter.",
      "All other nationalities: HSG applies for your visa grant. When you receive the visa authorisation document, contact the consulate named on it as soon as possible, and pay HSG back.",
    ],
    documents: ["HSG acceptance letter (first route)", "Visa authorisation document (second route)"],
    fees: ["CHF 96 to HSG (second route)"],
    missing: ["The list of the 22 nationalities. It is in HSG's exchange guide, not in our rulebook"],
    sources: [{ id: "S4", where: "§1, table rows 3–4 and footnote" }],
  },
  {
    id: "health-insurance",
    phase: "before",
    rows: [20],
    chRows: ["I11"],
    when: isForeign,
    title: "Arrange health insurance from your arrival date",
    summary:
      "Everyone who studies here for more than three months needs Swiss health insurance from the day they arrive, unless they are exempted.",
    deadline: "Cover must start on your arrival date",
    office: "City of St.Gallen, Kontrollstelle für Krankenversicherung (for an exemption)",
    todo: [
      "Take out Swiss health insurance that starts on the day you arrive.",
      "Or apply to be exempted, if you have a European Health Insurance Card (EHIC) or private cover that is equivalent. Use the city's official exemption form: your insurer confirms your cover on it. Other proof is not accepted.",
      "Keep your insurance card or policy at hand. You need it when you register.",
    ],
    documents: ["For an exemption: the official exemption form, fully signed, with its attachments"],
    missing: ["The deadline for the exemption"],
    sources: [
      { id: "S6", where: "“Krankenversicherung”, paragraphs 1–2" },
      {
        id: "CH-KV",
        quote: "Versicherungsbestätigungen in anderer Form werden nicht akzeptiert.",
        lang: "de",
        translation: "Confirmations of insurance in any other form are not accepted.",
      },
    ],
  },
  {
    id: "deregister-former",
    phase: "before",
    rows: [10],
    when: fromSwitzerland,
    title: "Deregister at your current commune",
    summary: "You already live in Switzerland. Deregister where you live now before you register in St.Gallen.",
    deadline: "Before you register in St.Gallen",
    office: "The commune where you live now",
    missing: ["Which documents to bring"],
    sources: [{ id: "S1", where: "“Moving within and to St.Gallen”, sentence 1" }],
  },
  {
    id: "canton-change",
    phase: "before",
    rows: [30],
    when: (p) => fromSwitzerland(p) && isOtherCountry(p),
    title: "Apply for a change of canton",
    summary: "If you hold a B or L permit from another canton, apply to move it to St.Gallen before you move.",
    deadline: "Before you move",
    office: "Migrationsamt St.Gallen",
    todo: [
      "Send the application with the documents below.",
      "With an L permit you have no right to a change of canton.",
    ],
    documents: [
      "Form A1",
      "Employment contract",
      "Confirmation about social aid from your last commune",
      "Extract from the debt-collection register (Betreibungsregisterauszug) of your last commune",
    ],
    sources: [{ id: "S8", where: "§2.3" }],
  },

  // --- Your first 14 days --------------------------------------------------
  {
    id: "register",
    phase: "arrival",
    rows: [7, 8, 9, 11],
    chRows: ["A16"],
    when: isDegree,
    title: "Register at the Residents' Office",
    summary: "Register in person within 14 days of arriving. Late registration can be fined up to CHF 200.",
    deadline: "Within 14 days of arrival",
    office: RESIDENTS_OFFICE,
    todo: [
      "Go to the counter with the documents below. You can also report the move online through eUmzugCH.",
      "Pay the registration fee, in cash or by card.",
    ],
    documents: [
      "Rental agreement, or a confirmation from your accommodation provider",
      "Foreign ID card and travel documents",
      "Valid health-insurance card, or your current basic insurance policy",
      "Family booklet, if you are married with minor children",
    ],
    notes: [
      {
        when: fromSwitzerland,
        text: "Keeping your main residence elsewhere in Switzerland? Then register online as a weekly resident within 14 days of moving. You need your rental or sublease agreement or accommodation confirmation, your enrolment certificate, and a certificate of residence from your main commune (the original, sent by post).",
      },
      "Living outside the City of St.Gallen? Register with your municipality's population services (Bevölkerungsdienste) instead. Bring your ID, rental agreement and health-insurance card, and ask them what else you need.",
    ],
    missing: ["The amount of the registration fee"],
    sources: [
      { id: "S1", where: "Introduction", quote: "change of place of residence within 14 days" },
      { id: "S1", where: "“Moving within and to St.Gallen”, document list and last sentence" },
      { id: "S1", where: "“Registration as weekly resident…”, bullets 2–4" },
      {
        id: "S6",
        where: "FAQ “Muss ich mich … anmelden?”",
        quote: "Verspätete Zu- oder Umzugsmeldungen werden mit einer Busse sanktioniert.",
        lang: "de",
        translation: "Late registrations of an arrival or a move are fined.",
      },
      LATE_FINE,
    ],
  },
  {
    id: "permit-eu",
    phase: "arrival",
    rows: [3, 4, 5, 6],
    when: (p) => isEu(p) && isDegree(p) && fromAbroad(p),
    title: "Apply for your permit with Form A1",
    summary:
      "As an EU/EFTA citizen you can enter with your passport or ID card and apply once you are here. You need a permit because you stay longer than three months.",
    deadline: "After you arrive and have registered",
    office: "Residents' Office (Einwohnerkontrolle) of the place where you live",
    todo: [
      "Go to the Residents' Office in person and hand in Form A1 with the documents below.",
      "Have every document that is not in German translated.",
    ],
    documents: [
      "Form A1",
      "Copy of your passport or ID card",
      "HSG admission confirmation",
      "Proof of health and accident insurance",
      "No proof of funds: it is waived because HSG is a university in the canton of St.Gallen (otherwise CHF 2,000 a month)",
    ],
    missing: ["Who may translate your documents, and by when"],
    sources: [
      {
        id: "S2",
        where: "Introduction",
        quote: "Eine Bewilligungspflicht besteht, sofern der Aufenthalt länger als drei Monate im Kalenderjahr dauert.",
        lang: "de",
        translation: "You need a permit if your stay lasts longer than three months in a calendar year.",
      },
      { id: "S7", where: "p. 2, “Staatsangehörige der EU/EFTA”, paragraph after the list of permit types" },
      {
        id: "S3",
        where: "§3 and §4",
        quote: "nach erfolgter Einreise und Anmeldung bei der Einwohnerkontrolle des Wohnortes einzureichen",
        lang: "de",
        translation: "to be submitted after you have entered and registered at the residents' office where you live",
      },
      { id: "S3", where: "“Zu beachten”, the line above the footnote" },
    ],
  },
  {
    id: "canton-change-eu",
    phase: "arrival",
    rows: [29],
    when: (p) => fromSwitzerland(p) && isEu(p),
    title: "Report your change of canton",
    summary: "With an EU/EFTA permit from another canton you need no new permit. Report the move and show your permit card.",
    deadline: "Within 14 days",
    office: "Residents' Office (Einwohnerkontrolle)",
    documents: ["Your foreigner ID card (permit card)"],
    sources: [
      {
        id: "S8",
        where: "§2.1",
        quote: "Ein Kantonswechsel ist nicht bewilligungspflichtig.",
        lang: "de",
        translation: "A change of canton does not need a permit.",
      },
    ],
  },
  {
    id: "register-exchange-eu",
    phase: "arrival",
    rows: [12],
    chRows: ["A16"],
    when: (p) => isExchange(p) && isEu(p),
    title: "Register at the Residents' Office",
    summary:
      "Register within 14 days of arriving; late registration can be fined up to CHF 200. Then a letter with an appointment for your photo comes by post.",
    deadline: "Within 14 days of arrival",
    office: RESIDENTS_OFFICE,
    todo: [
      "Register with the documents below.",
      "Wait for the letter with your photo appointment. See the next step.",
    ],
    documents: ["Passport or ID card", "Form R", "Copy of your rental agreement"],
    fees: ["CHF 71 for the L permit"],
    sources: [
      {
        id: "S4",
        where: "“After your arrival”",
        quote: "must register at the St.Gallen residents' office within 14 days after arrival",
      },
      LATE_FINE,
    ],
  },
  {
    id: "register-exchange-uk-group",
    phase: "arrival",
    rows: [14],
    chRows: ["A16"],
    when: (p) => isExchange(p) && inExchangeUkGroup(p),
    title: "Register, give your biometrics, upload Form R",
    summary:
      "Register within 14 days of arriving (late registration can be fined up to CHF 200), go to the biometrics appointment, and upload your signed Form R.",
    deadline: "Within 14 days of arrival",
    office: "Residents' Office; Migrationsamt for the biometrics",
    todo: [
      "Register at the Residents' Office with the documents below.",
      "Go to the biometrics appointment at the Migrationsamt and pay the processing fee there.",
      "Upload your signed Form R to Mobility-Online.",
    ],
    documents: ["Passport or ID card", "Form R", "Your residence permit grant (Zusicherung der Aufenthaltsbewilligung)"],
    fees: ["CHF 123 for the permit", "CHF 25 processing fee, paid at the biometrics appointment"],
    missing: ["Whether CHF 123 is right: the same HSG guide lists CHF 122 for other nationalities"],
    sources: [
      {
        id: "S4",
        where: "“After your arrival”",
        quote: "must register at the St.Gallen residents' office within 14 days after arrival",
      },
      { id: "S4", where: "“Citizens of Australia, Japan, … United Kingdom”" },
      LATE_FINE,
    ],
  },
  {
    id: "register-exchange-other",
    phase: "arrival",
    rows: [17],
    chRows: ["A16"],
    when: (p) => isExchange(p) && p.nationality === "other",
    title: "Register, give your biometrics, upload Form R",
    summary:
      "Register within 14 days of arriving (late registration can be fined up to CHF 200), go to the biometrics appointment, and upload your signed Form R.",
    deadline: "Within 14 days of arrival",
    office: "Residents' Office; Migrationsamt for the biometrics",
    todo: [
      "Register at the Residents' Office with the documents below.",
      "Go to the biometrics appointment at the Migrationsamt and pay the processing fee there.",
      "Upload your signed Form R to Mobility-Online.",
    ],
    documents: ["Passport or ID card", "Form R"],
    fees: ["CHF 122 for the permit", "CHF 25 processing fee, paid at the biometrics appointment"],
    missing: ["Whether CHF 122 is right: the same HSG guide lists CHF 123 for UK citizens"],
    sources: [
      {
        id: "S4",
        where: "“After your arrival”",
        quote: "must register at the St.Gallen residents' office within 14 days after arrival",
      },
      { id: "S4", where: "“Citizens of all other countries”" },
      LATE_FINE,
    ],
  },
  {
    id: "id-appointment",
    phase: "arrival",
    rows: [24],
    // Non-EU/EFTA exchange students give their biometrics in the registration step above.
    when: (p) => isDegree(p) || isEu(p),
    title: "Go to your ID appointment",
    summary:
      "Once your permit is approved, you get a written invitation. There your photo and signature are taken, and your fingerprints if required.",
    deadline: "The date in your invitation",
    office: "Ausweisstelle St.Gallen (ID office)",
    todo: [
      "Wait for the written invitation. Come only once you have it.",
      "If the date does not suit you, change it online.",
    ],
    documents: ["Your invitation letter", "Valid passport or ID card"],
    sources: [
      { id: "S2", where: "“Ausländerausweis”" },
      { id: "S7", where: "p. 3" },
    ],
  },

  // --- While you study -----------------------------------------------------
  {
    id: "ahv",
    phase: "studies",
    rows: [21],
    when: everyone,
    title: "Pay AHV contributions (old-age insurance)",
    summary:
      "Everyone with a civil-law domicile in Switzerland pays into the AHV. If you do not earn money, you pay from 1 January after your 20th birthday.",
    deadline: "From 1 January after you turn 20",
    missing: ["How and where to register and pay", "How much you pay"],
    sources: [{ id: "S6", where: "“Obligatorische Altersvorsorge (AHV)”" }],
  },
  {
    id: "work-eu",
    phase: "studies",
    rows: [22],
    when: (p) => plansToWork(p) && isEu(p),
    title: "Report your job, and keep to 15 hours a week",
    summary:
      "During the semester you may work up to 15 hours a week. Full-time work in the semester breaks needs an application.",
    office: "Migrationsamt",
    todo: [
      "Report your job.",
      "To work full-time in the semester breaks, apply with the documents below.",
      "To work more than 15 hours a week during the semester, you need a separate work permit. Apply through the Residents' Office.",
    ],
    documents: ["For the semester breaks: Form A1 and a copy of your employment contract"],
    missing: ["Deadlines for reporting your job or applying"],
    sources: [
      { id: "S3", where: "§5" },
      { id: "S6", where: "FAQ “Darf ich während meines Studiums arbeiten?”" },
    ],
  },
  {
    id: "work-degree-non-eu",
    phase: "studies",
    rows: [23],
    when: (p) => plansToWork(p) && isNonEu(p) && isDegree(p),
    title: "Apply for permission to work",
    summary: "With a B permit as a degree student, you can apply to work as much as EU/EFTA students may.",
    office: "Amt für Wirtschaft und Arbeit (cantonal office for economy and labour)",
    missing: ["Which documents to send, and the deadline"],
    sources: [{ id: "S6", where: "FAQ “Darf ich während meines Studiums arbeiten?”, paragraph 2" }],
  },
  {
    id: "work-exchange-non-eu",
    phase: "studies",
    rows: [23],
    when: (p) => plansToWork(p) && isNonEu(p) && isExchange(p),
    title: "Check before you take a job",
    summary:
      "Your visa is not a work permit. Your employer would have to apply for one, and HSG says approval is “highly unlikely”.",
    office: "Amt für Wirtschaft und Arbeit (cantonal office for economy and labour)",
    sources: [{ id: "S4", where: "§2" }],
  },
  {
    id: "extend-permit",
    phase: "studies",
    rows: [25],
    when: isForeign,
    title: "Extend your permit before it expires",
    summary: "If your studies last longer than your permit, apply to extend it in good time.",
    deadline: "At least 2 weeks before it expires",
    office: "Migrationsamt",
    documents: [
      "Your current permit",
      "Passport valid for at least 3 months beyond your stay",
      "The expiry notice, if you received one",
    ],
    sources: [{ id: "S7", where: "p. 4, “Aufenthaltsbewilligung verlängern”" }],
  },

  // --- Before you leave ----------------------------------------------------
  {
    id: "deregister-exchange",
    phase: "leaving",
    rows: [27],
    when: isExchange,
    title: "Deregister and upload Form D",
    summary: "Deregister at the Residents' Office before you leave, then upload the stamped Form D.",
    deadline: "Up to 1 month before you leave",
    office: "Residents' Office, Rathaus",
    todo: ["Deregister at the Residents' Office with the documents below.", "Upload the stamped Form D."],
    documents: ["Form D", "Your L permit"],
    sources: [
      { id: "S4", where: "“Before your departure”" },
      { id: "S5", where: "Form text", quote: "you must deregister at the Residents' Office" },
    ],
  },
  {
    id: "deregister-abroad",
    phase: "leaving",
    rows: [28],
    when: isDegree,
    title: "Deregister when you move abroad",
    summary: "If you leave Switzerland after your studies, deregister in person. All adults in your household must come.",
    deadline: "Tax office: 1 month before you move",
    office: "Residents' Office; city tax office (City Hall, 2nd floor)",
    todo: [
      "One month before you move, go to the city tax office for its departure notice.",
      "Then deregister in person at the Residents' Office. If someone goes for you, give them a power of authority.",
    ],
    documents: [
      "Departure notice from the tax office",
      "Your original foreign ID card",
      "The “Moving abroad” questionnaire",
      "A power of authority, if someone deregisters for you",
    ],
    sources: [{ id: "S1", where: "“Moving abroad”" }],
  },

  // --- Only if you need it -------------------------------------------------
  {
    id: "lost-permit",
    phase: "ifneeded",
    optional: true,
    rows: [26],
    when: isForeign,
    title: "If you lose your permit card",
    summary: "Report the loss to the police in person, then send their report to the Migrationsamt.",
    office: "Any Swiss police station; Migrationsamt",
    todo: ["Report the loss in person at any Swiss police station.", "Send the police loss report to the Migrationsamt."],
    documents: ["The police loss report"],
    sources: [{ id: "S2", where: "“Ausländerausweis verloren oder gestohlen?”" }],
  },

  // --- Swiss students (docs/rulebook-swiss-students-stgallen.md) ----------
  {
    id: "ch-deregister",
    phase: "before",
    chRows: ["A2"],
    when: (p) => isSwiss(p) && mainResidence(p),
    title: "Deregister at your current municipality",
    summary: "Before you can register in St.Gallen, deregister where you live now.",
    deadline: "Before you register in St.Gallen",
    office: "The municipality where you live now",
    missing: ["Which documents to bring"],
    sources: [
      {
        id: "CH-S1",
        quote:
          "Für die Anmeldung in der Stadt St.Gallen ist die vorgängige Abmeldung bei der bisherigen Wohnsitzgemeinde vorzunehmen.",
        lang: "de",
        translation: "To register in the City of St.Gallen, first deregister at the municipality where you lived until now.",
      },
    ],
  },
  {
    id: "ch-heimatausweis",
    phase: "before",
    chRows: ["A9"],
    when: (p) => isSwiss(p) && weeklyResident(p),
    title: "Get your Heimatausweis",
    summary:
      "To register as a weekly resident you need a Heimatausweis (certificate of residence) from the municipality of your main residence.",
    office: "The municipality of your main residence",
    todo: ["Get it before you register: you upload a copy and send the original by post."],
    sources: [
      {
        id: "CH-S1",
        quote: "Den Heimatausweis beziehen Sie bei der Hauptwohnsitz-Gemeinde.",
        lang: "de",
        translation: "You get the Heimatausweis from the municipality of your main residence.",
      },
    ],
  },
  {
    id: "ch-health",
    phase: "before",
    chRows: ["B1", "B2", "B3"],
    when: isSwiss,
    title: "Check your basic health insurance",
    summary:
      "Everyone living in Switzerland must have basic health insurance. You need your insurance card when you register.",
    deadline: "Bring your card when you register",
    office: "Kontrollstelle für Krankenversicherung (checks that everyone is insured)",
    todo: [
      "Make sure you have Swiss basic health insurance.",
      "Bring your current insurance card or policy when you register.",
    ],
    notes: [
      "On a low income? You may be entitled to a premium reduction (Prämienverbilligung). The city's page links to the SVA St.Gallen for it.",
    ],
    missing: [
      "Whether you have to change anything with your insurer when you move, for example your premium region",
      "How to apply for a premium reduction",
    ],
    sources: [
      {
        id: "CH-S3",
        quote: "In der Schweiz wohnhafte Personen unterstehen dem Krankenversicherungs-Obligatorium.",
        lang: "de",
        translation: "Everyone living in Switzerland must have health insurance.",
      },
      {
        id: "CH-S3",
        quote:
          "Für die Anmeldung bei den Bevölkerungsdiensten ist die aktuelle Krankenversicherungskarte oder Police mitzubringen.",
        lang: "de",
        translation: "Bring your current health insurance card or policy when you register with the Bevölkerungsdienste.",
      },
      {
        id: "CH-S3",
        quote: "Versicherte in bescheidenen wirtschaftlichen Verhältnissen haben Anrecht auf Prämienverbilligungen.",
        lang: "de",
        translation: "Insured people on a modest income are entitled to premium reductions.",
      },
    ],
  },
  {
    id: "ch-military-plan",
    phase: "before",
    chRows: ["C1", "C2", "C9", "C10", "C11", "C15", "C16"],
    when: (p) => isSwiss(p) && liableForService(p),
    title: "Plan your military service around your studies",
    summary:
      "Recruit school (RS) is due in the year you turn 20, and studying is not a reason to postpone it. It must be finished by the year you turn 25.",
    deadline: "RS in the year you turn 20, finished by the year you turn 25",
    office: "HSG Militärische Verbindungsstelle (MilVrb) for advice",
    todo: [
      "Attend recruitment, then do your military or civil service in person.",
      "HSG recommends doing RS before you start your studies, or in the 4th semester (spring semester) after you pass the assessment year.",
    ],
    notes: [
      "Want to do civil service instead? Apply in writing on the form of the civil service administration (Zivildienstverwaltung). The earliest date is the orientation day, and there is a 4-week reflection period.",
      "Assigned to civil protection? It starts in the year you turn 20.",
      "You have another nationality as well? The duty applies anyway, with exceptions under treaties with Germany, France, Italy and Austria.",
    ],
    sources: [
      {
        id: "CH-S7",
        quote:
          "Der Wehrpflicht unterstehen alle männlichen Schweizer Bürger; Frauen nur nach freiwilliger Verpflichtung.",
        lang: "de",
        translation: "All male Swiss citizens are liable for military service; women only if they volunteer.",
      },
      {
        id: "CH-S7",
        quote: "Studium ist kein Verschiebungsgrund!",
        lang: "de",
        translation: "Studying is not a reason to postpone!",
      },
      {
        id: "CH-S8",
        quote: "Die Rekrutenschule muss im Kalenderjahr des 25. Geburtstags abgeschlossen werden.",
        lang: "de",
        translation: "Recruit school must be finished in the calendar year of your 25th birthday.",
      },
      {
        id: "CH-S9",
        quote: "vor dem Studium oder nach bestandem Assessmentjahr im vierten Semester (Frühlingssemester) absolviert.",
        lang: "de",
        translation: "completed before your studies, or after you pass the assessment year, in the fourth semester (spring semester).",
      },
    ],
  },
  {
    id: "ch-register-main",
    phase: "arrival",
    chRows: ["A1", "A3", "A4", "A5", "A6", "A7", "A16"],
    when: (p) => isSwiss(p) && mainResidence(p),
    title: "Register at the Residents' Office",
    summary:
      "Report your move within 14 days, online through eUmzugCH or in person. Late registration can be fined up to CHF 200.",
    deadline: "Within 14 days of moving in",
    office: "Bevölkerungsdienste (Residents' Office), Rathaus, or eUmzugCH online",
    todo: ["Register online through eUmzugCH, or in person at the counter with an official ID."],
    documents: [
      "Official ID (in person)",
      "Rental agreement, or a confirmation from your landlord",
      "Heimatschein, for every adult with Swiss citizenship",
      "Current health insurance card, or your basic insurance policy",
      "Family booklet, if you are married with minor children",
    ],
    notes: [
      "Registering online? Have ready your AHV number (on your AHV-IV card), your health insurance card, your rental agreement, and a credit card (MasterCard, VISA or PostFinance Card) for any fees.",
    ],
    missing: ["The registration fee"],
    sources: [
      {
        id: "CH-S1",
        quote: "Ein Umzug, Zuzug oder Wegzug ist innerhalb von 14 Tagen meldepflichtig.",
        lang: "de",
        translation: "You must report a move within, into or out of the city within 14 days.",
      },
      {
        id: "CH-S1",
        quote:
          "Die Meldung kann online unter eUmzugCH oder persönlich am Schalter unter Vorweisung eines amtlichen Ausweises erfolgen.",
        lang: "de",
        translation: "You can report it online through eUmzugCH, or in person at the counter by showing an official ID.",
      },
      { id: "CH-S1", where: "Document list" },
      {
        id: "S1",
        quote: "Credit card (MasterCard, VISA, PostFinance Card) for paying any fees incurred",
      },
      LATE_FINE,
    ],
  },
  {
    id: "ch-register-weekly",
    phase: "arrival",
    chRows: ["A8", "A9", "A10", "A11", "A12", "A13", "A14", "A16"],
    when: (p) => isSwiss(p) && weeklyResident(p),
    title: "Register as a weekly resident",
    summary:
      "Register St.Gallen as your secondary residence online, within 14 days of moving in. Your main residence stays where it is.",
    deadline: "Within 14 days of moving in",
    office: "Bevölkerungsdienste (Residents' Office), online form",
    todo: [
      "Fill in the online form (open 24/7) and upload the documents below.",
      "Send the original of your Heimatausweis by post to the Residents' Office, Rathaus, 9001 St.Gallen.",
      "Pay the registration fee.",
      "Wait for the confirmation from the Bevölkerungsdienste. Your registration is only valid once you have it.",
    ],
    documents: [
      "Rental agreement, sublease, or a housing confirmation from your landlord",
      "HSG enrolment confirmation (Immatrikulationsbestätigung)",
      "Heimatausweis from the municipality of your main residence",
    ],
    notes: [
      "This only works if your main residence is in Switzerland.",
      "Studying part-time? Then register in person at the Residents' Office, and bring your employment contract if you work.",
      "Late registration can be fined up to CHF 200.",
    ],
    missing: [
      "The amount of the fee (the city refers to its fee schedule, SRS 416.3)",
      "Which students must move their main residence to St.Gallen, and which may stay weekly residents",
    ],
    sources: [
      {
        id: "CH-S1",
        quote: "Diese Dienstleistung kann ausschliesslich von Personen mit Hauptwohnsitz in der Schweiz genutzt werden.",
        lang: "de",
        translation: "Only people whose main residence is in Switzerland can use this service.",
      },
      {
        id: "CH-S1",
        quote: "beträgt die Meldepflicht 14 Tage ab Datum Ihres Zuzuges.",
        lang: "de",
        translation: "you must register within 14 days of the day you move in.",
      },
      {
        id: "CH-S1",
        quote: "Die Anmeldung in St.Gallen im Nebenwohnsitz ist kostenpflichtig.",
        lang: "de",
        translation: "Registering a secondary residence in St.Gallen costs a fee.",
      },
      {
        id: "CH-S1",
        quote:
          "Die Anmeldung ist erst gültig, wenn Sie von den Bevölkerungsdiensten der Stadt St.Gallen eine entsprechende Bestätigung erhalten haben.",
        lang: "de",
        translation:
          "Your registration is only valid once you have received a confirmation from the Bevölkerungsdienste of the City of St.Gallen.",
      },
      { id: "S1", quote: "Lastly, send the original of your certificate of residence to the Resident's Office of St.Gallen…" },
      { id: "S1", quote: "Part-time students must register in person at the Residents' Office and present an employment contract…" },
      LATE_FINE,
    ],
  },
  {
    id: "ch-military-address",
    phase: "arrival",
    chRows: ["C3", "C4", "C6"],
    when: (p) => isSwiss(p) && liableForService(p),
    title: "Report your new address for military service",
    summary:
      "Registering with the city also updates your military address. HSG says you must also report to your local Sektionschef. The sources disagree.",
    deadline: "Within 14 days",
    office: "Residents' Office or eUmzugCH; per HSG, also your local Sektionschef",
    todo: [
      "Report your move through eUmzugCH or the Residents' Office. According to the canton, that is enough: no separate report to the Kreiskommando is needed.",
      "HSG's page says you must also register with your local Sektionschef, and that you risk a disciplinary penalty if you don't.",
    ],
    notes: ["Your duty to report changes lasts from the orientation day until the end of your service."],
    missing: [
      "Which of the two is right. Ask the Kreiskommando: kreiskommando@sg.ch, +41 58 229 71 71",
    ],
    sources: [
      {
        id: "CH-S4",
        quote: "Eine gesonderte Meldung an das Kreiskommando ist nicht notwendig.",
        lang: "de",
        translation: "A separate report to the Kreiskommando is not necessary.",
      },
      {
        id: "CH-S7",
        quote: "sondern parallel beim örtlichen Sektionschef anmelden.",
        lang: "de",
        translation: "but also register with the local Sektionschef at the same time.",
      },
      {
        id: "CH-S7",
        quote: "Bei Unterlassung droht eine Disziplinarstrafe.",
        lang: "de",
        translation: "If you fail to do so, you risk a disciplinary penalty.",
      },
    ],
  },
  {
    id: "inform-others",
    phase: "arrival",
    chRows: ["A17"],
    when: everyone,
    title: "Tell others your new address",
    summary: "After you move, other organisations need your new address too.",
    todo: [
      "Tell these organisations: eUmzugCH, the city utilities (St.Galler Stadtwerke, SGSW), the driving licence office, and Swiss Post.",
    ],
    sources: [{ id: "S1", quote: "Whenever you change your address, you must inform various other organisations:" }],
  },
  {
    id: "ch-postpone",
    phase: "studies",
    chRows: ["C12", "C13", "C14"],
    when: (p) => isSwiss(p) && liableForService(p),
    title: "Ask to postpone a service that clashes with your studies",
    summary: "Send a postponement request at least 14 weeks before the service starts.",
    deadline: "14 weeks before the service starts",
    office: "Dienstmanager (armee.ch/dim); HSG Militärische Verbindungsstelle (MilVrb)",
    todo: [
      "Submit the request in the Dienstmanager (armee.ch/dim), and choose the University of St.Gallen as your place of education.",
      "If that doesn't work: sign the paper form by hand (no digital or scanned signature) and send it as a PDF from your student e-mail address to the MilVrb.",
      "Until the written decision arrives, you still have to report for duty.",
    ],
    documents: ["Proof of your reasons", "At least one alternative date"],
    sources: [
      {
        id: "CH-S8",
        quote: "Die Gesuche für Dienstverschiebungen müssen 14 Wochen vor Dienstbeginn eingereicht werden",
        lang: "de",
        translation: "Requests to postpone a service must be submitted 14 weeks before it starts",
      },
      {
        id: "CH-S8",
        quote: "Es ist wichtig, dass die Universität St.Gallen als Bildungsstätte angewählt wird",
        lang: "de",
        translation: "It is important that you choose the University of St.Gallen as your place of education",
      },
      {
        id: "CH-S8",
        quote: "Dokument eigenhändig unterschreiben (keine digitale, keine eingescannte Unterschrift)",
        lang: "de",
        translation: "Sign the document by hand (no digital or scanned signature)",
      },
      {
        id: "CH-S8",
        quote: "Solange er nicht eingetroffen ist, bleibt Ihre Pflicht einzurücken bestehen!",
        lang: "de",
        translation: "Until it has arrived, you still have to report for duty!",
      },
    ],
  },
  {
    id: "ch-exemption-tax",
    phase: "studies",
    chRows: ["C17", "C18", "C19", "C20", "C21"],
    when: (p) => isSwiss(p) && liableForService(p),
    title: "Pay the exemption tax in years without service",
    summary:
      "In a year when you do neither military nor civil service, you pay an exemption tax: 3% of your taxable income, at least CHF 400.",
    deadline: "Each year without service",
    office: "Wehrpflichtersatz, Amt für Militär und Zivilschutz of your canton",
    todo: [
      "The canton where you are registered on 31 December of that year charges the tax.",
      "Struggling to pay? Ask early: by phone for instalments, or in writing with proof for a longer deferral or remission.",
    ],
    notes: [
      "Civil protection service reduces the tax by 4% per day of service.",
      "If you later complete all your service days, you can claim the tax back, at the latest 5 years after your discharge.",
    ],
    missing: [
      "How students with little or no income are assessed, beyond the CHF 400 minimum",
      "When the invoice arrives",
    ],
    sources: [
      {
        id: "CH-S6",
        quote: "Wer weder Militär- noch Zivildienst leistet, muss eine Ersatzabgabe bezahlen.",
        lang: "de",
        translation: "If you do neither military nor civil service, you must pay an exemption tax.",
      },
      {
        id: "CH-S6",
        quote: "Mindestens beträgt die Abgabe aber 400 Franken.",
        lang: "de",
        translation: "The tax is at least 400 francs.",
      },
      {
        id: "CH-S5",
        quote: "Für die Zuständigkeit massgebend ist der Meldeort am 31. Dezember des Ersatzjahres.",
        lang: "de",
        translation: "The responsible canton is where you are registered on 31 December of the tax year.",
      },
      {
        id: "CH-S5",
        quote:
          "Gesuche um längerfristigen Zahlungsaufschub oder gar Erlass sind schriftlich mit entsprechenden Belegen einzureichen.",
        lang: "de",
        translation: "Requests for a longer deferral, or for remission, must be made in writing with supporting documents.",
      },
      {
        id: "CH-S6",
        quote: "Wer Zivilschutz leistet, erhält eine Ermässigung von 4% pro Diensttag.",
        lang: "de",
        translation: "If you serve in civil protection, you get a reduction of 4% per day of service.",
      },
    ],
  },
  {
    id: "ch-moving-out",
    phase: "leaving",
    chRows: ["A1", "A15"],
    when: isSwiss,
    title: "Report when you move out",
    summary: "Moving out of St.Gallen, or to another address in the city? Report it within 14 days.",
    deadline: "Within 14 days",
    office: "Bevölkerungsdienste (Residents' Office)",
    todo: [
      { when: mainResidence, text: "Report the move online through eUmzugCH, or in person at the counter with an official ID." },
      { when: weeklyResident, text: "E-mail bd@stadt.sg.ch with your personal details and the exact date of your move." },
      { when: weeklyResident, text: "Moving within the city? Attach your new rental contract as a PDF." },
    ],
    sources: [
      {
        id: "CH-S1",
        quote: "Ein Umzug, Zuzug oder Wegzug ist innerhalb von 14 Tagen meldepflichtig.",
        lang: "de",
        translation: "You must report a move within, into or out of the city within 14 days.",
      },
      {
        id: "CH-S1",
        quote: "Senden Sie uns bitte eine E-Mail an <bd@stadt.sg.ch> und teilen uns darin bitte folgendes mit:",
        lang: "de",
        translation: "Please send us an e-mail at bd@stadt.sg.ch and tell us the following:",
      },
    ],
  },
  {
    id: "ch-keep-informed",
    phase: "ifneeded",
    optional: true,
    chRows: ["C5", "C7", "C8"],
    when: (p) => isSwiss(p) && liableForService(p),
    title: "If you change profession or stay away for long",
    summary: "Some changes have to be reported for military service, even while you study.",
    office: "Kreiskommando St.Gallen",
    todo: [
      "Changed your profession? Report it to the Kreiskommando within 14 days.",
      "Away from where you live for more than 2 months, without moving? Make sure your military mail is forwarded, or that someone can file postponement requests for you.",
      "Abroad for more than 12 months in a row, for example on a long exchange? Apply to the Kreiskommando for leave abroad (Auslandurlaub) as early as possible.",
    ],
    sources: [
      { id: "CH-S4", where: "Table of reporting duties: Berufsänderung, “innerhalb von 14 Tagen”" },
      {
        id: "CH-S4",
        quote: "Wer den Wohnort ohne eigentlichen Wohnortswechsel für mehr als zwei Monate ändert…",
        lang: "de",
        translation: "If you change where you live for more than two months without actually moving…",
      },
      {
        id: "CH-S4",
        quote: "Das Gesuch ist so früh wie möglich einzureichen.",
        lang: "de",
        translation: "Submit the request as early as possible.",
      },
    ],
  },
];

const LIST_FIELDS = ["todo", "documents", "fees", "notes", "missing"];

// Keeps the list items that apply to this profile and turns them into plain strings.
function pick(items = [], profile) {
  return items.filter((item) => typeof item === "string" || item.when(profile)).map((item) => item.text ?? item);
}

// The steps that apply to a profile, in checklist order, with their lists filtered for it.
export function stepsFor(profile) {
  const order = PHASES.map((phase) => phase.id);
  return STEPS.filter((step) => step.when(profile))
    .sort((a, b) => order.indexOf(a.phase) - order.indexOf(b.phase))
    .map((step) => ({
      ...step,
      ...Object.fromEntries(LIST_FIELDS.map((field) => [field, pick(step[field], profile)])),
    }));
}
