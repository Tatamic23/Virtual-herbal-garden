"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { db } from "@/lib/db"
import Link from "next/link"
import Image from "next/image"

export function SearchDialog({ children }: { children: React.ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("name")
  const [isOpen, setIsOpen] = useState(false)

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([])
      return
    }

    // Improved search function that better matches plant names, Hindi names, and scientific names
    let results = []

    if (activeTab === "name") {
      // Get all plants
      const allPlants = db.getAllPlants()

      // Filter plants based on name, scientific name, or Hindi name
      results = allPlants.filter((plant) => {
        const plantName = plant.name.toLowerCase()
        const scientificName = plant.scientificName.toLowerCase()
        const hindiName = db.getHindiName(plant.id)?.toLowerCase() || ""
        const searchTermLower = searchTerm.toLowerCase()

        return (
          plantName.includes(searchTermLower) ||
          scientificName.includes(searchTermLower) ||
          hindiName.includes(searchTermLower)
        )
      })
    } else {
      // For other tabs use the existing search function
      results = db.searchPlants(searchTerm, activeTab as "name" | "classification" | "properties" | "uses")
    }

    setSearchResults(results)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-herbal-brown mb-4">Search Medicinal Plants</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="name" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="name">Name</TabsTrigger>
            <TabsTrigger value="classification">Classification</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="uses">Uses</TabsTrigger>
          </TabsList>

          <div className="flex gap-2 mb-6">
            <Input
              placeholder={
                activeTab === "name"
                  ? "Search by plant name, Hindi name, or scientific name..."
                  : activeTab === "classification"
                    ? "Search by family, genus, or species..."
                    : activeTab === "properties"
                      ? "Search by properties (e.g., anti-inflammatory)..."
                      : "Search by medicinal uses..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} className="bg-herbal-green hover:bg-herbal-darkGreen">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {searchResults.length > 0 ? (
              searchResults.map((plant) => {
                const hindiName = db.getHindiName(plant.id)
                // Use the actual image path if possible
                const imageSrc = plant.image.startsWith("/placeholder.svg") ? `/images/${plant.id}.jpg` : plant.image

                return (
                  <div key={plant.id} className="flex gap-4 p-3 border rounded-lg hover:bg-herbal-green/10">
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={imageSrc || "/placeholder.svg"}
                        alt={plant.name}
                        fill
                        className="object-cover rounded-md"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=100&width=100"
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="mb-1">
                        <h3 className="font-semibold text-herbal-brown">{plant.name}</h3>
                        {hindiName && <p className="text-xs text-herbal-brown">{hindiName}</p>}
                      </div>
                      <p className="text-xs text-gray-500">{plant.scientificName}</p>
                      <p className="text-sm text-gray-700 line-clamp-2 mt-1">{plant.shortDescription}</p>
                    </div>
                    <Button
                      asChild
                      size="sm"
                      className="self-center bg-herbal-green hover:bg-herbal-darkGreen"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href={`/plants/${plant.id}`}>View</Link>
                    </Button>
                  </div>
                )
              })
            ) : searchTerm ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No plants found matching your search criteria.</p>
                <p className="text-sm text-gray-400 mt-2">Try a different search term or category.</p>
              </div>
            ) : (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Enter a search term to find medicinal plants.</p>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  {db
                    .getAllCategories()
                    .slice(0, 4)
                    .map((category) => (
                      <Button
                        key={category.id}
                        variant="outline"
                        className="text-sm"
                        onClick={() => {
                          setSearchTerm(category.name.split(" ")[0])
                          setActiveTab("properties")
                          handleSearch()
                        }}
                      >
                        {category.name}
                      </Button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

