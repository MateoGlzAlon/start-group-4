// The checklist. Every step comes from the rule documents in docs/:
// - `rows` are the rows of docs/context_1.md it covers, `chRows` the rows of docs/rulebook-swiss-students-stgallen.md,
//   `euRows` the rows of docs/rulebook-eu-efta-students-stgallen.md, and `ukSteps` the numbered steps of the UK guide
//   (docs/Studying at HSG as a UK citizen — Step-by-step admin guide.md). The tests check that all of them are covered;
// - `sources` cite the page the rule comes from, with the section (`where`) and/or the exact sentence (`quote`)
//   where the rulebook gives one, and an English translation of German quotes (`lang: "de"`);
// - `missing` records what the official sources do not say, for the team; the app does not show it.
//   Never fill these gaps from general knowledge.
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
  isUk,
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
const ukDegree = (p) => isUk(p) && isDegree(p);
// HSG rooms are for exchange students; degree students, Swiss students among them, rent privately (EU rulebook H2).
const rentsPrivately = (p) => isSwiss(p) || isDegree(p);
const RESIDENTS_OFFICE = "Residents' Office, Rathaus, Poststrasse 28, St.Gallen";
const REGISTRATION_FEE_EU =
  "CHF 25 for entering your registration, under the canton's fee ordinance of 2007 (amended 2011, so it may be out of date)";

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
    id: "apply-hsg",
    phase: "before",
    euRows: ["J1", "J2", "J3", "J4", "J5", "J10", "I3", "I12", "I14", "I16", "I17"],
    ukSteps: [1],
    when: isDegree,
    title: "Apply to HSG and get admitted",
    summary:
      "Apply online in the application window. Bachelor applicants with a foreign school certificate also take HSG's selection procedure.",
    deadline: "Bachelor: 1 October – 30 April. Master: 31 March or 30 April, depending on the programme",
    office: "HSG Admissions, admissions@unisg.ch, +41 71 224 39 31",
    todo: [
      "Apply online. For a Bachelor's starting in autumn, the window is 1 October to 30 April. Master's programmes close on 31 March (MBI, MiMM, MGM, MACFin, MEcon) or 30 April (MBF, SIM, MOK, MiQE/F, MIA, MIL, MLaw, MLE, MCS).",
      "Bachelor with a foreign school certificate? Then you can only be admitted through the HSG selection procedure: a 70-minute online aptitude test at home (quantitative problem-solving, with diagrams and tables) and a video interview of about 10 minutes.",
      "The 2027 dates are 16 February (interview 18 February) and 8 June (interview 10 June). You can choose only one. To take part in February, send your full application by 10 January and register by 31 January. Later applicants take part in June.",
    ],
    documents: ["For the selection test: a notebook or PC with camera and microphone. Phones and tablets are not allowed"],
    fees: ["CHF 268 application fee, not refundable"],
    notes: [
      "In the selection procedure only your results count, not your school grades. Places for foreign applicants are limited by law.",
      "You don't need a language certificate. HSG recommends at least level C1.",
      "Lectures run from September to December and from February to May. Central exams are in January–February and June–July.",
      {
        when: isEu,
        text: "Your school certificate must be essentially equivalent to the Swiss Matura. Check swissuniversities' country list for your certificate.",
      },
      {
        when: isEu,
        text: "From Liechtenstein, or holding a Liechtenstein Matura? Then you don't take the selection procedure. For a Master's with a Liechtenstein Bachelor you need a grade average of at least 5.00.",
      },
      { when: isUk, text: "Your official admission decision (Zulassungsverfügung) comes only to your Compass inbox, not by post." },
    ],
    missing: [
      {
        when: isEu,
        text: "Grade requirements for specific certificates (Abitur, Maturità, Bac, Matura): HSG only says it weighs subjects, hours and length of schooling",
      },
    ],
    sources: [
      { id: "EU-S38", where: "Bachelor's degree starting with the Assessment Year; Master's programmes" },
      { id: "EU-S37", quote: "can only be admitted through the HSG selection procedure" },
      { id: "EU-S37", quote: "Mobile devices such as smartphones or tablets are not permitted." },
      { id: "EU-S37", quote: "The number of places for foreign applicants at the University of St.Gallen is limited by law." },
      { id: "EU-S37", where: "List of applicants exempt from the selection procedure" },
      { id: "EU-S36", where: "Application and processing fee" },
      { id: "EU-S39", quote: "Only the best marks in the selection procedure count, not the marks from qualifications" },
      { id: "EU-S39", quote: "You do not have to submit evidence of linguistic proficiency with your application." },
      { id: "EU-S39", quote: "we recommend reaching at least C1 level" },
      { id: "EU-S39", quote: "we take the subjects, number of hours and length of schooling into account" },
      {
        id: "EU-S60",
        quote: "A foreign upper secondary school leaving certificate has to be essentially equivalent to the Swiss maturity certificate",
      },
      {
        id: "EU-S61",
        quote: "For admission to the Master's level, a Bachelor's degree with a grade average of at least 5.00 is required.",
      },
      { id: "EU-S40", where: "Semester dates" },
      { id: "S6", where: "Admission decision (Zulassungsverfügung) in the Compass inbox" },
    ],
  },
  {
    id: "budget",
    phase: "before",
    euRows: ["J6", "K1", "K2"],
    ukSteps: [8],
    when: isDegree,
    title: "Plan your budget",
    summary: "HSG puts the total cost of a degree at CHF 25,000 to 30,000 a year. Foreign students pay higher tuition fees.",
    fees: [
      "Tuition per semester for foreign students (autumn 2026): Bachelor CHF 3,343.50, Master CHF 3,557.50, PhD CHF 1,150.50, Joint Medical Master CHF 10,089.50",
    ],
    notes: [
      "HSG's monthly estimate for a Bachelor's student is about CHF 2,175: rent 795, food 440, transport 195, health 190, leisure 210, clothing 130, communication 45, and 170 for other costs.",
      { when: isUk, text: "HSG's “Living in St.Gallen” page gives a different figure: roughly CHF 2,200–2,600 a month for living costs." },
      { when: isUk, text: "Keep cash or a card ready for the registration fees when you arrive." },
      "Need help with funding? Contact HSG's Advice Center for Study Funding: studienfinanzierung@unisg.ch, +41 71 224 28 68.",
    ],
    missing: [
      {
        when: isUk,
        text: "Which monthly figure is right: HSG's costs page says about CHF 2,175, its “Living in St.Gallen” page CHF 2,200–2,600",
      },
    ],
    sources: [
      { id: "EU-S36", quote: "total costs of between CHF 25,000 and CHF 30,000 per year" },
      { id: "EU-S36", where: "Tuition fees and cost of living" },
      { id: "EU-S42", quote: "Advice Center for Study Funding" },
      { id: "S6", where: "Living costs" },
    ],
  },
  {
    id: "uk-passport",
    phase: "before",
    ukSteps: [2, 9],
    when: (p) => isUk(p) && fromAbroad(p),
    title: "Check your passport",
    summary:
      "With “British Citizen” as the nationality in your passport, you need no visa, even for stays of more than 90 days. Other British passports do.",
    deadline: "Before you travel",
    office: "Swiss embassy or consulate in your country of residence, only if you need a visa",
    todo: [
      "Look at the nationality field in your passport. If it says “British Citizen”, you need no visa.",
      {
        when: isDegree,
        text: "Any other British nationality (B.N.O., B.O.T.C., B.O.C., British Subject, British Protected Person)? Then apply in person for a national visa D at the Swiss representation in your country of residence.",
      },
      {
        when: isExchange,
        text: "Any other British nationality (B.N.O., B.O.T.C., B.O.C., British Subject, British Protected Person)? Then you need a visa for stays of more than 90 days.",
      },
      "Make sure your passport stays valid for at least 3 months beyond your planned stay. You need that to extend your permit.",
      "Enter Switzerland with this passport, and your visa D if you need one.",
    ],
    missing: [
      {
        when: isExchange,
        text: "How exchange students with a British passport other than “British Citizen” apply for the visa: the UK guide describes the route for degree students only",
      },
    ],
    sources: [
      { id: "UK-VISA", where: "List V2" },
      { id: "S7", where: "p. 4, “Aufenthaltsbewilligung verlängern”" },
    ],
  },
  {
    id: "eu-entry",
    phase: "before",
    euRows: ["A1", "A2", "I1", "I2", "I4", "I5", "I10"],
    when: (p) => isEu(p) && fromAbroad(p),
    title: "Travel with your passport or ID card",
    summary:
      "As an EU/EFTA citizen you need no visa and no permit before you arrive. You apply for your permit once you are here.",
    deadline: "When you enter Switzerland",
    todo: ["Bring your valid passport or national ID card."],
    notes: [
      "From Iceland, Liechtenstein or Norway? You have the same rights as EU citizens. Liechtenstein has its own arrangement with Switzerland: full free movement since 1 January 2005.",
      "From Croatia? Full free movement applies to you too. The Federal Council did not limit it for 2026, and the transition period ends on 31 December 2026.",
      "Living in a neighbouring country and going home every day? Then you need no residence or cross-border permit, unless you take a side job in Switzerland.",
    ],
    sources: [
      { id: "S4", quote: "Neither a visa nor a grant for a residence permit is required prior to arrival in Switzerland." },
      { id: "S4", quote: "You may enter Switzerland with your passport or ID." },
      { id: "S6", quote: "EU and EFTA nationals can also submit the application after entering Switzerland." },
      {
        id: "EU-S17",
        quote: "Bürgerinnen und Bürger aus EFTA-Staaten haben die gleichen Rechte wie Staatsangehörige der EU",
        lang: "de",
        translation: "Citizens of EFTA states have the same rights as EU nationals",
      },
      {
        id: "EU-S17",
        quote: "Das Fürstentum Liechtenstein profitiert von einer Sonderregelung",
        lang: "de",
        translation: "The Principality of Liechtenstein has a special arrangement",
      },
      { id: "EU-S46", where: "Ziff. 1.2.2 (Liechtenstein)" },
      {
        id: "EU-S15",
        quote: "Für Kroatien gilt nun die volle Personenfreizügigkeit.",
        lang: "de",
        translation: "Full free movement of persons now applies to Croatia.",
      },
      {
        id: "EU-S16",
        quote: "Da die Übergangsregelung am 31. Dezember 2026 endet",
        lang: "de",
        translation: "Since the transitional arrangement ends on 31 December 2026",
      },
      {
        id: "EU-S17",
        quote: "Dies gilt nicht, wenn diese Studierende einem Nebenerwerb in der Schweiz nachgehen",
        lang: "de",
        translation: "This does not apply if these students have a side job in Switzerland",
      },
    ],
  },
  {
    id: "permit-before-entry",
    phase: "before",
    rows: [1, 2],
    // UK degree students have their own step below, from the UK guide.
    when: (p) => isNonEu(p) && fromAbroad(p) && !ukDegree(p),
    title: "Get your residence permit before you enter Switzerland",
    summary:
      "You will stay longer than three months and you are not an EU/EFTA citizen, so your permit must be issued before you travel.",
    deadline: "Before you enter Switzerland",
    office: "Migrationsamt (cantonal migration office)",
    todo: [
      { when: isDegree, text: "Apply for the residence permit before you travel." },
      { when: isExchange, text: "How this works for exchange students depends on your nationality. See the next step." },
    ],
    missing: ["Which documents the permit application needs", "How long it takes, and the earliest date you can apply"],
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
    id: "permit-uk-degree",
    phase: "before",
    rows: [1, 2],
    ukSteps: [3, 4, 5],
    when: (p) => ukDegree(p) && fromAbroad(p),
    title: "Apply for your residence permit from the UK",
    summary:
      "Your permit must be granted before you move. Send the application to the Migrationsamt at least 2 months before your studies start, and wait for the decision in the UK.",
    deadline: "At least 2 months before your studies start: early July for the autumn semester",
    office: "Migrationsamt St.Gallen, +41 58 229 36 90, or online through the canton's eMigrationsamt counter",
    todo: [
      "Collect the documents below. If you need your enrolment confirmation early, ask HSG's Dean's Advisory Office.",
      "Send the application to the Migrationsamt from the UK. You can also submit it online at emigrationsamt.sg.ch.",
      "Wait in the UK for the assurance of a residence permit (Zusicherung der Aufenthaltsbewilligung). Applications from people already in Switzerland are not accepted, so don't move to St.Gallen before you have it.",
    ],
    documents: [
      "Form A1 (Gesuch Ausländerbewilligung), filled in",
      "Certificates of the school, university or vocational education you have completed",
      "HSG enrolment confirmation (Immatrikulationsbestätigung)",
      "Proof of funds: a confirmation from a bank or PostFinance in Switzerland showing at least CHF 2,000 per month, or a guarantee from a solvent person living in Switzerland, with their latest tax bill and debt-collection extract",
      "Copy of your valid passport",
      "German translations of every document that is not in German, English certificates included",
    ],
    notes: ["HSG's visa guidance names a different amount for the proof of funds: CHF 24,000. Ask the Migrationsamt which applies to you."],
    missing: [
      "The fees for the permit and for the assurance",
      "Whether UK degree students get a B or an L permit, and for how long",
      "How long the Migrationsamt takes to decide",
      "Which proof of funds applies: the canton asks for CHF 2,000 a month, HSG's visa guidance for CHF 24,000",
      "Whether English certificates are accepted without a translation",
    ],
    sources: [
      {
        id: "S7",
        where: "p. 2, “Personen aus anderen Ländern”",
        quote: "Die Bewilligung muss vor der Einreise in die Schweiz ausgestellt worden sein.",
        lang: "de",
        translation: "The permit must have been issued before you enter Switzerland.",
      },
      { id: "UK-MERKBLATT", where: "§3 (documents) and §4 (application from abroad, 2 months before studies start)" },
      { id: "S2", where: "Online counter (eMigrationsamt)" },
      { id: "UK-SEMESTER", where: "Autumn semester 2026" },
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
    id: "exchange-prepare",
    phase: "before",
    euRows: ["J7", "J8", "J9", "J10", "J11"],
    when: isExchange,
    title: "Prepare your semester at HSG",
    summary: "Check the date of the mandatory orientation day, and bid for your courses on Compass.",
    deadline: "Course bidding starts two weeks before lectures",
    office: "HSG Student Mobility, exchange@unisg.ch, +41 71 224 23 39",
    todo: [
      "Check the date of the mandatory orientation day before the semester. HSG publishes the schedule.",
      "Bid for your courses on Compass. Bidding starts two weeks before lectures. Take 16 to 40 ECTS credits (33 for THEMIS).",
      "Print your registration form (Form R). Digital copies are not accepted.",
    ],
    notes: [
      "HSG offers a free 7-day intensive German course before each semester. Book it through Mobility-Online.",
      "Lectures run from September to December and from February to May. Central exams are in January–February and June–July.",
    ],
    sources: [
      { id: "EU-S40", quote: "Bidding begins two weeks before the start of lectures." },
      { id: "EU-S40", quote: "a 7-day intensive German course at the University of St.Gallen free of charge" },
      { id: "EU-S40", where: "Orientation day schedule, semester dates and registration forms" },
    ],
  },
  {
    id: "housing-exchange",
    phase: "before",
    euRows: ["H1", "H8"],
    when: isExchange,
    title: "Apply for an HSG room, or search privately",
    summary:
      "HSG's Housing Office rents furnished rooms to exchange students for a fixed five months. You apply through Mobility-Online.",
    deadline: "Applications open on 18 May, 9:00 CET (autumn semester) or 1 October, 9:00 CET (spring semester)",
    office: "HSG Housing Office, housing@unisg.ch, +41 71 224 22 00. Counter: Tuesday and Thursday, 09:30–11:30",
    todo: [
      "Apply through Mobility-Online once applications open.",
      "Pay the rent by 15 September (autumn) or 28 February (spring). Credit cards are not accepted.",
    ],
    fees: [
      "CHF 250 application fee, not refundable",
      "Rent of CHF 700–1,050 a month, including utilities, Wi-Fi and the radio/TV fee. No deposit",
      "Liability insurance, about CHF 20 a semester",
    ],
    notes: [
      "The contract runs for a fixed five months (1 August – 31 December, or 1 February – 30 June). It cannot be changed or extended.",
    ],
    sources: [
      {
        id: "EU-S43",
        quote:
          "The application starts on 18 May at 9:00 CET for autumn semester / 01 October at 9:00 CET for spring semester.",
      },
      { id: "EU-S43", quote: "no rental deposit" },
      { id: "EU-S58", quote: "the monthly rent ranges from CHF 700 to CHF 1'050" },
      { id: "EU-S58", quote: "The fixed rental period is five months." },
      { id: "EU-S58", quote: "cannot be modified or extended" },
    ],
  },
  {
    id: "housing-private",
    phase: "before",
    euRows: ["H2", "H3", "H5", "H9"],
    ukSteps: [6],
    when: rentsPrivately,
    title: "Find a place to live",
    summary: "HSG's rooms are for exchange students only, so degree students search the private market.",
    todo: [
      "Search the listings HSG names: the SHSG marketplace, Flatfox, wgzimmer.ch and Sharing is Caring.",
      {
        when: isUk,
        text: "Have ready a copy of your permit and ID, your employment contract if you have one, and a credit or debt-collection report.",
      },
      { when: isUk, text: "Keep your rental agreement or accommodation confirmation: you need it to register." },
    ],
    fees: ["A deposit of up to three months' rent, blocked until the lease ends"],
    notes: [
      "Many flats in Switzerland are unfurnished, and HSG does not negotiate with private landlords.",
      "HSG's Housing Office does not help degree students. Its only offer to them is rooms freed up when exchange students cancel at short notice.",
      {
        when: isUk,
        text: "The deposit goes into a blocked account in your name. Some landlords also require liability and household insurance.",
      },
    ],
    sources: [
      { id: "S6", quote: "only offers furnished rooms to incoming guest students" },
      { id: "S6", quote: "you will regularly find flats and shared rooms advertised" },
      { id: "S6", quote: "a security deposit of up to three months' rent" },
      { id: "S6", quote: "remains blocked for both the landlord and the tenant until the tenancy is terminated" },
      { id: "EU-S43", quote: "many rental flats in Switzerland are not furnished" },
      { id: "EU-S58", quote: "We do not provide housing assistance for regular students" },
    ],
  },
  {
    id: "health-insurance",
    phase: "before",
    rows: [20],
    chRows: ["I11"],
    euRows: ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "I7", "I8", "I9", "K14", "L7", "M10", "M11", "M12"],
    ukSteps: [7, 12],
    when: isForeign,
    title: "Arrange health insurance from your arrival date",
    summary:
      "Everyone who studies here for more than three months needs Swiss health insurance from the day they arrive, unless they are exempted.",
    deadline: "Within 3 months of arrival. Cover starts on your arrival date",
    office: "City of St.Gallen, Kontrollstelle für Krankenversicherung (for an exemption), Rathaus, kvg@stadt.sg.ch",
    todo: [
      "Take out Swiss health insurance that starts on the day you arrive.",
      "Or apply to be exempted, if you have a European Health Insurance Card (EHIC) or private cover that is equivalent. Use the city's official exemption form: your insurer confirms your cover on it. Other proof is not accepted.",
      {
        when: isEu,
        text: "Using your EHIC? Before you leave, ask your home insurer whether it covers your whole stay. Some insurers limit cover for students older than 28 or 30.",
      },
      {
        when: isEu,
        text: "With an EHIC you still have to apply for the exemption: the card alone is not enough. Hand in the documents below at the Residents' Office, or e-mail them to kvg@stadt.sg.ch, within your first three months.",
      },
      {
        when: isUk,
        text: "Choose your route before you travel. With a UK GHIC or UK EHIC, apply for the exemption anyway. A Swiss student package (for example Swisscare or Scorestudies) also needs the exemption form, with the insurer's confirmation on page 2. Or take out standard Swiss basic insurance (KVG).",
      },
      {
        when: isUk,
        text: "For an exemption, hand in the documents below at the Residents' Office, or e-mail them to kvg@stadt.sg.ch, within 3 months of arrival.",
      },
      "Keep your insurance card or policy at hand. You need it when you register.",
    ],
    documents: [
      "For an exemption: the official exemption form, fully signed, with its attachments",
      {
        when: (p) => isEu(p) || isUk(p),
        text: "With an EHIC or GHIC: a copy of the card and your HSG enrolment confirmation",
      },
    ],
    notes: [
      {
        when: isEu,
        text: "If you don't work, you can be exempted when you are only here temporarily and your main residence stays in an EU/EFTA country, or when you are insured through your family under an EU/EFTA statutory insurance.",
      },
      {
        when: (p) => isEu(p) && plansToWork(p),
        text: "A job ends the EHIC exemption. Working students from Germany, France, Italy or Austria can still be exempted with an L permit, or with a B permit if their main residence stays in that country. They apply in writing with a current registration certificate (Meldebescheinigung) from their home town and the insurer's confirmation (Bescheinigung KVG, in German, French or Italian only), and the exemption is reviewed every year. Working students from all other EU/EFTA countries must take Swiss insurance.",
      },
      {
        when: isUk,
        text: "Travel insurance is not accepted. A GHIC/EHIC exemption only holds while you don't work in Switzerland. If you don't complete the exemption, you can be assigned a regular Swiss policy, which costs far more.",
      },
      "Insuring yourself late can leave a gap in your cover, and the insurer may charge a surcharge. If you don't insure yourself, the control office assigns you to an insurer.",
      "Not working, or working less than 8 hours a week? Arrange your own accident cover, for example as an add-on with your health insurer. From 8 hours a week, your employer covers you.",
      "Taking Swiss insurance? Compare premiums at priminfo.admin.ch: there are over 50 insurers. A higher deductible (franchise) or a family-doctor model lowers your premium. Basic insurance does not cover dental care.",
      "On a low income with Swiss insurance? Apply online to SVA St.Gallen for a premium reduction (IPV), between 1 January and 31 March each year. Newcomers from abroad can apply at any time.",
    ],
    missing: [
      { when: (p) => !isEu(p) && !isUk(p), text: "The deadline for the exemption" },
      { when: isEu, text: "Whether you need separate accident cover with an EHIC" },
    ],
    sources: [
      { id: "S6", where: "“Krankenversicherung”, paragraphs 1–2" },
      {
        id: "CH-S3",
        quote: "Personen die sich in der Schweiz aufhalten, müssen sich innerhalb von drei Monaten versichern.",
        lang: "de",
        translation: "People staying in Switzerland must take out insurance within three months.",
      },
      {
        id: "CH-KV",
        quote: "Versicherungsbestätigungen in anderer Form werden nicht akzeptiert.",
        lang: "de",
        translation: "Confirmations of insurance in any other form are not accepted.",
      },
      {
        id: "CH-KV",
        quote: "nur vorübergehend in der Schweiz sind",
        lang: "de",
        translation: "are only in Switzerland temporarily",
      },
      {
        id: "CH-KV",
        quote: "gesetzlich familienversichert sind",
        lang: "de",
        translation: "are insured through their family under a statutory insurance",
      },
      { id: "EU-S12", quote: "must still apply for an exemption from the compulsory health insurance in Switzerland" },
      { id: "EU-S12", quote: "within your first three months" },
      { id: "EU-S12", quote: "guaranteed only if you are not gainfully employed in Switzerland." },
      {
        id: "EU-S57",
        quote:
          "some national health insurers will only cover the costs of your healthcare in another EU country for a limited time.",
      },
      {
        id: "EU-S19",
        quote: "Erwerbstätige Studierende oder Praktikanten aus Deutschland, Frankreich, Italien oder Österreich",
        lang: "de",
        translation: "Working students or interns from Germany, France, Italy or Austria",
      },
      {
        id: "EU-S19",
        quote:
          "Erwerbstätige Studierende oder Praktikanten aus allen anderen EU-/EFTA-Staaten sind in der Schweiz versicherungspflichtig.",
        lang: "de",
        translation: "Working students or interns from all other EU/EFTA states must be insured in Switzerland.",
      },
      {
        id: "EU-S5",
        quote: "aktuelle Wohnsitz-/Meldebescheinigung des ausländischen Wohnortes (zwingend)",
        lang: "de",
        translation: "a current certificate of residence or registration from your place of residence abroad (mandatory)",
      },
      { id: "EU-S5", quote: "wird jedes Jahr überprüft.", lang: "de", translation: "is reviewed every year." },
      {
        id: "EU-S54",
        quote: "Ein verspäteter Beitritt kann eine Versicherungslücke zur Folge haben.",
        lang: "de",
        translation: "Joining late can leave a gap in your cover.",
      },
      {
        id: "EU-S54",
        quote:
          "Die für die Kontrolle der Versicherungspflicht zuständige Stelle weist Sie einem schweizerischen Krankenversicherer zu.",
        lang: "de",
        translation: "The office that checks compulsory insurance assigns you to a Swiss health insurer.",
      },
      {
        id: "EU-S25",
        quote: "Ein Vergleich lohnt sich, denn es gibt über 50 Anbieter.",
        lang: "de",
        translation: "It pays to compare, because there are over 50 insurers.",
      },
      {
        id: "EU-S25",
        quote: "Die Franchise ist der Betrag, den Sie selbst bezahlen müssen.",
        lang: "de",
        translation: "The deductible (franchise) is the amount you pay yourself.",
      },
      {
        id: "EU-S25",
        quote: "Sie haben im Kanton St.Gallen immer ab 1. Januar bis und mit 31. März Zeit, sich für die IPV anzumelden.",
        lang: "de",
        translation: "In the canton of St.Gallen you can apply for the premium reduction (IPV) from 1 January to 31 March.",
      },
      { id: "EU-S25", where: "Accident cover, and supplementary insurance such as dental care" },
      { id: "UK-FOPH", where: "Assignment to a Swiss insurer if the exemption is not completed" },
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
    // The UK guide (step 18) applies the same rule (§2.3) to UK citizens, as non-EU/EFTA nationals.
    ukSteps: [18],
    when: (p) => fromSwitzerland(p) && isNonEu(p),
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
    chRows: ["A16", "I1", "I2"],
    euRows: ["B1", "B2", "B3", "B4", "B12", "B13"],
    ukSteps: [10],
    when: isDegree,
    title: "Register at the Residents' Office",
    summary: "Register in person within 14 days of arriving. Late registration can be fined up to CHF 200.",
    deadline: "Within 14 days of arrival",
    office: RESIDENTS_OFFICE,
    todo: [
      "Go to the counter with the documents below. You can also report the move online through eUmzugCH.",
      "Pay the registration fee, in cash or by card.",
      { when: plansToWork, text: "Planning to work? Register before you start the job." },
    ],
    documents: [
      "Rental agreement, or a confirmation from your accommodation provider",
      "Foreign ID card and travel documents",
      "Valid health-insurance card, or your current basic insurance policy",
      "Family booklet, if you are married with minor children",
      { when: isUk, text: "The assurance of a residence permit (Zusicherung der Aufenthaltsbewilligung)" },
    ],
    fees: [{ when: isEu, text: REGISTRATION_FEE_EU }],
    notes: [
      {
        when: fromSwitzerland,
        text: "Keeping your main residence elsewhere in Switzerland? Then register online as a weekly resident within 14 days of moving. You need your rental or sublease agreement or accommodation confirmation, your enrolment certificate, and a certificate of residence from your main commune (the original, sent by post).",
      },
      "Living outside the City of St.Gallen? Register with your municipality's population services (Bevölkerungsdienste) instead. Bring your ID, rental agreement and health-insurance card, and ask them what else you need.",
      {
        when: (p) => isEu(p) && fromAbroad(p),
        text: "Arriving from abroad? The city does not say whether you can register through eUmzugCH. It does say that foreign nationals pay the registration fees at the Residents' Office.",
      },
    ],
    missing: [
      { when: (p) => !isEu(p), text: "The amount of the registration fee" },
      {
        when: (p) => isEu(p) && fromAbroad(p),
        text: "Whether EU/EFTA citizens arriving from abroad can register through eUmzugCH: the city sends them to the Migrationsamt's fact sheets instead",
      },
    ],
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
      { id: "EU-S1", quote: "All foreign nationals must register at the Residents' Office within 14 days of their arrival in St.Gallen." },
      {
        id: "S1",
        quote: "All foreign nationals must pay registration fees at the Residents' Office, either in cash or by card",
      },
      {
        id: "EU-S52",
        quote: "Eintrag einer An-, Abmeldung oder Zivilstandsänderung",
        lang: "de",
        translation: "Entering an arrival, a departure or a change of civil status",
      },
      {
        id: "CH-S1",
        quote: "konsultieren Sie bitte die entsprechenden Merkblätter des Migrationsamts St.Gallen.",
        lang: "de",
        translation: "please consult the relevant fact sheets of the Migrationsamt St.Gallen.",
      },
    ],
  },
  {
    id: "permit-eu",
    phase: "arrival",
    rows: [3, 4, 5, 6],
    euRows: ["A2", "B8", "C1", "C2", "C3", "C4", "C5", "C10", "I6", "I15"],
    when: (p) => isEu(p) && isDegree(p) && fromAbroad(p),
    title: "Apply for your permit with Form A1",
    summary:
      "As an EU/EFTA citizen you can enter with your passport or ID card and apply once you are here. You need a permit because you stay longer than three months.",
    deadline: "After you arrive and have registered",
    office: "Residents' Office (Einwohnerkontrolle) of the place where you live, or online at migrationsamt.sg.ch",
    todo: [
      "Go to the Residents' Office in person and hand in Form A1 with the documents below. You can also apply online at migrationsamt.sg.ch.",
      "Have every document that is not in German translated.",
    ],
    documents: [
      "Form A1",
      "Copy of your passport or ID card",
      "HSG admission confirmation",
      "Proof of health and accident insurance",
      "No proof of funds: it is waived because HSG is a university in the canton of St.Gallen (otherwise CHF 2,000 a month)",
    ],
    fees: ["At most CHF 65 for the permit card: the federal maximum for issuing or renewing one (as of 10.2020)"],
    notes: [
      "You get a B permit, for the length of your studies or for one year. It is renewed until you finish, as long as you still meet the conditions.",
      "Staying for many years, for example for a PhD? Citizens of the EU-15 states and EFTA can get a settlement permit (C) after five years, citizens of the other EU states after ten. But stays for study generally do not count toward these years.",
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
      { id: "EU-S9", quote: "Students are granted a permit for the duration of their studies, or for one year" },
      { id: "EU-S9", quote: "until the completion of their studies, if they continue to fulfil the respective conditions." },
      {
        id: "EU-S47",
        quote:
          "beträgt die Höchstgebühr für die Ausstellung und Verlängerung eines Aufenthaltstitels (Kategorie L, B, Ci und G)",
        lang: "de",
        translation: "the maximum fee for issuing and renewing a residence document (categories L, B, Ci and G) is",
      },
      { id: "EU-S46", where: "Ziff. 1.4.1 and 1.4.2 (fees no higher than for a Swiss ID card, CHF 65)" },
      {
        id: "EU-S9",
        quote: "who have orderly resided in Switzerland for five continuous years are granted a settlement permit",
      },
      {
        id: "EU-S9",
        quote:
          "nationals of states other than those mentioned above are granted a settlement permit after a regular period of ten years.",
      },
      {
        id: "EU-S46",
        where: "Ziff. II 2.8.1",
        quote: "werden grundsätzlich nicht an die Niederlassungsfrist angerechnet, da diese Aufenthalte als vorübergehend gelten",
        lang: "de",
        translation: "generally do not count toward the period for a settlement permit, because these stays are considered temporary",
      },
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
    euRows: ["B1", "B5", "B6", "B7", "B8", "B12", "C6", "C8", "C10", "J11"],
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
    documents: ["Passport or ID card", "Form R, printed: digital copies are not accepted", "Copy of your rental agreement"],
    fees: ["CHF 71 for the L permit, according to HSG", REGISTRATION_FEE_EU],
    notes: [
      "You get an L permit (short stay), valid for your planned stay and at most 364 days.",
      "HSG's CHF 71 is more than the federal maximum of CHF 65 for a permit card (as of 10.2020). The sources don't explain the difference, so check the amount at the Residents' Office.",
    ],
    missing: ["Which permit fee is right: HSG says CHF 71, the federal maximum is CHF 65"],
    sources: [
      {
        id: "S4",
        where: "“After your arrival”",
        quote: "must register at the St.Gallen residents' office within 14 days after arrival",
      },
      LATE_FINE,
      { id: "S4", quote: "CHF 71.- for your residence permit (Ausländerausweis Typ L)." },
      { id: "S4", quote: "they will send you an appointment letter by postal mail" },
      { id: "EU-S1", quote: "All foreign nationals must register at the Residents' Office within 14 days of their arrival in St.Gallen." },
      {
        id: "EU-S47",
        quote:
          "beträgt die Höchstgebühr für die Ausstellung und Verlängerung eines Aufenthaltstitels (Kategorie L, B, Ci und G)",
        lang: "de",
        translation: "the maximum fee for issuing and renewing a residence document (categories L, B, Ci and G) is",
      },
      {
        id: "EU-S46",
        quote: "mit einer Gültigkeitsdauer von weniger als einem Jahr (höchstens 364 Tage)",
        lang: "de",
        translation: "valid for less than one year (at most 364 days)",
      },
      {
        id: "EU-S52",
        quote: "Eintrag einer An-, Abmeldung oder Zivilstandsänderung",
        lang: "de",
        translation: "Entering an arrival, a departure or a change of civil status",
      },
      { id: "EU-S40", where: "Registration forms must be printed" },
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
    notes: [
      {
        when: isUk,
        text: "You may pay CHF 25 twice. Summaries of HSG's guide differ: one has the CHF 25 once, at the biometrics appointment; another has CHF 25 at the Residents' Office plus CHF 25 for the biometrics. Ask HSG Student Mobility.",
      },
      { when: isUk, text: "Your permit card should arrive about 10 days after the biometrics appointment." },
    ],
    missing: [
      "Whether CHF 123 is right: the same HSG guide lists CHF 122 for other nationalities",
      {
        when: isUk,
        text: "Whether UK exchange students pay CHF 25 once (docs/context_1.md, row 14) or twice (UK guide: at the Residents' Office and for the biometrics)",
      },
    ],
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
    euRows: ["B7", "B10", "B11"],
    ukSteps: [11],
    // Non-EU/EFTA exchange students give their biometrics in the registration step above.
    when: (p) => isDegree(p) || isEu(p),
    title: "Go to your ID appointment",
    summary:
      "Once your permit is approved, you get a written invitation. There your photo and signature are taken, and your fingerprints if required.",
    deadline: "The date in your invitation",
    office: "Ausweisstelle St.Gallen (ID office), Oberer Graben 32",
    todo: [
      "Wait for the written invitation. Come only once you have it.",
      "If the date does not suit you, change it online.",
    ],
    documents: ["Your invitation letter", "Valid passport or ID card"],
    fees: [
      {
        when: isEu,
        text: "CHF 20 for taking your photo and signature (canton FAQ of 2021, may be out of date). The Residents' Office charges for the card itself",
      },
    ],
    notes: [
      { when: isEu, text: "Your card has no chip, and no fingerprints are taken: only your photo and signature." },
      { when: isEu, text: "The card is usually sent to your home by registered mail." },
      { when: isUk, text: "The permit card then comes by post to your St.Gallen address." },
    ],
    missing: [{ when: isEu, text: "How long it takes until the card arrives" }],
    sources: [
      { id: "S2", where: "“Ausländerausweis”" },
      { id: "S7", where: "p. 3" },
      {
        id: "S7",
        quote:
          "Bringen sie den Einladungsbrief und ein gültiges heimatliches Reisedokument (Pass oder Identitätskarte) zum Termin mit.",
        lang: "de",
        translation: "Bring the invitation letter and a valid travel document from your home country (passport or ID card) to the appointment.",
      },
      { id: "S4", quote: "a picture for your residence permit will be taken" },
      { id: "EU-S48", quote: "nicht biometrischer Ausweis", lang: "de", translation: "non-biometric card" },
      { id: "EU-S48", quote: "CHF 20.00 pro Person", lang: "de", translation: "CHF 20.00 per person" },
      {
        id: "EU-S48",
        quote: "in der Regel direkt per Einschreiben nach Hause gesandt",
        lang: "de",
        translation: "usually sent directly to your home by registered mail",
      },
    ],
  },

  // --- While you study -----------------------------------------------------
  {
    id: "ahv",
    phase: "studies",
    rows: [21],
    euRows: ["K3", "K4", "K5", "K6", "K7"],
    ukSteps: [14],
    when: everyone,
    title: "Pay AHV contributions (old-age insurance)",
    summary:
      "Everyone with a civil-law domicile in Switzerland pays into the AHV. If you do not earn money, you pay from 1 January after your 20th birthday.",
    deadline: "From 1 January after you turn 20, every year",
    office: "The AHV compensation office (Ausgleichskasse) where your university is, or the university",
    fees: ["At least CHF 530 a year, plus up to 5% for administration costs"],
    notes: [
      "Already paid at least CHF 530 through a job? Then nothing more is due. If you paid less, you pay only the difference.",
      "Not working, and older than 25? From 1 January after your 25th birthday, your contribution depends on your circumstances instead of the minimum.",
      "Here only to study, without a civil-law domicile in Switzerland, as is typical for exchange students? Then you pay no AHV contributions.",
    ],
    missing: [
      "How to register and pay",
      { when: isEu, text: "How Swiss AHV contributions fit with social security in your home country" },
      { when: isUk, text: "Whether a UK student counts as having a civil-law domicile in Switzerland" },
    ],
    sources: [
      { id: "S6", where: "“Obligatorische Altersvorsorge (AHV)”" },
      {
        id: "EU-S20",
        quote: "in der Höhe von 530 Franken jährlich (Mindestbeitrag)",
        lang: "de",
        translation: "of 530 francs a year (minimum contribution)",
      },
      {
        id: "EU-S20",
        quote: "nur zum Zweck des Studiums in der Schweiz aufhalten und hier keinen zivilrechtlichen Wohnsitz haben",
        lang: "de",
        translation: "are in Switzerland only to study and have no civil-law domicile here",
      },
    ],
  },
  {
    id: "serafe",
    phase: "studies",
    euRows: ["H1", "K12", "K12b", "K13"],
    when: everyone,
    title: "Pay the radio and TV fee",
    summary: "Every private household pays CHF 335 a year to Serafe, the federal fee agency. The invoice comes automatically.",
    deadline: "Once a year, when the invoice comes",
    office: "Serafe",
    notes: [
      "In a shared flat, the adults in the household are jointly liable for the invoice.",
      "Living in a student residence? It counts as a collective household, and its operator pays the fee, not you.",
      { when: isExchange, text: "In an HSG room, the fee is already included in your rent." },
    ],
    sources: [
      {
        id: "EU-S27",
        quote: "Die Rechnung von 335 Franken wird jährlich ein Mal pro Haushalt erhoben.",
        lang: "de",
        translation: "The invoice of 335 francs is charged once a year per household.",
      },
      {
        id: "EU-S27",
        quote: "Alle Haushalte erhalten automatisch eine Rechnung.",
        lang: "de",
        translation: "Every household receives an invoice automatically.",
      },
      {
        id: "EU-S55",
        quote: "Privathaushalte zahlen seit dem 1. Januar 2021 335 Franken im Jahr.",
        lang: "de",
        translation: "Since 1 January 2021, private households pay 335 francs a year.",
      },
      {
        id: "EU-S35",
        quote: "Die Trägerschaft des Kollektivhaushaltes ist die Schuldnerin der Kollektivhaushaltabgabe.",
        lang: "de",
        translation: "The operator of the collective household owes the fee for it.",
      },
      { id: "EU-S43", where: "Rooms for exchange students: what the rent includes" },
    ],
  },
  {
    id: "work-eu",
    phase: "studies",
    rows: [22],
    euRows: ["E1", "E2", "E3", "K8", "K9", "K10", "K11", "K17"],
    // The 15 hours are for B permits. Exchange students get an L permit (EU rulebook E1, E4), see work-exchange-eu.
    when: (p) => plansToWork(p) && isEu(p) && isDegree(p),
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
    notes: [
      "Your employer deducts withholding tax (Quellensteuer) from your wage.",
      "Want to claim deductions? Apply to the cantonal tax office for a subsequent ordinary assessment (NOV) on form SG 51-1-13a, by 31 March of the following year. You cannot withdraw it.",
      "Received a tax return form? File it by the end of March. If you earn more than CHF 120,000 a year, a tax return is compulsory.",
      "Looking for a job? Use HSG's job portal, my.hsgcareer.ch.",
    ],
    missing: ["Deadlines for reporting your job or applying"],
    sources: [
      { id: "S3", where: "§5" },
      { id: "S6", where: "FAQ “Darf ich während meines Studiums arbeiten?”" },
      {
        id: "EU-S22",
        quote: "Arbeitnehmer ohne Niederlassungsbewilligung",
        lang: "de",
        translation: "employees without a settlement permit",
      },
      {
        id: "EU-S22",
        quote: "muss bis zum 31. März des Folgejahres eingereicht werden.",
        lang: "de",
        translation: "must be submitted by 31 March of the following year.",
      },
      { id: "EU-S33", where: "Withholding tax and tax return" },
      { id: "EU-S36", where: "Job portal" },
    ],
  },
  {
    id: "work-exchange-eu",
    phase: "studies",
    euRows: ["D4", "E4"],
    when: (p) => plansToWork(p) && isEu(p) && isExchange(p),
    title: "Check before you take a job",
    summary: "HSG says the L permit that exchange students get does not entitle you to work.",
    notes: ["A job would also end your EHIC exemption from Swiss health insurance."],
    missing: ["Whether EU/EFTA exchange students can get permission to work, and how"],
    sources: [
      { id: "EU-S14", quote: "A student visa (L-Permit) does not entitle you to work!" },
      { id: "EU-S12", quote: "guaranteed only if you are not gainfully employed in Switzerland." },
    ],
  },
  {
    id: "work-degree-non-eu",
    phase: "studies",
    rows: [23],
    euRows: ["K17"],
    ukSteps: [13],
    when: (p) => plansToWork(p) && isNonEu(p) && isDegree(p),
    title: "Apply for permission to work",
    summary: "With a B permit as a degree student, you can apply to work as much as EU/EFTA students may.",
    office: "Amt für Wirtschaft und Arbeit (cantonal office for economy and labour)",
    todo: [
      {
        when: isUk,
        text: "Apply before you start the job. A side job of at most 15 hours a week can be approved at the earliest 6 months after your studies start, if HSG confirms it will not prolong your studies. Work in your field of study can be approved earlier.",
      },
    ],
    notes: [
      { when: isUk, text: "A job ends a GHIC/EHIC exemption from Swiss health insurance." },
      "Looking for a job? Use HSG's job portal, my.hsgcareer.ch.",
    ],
    missing: [
      { when: (p) => !isUk(p), text: "Which documents to send, and the deadline" },
      { when: isUk, text: "Which documents to send" },
    ],
    sources: [
      { id: "S6", where: "FAQ “Darf ich während meines Studiums arbeiten?”, paragraph 2" },
      { id: "UK-MERKBLATT", where: "§5" },
      { id: "EU-S36", where: "Job portal" },
    ],
  },
  {
    id: "work-exchange-non-eu",
    phase: "studies",
    rows: [23],
    euRows: ["E4"],
    when: (p) => plansToWork(p) && isNonEu(p) && isExchange(p),
    title: "Check before you take a job",
    summary:
      "Your visa is not a work permit. Your employer would have to apply for one, and HSG says approval is “highly unlikely”.",
    office: "Amt für Wirtschaft und Arbeit (cantonal office for economy and labour)",
    sources: [
      { id: "S4", where: "§2" },
      { id: "EU-S14", quote: "A student visa (L-Permit) does not entitle you to work!" },
    ],
  },
  {
    id: "extend-permit",
    phase: "studies",
    rows: [25],
    euRows: ["C7", "C9"],
    ukSteps: [16],
    when: isForeign,
    title: "Extend your permit before it expires",
    summary: "If your studies last longer than your permit, apply to extend it in good time.",
    deadline: "At least 2 weeks before it expires",
    office: "Migrationsamt",
    documents: [
      "Your current permit",
      "Passport valid for at least 3 months beyond your stay",
      "The expiry notice, if you received one",
      { when: (p) => isEu(p) && isDegree(p), text: "HSG's confirmation of your application" },
    ],
    fees: [{ when: (p) => isEu(p) && isDegree(p), text: "Paid in advance. The amount is not in the sources" }],
    notes: [
      {
        when: (p) => isEu(p) && isDegree(p),
        text: "The sources differ on when and where to apply. The canton and the federal SEM say at the latest 2 weeks (14 days) before expiry. The city says about two months before, in person at the Residents' Office.",
      },
    ],
    missing: [
      {
        when: (p) => isEu(p) && isDegree(p),
        text: "When and where to apply: 2 weeks before expiry at the Migrationsamt (canton, SEM), or about two months before at the Residents' Office (city). The city's two months may be when the forms are sent",
      },
    ],
    sources: [
      {
        id: "S7",
        where: "p. 4, “Aufenthaltsbewilligung verlängern”",
        quote: "Das Gesuch um Verlängerung müssen Sie spätestens 2 Wochen vor dem Ablauf der Gültigkeit einreichen.",
        lang: "de",
        translation: "You must submit the request for an extension at the latest 2 weeks before it expires.",
      },
      { id: "EU-S9", quote: "Students must apply for an extension to their permit 14 days before it expires." },
      { id: "EU-S1", quote: "Employers/school management must confirm the application of their employees" },
      {
        id: "EU-S50",
        quote: "rund zwei Monate vor Bewilligungsablauf",
        lang: "de",
        translation: "about two months before the permit expires",
      },
    ],
  },

  // --- Before you leave ----------------------------------------------------
  {
    id: "moving-flat",
    phase: "leaving",
    rows: [8, 29],
    euRows: ["B9", "L17"],
    ukSteps: [15, 18],
    when: isForeign,
    title: "Report it when you move to a new flat",
    summary: "Every change of address, within St.Gallen or to another municipality, must be reported within 14 days.",
    deadline: "Within 14 days of moving",
    office: "Residents' Office (Einwohnerkontrolle) of the municipality you move to",
    todo: [
      "Report the move at the Residents' Office within 14 days.",
      {
        when: isEu,
        text: "Show your permit card (Ausländerausweis) when you register at your new address. Moving to another canton needs no new permit.",
      },
      {
        when: isUk,
        text: "Moving to another canton? Apply for the change of canton before you move. With an L permit you have no right to it.",
      },
    ],
    sources: [
      { id: "S1", where: "Introduction", quote: "change of place of residence within 14 days" },
      {
        id: "S2",
        quote: "Der Wechsel des Wohnsitzes muss innert 14 Tagen bei der Einwohnerkontrolle gemeldet werden.",
        lang: "de",
        translation: "A change of residence must be reported to the residents' office within 14 days.",
      },
      {
        id: "S2",
        quote: "Der Ausländerausweis ist bei der Anmeldung am neuen Wohnort vorzulegen.",
        lang: "de",
        translation: "Show your foreigner ID card when you register at your new place of residence.",
      },
      { id: "S8", where: "§2.1 (EU/EFTA) and §2.3 (other countries)" },
    ],
  },
  {
    id: "deregister-exchange",
    phase: "leaving",
    rows: [27],
    euRows: ["F1"],
    ukSteps: [20],
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
      { id: "S4", quote: "You can de-register at the St.Gallen Residents' Office up to one month before your actual departure." },
    ],
  },
  {
    id: "deregister-abroad",
    phase: "leaving",
    rows: [28],
    euRows: ["F2"],
    ukSteps: [20],
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
    sources: [
      { id: "S1", where: "“Moving abroad”" },
      { id: "S1", quote: "you can only deregister in person at the counter of the Resident's Office" },
    ],
  },

  // --- Only if you need it -------------------------------------------------
  {
    id: "lost-permit",
    phase: "ifneeded",
    optional: true,
    rows: [26],
    ukSteps: [17],
    when: isForeign,
    title: "If you lose your permit card",
    summary: "Report the loss to the police in person, then send their report to the Migrationsamt.",
    office: "Any Swiss police station; Migrationsamt",
    todo: [
      "Report the loss in person at any Swiss police station.",
      "Send the police loss report to the Migrationsamt.",
      { when: isUk, text: "Or hand the report in at the Migrationsamt's counter. Either way, ask for a duplicate card." },
    ],
    documents: ["The police loss report"],
    sources: [{ id: "S2", where: "“Ausländerausweis verloren oder gestohlen?”" }],
  },
  {
    id: "short-stay",
    phase: "ifneeded",
    optional: true,
    euRows: ["A3", "A4", "A5", "E5"],
    when: isExchange,
    title: "If you stay less than 90 days",
    summary: "This checklist is for stays of more than 90 days. For shorter stays, HSG says you enter as a tourist.",
    notes: [
      "You may not work on a tourist visa.",
      "HSG highly recommends that you have enough health insurance cover.",
      {
        when: isEu,
        text: "As an EU/EFTA citizen you need no permit for up to three months in a calendar year. If you don't work, the federal directives say you need neither a permit nor to register for up to three months within six months. The city's page, however, says all foreign nationals register within 14 days, with no exception for short stays.",
      },
    ],
    missing: [{ when: isEu, text: "Whether EU/EFTA citizens on a short stay must register with the city (federal directives: no; city: all foreign nationals)" }],
    sources: [
      { id: "EU-S13", quote: "If you remain in Switzerland for less than 90 days, you may enter the country as a tourist." },
      { id: "EU-S13", quote: "You are not allowed to work with a tourist visa." },
      { id: "EU-S13", quote: "we highly recommend that you have sufficient health insurance coverage" },
      {
        id: "S2",
        where: "Introduction",
        quote: "Eine Bewilligungspflicht besteht, sofern der Aufenthalt länger als drei Monate im Kalenderjahr dauert.",
        lang: "de",
        translation: "You need a permit if your stay lasts longer than three months in a calendar year.",
      },
      {
        id: "EU-S46",
        where: "Ziff. II 2.2.1",
        quote: "weder bewilligungs- noch meldepflichtig (Art. 9 VZAE)",
        lang: "de",
        translation: "need neither a permit nor to register (Art. 9 VZAE)",
      },
      { id: "EU-S1", quote: "All foreign nationals must register at the Residents' Office within 14 days of their arrival in St.Gallen." },
    ],
  },
  {
    id: "renting",
    phase: "ifneeded",
    optional: true,
    euRows: ["H4", "L1", "L2", "L3", "L4", "L5", "L6"],
    when: everyone,
    title: "If you rent a flat",
    summary: "The basic rules for tenants in Switzerland, and where to get help.",
    notes: [
      "A rental contract is usually written, but an oral one is valid too. The house rules are part of it.",
      "You only pay a deposit if the contract says so. It is at most three months' rent and goes into a deposit account.",
      "You may sublet only with your landlord's consent.",
      "Landlords may ask for an extract from the debt-collection register (Betreibungsauszug). Get it on EasyGov or e-service.sg.ch, at the debt-collection office or at the post office.",
      "Household contents and liability insurance are not compulsory, but strongly recommended. Landlords often require liability insurance.",
      "Unsure about a rental agreement? The city's housing office gives free legal advice, in German only.",
      "In a dispute with your landlord, the conciliation office for tenancy (Schlichtungsstelle für Miet- und Pachtverhältnisse) mediates for free.",
    ],
    sources: [
      {
        id: "EU-S31",
        quote: "Der Mietvertrag wird normalerweise schriftlich abgeschlossen. Er ist aber auch mündlich gültig.",
        lang: "de",
        translation: "A rental contract is normally made in writing. But an oral one is valid too.",
      },
      {
        id: "EU-S31",
        quote: "Ein Mietzinsdepot muss nur geleistet werden, wenn dies ausdrücklich im Mietvertrag vereinbart ist.",
        lang: "de",
        translation: "You only have to pay a rent deposit if the rental contract expressly says so.",
      },
      {
        id: "EU-S31",
        quote: "Wohnungen dürfen mit der Zustimmung des Vermieters untervermietet werden.",
        lang: "de",
        translation: "Flats may be sublet with the landlord's consent.",
      },
      {
        id: "EU-S31",
        quote: "Dieser gilt als Beweis dafür, dass Sie Ihre Rechnungen bezahlen und keine Schulden haben.",
        lang: "de",
        translation: "It serves as proof that you pay your bills and have no debts.",
      },
      {
        id: "EU-S31",
        quote: "Diese Versicherungen sind nicht obligatorisch.",
        lang: "de",
        translation: "These insurances are not compulsory.",
      },
      {
        id: "EU-S31",
        quote: "Es ist sehr zu empfehlen, diese beiden Versicherungen abzuschliessen.",
        lang: "de",
        translation: "It is highly recommended to take out both of these insurances.",
      },
      { id: "EU-S31", where: "Link to the Schlichtungsstelle für Miet- und Pachtverhältnisse" },
      { id: "S6", quote: "If you encounter any legal uncertainties when concluding a rental agreement" },
    ],
  },
  {
    id: "bank-account",
    phase: "ifneeded",
    optional: true,
    euRows: ["K15", "K16"],
    when: isForeign,
    title: "If you open a bank account",
    summary: "Each bank decides which residence permits it accepts, so ask first.",
    documents: [
      "Passport or ID card",
      "Your permit card (Ausländerausweis), at PostFinance",
      "At other banks: a residence confirmation, and possibly your employment contract",
    ],
    sources: [
      {
        id: "EU-S26",
        quote: "Die Banken können selbst bestimmen, welche Art von Aufenthaltsbewilligung sie akzeptieren.",
        lang: "de",
        translation: "Banks can decide for themselves which kinds of residence permit they accept.",
      },
      {
        id: "EU-S26",
        quote: "Bringen Sie für die Kontoeröffnung Ihren Pass (oder eine Identitätskarte) und den Ausländerausweis mit.",
        lang: "de",
        translation: "To open an account, bring your passport (or an ID card) and your foreigner ID card.",
      },
      { id: "EU-S24", where: "Newcomer checklist: bank account" },
    ],
  },
  {
    id: "daily-life",
    phase: "ifneeded",
    optional: true,
    euRows: ["L9", "L10", "L11", "L12", "L13", "L14", "L15", "L16"],
    when: isForeign,
    title: "Everyday rules in St.Gallen",
    summary: "Rubbish, quiet hours, public transport and internet: what newcomers need to know.",
    notes: [
      "Household rubbish goes only into the official fee-paid bags, sold in shops and supermarkets. Put them out by 07:00 on collection day.",
      "Bundle paper and cardboard separately. Take PET bottles and batteries back to the shops, and glass and aluminium to the collection points. Public bins are not for household rubbish.",
      "Quiet hours start at 22:00, and Sunday is a day of rest.",
      "Appointments are binding, and written documents matter a lot: keep yours.",
      "Public transport: buy tickets in the SBB Mobile app. Regional Ostwind tickets are priced by zones. The Halbtax halves fares and the GA gives unlimited travel. Carry your SwissPass.",
      "Internet: choose any provider. You don't need your landlord's permission.",
    ],
    missing: ["Student discounts on public transport", "Mobile phone contracts: prepaid or subscription, and which ID you need"],
    sources: [
      {
        id: "EU-S28",
        quote: "Der Kehricht (Hausabfall) gehört in gebührenpflichtige Abfallsäcke.",
        lang: "de",
        translation: "Household rubbish belongs in fee-paid rubbish bags.",
      },
      { id: "EU-S28", quote: "bis spätestens 07:00 Uhr", lang: "de", translation: "by 07:00 at the latest" },
      {
        id: "EU-S28",
        quote: "Öffentliche Abfalleimer sind nicht für privaten Haushaltabfall vorgesehen.",
        lang: "de",
        translation: "Public bins are not meant for private household rubbish.",
      },
      {
        id: "EU-S32",
        quote: "Ab 22.00 Uhr gilt die Nachtruhe und der Sonntag gilt allgemein als Ruhetag.",
        lang: "de",
        translation: "Quiet hours start at 22:00, and Sunday is generally a day of rest.",
      },
      {
        id: "EU-S32",
        quote: "Verabredungen und Termine sind verbindlich.",
        lang: "de",
        translation: "Arrangements and appointments are binding.",
      },
      {
        id: "EU-S32",
        quote: "Schriftliches hat in der Schweiz eine grosse Bedeutung.",
        lang: "de",
        translation: "Written documents are very important in Switzerland.",
      },
      {
        id: "EU-S29",
        quote: "Sie kaufen nicht ein Ticket für eine Strecke, sondern bezahlen die Anzahl der Zonen.",
        lang: "de",
        translation: "You don't buy a ticket for a route; you pay for the number of zones.",
      },
      {
        id: "EU-S27",
        quote: "Sie brauchen dafür nicht die Vermieterin oder den Vermieter zu fragen.",
        lang: "de",
        translation: "You don't need to ask your landlord for this.",
      },
    ],
  },
  {
    id: "driving",
    phase: "ifneeded",
    optional: true,
    euRows: ["I13", "L8", "L18"],
    when: isForeign,
    title: "If you drive",
    summary: "You can drive on your foreign licence for 12 months after you enter Switzerland. Then exchange it for a Swiss one.",
    deadline: "Within 12 months of entering Switzerland",
    office: "Strassenverkehrs- und Schifffahrtsamt (road traffic office), 058 229 22 22, info.stva@sg.ch",
    todo: [
      "Exchange your licence in person, or by post if you have a confirmation from the Residents' Office.",
      "Bringing a car? Register it within 12 months of entering Switzerland, with the documents below. Motor liability insurance is compulsory.",
    ],
    documents: [
      "For the licence: the application form, your original licence, a copy of your permit card, a colour photo (35 × 45 mm), an eye test, and a translation if your licence uses special characters",
      "For a car: proof of liability insurance, its foreign registration, proof of customs clearance, the inspection report, your ID or permit, and proof of residence",
    ],
    fees: ["CHF 80–100 to exchange your licence"],
    notes: [
      { when: isEu, text: "EU/EFTA licences are exchanged without a control drive." },
      { when: isNonEu, text: "Licences from countries that are not on the canton's list need a control drive." },
    ],
    missing: [{ when: isNonEu, text: "Which countries are on the canton's list" }],
    sources: [
      {
        id: "EU-S23",
        quote: "Während 12 Monaten ab Einreisedatum",
        lang: "de",
        translation: "For 12 months from the date of entry",
      },
      {
        id: "EU-S23",
        quote: "muss in einen schweizerischen Führerausweis umgetauscht werden",
        lang: "de",
        translation: "must be exchanged for a Swiss driving licence",
      },
      {
        id: "EU-S62",
        quote: "Bei Führerausweisen aus allen nicht aufgeführten Länder muss eine Kontrollfahrt absolviert werden.",
        lang: "de",
        translation: "Licences from all countries that are not listed require a control drive.",
      },
      {
        id: "EU-S63",
        quote: "Sie müssen das ausländische Fahrzeug innerhalb von 12 Monaten nach der Einreise registrieren.",
        lang: "de",
        translation: "You must register the foreign vehicle within 12 months of entering Switzerland.",
      },
    ],
  },
  {
    id: "help-contacts",
    phase: "ifneeded",
    optional: true,
    euRows: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M10", "M13"],
    when: everyone,
    title: "If you need help",
    summary: "Emergency numbers, doctors, and people to talk to.",
    notes: [
      "Emergencies: police 117, ambulance 144, fire 118, Rega air rescue 1414, poisoning 145, victim support 142.",
      "Your doctor's practice is closed? In the City of St.Gallen, call the doctor on call: 0900 144 144 (CHF 2.80 a minute).",
      "Looking for a doctor? Search doctorfmh.ch.",
      "Need to talk? Die Dargebotene Hand: 143. Pro Mente Sana: 0848 800 858. In an acute crisis: Krisenintervention St.Gallen, day and night, 058 178 54 44.",
      "HSG's Psychological Counselling Services are confidential: beratung@unisg.ch, +41 71 224 26 39.",
      "HSG also offers pastoral care (Catholic and Protestant), and a Diversity, Equality & Inclusion office that also supports students with special needs: diversity@unisg.ch, +41 71 224 27 84.",
      "A complaint about your treatment? Contact the Patientenstelle Ostschweiz.",
    ],
    sources: [
      {
        id: "EU-S30",
        quote: "Polizeinotruf für Soforthilfe vor Ort: 117",
        lang: "de",
        translation: "Police emergency number for help on the spot: 117",
      },
      { id: "EU-S30", quote: "Medizinische Notfälle: 144", lang: "de", translation: "Medical emergencies: 144" },
      {
        id: "EU-S30",
        quote: "Stadt St.Gallen, Wittenbach, Engelburg, Abtwil: 0900 144 144",
        lang: "de",
        translation: "City of St.Gallen, Wittenbach, Engelburg, Abtwil: 0900 144 144",
      },
      {
        id: "EU-S30",
        quote: "Sorgentelefon / Dargebotene Hand: 143",
        lang: "de",
        translation: "Helpline / Dargebotene Hand: 143",
      },
      { id: "EU-S34", where: "Krisenintervention St.Gallen and Pro Mente Sana" },
      { id: "EU-S42", where: "Psychological Counselling Services, Pastoral Care, Diversity, Equality & Inclusion" },
      { id: "EU-S25", where: "Links to doctorfmh.ch and the Patientenstelle Ostschweiz" },
    ],
  },
  {
    id: "student-life",
    phase: "ifneeded",
    optional: true,
    euRows: ["H6", "H7", "H10", "M9"],
    when: everyone,
    title: "Join student life",
    summary: "More than 130 student clubs, a Student Union that represents every student, and Unisport.",
    notes: [
      "Find clubs for careers, sports, culture, music, charity, and social and environmental causes in the Student Union's (SHSG) club list.",
      "The Student Union (SHSG) represents all HSG students.",
      "Unisport's halls need a valid, validated student ID (Legi). Unisport, Bodanstrasse 1, unisport@unisg.ch, +41 71 224 22 50.",
    ],
    missing: ["How to join the Student Union, and whether it costs a fee", "Unisport fees"],
    sources: [
      { id: "EU-S44", quote: "more than 130 student clubs and initiatives" },
      { id: "EU-SHSG", quote: "officially represents all students of the University of St.Gallen" },
      {
        id: "EU-S59",
        quote: "Nur mit gültiger Legi (validiert; Uni, OST, PHSG) oder ASV Ausweis!",
        lang: "de",
        translation: "Only with a valid student ID (validated; Uni, OST, PHSG) or an ASV card!",
      },
    ],
  },
  {
    id: "job-search-uk",
    phase: "ifneeded",
    optional: true,
    ukSteps: [19],
    when: ukDegree,
    title: "If you want to stay and look for a job",
    summary: "After graduating from a Swiss university, you can be admitted for 6 months to look for a qualified job.",
    notes: ["You need enough money and suitable housing for those 6 months.", "This permit cannot be extended."],
    sources: [{ id: "UK-MERKBLATT", where: "§6" }],
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
    euRows: ["K14", "L7", "M10", "M11", "M12"],
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
      "On a low income? You may be entitled to a premium reduction (Prämienverbilligung, IPV). Apply online to SVA St.Gallen between 1 January and 31 March each year.",
      "Not working, or working less than 8 hours a week? Make sure you have accident cover, for example as an add-on with your health insurer. From 8 hours a week, your employer covers you.",
      "Compare premiums at priminfo.admin.ch: there are over 50 insurers. A higher deductible (franchise) or a family-doctor model lowers your premium. Basic insurance does not cover dental care.",
    ],
    missing: ["Whether you have to change anything with your insurer when you move, for example your premium region"],
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
      {
        id: "EU-S25",
        quote: "Sie haben im Kanton St.Gallen immer ab 1. Januar bis und mit 31. März Zeit, sich für die IPV anzumelden.",
        lang: "de",
        translation: "In the canton of St.Gallen you can apply for the premium reduction (IPV) from 1 January to 31 March.",
      },
      {
        id: "EU-S25",
        quote: "Ein Vergleich lohnt sich, denn es gibt über 50 Anbieter.",
        lang: "de",
        translation: "It pays to compare, because there are over 50 insurers.",
      },
      {
        id: "EU-S25",
        quote: "Die Franchise ist der Betrag, den Sie selbst bezahlen müssen.",
        lang: "de",
        translation: "The deductible (franchise) is the amount you pay yourself.",
      },
      { id: "EU-S25", where: "Accident cover, and supplementary insurance such as dental care" },
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
