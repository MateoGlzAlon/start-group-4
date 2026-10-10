// The official pages behind the checklist.
// - S1–S8 match the source key in docs/context_1.md (international students).
// - CH-S1, CH-S3 … CH-S9 are S1, S3 … S9 of docs/rulebook-swiss-students-stgallen.md. Its S2 is the same page
//   as S1 here, so steps cite S1. CH-KV is the city page its appendix cites for row I11.
// - EU-S… are the sources of docs/rulebook-eu-efta-students-stgallen.md, with its numbers. Pages that are already
//   listed keep their ID: its S2 = S1, S3 = CH-S3, S4 = CH-KV, S6 = S2, S7 = S3, S10 = S6, S11 = S4, S49 = S7
//   (the same hallo.sg.ch page) and S51 = CH-S1. EU-SHSG is the Student Union page its row H7 links.
// - UK-… are the pages of the UK guide (docs/Studying at HSG as a UK citizen — Step-by-step admin guide.md) that
//   are not listed elsewhere. The guide has no source numbers.
// `url` is the page the rules were taken from; `urlEn` is its English version, where one exists.

// Dates the rule documents were built from the official pages.
export const RULES_AS_OF = "09.–10.10.2026";

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

  "EU-S1": {
    publisher: "City of St.Gallen",
    title: "Residence permits",
    url: "https://www.stadt.sg.ch/home/welcome/residence-registration/residence-permits.html",
  },
  "EU-S5": {
    publisher: "City of St.Gallen",
    title: "Krankenversicherung: Kurzaufenthaltsbewilligung EU/EFTA (health insurance with an EU/EFTA short-stay permit)",
    url: "https://www.stadt.sg.ch/home/gesellschaft-sicherheit/gesundheit-pflege/krankenversicherung/kurzaufenthaltsbewilligung-eu-efta.html",
  },
  "EU-S9": {
    publisher: "State Secretariat for Migration (SEM)",
    title: "FAQ: free movement of persons between Switzerland and the EU/EFTA",
    url: "https://www.sem.admin.ch/sem/en/home/themen/fza_schweiz-eu-efta/eu-efta_buerger_schweiz/faq.html",
  },
  "EU-S12": {
    publisher: "HSG Student Mobility",
    title: "Fact sheet: health insurance for stays of more than 90 days",
    date: "January 2026",
    url: "https://www.unisg.ch/fileadmin/user_upload/HSG_ROOT/_Kernauftritt_HSG/Studium/Austauschprogramme/Incoming_Gaststudierende/IN_FactSheet_HealthInsurance_morethan90days_ENG_30012026.pdf",
  },
  "EU-S13": {
    publisher: "HSG Student Mobility",
    title: "Exchange students: stays of less than 90 days",
    date: "August 2023",
    url: "https://www.unisg.ch/fileadmin/user_upload/HSG_ROOT/_Kernauftritt_HSG/Studium/Austauschprogramme/Incoming_Gaststudierende/03_EN-staylessthan90Day.pdf",
  },
  "EU-S14": {
    publisher: "HSG Student Mobility",
    title: "Incoming guest students: FAQ",
    url: "https://www.unisg.ch/en/studying/exchange-programme/incoming-guest-students/faq/",
  },
  "EU-S15": {
    publisher: "Swiss Federal Council",
    title: "Press release: Croatia does not reach the thresholds",
    date: "14.01.2026",
    url: "https://www.admin.ch/de/newnsb/ciU7vNgDGQu6",
  },
  "EU-S16": {
    publisher: "Swiss Federal Council",
    title: "Press release: safeguard clause for Croatia",
    date: "26.11.2025",
    url: "https://www.admin.ch/de/newnsb/s5sFVBASZzom",
  },
  "EU-S17": {
    publisher: "State Secretariat for Migration (SEM)",
    title: "Fact sheet: Aufenthalt in der Schweiz ohne Erwerbstätigkeit (staying in Switzerland without working)",
    url: "https://www.sem.admin.ch/dam/sem/de/data/eu/fza/personenfreizuegigkeit/factsheets/fs-nichterwerbstaetige-d.pdf.download.pdf/fs-nichterwerbstaetige-d.pdf",
  },
  "EU-S19": {
    publisher: "Gemeinsame Einrichtung KVG",
    title: "Befreiung bei Aus- oder Weiterbildung in der Schweiz (health insurance exemption while studying)",
    date: "October 2018",
    url: "https://www.kvg.org/wp-content/uploads/2024_de_befreiung-bei-aus-oder-weiterbildung-in-der-schweiz.pdf",
  },
  "EU-S20": {
    publisher: "AHV/IV",
    title: "Leaflet 2.10: Beiträge der Studierenden (AHV contributions of students)",
    date: "01.01.2025",
    url: "https://ahv-iv.ch/p/2.10.d",
  },
  "EU-S22": {
    publisher: "Canton of St.Gallen, tax office",
    title: "Quellensteuer: häufig gestellte Fragen (withholding tax FAQ)",
    url: "https://www.sg.ch/steuern-finanzen/steuern/steuerarten/quellensteuer/haeufig-gestellte-fragen.html",
  },
  "EU-S23": {
    publisher: "Canton of St.Gallen, road traffic office",
    title: "Umtausch ausländischer Führerausweise (exchanging a foreign driving licence)",
    date: "December 2017",
    url: "https://www.sg.ch/content/dam/sgch/verkehr/strassenverkehr/formulare-und-merkbl%C3%A4tter/infobl%C3%A4tter/Info-Flyer%20Umtausch%20Ausland.pdf",
  },
  "EU-S24": {
    publisher: "Canton of St.Gallen, hallo.sg.ch",
    title: "Ihr Start in St.Gallen (your start in St.Gallen)",
    url: "https://www.hallo.sg.ch/de/ihr-start-in-st-gallen.html",
  },
  "EU-S25": {
    publisher: "Canton of St.Gallen, hallo.sg.ch",
    title: "Krankenversicherung (health insurance)",
    url: "https://www.hallo.sg.ch/de/gesundheit/krankenversicherung.html",
  },
  "EU-S26": {
    publisher: "Canton of St.Gallen, hallo.sg.ch",
    title: "Konto & Zahlungsverkehr (bank accounts and payments)",
    url: "https://www.hallo.sg.ch/de/arbeit-finanzen/konto-zahlungsverkehr.html",
  },
  "EU-S27": {
    publisher: "Canton of St.Gallen, hallo.sg.ch",
    title: "TV / Internet / Telefon / Serafe",
    url: "https://www.hallo.sg.ch/de/zusammenleben/wohnen/tv-internet-telefon-serafe.html",
  },
  "EU-S28": {
    publisher: "Canton of St.Gallen, hallo.sg.ch",
    title: "Abfallentsorgung (rubbish disposal)",
    url: "https://www.hallo.sg.ch/de/zusammenleben/wohnen/abfallentsorgung.html",
  },
  "EU-S29": {
    publisher: "Canton of St.Gallen, hallo.sg.ch",
    title: "Zug und Bus (train and bus)",
    url: "https://www.hallo.sg.ch/de/mobilitaet/zug-und-bus.html",
  },
  "EU-S30": {
    publisher: "Canton of St.Gallen, hallo.sg.ch",
    title: "Notfälle (emergencies)",
    url: "https://www.hallo.sg.ch/de/beratung-kontakte/notfaelle.html",
  },
  "EU-S31": {
    publisher: "Canton of St.Gallen, hallo.sg.ch",
    title: "Wohnung mieten (renting a flat)",
    url: "https://www.hallo.sg.ch/de/zusammenleben/wohnen/wohnung-mieten.html",
  },
  "EU-S32": {
    publisher: "Canton of St.Gallen, hallo.sg.ch",
    title: "Alltags-Regeln (everyday rules)",
    url: "https://www.hallo.sg.ch/de/zusammenleben/leben-in-st-gallen/alltags-regeln.html",
  },
  "EU-S33": {
    publisher: "Canton of St.Gallen, hallo.sg.ch",
    title: "Steuern (taxes)",
    url: "https://www.hallo.sg.ch/de/arbeit-finanzen/steuern.html",
  },
  "EU-S34": {
    publisher: "Canton of St.Gallen, hallo.sg.ch",
    title: "Psychische Gesundheit (mental health)",
    url: "https://www.hallo.sg.ch/de/gesundheit/psychische-gesundheit.html",
  },
  "EU-S35": {
    publisher: "Serafe",
    title: "Kollektivhaushalte (collective households)",
    url: "https://www.serafe.ch/de/support/kollektiv/",
  },
  "EU-S36": {
    publisher: "HSG",
    title: "Costs of an HSG degree",
    url: "https://www.unisg.ch/en/studying/studying-at-hsg/costs-of-an-hsg-degree/",
  },
  "EU-S37": {
    publisher: "HSG",
    title: "HSG selection procedure",
    url: "https://www.unisg.ch/en/studium/zulassung/zulassung-bachelor-studium/hsg-selection-procedure/",
  },
  "EU-S38": {
    publisher: "HSG",
    title: "Application deadlines",
    url: "https://www.unisg.ch/en/studying/admission/application-deadlines/",
  },
  "EU-S39": {
    publisher: "HSG",
    title: "FAQ Bachelor's",
    url: "https://www.unisg.ch/en/studying/programmes/bachelor/faq-bachelors/",
  },
  "EU-S40": {
    publisher: "HSG Student Mobility",
    title: "Incoming guest students",
    url: "https://www.unisg.ch/en/studying/exchange-programme/incoming-guest-students/",
  },
  "EU-S42": {
    publisher: "HSG",
    title: "Services A–Z",
    url: "https://www.unisg.ch/en/studying/orientation/advice-and-support/services-a-z/",
  },
  "EU-S43": {
    publisher: "HSG Housing Office",
    title: "The Housing Office",
    url: "https://www.unisg.ch/en/studying/exchange-programme/the-housing-office/",
  },
  "EU-S44": {
    publisher: "HSG",
    title: "Student engagement",
    url: "https://unisg.ch/en/university/engagement/student-engagement",
  },
  "EU-S46": {
    publisher: "State Secretariat for Migration (SEM)",
    title: "Weisungen VFP (directives on the free movement of persons)",
    date: "January 2026",
    url: "https://www.sem.admin.ch/dam/sem/de/data/rechtsgrundlagen/weisungen/fza/weisungen-fza.pdf.download.pdf/weisungen-fza-d.pdf",
  },
  "EU-S47": {
    publisher: "State Secretariat for Migration (SEM)",
    title: "Anhang 1: kantonale Höchstgebühren (maximum cantonal fees)",
    date: "10/2020",
    url: "https://www.sem.admin.ch/dam/sem/de/data/rechtsgrundlagen/weisungen/auslaender/aufenthalt/20101223-rs-biometr-aa-anh1-d.pdf.download.pdf/20101223-rs-biometr-aa-anh1-d.pdf",
  },
  "EU-S48": {
    publisher: "Canton of St.Gallen, Migrationsamt",
    title: "FAQ Ausländerausweis (questions about the foreigner ID card)",
    date: "11/2021",
    url: "https://www.sg.ch/content/dam/sgch/sicherheit/migration/dokumente-pass-id/faq-ausl%C3%A4nderausweise/FAQ_Auslaenderausweis_DEU.pdf",
  },
  "EU-S50": {
    publisher: "City of St.Gallen",
    title: "Aufenthalt, Niederlassung, Bewilligung (residence and permits)",
    url: "https://www.stadt.sg.ch/home/gesellschaft-sicherheit/leben-schweiz/aufenthalt-niederlassung-bewilligung.html",
  },
  "EU-S52": {
    publisher: "Canton of St.Gallen",
    title: "sGS 453.7: Gebühren zum Ausländerrecht (fees under foreign nationals law)",
    date: "2007, amended 2011",
    url: "https://www.lexfind.ch/tolv/78853/de",
  },
  "EU-S54": {
    publisher: "Gemeinsame Einrichtung KVG",
    title: "FAQ (health insurance)",
    date: "October 2018",
    url: "https://www.kvg.org/wp-content/uploads/2024_faq.pdf",
  },
  "EU-S55": {
    publisher: "Federal Office of Communications (OFCOM)",
    title: "Abgabe für Radio und Fernsehen (radio and TV fee)",
    url: "https://www.bakom.admin.ch/de/abgabe",
  },
  "EU-S57": {
    publisher: "European Union, Your Europe",
    title: "Health insurance cover in your host country",
    url: "https://europa.eu/youreurope/citizens/health/when-living-abroad/health-insurance-cover/index_en.htm",
  },
  "EU-S58": {
    publisher: "HSG Housing Office",
    title: "FAQ",
    url: "https://www.unisg.ch/en/studying/exchange-programme/the-housing-office/faq/",
  },
  "EU-S59": {
    publisher: "HSG",
    title: "Unisport",
    url: "https://www.unisg.ch/de/universitaet/ueber-uns/beratungs-und-fachstellen/unisport/",
  },
  "EU-S60": {
    publisher: "HSG",
    title: "Admission to a Bachelor's degree programme",
    url: "https://www.unisg.ch/en/studying/admission/admission-bachelor/admission-to-a-bachelors-degree-programme/",
  },
  "EU-S61": {
    publisher: "HSG",
    title: "Recognition of degrees (Master admission)",
    url: "https://www.unisg.ch/en/studying/admission/recognition-of-degrees/",
  },
  "EU-S62": {
    publisher: "Canton of St.Gallen, road traffic office",
    title: "Umschreibung ausländischer Führerausweise (exchanging a foreign driving licence)",
    url: "https://www.sg.ch/verkehr/strassenverkehr/fuehrerausweise/umschreibung_vom_ausland.html",
  },
  "EU-S63": {
    publisher: "Canton of St.Gallen, hallo.sg.ch",
    title: "Auto / Motorrad (car and motorbike)",
    url: "https://www.hallo.sg.ch/de/mobilitaet/auto-motorrad.html",
  },
  "EU-SHSG": {
    publisher: "HSG",
    title: "Student Union (SHSG)",
    url: "https://www.unisg.ch/en/university/about-us/organisation/student-union/",
  },

  "UK-MERKBLATT": {
    publisher: "Canton of St.Gallen, Migrationsamt",
    title: "Merkblatt Studium/Doktorat Drittstaaten (studying here as a non-EU/EFTA citizen)",
    date: "03/2023",
    url: "https://www.sg.ch/content/dam/sgch/sicherheit/migration/dokumente_einreise,-aufenhalt-und-ausreise/drittstaaten/einreise-ohne-erwerb-drittstaaten/sch%C3%BCler---studenten/Merkblatt%20Studium%20Doktorat%20Drittstaaten.pdf",
  },
  "UK-VISA": {
    publisher: "State Secretariat for Migration (SEM)",
    title: "Visa requirements, list V2: British passports",
    url: "https://www.sem.admin.ch/sem/en/home/publiservice/weisungen-kreisschreiben/visa/liste1_staatsangehoerigkeit/leg_visum/v2.html",
  },
  "UK-FOPH": {
    publisher: "Federal Office of Public Health (FOPH)",
    title: "Health insurance for foreign students in Switzerland",
    url: "https://www.bag.admin.ch/en/health-insurance-foreign-students-in-switzerland",
  },
  "UK-SEMESTER": {
    publisher: "HSG",
    title: "Semesterdaten (semester dates)",
    url: "https://www.unisg.ch/de/studium/studieren-an-der-hsg/semesterdaten/",
  },
};
