"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Info, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { db } from "@/lib/db"
import { SearchDialog } from "@/components/search-dialog"
import { useRef } from "react"

export default function HomePage() {
  const plants = db.getAllPlants()
  const faqItems = db.getAllFaqs()
  const scrollRef = useRef<HTMLDivElement>(null)

  // Scroll functionality for plant carousel
  const scrollPlantsBy = (direction: "left" | "right") => {
    if (!scrollRef.current) return

    const scrollAmount = 300
    const currentScroll = scrollRef.current.scrollLeft
    const newScroll = direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount

    scrollRef.current.scrollTo({
      left: newScroll,
      behavior: "smooth",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-herbal-green/20 to-herbal-yellow/20">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-herbal-brown">Virtual Herbal Garden</h1>
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                <li>
                  <Link href="/" className="text-herbal-brown hover:text-herbal-green font-medium">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-herbal-brown hover:text-herbal-green font-medium">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#plants" className="text-herbal-brown hover:text-herbal-green font-medium">
                    Plants
                  </Link>
                </li>
                <li>
                  <Link href="/create-garden" className="text-herbal-brown hover:text-herbal-green font-medium">
                    Create Garden
                  </Link>
                </li>
                <li>
                  <Link href="/remedies" className="text-herbal-brown hover:text-herbal-green font-medium">
                    Home Remedies
                  </Link>
                </li>
              </ul>
            </nav>
            <Button variant="outline" className="md:hidden">
              <Info className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section id="hero" className="py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-herbal-brown mb-6">
              Explore the World of Medicinal Herbs
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Discover the healing properties and botanical wonders of medicinal plants through interactive 3D models
              and detailed information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-herbal-green hover:bg-herbal-darkGreen text-white">
                <a href="#plants">Explore Plants</a>
              </Button>
              <SearchDialog>
                <Button variant="outline" className="gap-2">
                  <Search className="h-4 w-4" />
                  Search Plants
                </Button>
              </SearchDialog>
            </div>
          </div>
        </section>

        <section id="about" className="py-12 bg-white rounded-xl shadow-sm mb-12">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-herbal-brown mb-6">About Our Virtual Garden</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 mb-4">
                  Our Virtual Herbal Garden is an educational platform designed to help you learn about medicinal herbs
                  and their properties. We provide detailed information about each plant, including its uses, growing
                  conditions, and historical significance.
                </p>
                <p className="text-gray-700 mb-4">
                  What makes our platform unique is the interactive 3D models that allow you to examine each plant from
                  every angle, giving you a comprehensive understanding of its structure and characteristics.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-herbal-brown mb-3">Our Mission</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Educate people about the healing properties of medicinal herbs</li>
                  <li>Preserve traditional knowledge about herbal remedies</li>
                  <li>Provide accurate botanical information through interactive 3D models</li>
                  <li>Inspire a deeper connection with the plant world</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="plants" className="py-12">
          <h2 className="text-3xl font-bold text-herbal-brown mb-8 text-center">Explore Our Herbal Collection</h2>

          <div className="relative">
            <div ref={scrollRef} className="overflow-x-auto pb-4 hide-scrollbar">
              <div className="flex space-x-6 px-4 min-w-full">
                {plants.map((plant) => {
                  const hindiName = db.getHindiName(plant.id)
                  // Use the actual image path if it exists, otherwise use placeholder
                  const imageSrc = plant.image.startsWith("/placeholder.svg") ? `/images/${plant.id}.jpg` : plant.image

                  return (
                    <Card
                      key={plant.id}
                      className="min-w-[280px] max-w-[280px] bg-white shadow-md hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-0">
                        <div className="relative h-48 w-full">
                          <Image
                            src={imageSrc || "/placeholder.svg"}
                            alt={plant.name}
                            fill
                            className="object-cover rounded-t-lg"
                            onError={(e) => {
                              // Fallback to placeholder if image doesn't exist
                              ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=300&width=400"
                            }}
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col items-start p-4">
                        <div className="mb-2">
                          <h3 className="font-semibold text-lg text-herbal-brown">{plant.name}</h3>
                          {hindiName && <p className="text-sm text-herbal-brown">{hindiName}</p>}
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{plant.shortDescription}</p>
                        <Button asChild className="bg-herbal-green hover:bg-herbal-darkGreen text-white w-full">
                          <Link href={`/plants/${plant.id}`}>View 3D Model</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
            </div>

            <div className="absolute top-1/2 left-0 -translate-y-1/2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white shadow-md h-10 w-10"
                onClick={() => scrollPlantsBy("left")}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>

            <div className="absolute top-1/2 right-0 -translate-y-1/2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white shadow-md h-10 w-10"
                onClick={() => scrollPlantsBy("right")}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </section>

        <section id="faq" className="py-12 bg-white rounded-xl shadow-sm mb-12">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-herbal-brown mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <h3 className="text-xl font-semibold text-herbal-brown mb-2">{item.question}</h3>
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-herbal-brown text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Virtual Herbal Garden</h3>
              <p className="text-herbal-yellow/90">
                Exploring the world of medicinal herbs through interactive 3D models.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-herbal-yellow/90 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <a href="#about" className="text-herbal-yellow/90 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#plants" className="text-herbal-yellow/90 hover:text-white">
                    Plants
                  </a>
                </li>
                <li>
                  <Link href="/create-garden" className="text-herbal-yellow/90 hover:text-white">
                    Create Garden
                  </Link>
                </li>
                <li>
                  <Link href="/remedies" className="text-herbal-yellow/90 hover:text-white">
                    Home Remedies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <p className="text-herbal-yellow/90">Email: info@virtualherbal.example</p>
            </div>
          </div>
          <div className="border-t border-herbal-green/30 mt-8 pt-6 text-center text-herbal-yellow/90">
            <p>&copy; {new Date().getFullYear()} Virtual Herbal Garden. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

