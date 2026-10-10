// The official pages behind the checklist.
// - S1–S8 match the source key in docs/context_1.md (international students).
// - CH-S1, CH-S3 … CH-S9 are S1, S3 … S9 of docs/rulebook-swiss-students-stgallen.md. Its S2 is the same page
//   as S1 here, so steps cite S1. CH-KV is the city page its appendix cites for row I11.
// `url` is the page the rules were taken from; `urlEn` is its English version, where one exists.

// Date the two rulebooks were built from the official pages.
export const RULES_AS_OF = "09.10.2026";

export const SOURCES = {
  S1: {
    publisher: "City of St.Gallen",
    title: "Moving and registering",
    url: "https://www.stadt.sg.ch/home/welcome/residence-registration/moving-and-registering.html",
  },
  S2: {
    publisher: "Canton of St.Gallen",
    title: "Bewilligungen EU-/EFTA-Staaten (permits for EU/EFTA citizens)",
    url: "https://www.sg.ch/sicherheit/einreise-aufenthalt-ausreise/bewilligugnen-eu-efta.html",
  },
  S3: {
    publisher: "Canton of St.Gallen, Migrationsamt",
    title: "Merkblatt Schul- und Studienaufenthalt EU/EFTA (studying here as an EU/EFTA citizen)",
    date: "06/2022",
    url: "https://www.sg.ch/content/dam/sgch/sicherheit/migration/dokumente_einreise,-aufenhalt-und-ausreise/eu-efta/einreise-ohne-erwerb-eu-efta/sch%C3%BCler---studenten/Schul-%20und%20Studienaufenthalt%20EU%20EFTA.pdf",
  },
  S4: {
    publisher: "HSG Student Mobility",
    title: "Exchange students: visa and residence permit for stays of more than 90 days",
    date: "January 2026",
    url: "https://www.unisg.ch/en/studying/exchange-programme/incoming-guest-students/",
    notice:
      "The January 2026 PDF these rules come from is no longer online (checked 10.10.2026). The link opens HSG's page for incoming guest students, which now has a newer “Visa and Entry Fact Sheet” (August 2026). Check the details there.",
  },
  S5: {
    publisher: "HSG Student Mobility",
    title: "Form D (deregistration)",
    date: "January 2026",
    url: "https://www.unisg.ch/fileadmin/user_upload/HSG_ROOT/_Kernauftritt_HSG/Studium/Austauschprogramme/Incoming_Gaststudierende/Form_D_January_2026.pdf",
  },
  S6: {
    publisher: "HSG",
    title: "Wohnen in St.Gallen (living in St.Gallen)",
    url: "https://www.unisg.ch/de/studium/studieren-an-der-hsg/wohnen-in-stgallen/",
    urlEn: "https://www.unisg.ch/en/studying/studying-at-hsg/living-in-stgallen/",
  },
  S7: {
    publisher: "Canton of St.Gallen, hallo.sg.ch",
    title: "Aufenthaltsbewilligung (residence permit)",
    date: "26.08.2026",
    url: "https://www.hallo.sg.ch/de/zusammenleben/leben-in-st-gallen/aufenthaltsbewilligung/_jcr_content/pdfonthefly.ocFile/aufenthaltsbewilligung-de.pdf",
    urlEn: "https://www.hallo.sg.ch/en/zusammenleben/leben-in-st-gallen/aufenthaltsbewilligung.html",
  },
  S8: {
    publisher: "Canton of St.Gallen, Migrationsamt",
    title: "Merkblatt Kantonswechsel (moving here from another canton)",
    date: "06/2021",
    url: "https://www.sg.ch/content/dam/sgch/sicherheit/migration/dokumente_einreise,-aufenhalt-und-ausreise/kantonswechsel/Merkblatt%20Kantonswechsel.pdf",
  },

  "CH-S1": {
    publisher: "City of St.Gallen",
    title: "Umzug melden (reporting a move)",
    url: "https://www.stadt.sg.ch/home/verwaltung-politik/verwaltung-dienste/umzug-melden.html",
  },
  "CH-S3": {
    publisher: "City of St.Gallen",
    title: "Krankenversicherung (health insurance)",
    url: "https://www.stadt.sg.ch/home/gesellschaft-sicherheit/gesundheit-pflege/krankenversicherung.html",
  },
  "CH-S4": {
    publisher: "Canton of St.Gallen, Kreiskommando",
    title: "Pflichten für Militärdienstpflichtige (duties of people liable for military service)",
    url: "https://www.sg.ch/sicherheit/militaer-zivilschutz/militaer_kreiskommando/pflichten-fuer-militaerdienstpflichtige.html",
  },
  "CH-S5": {
    publisher: "Canton of St.Gallen",
    title: "Wehrpflichtersatz (military service exemption tax)",
    url: "https://www.sg.ch/sicherheit/militaer-zivilschutz/wehrpflichtersatz.html",
  },
  "CH-S6": {
    publisher: "Swiss Confederation, ch.ch",
    title: "Wehrpflichtersatzabgabe (military service exemption tax)",
    url: "https://www.ch.ch/de/wehrpflichtersatzabgabe/",
  },
  "CH-S7": {
    publisher: "HSG, Militärische Verbindungsstelle",
    title: "Wehrpflicht (military service)",
    url: "https://www.unisg.ch/de/studium/orientierung/beratung-und-support/militaerische-verbindungsstelle/wehrpflicht/",
  },
  "CH-S8": {
    publisher: "HSG, Militärische Verbindungsstelle",
    title: "Dienstverschiebung (postponing a service)",
    url: "https://www.unisg.ch/de/studium/orientierung/beratung-und-support/militaerische-verbindungsstelle/dienstverschiebung/",
  },
  "CH-S9": {
    publisher: "HSG, Militärische Verbindungsstelle",
    title: "Empfehlungen Studium und Militär (recommendations for studies and military service)",
    url: "https://www.unisg.ch/de/studium/orientierung/beratung-und-support/militaerische-verbindungsstelle/studium-und-militaer/empfehlungen/",
  },
  "CH-KV": {
    publisher: "City of St.Gallen",
    title: "Krankenversicherung: Studierende und Doktorierende (health insurance for students)",
    url: "https://www.stadt.sg.ch/home/gesellschaft-sicherheit/gesundheit-pflege/krankenversicherung/studierende-und-doktorierende.html",
  },
};
