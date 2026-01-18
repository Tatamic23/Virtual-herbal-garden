export type PlantClassification = {
  family: string
  subfamily?: string
  genus: string
  species: string
}

export type GrowingConditions = {
  sunlight: string
  soil: string
  water: string
  temperature: string
}

export type HomeRemedy = {
  ailment: string
  preparation: string
  usage: string
}

export type Plant = {
  id: string
  name: string
  scientificName: string
  shortDescription: string
  description: string
  image: string
  properties: string[]
  classification: PlantClassification
  growingConditions: GrowingConditions
  medicinalUses: string[]
  homeRemedies: HomeRemedy[]
  historicalSignificance: string
  gardenBenefits: string[]
}

export const plants: Plant[] = [
  {
    id: "neem",
    name: "Neem",
    scientificName: "Azadirachta indica",
    shortDescription: "Versatile medicinal tree with antibacterial and antifungal properties.",
    description:
      "Neem is a fast-growing tree native to the Indian subcontinent. All parts of the tree, including leaves, bark, seeds, and oil, have medicinal properties. It's known for its bitter taste and strong odor, which contributes to its effectiveness as a natural pesticide and medicinal herb.",
    image: "/images/neem.jpg",
    properties: ["Antibacterial", "Antifungal", "Antiparasitic", "Anti-inflammatory", "Antioxidant"],
    classification: {
      family: "Meliaceae",
      genus: "Azadirachta",
      species: "A. indica",
    },
    growingConditions: {
      sunlight: "Full sun",
      soil: "Well-draining, tolerates poor soil",
      water: "Moderate, drought-tolerant once established",
      temperature: "Tropical to subtropical, not frost tolerant",
    },
    medicinalUses: [
      "Treats skin disorders like eczema and psoriasis",
      "Used for dental care to prevent gum disease",
      "Helps manage blood sugar levels",
      "Natural insect repellent",
      "Supports liver function",
    ],
    homeRemedies: [
      {
        ailment: "Skin infections",
        preparation: "Grind neem leaves into a paste with a little water",
        usage: "Apply directly to affected areas twice daily",
      },
      {
        ailment: "Dental problems",
        preparation: "Boil neem twigs in water, let cool",
        usage: "Use as a mouthwash or chew on neem twigs as a natural toothbrush",
      },
    ],
    historicalSignificance:
      "Neem has been used in traditional Indian medicine for over 5,000 years. It's mentioned in ancient texts as 'Sarva Roga Nivarini' meaning 'the curer of all ailments'. In Indian villages, it's common to find neem trees planted near homes for their medicinal benefits and cooling shade.",
    gardenBenefits: [
      "Natural pest control for other plants",
      "Improves soil fertility as leaves decompose",
      "Provides shade and reduces ground temperature",
      "Attracts beneficial insects",
    ],
  },
  {
    id: "aloevera",
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    shortDescription: "Succulent plant with gel-filled leaves known for healing properties.",
    description:
      "Aloe vera is a succulent plant species with thick, fleshy leaves that contain a clear gel. This gel is rich in vitamins, minerals, amino acids, and antioxidants, making it highly beneficial for skin health and wound healing. The plant is stemless or very short-stemmed with leaves that grow in a rosette pattern.",
    image: "/images/aloevera.jpg",
    properties: ["Anti-inflammatory", "Antimicrobial", "Moisturizing", "Wound healing", "Antioxidant"],
    classification: {
      family: "Asphodelaceae",
      subfamily: "Asphodeloideae",
      genus: "Aloe",
      species: "A. vera",
    },
    growingConditions: {
      sunlight: "Bright, indirect sunlight",
      soil: "Well-draining, sandy soil",
      water: "Infrequent, allow soil to dry between watering",
      temperature: "Warm, not below 50°F (10°C)",
    },
    medicinalUses: [
      "Soothes sunburns and minor burns",
      "Accelerates wound healing",
      "Reduces dental plaque",
      "Helps treat canker sores",
      "Moisturizes skin and reduces acne",
    ],
    homeRemedies: [
      {
        ailment: "Sunburn",
        preparation: "Cut open an aloe leaf and extract the gel",
        usage: "Apply directly to sunburned skin several times daily",
      },
      {
        ailment: "Dry skin",
        preparation: "Mix aloe gel with a few drops of vitamin E oil",
        usage: "Apply as a moisturizer before bed",
      },
    ],
    historicalSignificance:
      "Aloe vera has been used for medicinal purposes for thousands of years. Ancient Egyptian papyrus and Mesopotamian clay tablets describe aloe vera being used for healing infections, treating skin problems, and as a laxative. Cleopatra was said to have used it as part of her beauty regimen.",
    gardenBenefits: [
      "Easy to grow houseplant",
      "Purifies air by removing formaldehyde and benzene",
      "Thrives with minimal care",
      "Propagates easily for sharing",
    ],
  },
  {
    id: "tulsi",
    name: "Tulsi (Holy Basil)",
    scientificName: "Ocimum sanctum",
    shortDescription: "Sacred herb in Ayurveda with adaptogenic and immunomodulatory properties.",
    description:
      "Tulsi, also known as Holy Basil, is a highly revered plant in Hinduism and Ayurvedic medicine. It has a strong aroma with hints of clove, lemon, and mint. The plant typically has green or purple leaves and produces small purple flowers. It's considered an adaptogen, helping the body adapt to stress and promoting mental balance.",
    image: "/images/tulsi.jpg",
    properties: ["Adaptogenic", "Immunomodulatory", "Antioxidant", "Antimicrobial", "Anti-inflammatory"],
    classification: {
      family: "Lamiaceae",
      genus: "Ocimum",
      species: "O. tenuiflorum",
    },
    growingConditions: {
      sunlight: "Full sun to partial shade",
      soil: "Well-draining, fertile soil",
      water: "Regular watering, keep soil moist but not soggy",
      temperature: "Warm, tropical conditions, not frost tolerant",
    },
    medicinalUses: [
      "Reduces stress and anxiety",
      "Supports immune system function",
      "Helps manage fever and common cold",
      "Improves respiratory health",
      "Supports heart health and regulates blood pressure",
    ],
    homeRemedies: [
      {
        ailment: "Common cold",
        preparation: "Boil 10-15 tulsi leaves in water with ginger and honey",
        usage: "Drink as tea 2-3 times daily",
      },
      {
        ailment: "Stress and anxiety",
        preparation: "Steep dried tulsi leaves in hot water for 5 minutes",
        usage: "Drink as a calming tea before bed",
      },
    ],
    historicalSignificance:
      "Tulsi has been cultivated in India for more than 3,000 years and is mentioned in the Rigveda (1500 BCE). In Hinduism, it's considered sacred and is often grown in special pots in homes or temple courtyards. It's traditionally believed to be the earthly manifestation of the goddess Tulsi, a consort of Lord Vishnu.",
    gardenBenefits: [
      "Repels mosquitoes and other insects",
      "Attracts pollinators like bees",
      "Improves air quality",
      "Companion plant that enhances growth of neighboring plants",
    ],
  },  
  {
    id: "chamomile",
    name: "Chamomile",
    scientificName: "Matricaria chamomilla",
    shortDescription: "Gentle herb with calming properties for sleep and digestion.",
    description:
      "Chamomile is a daisy-like plant with feathery leaves and small white flowers with yellow centers. It grows to about 1-2 feet tall and has a sweet, apple-like fragrance. There are two common varieties: German chamomile (Matricaria chamomilla) and Roman chamomile (Chamaemelum nobile), both with similar properties.",
    image: "/placeholder.svg?height=300&width=400",
    properties: ["Carminative", "Sedative", "Anti-inflammatory", "Antispasmodic", "Mild anxiolytic"],
    classification: {
      family: "Asteraceae",
      genus: "Matricaria",
      species: "M. chamomilla",
    },
    growingConditions: {
      sunlight: "Full sun to partial shade",
      soil: "Well-draining, sandy soil",
      water: "Moderate, drought-tolerant once established",
      temperature: "Cool to moderate temperatures, hardy to zone 4",
    },
    medicinalUses: [
      "Promotes relaxation and sleep",
      "Soothes digestive issues",
      "Reduces inflammation",
      "Relieves menstrual pain",
      "Calms skin irritations",
    ],
    homeRemedies: [
      {
        ailment: "Insomnia",
        preparation: "Steep 2-3 teaspoons dried chamomile flowers in hot water for 10 minutes",
        usage: "Drink as tea 30 minutes before bedtime",
      },
      {
        ailment: "Skin irritation",
        preparation: "Make a strong chamomile tea and let cool",
        usage: "Apply as a compress to irritated skin",
      },
    ],
    historicalSignificance:
      "Chamomile has been used for thousands of years, dating back to ancient Egypt, Greece, and Rome. It was one of the nine sacred herbs of the Anglo-Saxons. In medieval Europe, it was strewn on floors to create a pleasant fragrance and repel insects. It has long been associated with relaxation and was traditionally given to children for various ailments.",
    gardenBenefits: [
      "Attracts beneficial insects and pollinators",
      "Companion plant that improves the health of nearby plants",
      "Self-seeds readily for continuous growth",
      "Releases calcium, potassium, and sulfur into the soil",
    ],
  },
  {
    id: "lavender",
    name: "Lavender",
    scientificName: "Lavandula angustifolia",
    shortDescription: "Aromatic flowering herb known for calming properties and sleep support.",
    description:
      "Lavender is a woody, perennial herb with gray-green foliage and purple-blue flower spikes. It has a distinctive sweet, floral scent and grows in bushy shrubs that can reach 1-3 feet tall. The plant is highly valued for its essential oil, which is extracted from the flowers and used in aromatherapy, perfumery, and medicine.",
    image: "/placeholder.svg?height=300&width=400",
    properties: ["Anxiolytic", "Sedative", "Antimicrobial", "Carminative", "Antispasmodic"],
    classification: {
      family: "Lamiaceae",
      genus: "Lavandula",
      species: "L. angustifolia",
    },
    growingConditions: {
      sunlight: "Full sun",
      soil: "Well-draining, alkaline soil",
      water: "Low to moderate, drought-tolerant once established",
      temperature: "Mediterranean climate, hardy to zone 5",
    },
    medicinalUses: [
      "Reduces anxiety and stress",
      "Improves sleep quality",
      "Relieves headaches",
      "Treats minor burns and insect bites",
      "Alleviates digestive discomfort",
    ],
    homeRemedies: [
      {
        ailment: "Anxiety and stress",
        preparation: "Add a few drops of lavender essential oil to a diffuser",
        usage: "Diffuse in bedroom or living space",
      },
      {
        ailment: "Insomnia",
        preparation: "Fill a small cloth bag with dried lavender flowers",
        usage: "Place under pillow or near bedside",
      },
    ],
    historicalSignificance:
      "Lavender has been used for over 2,500 years. Ancient Egyptians used it in mummification and perfumery. Romans added it to their baths, hence the name from the Latin 'lavare' meaning 'to wash.' During the Great Plague in London, people would tie bundles of lavender to their wrists to protect against infection. Queen Elizabeth I of England valued lavender tea for its headache-relieving properties.",
    gardenBenefits: [
      "Attracts pollinators like bees and butterflies",
      "Repels moths, fleas, flies, and mosquitoes",
      "Drought-resistant landscaping plant",
      "Creates beautiful borders and hedges",
    ],
  },
  // {
  //   id: "ashwagandha",
  //   name: "Ashwagandha",
  //   scientificName: "Withania somnifera",
  //   shortDescription: "Powerful adaptogenic herb known as 'Indian Ginseng' for stress relief.",
  //   description:
  //     "Ashwagandha is a small, woody shrub native to India and North Africa. Its name comes from the Sanskrit words 'ashva' meaning horse and 'gandha' meaning smell, referring to the horse-like odor of its roots. The plant produces small green flowers and red berries, but it's primarily the root that's used medicinally.",
  //   image: "/images/ashwagandha.jpg",
  //   properties: ["Adaptogenic", "Anti-stress", "Immunomodulatory", "Anti-inflammatory", "Antioxidant"],
  //   classification: {
  //     family: "Solanaceae",
  //     genus: "Withania",
  //     species: "W. somnifera",
  //   },
  //   growingConditions: {
  //     sunlight: "Full sun",
  //     soil: "Well-draining, sandy soil",
  //     water: "Moderate, drought-tolerant once established",
  //     temperature: "Warm, tropical to subtropical",
  //   },
  //   medicinalUses: [
  //     "Reduces stress and anxiety",
  //     "Improves sleep quality",
  //     "Enhances cognitive function",
  //     "Boosts immune system",
  //     "Supports adrenal function",
  //   ],
  //   homeRemedies: [
  //     {
  //       ailment: "Insomnia",
  //       preparation: "Mix 1/2 teaspoon ashwagandha powder with warm milk and honey",
  //       usage: "Drink before bedtime",
  //     },
  //     {
  //       ailment: "Stress and fatigue",
  //       preparation: "Mix ashwagandha powder with ghee (clarified butter)",
  //       usage: "Take 1/4 teaspoon twice daily with meals",
  //     },
  //   ],
  //   historicalSignificance:
  //     "Ashwagandha has been used in Ayurvedic medicine for over 3,000 years. It's classified as a Rasayana, a rejuvenating tonic that promotes longevity and vitality. Traditional texts recommend it for enhancing ojas, the vital energy that governs physical strength and immunity.",
  //   gardenBenefits: [
  //     "Drought-resistant once established",
  //     "Attracts beneficial insects",
  //     "Can be grown in containers",
  //     "Serves as a natural pesticide for other plants",
  //   ],
  // },
  // {
  //   id: "ajwain",
  //   name: "Ajwain (Carom Seeds)",
  //   scientificName: "Trachyspermum ammi",
  //   shortDescription: "Aromatic herb with thymol-rich seeds used for digestive ailments.",
  //   description:
  //     "Ajwain is a small, annual herb with feathery leaves and small, oval-shaped fruits (commonly called seeds) that have a strong, aromatic smell similar to thyme. The plant produces small white flowers and grows to about 2-3 feet tall. The seeds are the primary part used medicinally and in cooking.",
  //   image: "/placeholder.svg?height=300&width=400",
  //   properties: ["Carminative", "Antimicrobial", "Antispasmodic", "Digestive", "Expectorant"],
  //   classification: {
  //     family: "Apiaceae",
  //     genus: "Trachyspermum",
  //     species: "T. ammi",
  //   },
  //   growingConditions: {
  //     sunlight: "Full sun",
  //     soil: "Well-draining, fertile soil",
  //     water: "Moderate, regular watering",
  //     temperature: "Warm, tropical to subtropical",
  //   },
  //   medicinalUses: [
  //     "Relieves indigestion and gas",
  //     "Treats colic in infants",
  //     "Alleviates respiratory conditions",
  //     "Reduces arthritic pain",
  //     "Improves appetite",
  //   ],
  //   homeRemedies: [
  //     {
  //       ailment: "Indigestion and bloating",
  //       preparation: "Dry roast ajwain seeds and grind with a pinch of salt",
  //       usage: "Take 1/4 teaspoon after meals with warm water",
  //     },
  //     {
  //       ailment: "Cough and cold",
  //       preparation: "Boil ajwain seeds in water with jaggery",
  //       usage: "Drink as tea twice daily",
  //     },
  //   ],
  //   historicalSignificance:
  //     "Ajwain has been used in Ayurvedic medicine for thousands of years, particularly for digestive disorders. It's mentioned in ancient texts for its ability to balance the three doshas (vata, pitta, and kapha). In traditional households, ajwain water is a common remedy for indigestion and is often the first treatment given to infants with colic.",
  //   gardenBenefits: [
  //     "Attracts beneficial insects like bees",
  //     "Repels certain pests",
  //     "Companion plant for vegetables",
  //     "Self-seeds readily for continuous harvest",
  //   ],
  // },
  // {
  //   id: "turmeric",
  //   name: "Turmeric",
  //   scientificName: "Curcuma longa",
  //   shortDescription: "Golden spice with powerful anti-inflammatory and antioxidant properties.",
  //   description:
  //     "Turmeric is a perennial herbaceous plant of the ginger family. It has long, narrow rhizomes with bright orange flesh and brown skin. The plant produces large green leaves and occasional white or pink flowers. The rhizome is harvested, boiled, dried, and ground to produce the familiar yellow-orange powder used in cooking and medicine.",
  //   image: "/placeholder.svg?height=300&width=400",
  //   properties: ["Anti-inflammatory", "Antioxidant", "Antimicrobial", "Hepatoprotective", "Anticancer"],
  //   classification: {
  //     family: "Zingiberaceae",
  //     genus: "Curcuma",
  //     species: "C. longa",
  //   },
  //   growingConditions: {
  //     sunlight: "Partial shade to full sun",
  //     soil: "Rich, moist, well-draining soil",
  //     water: "Regular watering, high humidity",
  //     temperature: "Warm, tropical conditions, not frost tolerant",
  //   },
  //   medicinalUses: [
  //     "Reduces inflammation and joint pain",
  //     "Improves digestion",
  //     "Supports liver function",
  //     "Boosts immune system",
  //     "Enhances skin health",
  //   ],
  //   homeRemedies: [
  //     {
  //       ailment: "Joint pain and inflammation",
  //       preparation: "Mix 1 teaspoon turmeric powder with warm water and honey",
  //       usage: "Drink daily in the morning on an empty stomach",
  //     },
  //     {
  //       ailment: "Skin issues",
  //       preparation: "Make a paste with turmeric powder and water or milk",
  //       usage: "Apply to affected areas for 20 minutes, then rinse",
  //     },
  //   ],
  //   historicalSignificance:
  //     "Turmeric has been used in India for thousands of years as a spice and medicinal herb. It was first used as a dye, then later for its medicinal properties. In traditional Hindu medicine, turmeric has been used to treat various respiratory conditions, liver disorders, and skin diseases. It also holds religious significance in Hindu ceremonies.",
  //   gardenBenefits: [
  //     "Attractive ornamental foliage",
  //     "Natural pest deterrent",
  //     "Improves soil health through rhizome growth",
  //     "Can be grown in containers",
  //   ],
  // },
  // {
  //   id: "ginger",
  //   name: "Ginger",
  //   scientificName: "Zingiber officinale",
  //   shortDescription: "Warming rhizome with digestive and anti-inflammatory benefits.",
  //   description:
  //     "Ginger is a flowering plant whose rhizome (underground stem) is widely used as a spice and traditional medicine. The plant grows up to 3-4 feet tall with narrow green leaves and produces clusters of white and pink flower buds that bloom into yellow flowers. The rhizome has a pungent, spicy flavor and aroma.",
  //   image: "/placeholder.svg?height=300&width=400",
  //   properties: ["Anti-inflammatory", "Antiemetic", "Carminative", "Analgesic", "Antimicrobial"],
  //   classification: {
  //     family: "Zingiberaceae",
  //     genus: "Zingiber",
  //     species: "Z. officinale",
  //   },
  //   growingConditions: {
  //     sunlight: "Partial shade to full sun",
  //     soil: "Rich, moist, well-draining soil",
  //     water: "Regular watering, consistent moisture",
  //     temperature: "Warm, tropical to subtropical, not frost tolerant",
  //   },
  //   medicinalUses: [
  //     "Relieves nausea and motion sickness",
  //     "Reduces inflammation and pain",
  //     "Aids digestion and relieves gas",
  //     "Helps with cold and flu symptoms",
  //     "Improves circulation",
  //   ],
  //   homeRemedies: [
  //     {
  //       ailment: "Nausea and motion sickness",
  //       preparation: "Steep fresh ginger slices in hot water for 5-10 minutes",
  //       usage: "Drink as tea before travel or when feeling nauseous",
  //     },
  //     {
  //       ailment: "Sore throat",
  //       preparation: "Boil ginger with water, lemon, and honey",
  //       usage: "Drink warm several times daily",
  //     },
  //   ],
  //   historicalSignificance:
  //     "Ginger has been used for over 5,000 years in traditional Chinese and Ayurvedic medicine. It was highly valued in ancient Rome and was one of the first spices to be traded between Asia and Europe. During the Middle Ages, it was thought to have originated from the Garden of Eden and was used to ward off the plague.",
  //   gardenBenefits: [
  //     "Attractive tropical foliage",
  //     "Repels certain soil pests",
  //     "Improves growth of neighboring plants",
  //     "Can be grown indoors in containers",
  //   ],
  // },
  {
    id: "fenugreek",
    name: "Fenugreek",
    scientificName: "Trigonella foenum-graecum",
    shortDescription: "Aromatic herb with seeds that help regulate blood sugar and increase milk production.",
    description:
      "Fenugreek is an annual plant with small round leaves, white flowers, and pods containing small, golden-brown seeds. The seeds have a distinctive maple-like smell and slightly bitter taste. Both the leaves and seeds are used in cooking and medicine, with the seeds being particularly valued for their therapeutic properties.",
    image: "/placeholder.svg?height=300&width=400",
    properties: ["Galactagogue", "Antidiabetic", "Anti-inflammatory", "Digestive", "Hypocholesterolemic"],
    classification: {
      family: "Fabaceae",
      genus: "Trigonella",
      species: "T. foenum-graecum",
    },
    growingConditions: {
      sunlight: "Full sun",
      soil: "Well-draining, fertile soil",
      water: "Moderate, regular watering",
      temperature: "Cool to moderate temperatures",
    },
    medicinalUses: [
      "Increases breast milk production in nursing mothers",
      "Helps regulate blood sugar levels",
      "Reduces cholesterol",
      "Improves digestion",
      "Reduces inflammation",
    ],
    homeRemedies: [
      {
        ailment: "Low milk supply in nursing mothers",
        preparation: "Soak 1 tablespoon fenugreek seeds overnight, then boil in water",
        usage: "Drink as tea 2-3 times daily",
      },
      {
        ailment: "High blood sugar",
        preparation: "Soak 1 teaspoon fenugreek seeds overnight in water",
        usage: "Consume the seeds and water on an empty stomach in the morning",
      },
    ],
    historicalSignificance:
      "Fenugreek has been used since ancient times in Egypt, Greece, and Rome. It was found in the tomb of Tutankhamun and was used by Hippocrates and other Greek physicians for various ailments. In traditional Chinese medicine, it's used to treat weakness and edema of the legs. In India, it has been used for centuries to enhance feminine beauty and to aid digestion.",
    gardenBenefits: [
      "Nitrogen-fixing plant that improves soil fertility",
      "Attracts beneficial insects",
      "Fast-growing green manure crop",
      "Companion plant for many vegetables",
    ],
  },
  {
    id: "rosemary",
    name: "Rosemary",
    scientificName: "Rosmarinus officinalis",
    shortDescription: "Aromatic evergreen herb that enhances memory and concentration.",
    description:
      "Rosemary is an evergreen shrub with fragrant, needle-like leaves and blue, purple, pink, or white flowers. It has a distinctive pine-like fragrance and a bitter, astringent taste. The plant can grow up to 6 feet tall in favorable conditions and is highly valued for both culinary and medicinal uses.",
    image: "/placeholder.svg?height=300&width=400",
    properties: ["Antioxidant", "Antimicrobial", "Carminative", "Nootropic", "Anti-inflammatory"],
    classification: {
      family: "Lamiaceae",
      genus: "Salvia",
      species: "S. rosmarinus",
    },
    growingConditions: {
      sunlight: "Full sun",
      soil: "Well-draining, slightly alkaline soil",
      water: "Moderate, drought-tolerant once established",
      temperature: "Mediterranean climate, hardy to zone 8",
    },
    medicinalUses: [
      "Improves memory and concentration",
      "Relieves muscle pain and spasms",
      "Stimulates hair growth",
      "Supports digestive health",
      "Reduces stress and anxiety",
    ],
    homeRemedies: [
      {
        ailment: "Poor concentration",
        preparation: "Steep fresh rosemary sprigs in hot water for 10 minutes",
        usage: "Drink as tea or inhale the steam",
      },
      {
        ailment: "Hair loss",
        preparation: "Infuse rosemary in olive oil for several weeks",
        usage: "Massage into scalp several times weekly",
      },
    ],
    historicalSignificance:
      "Rosemary has been used since ancient times for its medicinal properties and as a symbol of remembrance. In ancient Greece, students would wear rosemary garlands while studying for exams to improve memory. During the Middle Ages, it was placed under pillows to ward off nightmares and evil spirits. It was also burned as an incense to purify the air during plagues.",
    gardenBenefits: [
      "Repels many garden pests including cabbage moths and carrot flies",
      "Attracts pollinators like bees and butterflies",
      "Drought-resistant landscaping plant",
      "Companion plant that improves growth of sage, cabbage, and beans",
    ],
  },
  {
    id: "birch",
    name: "Birch Tree",
    scientificName: "Betula spp.",
    shortDescription: "Medicinal tree with bark and sap used for pain relief and detoxification.",
    description:
      "Birch trees are deciduous hardwoods known for their distinctive white, paper-like bark that peels in thin sheets. They have simple, alternate leaves with serrated edges and produce both male and female catkins. Various parts of the tree, including the bark, leaves, and sap, have been used medicinally for centuries.",
    image: "/images/birch.jpg",
    properties: ["Anti-inflammatory", "Diuretic", "Antiseptic", "Astringent", "Detoxifying"],
    classification: {
      family: "Betulaceae",
      genus: "Betula",
      species: "B. pendula, B. alba, B. lenta",
    },
    growingConditions: {
      sunlight: "Full sun to partial shade",
      soil: "Moist, acidic, well-draining soil",
      water: "Regular watering, prefers consistent moisture",
      temperature: "Cool to cold climates, hardy to zone 2",
    },
    medicinalUses: [
      "Relieves joint and muscle pain",
      "Promotes detoxification through increased urination",
      "Reduces fever",
      "Treats skin conditions like eczema and psoriasis",
      "Improves kidney and bladder health",
    ],
    homeRemedies: [
      {
        ailment: "Joint pain and arthritis",
        preparation: "Steep birch leaves in hot water for 15 minutes",
        usage: "Drink as tea 2-3 times daily or apply as a compress to painful areas",
      },
      {
        ailment: "Skin conditions",
        preparation: "Make a decoction of birch bark and let cool",
        usage: "Apply to affected areas several times daily",
      },
    ],
    historicalSignificance:
      "Birch has been used medicinally by indigenous peoples across the Northern Hemisphere for thousands of years. Native Americans used birch bark to make canoes, containers, and medicinal preparations. In Russia and Scandinavia, birch is central to traditional sauna practices, where birch branches are used to stimulate circulation. The sap has been collected as a spring tonic and to make birch beer and wine.",
    gardenBenefits: [
      "Provides dappled shade for shade-loving plants",
      "Attracts beneficial wildlife",
      "Fall foliage adds seasonal interest",
      "Tolerates poor soil conditions",
    ],
  },
  {
    id: "mugwort",
    name: "Mugwort",
    scientificName: "Artemisia vulgaris",
    shortDescription: "Aromatic herb traditionally used for dream enhancement and digestive issues.",
    description:
      "Mugwort is a tall, herbaceous perennial plant with reddish-brown stems and dark green, deeply lobed leaves that are silvery-white underneath. It produces small, inconspicuous yellowish or reddish-brown flowers. The plant has a strong, sage-like aroma and slightly bitter taste.",
    image: "/placeholder.svg?height=300&width=400",
    properties: ["Carminative", "Emmenagogue", "Nervine", "Anthelmintic", "Oneirogenic"],
    classification: {
      family: "Asteraceae",
      genus: "Artemisia",
      species: "A. vulgaris",
    },
    growingConditions: {
      sunlight: "Full sun to partial shade",
      soil: "Well-draining, average to poor soil",
      water: "Moderate, drought-tolerant once established",
      temperature: "Temperate climates, hardy to zone 4",
    },
    medicinalUses: [
      "Enhances dreams and promotes lucid dreaming",
      "Relieves digestive issues and stimulates appetite",
      "Regulates menstruation",
      "Calms nervous tension",
      "Treats parasitic infections",
    ],
    homeRemedies: [
      {
        ailment: "Poor digestion",
        preparation: "Steep 1 teaspoon dried mugwort in hot water for 10 minutes",
        usage: "Drink as tea before meals",
      },
      {
        ailment: "Insomnia or restless sleep",
        preparation: "Make a small pillow stuffed with dried mugwort",
        usage: "Place under regular pillow to enhance dreams and improve sleep",
      },
    ],
    historicalSignificance:
      "Mugwort has been used in traditional medicine systems across Europe, Asia, and North America. In European folklore, it was believed to protect travelers from fatigue and evil spirits. In Traditional Chinese Medicine, it's used in moxibustion therapy. Native Americans used it in ceremonial smoking mixtures and as a smudging herb for purification.",
    gardenBenefits: [
      "Repels insects including moths and flies",
      "Improves growth and flavor of vegetables",
      "Attracts beneficial predatory insects",
      "Drought-resistant once established",
    ],
  },
  {
    id: "basil",
    name: "Basil",
    scientificName: "Ocimum basilicum",
    shortDescription: "Aromatic culinary herb with anti-inflammatory and antibacterial properties.",
    description:
      "Basil is an aromatic annual herb with glossy, oval leaves and small white or purple flowers. There are many varieties, each with its own distinctive flavor profile, ranging from sweet to spicy. The plant typically grows to 1-2 feet tall and is widely used in cooking and traditional medicine.",
    image: "/placeholder.svg?height=300&width=400",
    properties: ["Anti-inflammatory", "Antibacterial", "Antioxidant", "Carminative", "Adaptogenic"],
    classification: {
      family: "Lamiaceae",
      genus: "Ocimum",
      species: "O. basilicum",
    },
    growingConditions: {
      sunlight: "Full sun",
      soil: "Rich, moist, well-draining soil",
      water: "Regular watering, keep soil consistently moist",
      temperature: "Warm, not frost tolerant",
    },
    medicinalUses: [
      "Reduces inflammation",
      "Fights bacterial infections",
      "Supports digestive health",
      "Relieves stress and anxiety",
      "Enhances immune function",
    ],
    homeRemedies: [
      {
        ailment: "Digestive discomfort",
        preparation: "Chew fresh basil leaves or steep in hot water",
        usage: "Consume after meals to aid digestion",
      },
      {
        ailment: "Insect bites",
        preparation: "Crush fresh basil leaves to release oils",
        usage: "Apply directly to bites to reduce itching and inflammation",
      },
    ],
    historicalSignificance:
      "Basil has been cultivated for over 5,000 years. In ancient Egypt, it was used in embalming rituals. In ancient Greece and Rome, it was associated with hatred and misfortune, yet later became a symbol of love. In India, basil (especially holy basil or tulsi) is considered sacred and is often planted around Hindu temples. In Italian folklore, basil is a symbol of love.",
    gardenBenefits: [
      "Repels mosquitoes and flies",
      "Improves flavor of tomatoes when planted nearby",
      "Attracts pollinators",
      "Companion plant for many vegetables",
    ],
  },
  {
    id: "ginseng",
    name: "Ginseng",
    scientificName: "Panax ginseng",
    shortDescription: "Adaptogenic root herb that enhances energy and cognitive function.",
    description:
      "Ginseng is a perennial plant with fleshy roots and compound leaves. The root, which resembles the human body in shape, is the primary part used medicinally. It takes several years for the root to mature and develop its full medicinal properties. The plant produces small greenish-white flowers and red berries.",
    image: "/placeholder.svg?height=300&width=400",
    properties: ["Adaptogenic", "Immunomodulatory", "Antioxidant", "Nootropic", "Anti-fatigue"],
    classification: {
      family: "Araliaceae",
      genus: "Panax",
      species: "P. ginseng, P. quinquefolius",
    },
    growingConditions: {
      sunlight: "Partial to full shade",
      soil: "Rich, moist, well-draining soil with high organic content",
      water: "Regular watering, consistent moisture",
      temperature: "Cool to temperate, hardy to zone 4",
    },
    medicinalUses: [
      "Increases energy and reduces fatigue",
      "Enhances cognitive function and memory",
      "Supports immune system function",
      "Helps manage blood sugar levels",
      "Improves sexual function",
    ],
    homeRemedies: [
      {
        ailment: "Fatigue and low energy",
        preparation: "Simmer sliced ginseng root in water for 15-20 minutes",
        usage: "Drink as tea once daily, preferably in the morning",
      },
      {
        ailment: "Poor concentration",
        preparation: "Steep dried ginseng powder in hot water",
        usage: "Drink as tea before mentally demanding tasks",
      },
    ],
    historicalSignificance:
      "Ginseng has been used in traditional Chinese medicine for over 2,000 years and is considered one of the most valuable medicinal plants. It was often reserved for royalty and the wealthy due to its rarity and high cost. In Korean culture, it's regarded as a panacea and has been a major export commodity. Native Americans also used American ginseng for various ailments.",
    gardenBenefits: [
      "Woodland garden specimen",
      "Indicator of healthy forest soil",
      "Can be grown as a long-term investment crop",
      "Thrives in forest garden settings",
    ],
  },
]

export const plantCategories = [
  {
    id: "adaptogenic",
    name: "Adaptogenic Herbs",
    description: "Plants that help the body resist stressors of all kinds",
  },
  { id: "digestive", name: "Digestive Herbs", description: "Plants that aid digestion and treat digestive disorders" },
  {
    id: "respiratory",
    name: "Respiratory Herbs",
    description: "Plants that support lung health and treat respiratory conditions",
  },
  { id: "nervine", name: "Nervine Herbs", description: "Plants that support the nervous system and reduce anxiety" },
  { id: "immune", name: "Immune-Supporting Herbs", description: "Plants that strengthen the immune system" },
  {
    id: "anti-inflammatory",
    name: "Anti-inflammatory Herbs",
    description: "Plants that reduce inflammation in the body",
  },
  { id: "skin", name: "Skin-Healing Herbs", description: "Plants that treat skin conditions and promote healing" },
  { id: "trees", name: "Medicinal Trees", description: "Trees with medicinal properties" },
  { id: "culinary", name: "Culinary Medicinal Herbs", description: "Herbs used both in cooking and medicine" },
]

export const faqItems = [
  {
    question: "What is a virtual herbal garden?",
    answer:
      "A virtual herbal garden is a digital platform that allows users to explore and learn about medicinal plants through interactive 3D models, detailed information, and educational resources. It provides an opportunity to discover the healing properties and botanical characteristics of plants without needing physical access to them.",
  },
  {
    question: "How do I use the 3D models?",
    answer:
      "You can interact with our 3D plant models by clicking and dragging to rotate them, scrolling to zoom in and out, and clicking on the model to view detailed information. The models are designed to be responsive and will expand slightly when you hover over them, giving you a better view of the plant's features.",
  },
  {
    question: "Can I create my own virtual garden?",
    answer:
      "Yes! Our 'Create Your Garden' feature allows you to drag and drop plant models onto a virtual garden space. You can arrange plants according to your preferences and learn how different medicinal plants complement each other when grown together.",
  },
  {
    question: "Are these home remedies safe to try?",
    answer:
      "While we provide traditional home remedies for educational purposes, we recommend consulting with a healthcare professional before trying any herbal remedy, especially if you have existing health conditions, are pregnant or nursing, or are taking medications. Some herbs can interact with medications or may not be suitable for everyone.",
  },
  {
    question: "How accurate are the 3D models?",
    answer:
      "Our 3D models are designed to represent the plants as accurately as possible, showing their key identifying features and growth habits. However, they are simplified representations and may not capture every detail of the real plants. We recommend using the models in conjunction with the written descriptions and images for a complete understanding.",
  },
  {
    question: "Can I contribute to the virtual herbal garden?",
    answer:
      "We're always looking to expand our collection! If you have high-quality images, information, or 3D models of medicinal plants that aren't in our database, please contact us through the form on our website. We value community contributions that help make our virtual garden more comprehensive.",
  },
  {
    question: "How do I search for plants by classification?",
    answer:
      "You can use our advanced search feature to find plants by their scientific classification (family, genus, species), properties, or medicinal uses. Simply select the relevant criteria in the search filters, and the system will display all matching plants in our database.",
  },
  {
    question: "Where can I find more information about growing these plants?",
    answer:
      "Each plant profile includes detailed growing conditions and garden benefits. For more specific cultivation advice, check out our 'Gardening Tips' section, which provides seasonal guidance, companion planting suggestions, and troubleshooting for common growing challenges.",
  },
]

