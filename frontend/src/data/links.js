// Forms, online services and office addresses shown in the steps. These help students act; they are not
// rule citations (those are in sources.js). Every URL and address was taken from a link or contact box on
// one of the official source pages, and checked on 10.10.2026. Don't add links found elsewhere.

export const LINKS = {
  // City of St.Gallen
  eumzug: { label: "eUmzugCH: report your move online", url: "https://www.eumzug.swiss/eumzug/#/canton/sg" },
  weeklyResidentForm: {
    label: "Online registration as a weekly resident (Swiss students)",
    url: "https://formulare.stadt.sg.ch/stadt_extern_ea/start.do?id=BD_2_2_AnmNebenWohnsitzStudenten_1_V1_0",
  },
  movingAbroadQuestionnaire: {
    label: "“Moving abroad” questionnaire (PDF)",
    url: "https://www.stadt.sg.ch/home/welcome/residence-registration/moving-and-registering/_jcr_content/Par/stsg_accordion_list_/AccordionListPar/stsg_accordion_1925699210/AccordionPar/downloadlist_copy/DownloadListPar/download.ocFile/Fragebogen%20bei%20Wegzug%20ins%20Ausland.pdf",
  },
  powerOfAuthority: {
    label: "Power of authority for a move abroad (PDF)",
    url: "https://www.stadt.sg.ch/home/welcome/residence-registration/moving-and-registering/_jcr_content/Par/stsg_accordion_list_/AccordionListPar/stsg_accordion_1925699210/AccordionPar/downloadlist_copy/DownloadListPar/download_0.ocFile/31_Vertretungsvollmacht.pdf",
  },
  healthExemptionForm: {
    label: "Health insurance exemption form for students (PDF, English)",
    url: "https://www.stadt.sg.ch/home/gesellschaft-sicherheit/gesundheit-pflege/krankenversicherung/studierende-und-doktorierende/_jcr_content/Par/stsg_downloadlist/DownloadListPar/stsg_download_405940240.ocFile/Application%20for%20exemption%20from%20the%20compulsory%20health%20insurance%20registration%20form%20for%20students%20with%20residence%20in%20Switzerland.pdf",
  },
  bdMail: { label: "E-mail the Bevölkerungsdienste: bd@stadt.sg.ch", url: "mailto:bd@stadt.sg.ch" },
  sgsw: { label: "St.Galler Stadtwerke (SGSW): report your move", url: "https://meine.sgsw.ch/forms/notify-move-departure" },
  drivingLicence: {
    label: "Change the address on your driving licence",
    url: "https://www.sg.ch/verkehr/strassenverkehr/fahrzeuge/fahrzeugausweis/adressaenderung-und-umzug.html",
  },
  post: { label: "Swiss Post: change of address (German)", url: "https://www.post.ch/de/empfangen/umzug/adressaenderung-mit-nachsendung" },
  sva: {
    label: "SVA St.Gallen: premium reduction (German)",
    url: "https://www.svasg.ch/produkte/ipv/information_zur_praemienverbilligung/index.php",
  },

  // Canton of St.Gallen, Migrationsamt
  migrationPage: {
    label: "Migrationsamt: information sheets and forms",
    url: "https://www.sg.ch/sicherheit/einreise-aufenthalt-ausreise.html",
  },
  migrationOnline: { label: "Migrationsamt online counter: apply, check your status", url: "https://emigrationsamt.sg.ch/" },
  formA1Eu: {
    label: "Form A1 for EU/EFTA citizens (PDF, German)",
    url: "https://www.sg.ch/content/dam/sgch/sicherheit/migration/dokumente_einreise,-aufenhalt-und-ausreise/eu-efta/gesuchsformulare-eu-efta/Gesuch_Ausl%C3%A4nderbewilligung%20A1.pdf",
  },
  formA1NonEu: {
    label: "Form A1 for citizens of other countries (PDF, German)",
    url: "https://www.sg.ch/content/dam/sgch/sicherheit/migration/dokumente_einreise,-aufenhalt-und-ausreise/drittstaaten/gesuchsformulare-drittstaaten/Gesuch_Ausl%C3%A4nderbewilligung%20A1.pdf",
  },
  nonEuStudentSheet: {
    label: "The canton's information sheet for students from outside the EU/EFTA (PDF, English)",
    url: "https://www.sg.ch/content/dam/sgch/sicherheit/migration/dokumente_einreise,-aufenhalt-und-ausreise/drittstaaten/einreise-ohne-erwerb-drittstaaten/sch%C3%BCler---studenten/ENGLISCH_Merkblatt%20Studium%20Doktorat%20Drittstaaten.pdf",
  },
  idAppointment: {
    label: "Change your ID appointment online",
    url: "https://www.sg.ch/sicherheit/schweizer-pass-id/Biometrieerfassungs-Termin1.html",
  },

  // HSG
  formR: {
    label: "Form R: registration (PDF)",
    url: "https://www.unisg.ch/fileadmin/user_upload/HSG_ROOT/_Kernauftritt_HSG/Studium/Austauschprogramme/Incoming_Gaststudierende/Form_R_Exchange_11082025.pdf",
  },
  formD: {
    label: "Form D: deregistration (PDF)",
    url: "https://www.unisg.ch/fileadmin/user_upload/HSG_ROOT/_Kernauftritt_HSG/Studium/Austauschprogramme/Incoming_Gaststudierende/Form_D_January_2026.pdf",
  },
  hsgExemptionForm: {
    label: "HSG's health insurance exemption form for exchange students (PDF)",
    url: "https://www.unisg.ch/fileadmin/user_upload/HSG_ROOT/_Kernauftritt_HSG/Studium/Austauschprogramme/Incoming_Gaststudierende/IN_Application_for_exemption_compulsory_health_insurance_28082025.pdf",
  },
  hsgPayment: {
    label: "HSG payment portal for guest students",
    url: "https://zahlungsportal.unisg.ch/en/products/external-exchange-guest/incoming-guest-students/",
  },
  hsgMobility: { label: "Contact HSG Student Mobility", url: "https://www.unisg.ch/en/studying/exchange-programme/contact/" },
  hsgDeadlines: { label: "HSG application deadlines", url: "https://www.unisg.ch/en/studying/admission/application-deadlines/" },
  hsgRecognition: {
    label: "HSG: recognition of degrees for Master's admission",
    url: "https://www.unisg.ch/en/studying/admission/recognition-of-degrees/",
  },

  // Military service
  milvrb: {
    label: "HSG military liaison office (MilVrb)",
    url: "https://www.unisg.ch/de/studium/orientierung/beratung-und-support/militaerische-verbindungsstelle/",
  },
  dienstmanager: { label: "Dienstmanager: request a postponement online", url: "https://www.armee.ch/de/dim" },
  postponementForm: {
    label: "Paper postponement form (PDF, German)",
    url: "https://www.unisg.ch/fileadmin/user_upload/HSG_ROOT/_Kernauftritt_HSG/Studium/Start_ins_Studium/Beratungsservice/Militaerische_Verbindungsstelle/Dienstverschiebung/NAME_DVS_HSG.pdf",
  },
  kreiskommando: { label: "Kreiskommando St.Gallen", url: "https://www.sg.ch/sicherheit/militaer-zivilschutz/militaer_kreiskommando.html" },
  kreiskommandoMail: { label: "E-mail the Kreiskommando: kreiskommando@sg.ch", url: "mailto:kreiskommando@sg.ch" },
  leaveAbroadForm: {
    label: "Application for leave abroad (PDF, German)",
    url: "https://www.sg.ch/content/dam/sgch/sicherheit/militaer-zivilschutz/kreiskommando/pflichten-ausser-dienst/auslandurlaub/Gesuch%20um%20Auslandurlaub.pdf",
  },
  taxExplained: {
    label: "The exemption tax explained (PDF, German)",
    url: "https://www.sg.ch/sicherheit/militaer-zivilschutz/wehrpflichtersatz/_jcr_content/Par/sgch_downloadlist/DownloadListPar/sgch_download.ocFile/Die%20Wehrpflichtersatzabgabe%20kurz%20erkl%C3%A4rt.pdf",
  },
  taxRefund: {
    label: "Apply for a refund of the exemption tax",
    url: "https://www.sg.ch/sicherheit/militaer-zivilschutz/wehrpflichtersatz/antrag-rueckerstattung-der-wehrpflichtersatzabgabe.html",
  },
};

// Offices, with the address from their official page. Each opens in Google Maps.
export const PLACES = {
  residentsOffice: { name: "Residents' Office (Bevölkerungsdienste), Rathaus", address: "Poststrasse 28, 9001 St.Gallen" },
  migrationsamt: { name: "Migrationsamt", address: "Oberer Graben 38, 9001 St.Gallen" },
  idOffice: { name: "Ausweisstelle (ID office)", address: "Oberer Graben 32, 9001 St.Gallen" },
  kreiskommando: { name: "Kreiskommando, Amt für Militär und Zivilschutz", address: "Burgstrasse 50, 9000 St.Gallen" },
  milvrb: { name: "HSG military liaison office (MilVrb), office 25-104", address: "Bodanstrasse 1, 9000 St.Gallen" },
};

export const mapsUrl = (place) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.address)}`;
