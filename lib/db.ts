// This is a simple in-memory database implementation
// In a production app, you would use a real database like MongoDB, PostgreSQL, or Supabase

import { plants, plantCategories, faqItems } from "./plants-data"
import { hindiNames, scientificInfo } from "./hindi-names"

// Singleton pattern to ensure we have only one instance of the database
class Database {
  private static instance: Database
  private _plants = plants
  private _categories = plantCategories
  private _faqs = faqItems
  private _hindiNames = hindiNames
  private _scientificInfo = scientificInfo

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  // Plants methods
  public getAllPlants() {
    return this._plants
  }

  public getPlantById(id: string) {
    return this._plants.find((plant) => plant.id === id)
  }

  public getHindiName(id: string): string {
    return this._hindiNames[id] || ""
  }

  public getScientificInfo(id: string) {
    return this._scientificInfo[id] || null
  }

  public searchPlants(query: string, field: "name" | "classification" | "properties" | "uses" = "name") {
    const term = query.toLowerCase()

    switch (field) {
      case "name":
        return this._plants.filter(
          (plant) =>
            plant.name.toLowerCase().includes(term) ||
            plant.scientificName.toLowerCase().includes(term) ||
            (this._hindiNames[plant.id] && this._hindiNames[plant.id].toLowerCase().includes(term)),
        )
      case "classification":
        return this._plants.filter((plant) => {
          const classification = plant.classification
          return (
            classification.family.toLowerCase().includes(term) ||
            classification.subfamily?.toLowerCase().includes(term) ||
            false ||
            classification.genus.toLowerCase().includes(term) ||
            classification.species.toLowerCase().includes(term)
          )
        })
      case "properties":
        return this._plants.filter((plant) => plant.properties.some((prop) => prop.toLowerCase().includes(term)))
      case "uses":
        return this._plants.filter((plant) => plant.medicinalUses.some((use) => use.toLowerCase().includes(term)))
      default:
        return []
    }
  }

  // Categories methods
  public getAllCategories() {
    return this._categories
  }

  // FAQs methods
  public getAllFaqs() {
    return this._faqs
  }

  // Home remedies methods
  public getRemediesByAilment() {
    return this._plants
      .flatMap((plant) =>
        plant.homeRemedies.map((remedy) => ({
          ailment: remedy.ailment,
          plantId: plant.id,
          plantName: plant.name,
          hindiName: this._hindiNames[plant.id] || "",
          plantImage: plant.image,
          preparation: remedy.preparation,
          usage: remedy.usage,
        })),
      )
      .reduce(
        (acc, remedy) => {
          const key = remedy.ailment.toLowerCase()
          if (!acc[key]) {
            acc[key] = []
          }
          acc[key].push(remedy)
          return acc
        },
        {} as Record<
          string,
          Array<{
            ailment: string
            plantId: string
            plantName: string
            hindiName: string
            plantImage: string
            preparation: string
            usage: string
          }>
        >,
      )
  }

  // Get the appropriate 3D model path for a plant
  public getModelPath(id: string) {
    // Map plant IDs to their model files
    const modelMap: Record<string, string> = {
      basil: "/assets/3d/basil.glb",
      rosemary: "/assets/3d/rosemary.glb",
      tulsi: "/assets/3d/tulsi.glb", // Using basil as a placeholder for tulsi
      neem: "/assets/3d/neem.glb", 
      aloevera: "/assets/3d/aloevera.glb",
      // ashwagandha: "/assets/3d/ashwagandha.glb",
      // ajwain: "/assets/3d/ajwain.glb",
      // turmeric: "/assets/3d/turmeric.glb",
      // ginger: "/assets/3d/ginger.glb",
      fenugreek: "/assets/3d/fenugreek.glb",
      birch: "/assets/3d/birch.glb",
      mugwort: "/assets/3d/mugwort.glb",
      ginseng: "/assets/3d/ginseng.glb",
      chamomile: "/assets/3d/chamomile.glb",
      lavender: "/assets/3d/lavender.glb"
    };
    return modelMap[id] || "";
  }

  // Get background gradient for a plant
  public getPlantGradient(id: string): string {
    const gradientMap: Record<string, string> = {
      neem: "bg-gradient-to-br from-herbal-green to-herbal-darkGreen",
      aloevera: "bg-gradient-to-br from-herbal-lightGreen to-herbal-green",
      tulsi: "bg-gradient-to-br from-herbal-green to-herbal-yellow",
      ashwagandha: "bg-gradient-to-br from-herbal-brown to-herbal-orange",
      ajwain: "bg-gradient-to-br from-herbal-yellow to-herbal-orange",
      turmeric: "bg-gradient-to-br from-herbal-orange to-herbal-yellow",
      ginger: "bg-gradient-to-br from-herbal-lightBrown to-herbal-brown",
      fenugreek: "bg-gradient-to-br from-herbal-green to-herbal-lightGreen",
      rosemary: "bg-gradient-to-br from-herbal-darkGreen to-herbal-green",
      birch: "bg-gradient-to-br from-herbal-lightBrown to-herbal-brown",
      mugwort: "bg-gradient-to-br from-herbal-green to-herbal-darkGreen",
      basil: "bg-gradient-to-br from-herbal-lightGreen to-herbal-green",
      ginseng: "bg-gradient-to-br from-herbal-brown to-herbal-lightBrown",
      chamomile: "bg-gradient-to-br from-herbal-yellow to-herbal-lightGreen",
      lavender: "bg-gradient-to-br from-purple-200 to-herbal-lightGreen",
      shatavari: "bg-gradient-to-br from-herbal-green to-herbal-yellow",
      "black-cohosh": "bg-gradient-to-br from-herbal-brown to-herbal-darkGreen",
    }

    return gradientMap[id] || "bg-gradient-to-br from-herbal-green to-herbal-yellow"
  }

  // Get pattern for a plant
  public getPlantPattern(id: string): string {
    const patternMap: Record<string, string> = {
      neem: "plant-pattern-bg",
      aloevera: "leaf-pattern-bg",
      tulsi: "herb-pattern-bg",
      ashwagandha: "plant-pattern-bg",
      ajwain: "herb-pattern-bg",
      turmeric: "leaf-pattern-bg",
      ginger: "herb-pattern-bg",
      fenugreek: "plant-pattern-bg",
      rosemary: "leaf-pattern-bg",
      birch: "plant-pattern-bg",
      mugwort: "herb-pattern-bg",
      basil: "leaf-pattern-bg",
      ginseng: "plant-pattern-bg",
      chamomile: "herb-pattern-bg",
      lavender: "leaf-pattern-bg",
      shatavari: "herb-pattern-bg",
      "black-cohosh": "plant-pattern-bg",
    }

    return patternMap[id] || "plant-pattern-bg"
  }
}

// Export the database instance
export const db = Database.getInstance()

