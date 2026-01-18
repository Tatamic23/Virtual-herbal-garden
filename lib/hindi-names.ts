// Hindi names for medicinal plants
export const hindiNames: Record<string, string> = {
  neem: "नीम",
  aloevera: "एलोवेरा",
  tulsi: "तुलसी",
  ashwagandha: "अश्वगंधा",
  ajwain: "अजवाइन",
  turmeric: "हल्दी",
  ginger: "अदरक",
  fenugreek: "मेथी",
  rosemary: "रोज़मेरी",
  birch: "भोजपत्र",
  mugwort: "नागदौना",
  basil: "बेसिल",
  ginseng: "जिनसेंग",
  chamomile: "बाबूने का फूल",
  lavender: "लैवेंडर",
  shatavari: "शतावरी",
  "black-cohosh": "ब्लैक कोहोश",
}

// Scientific information for plants
export const scientificInfo: Record<
  string,
  {
    kingdom: string
    order: string
    chemicalConstituents: string[]
    researchStudies: string
  }
> = {
  neem: {
    kingdom: "Plantae",
    order: "Sapindales",
    chemicalConstituents: ["Azadirachtin", "Nimbin", "Nimbidin", "Quercetin"],
    researchStudies:
      "Multiple studies have confirmed neem's antibacterial, antifungal, and insecticidal properties. Research published in the Journal of Ethnopharmacology (2018) demonstrated its effectiveness against drug-resistant bacteria.",
  },
  aloevera: {
    kingdom: "Plantae",
    order: "Asparagales",
    chemicalConstituents: ["Aloin", "Emodin", "Acemannan", "Aloe-emodin"],
    researchStudies:
      "Clinical trials have shown aloe vera's effectiveness in wound healing and reducing inflammation. A 2019 study in the Journal of Dermatological Treatment found it significantly improved symptoms of mild to moderate psoriasis.",
  },
  tulsi: {
    kingdom: "Plantae",
    order: "Lamiales",
    chemicalConstituents: ["Eugenol", "Ursolic acid", "Carvacrol", "Linalool"],
    researchStudies:
      "Research in the Journal of Ayurveda and Integrative Medicine (2017) demonstrated tulsi's adaptogenic properties and its ability to reduce stress and anxiety levels in human subjects.",
  },
  ashwagandha: {
    kingdom: "Plantae",
    order: "Solanales",
    chemicalConstituents: ["Withanolides", "Alkaloids", "Steroidal lactones", "Saponins"],
    researchStudies:
      "A double-blind placebo-controlled study published in the Journal of Alternative and Complementary Medicine (2019) showed ashwagandha's effectiveness in reducing cortisol levels and stress.",
  },
  ajwain: {
    kingdom: "Plantae",
    order: "Apiales",
    chemicalConstituents: ["Thymol", "Carvacrol", "γ-terpinene", "p-cymene"],
    researchStudies:
      "Research in the International Journal of Pharmaceutical Sciences and Research (2018) confirmed ajwain's carminative properties and effectiveness in treating digestive disorders.",
  },
  turmeric: {
    kingdom: "Plantae",
    order: "Zingiberales",
    chemicalConstituents: ["Curcumin", "Demethoxycurcumin", "Bisdemethoxycurcumin", "Turmerones"],
    researchStudies:
      "Numerous clinical trials have demonstrated curcumin's anti-inflammatory effects. A 2020 meta-analysis in Frontiers in Pharmacology confirmed its efficacy in treating arthritis and inflammatory conditions.",
  },
  ginger: {
    kingdom: "Plantae",
    order: "Zingiberales",
    chemicalConstituents: ["Gingerols", "Shogaols", "Zingerone", "Paradols"],
    researchStudies:
      "A systematic review in the Journal of the Academy of Nutrition and Dietetics (2018) confirmed ginger's effectiveness in reducing nausea and vomiting, particularly in pregnancy and chemotherapy patients.",
  },
  fenugreek: {
    kingdom: "Plantae",
    order: "Fabales",
    chemicalConstituents: ["Trigonelline", "4-Hydroxyisoleucine", "Saponins", "Diosgenin"],
    researchStudies:
      "Clinical trials published in Phytotherapy Research (2020) demonstrated fenugreek's ability to improve glycemic control in type 2 diabetes patients and increase milk production in lactating mothers.",
  },
  rosemary: {
    kingdom: "Plantae",
    order: "Lamiales",
    chemicalConstituents: ["Rosmarinic acid", "Carnosic acid", "Camphor", "1,8-cineole"],
    researchStudies:
      "Research in the International Journal of Neuroscience (2018) showed that rosemary aroma improved cognitive performance and mood in healthy adults.",
  },
  birch: {
    kingdom: "Plantae",
    order: "Fagales",
    chemicalConstituents: ["Betulin", "Betulinic acid", "Methyl salicylate", "Tannins"],
    researchStudies:
      "Studies in the Journal of Ethnopharmacology (2019) confirmed birch bark extract's anti-inflammatory and analgesic properties, supporting its traditional use for joint pain.",
  },
  mugwort: {
    kingdom: "Plantae",
    order: "Asterales",
    chemicalConstituents: ["Thujone", "Cineole", "Camphor", "Artemisinin"],
    researchStudies:
      "Research in Sleep Medicine Reviews (2017) investigated mugwort's traditional use in enhancing dream recall and lucid dreaming, finding preliminary evidence for its effects on REM sleep.",
  },
  basil: {
    kingdom: "Plantae",
    order: "Lamiales",
    chemicalConstituents: ["Eugenol", "Linalool", "Estragole", "Rosmarinic acid"],
    researchStudies:
      "A study in the Journal of Agricultural and Food Chemistry (2019) demonstrated basil's antimicrobial properties against foodborne pathogens and its potential as a natural food preservative.",
  },
  ginseng: {
    kingdom: "Plantae",
    order: "Apiales",
    chemicalConstituents: ["Ginsenosides", "Panaxosides", "Polysaccharides", "Polyacetylenes"],
    researchStudies:
      "A meta-analysis in the Journal of Ginseng Research (2020) confirmed ginseng's effectiveness in reducing fatigue and enhancing cognitive function in healthy adults.",
  },
  chamomile: {
    kingdom: "Plantae",
    order: "Asterales",
    chemicalConstituents: ["Apigenin", "Chamazulene", "Bisabolol", "Luteolin"],
    researchStudies:
      "Clinical trials published in Phytomedicine (2019) demonstrated chamomile's mild sedative effects and its efficacy in treating mild to moderate anxiety disorders.",
  },
  lavender: {
    kingdom: "Plantae",
    order: "Lamiales",
    chemicalConstituents: ["Linalool", "Linalyl acetate", "Lavandulol", "Geraniol"],
    researchStudies:
      "A randomized controlled trial in the Journal of Alternative and Complementary Medicine (2020) showed lavender essential oil's effectiveness in improving sleep quality and reducing anxiety.",
  },
  shatavari: {
    kingdom: "Plantae",
    order: "Asparagales",
    chemicalConstituents: ["Saponins", "Shatavarins", "Racemosol", "Asparagamine"],
    researchStudies:
      "Research in the Journal of Ethnopharmacology (2018) supported shatavari's traditional use in women's health, showing its effects on hormonal balance and lactation.",
  },
  "black-cohosh": {
    kingdom: "Plantae",
    order: "Ranunculales",
    chemicalConstituents: ["Triterpene glycosides", "Actein", "Cimicifugoside", "Formononetin"],
    researchStudies:
      "A systematic review in the Journal of Women's Health (2019) evaluated black cohosh's effectiveness in managing menopausal symptoms, finding moderate evidence for its efficacy in reducing hot flashes.",
  },
}

