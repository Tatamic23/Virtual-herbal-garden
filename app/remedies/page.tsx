"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/lib/db"

// Common ailment categories
const ailmentCategories = [
  { id: "digestive", name: "Digestive Issues", icon: "🍃" },
  { id: "respiratory", name: "Respiratory Problems", icon: "🫁" },
  { id: "skin", name: "Skin Conditions", icon: "🌿" },
  { id: "stress", name: "Stress & Anxiety", icon: "🧘" },
  { id: "pain", name: "Pain & Inflammation", icon: "🌱" },
  { id: "sleep", name: "Sleep Problems", icon: "😴" },
  { id: "immune", name: "Immune Support", icon: "🛡️" },
  { id: "women", name: "Women's Health", icon: "💐" },
]

export default function RemediesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Get remedies from database
  const remediesByAilment = db.getRemediesByAilment()

  // Filter remedies based on search and category
  const filteredRemedies = Object.entries(remediesByAilment)
    .filter(([ailment]) => {
      if (searchTerm) {
        return ailment.toLowerCase().includes(searchTerm.toLowerCase())
      }
      if (activeCategory) {
        switch (activeCategory) {
          case "digestive":
            return ["indigestion", "bloating", "gas", "stomach", "digestive", "appetite"].some((term) =>
              ailment.toLowerCase().includes(term),
            )
          case "respiratory":
            return ["cough", "cold", "congestion", "respiratory", "breath", "sinus"].some((term) =>
              ailment.toLowerCase().includes(term),
            )
          case "skin":
            return ["skin", "acne", "eczema", "rash", "burn", "wound"].some((term) =>
              ailment.toLowerCase().includes(term),
            )
          case "stress":
            return ["stress", "anxiety", "tension", "nervous", "calm"].some((term) =>
              ailment.toLowerCase().includes(term),
            )
          case "pain":
            return ["pain", "inflammation", "ache", "arthritis", "joint", "muscle"].some((term) =>
              ailment.toLowerCase().includes(term),
            )
          case "sleep":
            return ["sleep", "insomnia", "restless"].some((term) => ailment.toLowerCase().includes(term))
          case "immune":
            return ["immune", "infection", "cold", "flu", "fever"].some((term) => ailment.toLowerCase().includes(term))
          case "women":
            return ["menstrual", "menopause", "pms", "cramp", "women", "fertility", "milk supply"].some((term) =>
              ailment.toLowerCase().includes(term),
            )
          default:
            return true
        }
      }
      return true
    })
    .sort((a, b) => a[0].localeCompare(b[0]))

  return (
    <div className="min-h-screen bg-gradient-to-b from-herbal-green/20 to-herbal-yellow/20">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" asChild className="mr-4">
                <Link href="/">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <h1 className="text-2xl font-bold text-herbal-brown">Home Remedies</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-herbal-brown mb-4">Find Natural Remedies for Common Ailments</h2>
            <p className="text-gray-700 mb-6">
              Discover traditional home remedies using medicinal plants from our virtual garden. These remedies have
              been used for centuries in traditional medicine systems around the world.
            </p>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search by ailment (e.g., headache, cough, insomnia...)"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    if (e.target.value) setActiveCategory(null)
                  }}
                />
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setActiveCategory(null)
                }}
                className="shrink-0"
              >
                Clear
              </Button>
            </div>
          </div>

          {!searchTerm && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-herbal-brown mb-4">Browse by Category</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {ailmentCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    className={`h-auto py-3 justify-start ${activeCategory === category.id ? "bg-herbal-green hover:bg-herbal-darkGreen" : ""}`}
                    onClick={() => setActiveCategory((prev) => (prev === category.id ? null : category.id))}
                  >
                    <span className="mr-2 text-xl">{category.icon}</span>
                    <span>{category.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {filteredRemedies.length > 0 ? (
              filteredRemedies.map(([ailment, remedies]) => (
                <Card key={ailment} className="overflow-hidden">
                  <CardHeader className="bg-herbal-yellow/20">
                    <CardTitle className="text-lg text-herbal-brown">{remedies[0].ailment}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {remedies.map((remedy, index) => (
                      <div key={index} className={`p-4 flex gap-4 ${index < remedies.length - 1 ? "border-b" : ""}`}>
                        <div className="relative h-16 w-16 flex-shrink-0">
                          <Image
                            src={remedy.plantImage || "/placeholder.svg?height=100&width=100"}
                            alt={remedy.plantName}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="mb-1">
                            <h4 className="font-medium text-herbal-brown">{remedy.plantName}</h4>
                            {remedy.hindiName && <p className="text-xs text-herbal-brown">{remedy.hindiName}</p>}
                          </div>
                          <p className="text-sm text-gray-700 mt-1">
                            <span className="font-medium">Preparation:</span> {remedy.preparation}
                          </p>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Usage:</span> {remedy.usage}
                          </p>
                        </div>
                        <Button
                          asChild
                          size="sm"
                          className="self-start shrink-0 bg-herbal-green hover:bg-herbal-darkGreen"
                        >
                          <Link href={`/plants/${remedy.plantId}`}>View Plant</Link>
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <p className="text-gray-500 mb-2">No remedies found for your search criteria.</p>
                <p className="text-sm text-gray-400">Try a different search term or browse by category.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

