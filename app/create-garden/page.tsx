"use client"

import { useState, useRef, useEffect, Suspense, use } from "react"
import Link from "next/link"
import type React from "react"
import { ArrowLeft, Info, Trash2, Save, Plus, Minus, RotateCw, Camera, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { db } from "@/lib/db"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment } from "@react-three/drei"
import html2canvas from "html2canvas"
import type * as THREE from "three"

// Preload models to avoid loading issues
const modelFiles = [
  "/assets/3d/basil.glb",
  "/assets/3d/rosemary.glb",
  "/assets/3d/aloevera.glb",
  "/assets/3d/neem.glb",
  "/assets/3d/chamomile.glb",
  "/assets/3d/birch.glb",
  "/assets/3d/fenugreek.glb",
  "/assets/3d/ginseng.glb",
  "/assets/3d/lavender.glb",
  "/assets/3d/mugwort.glb",

  // Add other models as needed
];
modelFiles.forEach((path) => {
  useGLTF.preload(path);
});

// 3D Model component for the plant palette
function PlantModel({ id }: { id: string }) {
  const modelPath = db.getModelPath(id) as string | undefined;
  const gltf = useGLTF(modelPath) as { scene: THREE.Scene };
  const scene = gltf.scene;
  const group = useRef<THREE.Group>(null)
  const [model, setModel] = useState<THREE.Object3D | null>(null)

  // Create a clone of the scene once on mount
  useEffect(() => {
    // Create a deep clone of the scene to avoid sharing
    const clonedScene = scene.clone(true)
    setModel(clonedScene)

    // Cleanup function to dispose of the model when component unmounts
    return () => {
      if (clonedScene) {
        // Recursively dispose of geometries and materials
        clonedScene.traverse((object) => {
          if ((object as any).geometry) (object as any).geometry.dispose()
          if ((object as any).material) {
            if (Array.isArray((object as any).material)) {
              ;(object as any).material.forEach((material: any) => material.dispose())
            } else {
              ;(object as any).material.dispose()
            }
          }
        })
      }
    }
  }, [scene])

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.5
    }
  })

  if (!model) return null

  return (
    <group ref={group}>
      <primitive object={model} scale={1.5} position={[0, -1, 0]} />
    </group>
  )
}

// 3D Model component for placed plants in the garden
function PlacedPlantModel({ id, scale = 1, rotation = 0 }: { id: string; scale?: number; rotation?: number }) {
  const modelPath = db.getModelPath(id) as string | undefined
  if (!modelPath) {
    console.error(`Model path not found for id: ${id}`)
    return null
  }
  const gltf = useGLTF(modelPath)
  const scene = Array.isArray(gltf) ? gltf[0].scene : gltf.scene
  const group = useRef<THREE.Group>(null)
  const [model, setModel] = useState<THREE.Object3D | null>(null)

  // Create a clone of the scene once on mount
  useEffect(() => {
    // Create a deep clone of the scene to avoid sharing
    const clonedScene = scene.clone(true)
    setModel(clonedScene)

    // Cleanup function to dispose of the model when component unmounts
    return () => {
      if (clonedScene) {
        // Recursively dispose of geometries and materials
        clonedScene.traverse((object: any) => {
          if ((object as any).geometry) (object as any).geometry.dispose()
          if ((object as any).material) {
            if (Array.isArray((object as any).material)) {
              ;(object as any).material.forEach((material: any) => material.dispose())
            } else {
              ;(object as any).material.dispose()
            }
          }
        })
      }
    }
  }, [scene])

  useFrame((state) => {
    if (group.current) {
      // Gentle swaying animation
      group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.05
    }
  })

  if (!model) return null

  return (
    <group ref={group} rotation={[0, rotation * (Math.PI / 180), 0]} scale={[scale, scale, scale]}>
      <primitive object={model} position={[0, -1, 0]} />
    </group>
  )
}

// Error boundary for 3D components
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      console.error("Error caught by error boundary:", event.error)
      setHasError(true)
      event.preventDefault()
    }

    window.addEventListener("error", errorHandler)
    return () => window.removeEventListener("error", errorHandler)
  }, [])

  if (hasError) {
    return (
      <div className="flex items-center justify-center h-full bg-red-50 rounded-lg">
        <div className="text-center p-4">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading 3D Model</h3>
          <p className="text-sm text-red-600">
            There was a problem loading the 3D model. Please try refreshing the page.
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

type PlacedPlant = {
  id: string
  plantId: string
  x: number
  y: number
  scale: number
  rotation: number
}

type GardenBackground = "ground" | "balcony" | "terrace" | "custom" | "color"
type BackgroundImage = {
  id: string
  name: string
  url: string
}

export default function CreateGardenPage() {
  const plants = db.getAllPlants()
  const [placedPlants, setPlacedPlants] = useState<PlacedPlant[]>([])
  const [activePlant, setActivePlant] = useState<string | null>(null)
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [showPlantInfo, setShowPlantInfo] = useState(false)
  const [gardenBackground, setGardenBackground] = useState<GardenBackground>("ground")
  const [saveSuccess, setSaveSuccess] = useState(false)
  const gardenRef = useRef<HTMLDivElement>(null)
  const [exportSuccess, setExportSuccess] = useState(false)
  const [customBackgroundColor, setCustomBackgroundColor] = useState("#e9f5db")
  const [customBackgroundImages, setCustomBackgroundImages] = useState<BackgroundImage[]>([
    { id: "garden1", name: "Garden Path", url: "/images/garden-backgrounds/ground.jpg" },
    { id: "balcony1", name: "Wooden Balcony", url: "/images/garden-backgrounds/balcony.jpg" },
    { id: "terrace1", name: "Stone Terrace", url: "/images/garden-backgrounds/terrace.jpg" },
  ])
  const [selectedBackgroundImage, setSelectedBackgroundImage] = useState<string | null>(null)
  const [showResizeControls, setShowResizeControls] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle drag start from plant palette
  const handleDragStart = (e: React.DragEvent, plantId: string) => {
    e.dataTransfer.setData("plantId", plantId)
    setActivePlant(plantId)
  }

  // Handle drop onto garden area
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const plantId = e.dataTransfer.getData("plantId")
    if (!plantId || !gardenRef.current) return

    const rect = gardenRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Add new plant to garden
    const newPlant = {
      id: `plant-${Date.now()}`,
      plantId,
      x,
      y,
      scale: 1,
      rotation: 0,
    }

    setPlacedPlants((prev) => [...prev, newPlant])
    setSelectedPlant(newPlant.id)
    setShowResizeControls(true)
    setActivePlant(null)
  }

  // Allow drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  // Handle plant selection in garden
  const handlePlantClick = (id: string) => {
    if (isDragging) return
    setSelectedPlant((prev) => (prev === id ? null : id))
    setShowPlantInfo(true)
    setShowResizeControls(true)
  }

  // Handle plant movement within garden
  const handlePlantDrag = (e: React.MouseEvent, id: string) => {
    if (!gardenRef.current || selectedPlant !== id) return

    setIsDragging(true)

    const rect = gardenRef.current.getBoundingClientRect()
    const startX = e.clientX
    const startY = e.clientY

    // Find the plant being moved
    const plant = placedPlants.find((p) => p.id === id)
    if (!plant) return

    const startPlantX = plant.x
    const startPlantY = plant.y

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - startX
      const dy = e.clientY - startY

      setPlacedPlants((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                x: Math.max(0, Math.min(rect.width - 100, startPlantX + dx)),
                y: Math.max(0, Math.min(rect.height - 100, startPlantY + dy)),
              }
            : p,
        ),
      )
    }

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      setTimeout(() => setIsDragging(false), 100) // Small delay to prevent immediate click after drag
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  // Scale selected plant
  const scaleSelectedPlant = (increase: boolean) => {
    if (!selectedPlant) return

    setPlacedPlants((prev) =>
      prev.map((p) =>
        p.id === selectedPlant
          ? {
              ...p,
              scale: increase
                ? p.scale + 0.2: p.scale - 0.2, // No maximum limit
            }
          : p,
      ),
    )
  }

  // Rotate selected plant
  const rotateSelectedPlant = () => {
    if (!selectedPlant) return

    setPlacedPlants((prev) =>
      prev.map((p) =>
        p.id === selectedPlant
          ? {
              ...p,
              rotation: (p.rotation + 45) % 360, // Rotate in 45-degree increments
            }
          : p,
      ),
    )
  }

  // Delete selected plant
  const deletePlant = () => {
    if (!selectedPlant) return
    setPlacedPlants((prev) => prev.filter((p) => p.id !== selectedPlant))
    setSelectedPlant(null)
    setShowPlantInfo(false)
    setShowResizeControls(false)
  }

  // Save garden layout
  const saveGarden = () => {
    const gardenData = JSON.stringify(placedPlants)
    localStorage.setItem("savedGarden", gardenData)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2000)
  }

  // Export garden as image
  const exportGardenImage = () => {
    if (!gardenRef.current) return

    try {
      html2canvas(gardenRef.current, {
        allowTaint: true,
        useCORS: true,
        backgroundColor: null,
      })
        .then((canvas) => {
          const link = document.createElement("a")
          link.download = "my-herbal-garden.jpg"
          link.href = canvas.toDataURL("image/jpeg", 0.8)
          link.click()
          setExportSuccess(true)
          setTimeout(() => setExportSuccess(false), 2000)
        })
        .catch((err) => {
          console.error("Error exporting garden:", err)
          alert("There was an error exporting your garden. Please try again.")
        })
    } catch (error) {
      console.error("Error creating garden image:", error)
      alert("There was an error creating your garden image. Please try again.")
    }
  }

  // Load garden layout
  useEffect(() => {
    const savedGarden = localStorage.getItem("savedGarden")
    if (savedGarden) {
      try {
        setPlacedPlants(JSON.parse(savedGarden))
      } catch (e) {
        console.error("Failed to load saved garden:", e)
      }
    }
  }, [])

  // Handle file input for custom background images
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const url = reader.result as string
      const newImage = {
        id: `custom-${Date.now()}`,
        name: file.name.split(".")[0] || "Custom Background",
        url: url,
      }

      setCustomBackgroundImages((prev) => [...prev, newImage])
      setSelectedBackgroundImage(newImage.id)
      setGardenBackground("custom")
    }

    reader.readAsDataURL(file)
  }

  // Get background style based on selected garden type
  const getBackgroundStyle = () => {
    switch (gardenBackground) {
      case "ground":
        return { backgroundColor: "#e9f5db" }
      case "balcony":
        return { backgroundColor: "#f0ead2" }
      case "terrace":
        return { backgroundColor: "#dde5b6" }
      case "color":
        return { backgroundColor: customBackgroundColor }
      case "custom":
        if (selectedBackgroundImage) {
          const bgImage = customBackgroundImages.find((img) => img.id === selectedBackgroundImage)
          if (bgImage) {
            return {
              backgroundImage: `url(${bgImage.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          }
        }
        return { backgroundColor: "#f8f9fa" }
      default:
        return { backgroundColor: "#f8f9fa" }
    }
  }

  // Get plant data from id
  const getPlantData = (plantId: string) => {
    return plants.find((p) => p.id === plantId) || null
  }

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
              <h1 className="text-2xl font-bold text-herbal-brown">Create Your Garden</h1>
            </div>
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={saveGarden}
                      className={saveSuccess ? "bg-green-100" : ""}
                    >
                      {saveSuccess ? <Check className="h-5 w-5 text-green-600" /> : <Save className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Save Garden Layout</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={exportGardenImage}
                      className={exportSuccess ? "bg-green-100" : ""}
                    >
                      {exportSuccess ? <Check className="h-5 w-5 text-green-600" /> : <Camera className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Export as Image</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Info className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>How to Use the Garden Creator</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-sm">
                    <p>1. Drag plants from the left panel into the garden area.</p>
                    <p>2. Click on a placed plant to select it.</p>
                    <p>3. Drag selected plants to reposition them.</p>
                    <p>4. Use the controls to resize, rotate, or delete selected plants.</p>
                    <p>5. Save your garden to return to it later or export as an image.</p>
                    <p>6. Choose different garden backgrounds from the settings.</p>
                    <p className="font-medium mt-4">Tips for a Healthy Herbal Garden:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Group plants with similar water and sunlight needs together.</li>
                      <li>Consider companion planting benefits between herbs.</li>
                      <li>Allow enough space between plants for proper growth.</li>
                      <li>Place taller plants where they won't shade smaller ones.</li>
                    </ul>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Plant Palette */}
          <div className="md:col-span-1">
            <Tabs defaultValue="plants">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="plants">Plants</TabsTrigger>
                <TabsTrigger value="backgrounds">Backgrounds</TabsTrigger>
              </TabsList>

              <TabsContent value="plants" className="bg-white rounded-xl shadow-sm p-4 h-[600px] overflow-y-auto">
                <h2 className="text-xl font-semibold text-herbal-brown mb-4">Plant Palette</h2>
                <Tabs defaultValue="all">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="herbs">Herbs</TabsTrigger>
                    <TabsTrigger value="trees">Trees</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-3">
                    {plants.map((plant) => (
                      <div
                        key={plant.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, plant.id)}
                        className="flex items-center gap-3 p-2 border rounded-lg cursor-grab hover:bg-herbal-green/10"
                      >
                        <div className="h-16 w-16 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden">
                          <ErrorBoundary>
                            <Canvas>
                              <ambientLight intensity={0.5} />
                              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                              <Suspense fallback={null}>
                                <PlantModel id={plant.id} />
                                <Environment preset="forest" />
                                <OrbitControls enableZoom={false} enablePan={false} />
                              </Suspense>
                            </Canvas>
                          </ErrorBoundary>
                        </div>
                        <div>
                          <p className="font-medium text-sm text-herbal-brown">{plant.name}</p>
                          <p className="text-xs text-gray-500">{db.getHindiName(plant.id) || plant.scientificName}</p>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="herbs" className="space-y-3">
                    {plants
                      .filter((p) => !p.id.includes("tree"))
                      .map((plant) => (
                        <div
                          key={plant.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, plant.id)}
                          className="flex items-center gap-3 p-2 border rounded-lg cursor-grab hover:bg-herbal-green/10"
                        >
                          <div className="h-16 w-16 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden">
                            <ErrorBoundary>
                              <Canvas>
                                <ambientLight intensity={0.5} />
                                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                                <Suspense fallback={null}>
                                  <PlantModel id={plant.id} />
                                  <Environment preset="forest" />
                                  <OrbitControls enableZoom={false} enablePan={false} />
                                </Suspense>
                              </Canvas>
                            </ErrorBoundary>
                          </div>
                          <div>
                            <p className="font-medium text-sm text-herbal-brown">{plant.name}</p>
                            <p className="text-xs text-gray-500">{db.getHindiName(plant.id) || plant.scientificName}</p>
                          </div>
                        </div>
                      ))}
                  </TabsContent>

                  <TabsContent value="trees" className="space-y-3">
                    {plants
                      .filter((p) => p.id.includes("tree") || p.id === "birch" || p.id ==="neem")
                      .map((plant) => (
                        <div
                          key={plant.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, plant.id)}
                          className="flex items-center gap-3 p-2 border rounded-lg cursor-grab hover:bg-herbal-green/10"
                        >
                          <div className="h-16 w-16 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden">
                            <ErrorBoundary>
                              <Canvas>
                                <ambientLight intensity={0.5} />
                                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                                <Suspense fallback={null}>
                                  <PlantModel id={plant.id} />
                                  <Environment preset="forest" />
                                  <OrbitControls enableZoom={false} enablePan={false} />
                                </Suspense>
                              </Canvas>
                            </ErrorBoundary>
                          </div>
                          <div>
                            <p className="font-medium text-sm text-herbal-brown">{plant.name}</p>
                            <p className="text-xs text-gray-500">{db.getHindiName(plant.id) || plant.scientificName}</p>
                          </div>
                        </div>
                      ))}
                  </TabsContent>
                </Tabs>
              </TabsContent>

              <TabsContent value="backgrounds" className="bg-white rounded-xl shadow-sm p-4 h-[600px] overflow-y-auto">
                <h2 className="text-xl font-semibold text-herbal-brown mb-4">Background Options</h2>

                <div className="space-y-6">
                  {/* Preset Backgrounds */}
                  <div>
                    <h3 className="text-md font-semibold text-herbal-brown mb-3">Preset Backgrounds</h3>
                  </div>

                  {/* Custom Color */}
                  <div>
                    <h3 className="text-md font-semibold text-herbal-brown mb-3">Custom Color</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="color"
                        value={customBackgroundColor}
                        onChange={(e) => setCustomBackgroundColor(e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer"
                      />
                      <Input
                        value={customBackgroundColor}
                        onChange={(e) => setCustomBackgroundColor(e.target.value)}
                        placeholder="#e9f5db"
                        className="w-24"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setGardenBackground("color")
                        }}
                      >
                        Apply Color
                      </Button>
                    </div>
                  </div>

                  {/* Custom Image Backgrounds */}
                  <div>
                    <h3 className="text-md font-semibold text-herbal-brown mb-3">Image Backgrounds</h3>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {customBackgroundImages.map((bg) => (
                        <div
                          key={bg.id}
                          className={`relative cursor-pointer border-2 rounded-md overflow-hidden ${
                            selectedBackgroundImage === bg.id && gardenBackground === "custom"
                              ? "border-herbal-green"
                              : "border-transparent"
                          }`}
                          onClick={() => {
                            setSelectedBackgroundImage(bg.id)
                            setGardenBackground("custom")
                          }}
                        >
                          <div className="relative h-20">
                            <img
                              src={bg.url || "/placeholder.svg"}
                              alt={bg.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-xs p-1 bg-white/80 text-center truncate">{bg.name}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full"
                      >
                        Upload Custom Background
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Garden Canvas */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <div
              ref={gardenRef}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className={`bg-white rounded-xl shadow-sm p-4 h-[600px] relative overflow-visible ${
                gardenBackground === "ground"
                  ? "garden-ground"
                  : gardenBackground === "balcony"
                    ? "balcony-ground"
                    : gardenBackground === "terrace"
                      ? "terrace-ground"
                      : ""
              }`}
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                ...getBackgroundStyle(),
              }}
            >
              {/* Placed plants */}
              {placedPlants.map((plant) => {
                const plantData = getPlantData(plant.plantId)
                if (!plantData) return null

                const hindiName = db.getHindiName(plant.plantId)

                return (
                  <div
                    key={plant.id}
                    className={`absolute ${selectedPlant === plant.id ? "z-10" : "z-1"}`}
                    style={{
                      left: `${plant.x}px`,
                      top: `${plant.y}px`,
                      width: "300px",
                    }}
                  >
                    <div
                      className={`cursor-move relative ${selectedPlant === plant.id ? "" : ""}`}
                      onClick={() => handlePlantClick(plant.id)}
                      onMouseDown={(e) => handlePlantDrag(e, plant.id)}
                    >
                      <div className="w-full h-[300px]">
                        <ErrorBoundary>
                          <Canvas>
                            <ambientLight intensity={0.7} />
                            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                            <Suspense fallback={null}>
                              <PlacedPlantModel id={plant.plantId} scale={plant.scale} rotation={plant.rotation} />
                              <Environment preset="forest" />
                            </Suspense>
                          </Canvas>
                        </ErrorBoundary>
                      </div>

                      {/* Plant info label */}
                      {/* <div className="bg-white/90 rounded-b-md p-2 text-center shadow-sm">
                        <p className="font-medium text-sm text-herbal-brown truncate">{plantData.name}</p>
                        {hindiName && <p className="text-xs text-herbal-brown truncate">{hindiName}</p>}
                        <Button asChild variant="link" className="text-xs h-6 p-0 mt-1">
                          <Link href={`/plants/${plant.plantId}`} target="_blank">
                            View Details
                          </Link>
                        </Button>
                      </div> */}
                    </div>
                  </div>
                )
              })}

              {/* Empty state */}
              {placedPlants.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm rounded-xl">
                  <div className="text-center p-6 bg-white/80 rounded-lg max-w-md">
                    <h3 className="text-xl font-semibold text-herbal-brown mb-2">Create Your Herbal Garden</h3>
                    <p className="text-gray-700 mb-4">
                      Drag plants from the palette on the left and drop them here to start designing your garden.
                    </p>
                    <p className="text-sm text-gray-500">
                      Consider companion planting and growing conditions for an optimal garden layout.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex justify-between">
              <div className="flex gap-2">
                {showResizeControls && selectedPlant && (
                  <>
                    <Button variant="outline" size="sm" onClick={() => scaleSelectedPlant(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Increase Size
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => scaleSelectedPlant(false)}>
                      <Minus className="h-4 w-4 mr-2" />
                      Decrease Size
                    </Button>
                    <Button variant="outline" size="sm" onClick={rotateSelectedPlant}>
                      <RotateCw className="h-4 w-4 mr-2" />
                      Rotate
                    </Button>
                    <Button variant="destructive" size="sm" onClick={deletePlant}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </>
                )}
              </div>

              {/* Plant information */}
              {selectedPlant && showPlantInfo && (
                <Card className="w-full max-w-md">
                  <CardContent className="p-4">
                    {(() => {
                      const plant = placedPlants.find((p) => p.id === selectedPlant)
                      if (!plant) return null

                      const plantData = plants.find((p) => p.id === plant.plantId)
                      if (!plantData) return null

                      const hindiName = db.getHindiName(plant.plantId)

                      return (
                        <div className="flex gap-4">
                          <div className="h-16 w-16 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden">
                            <ErrorBoundary>
                              <Canvas>
                                <ambientLight intensity={0.5} />
                                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                                <Suspense fallback={null}>
                                  <PlantModel id={plant.plantId} />
                                  <Environment preset="forest" />
                                </Suspense>
                              </Canvas>
                            </ErrorBoundary>
                          </div>
                          <div>
                            <h3 className="font-semibold text-herbal-brown">{plantData.name}</h3>
                            {hindiName && <p className="text-xs text-herbal-brown">{hindiName}</p>}
                            <p className="text-xs text-gray-500 mb-2">{plantData.scientificName}</p>
                            <div className="text-xs text-gray-700">
                              <p>
                                <span className="font-medium">Garden Benefits:</span>
                              </p>
                              <ul className="list-disc pl-4 mt-1">
                                {plantData.gardenBenefits.slice(0, 2).map((benefit, i) => (
                                  <li key={i}>{benefit}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 ml-auto"
                            onClick={() => setShowPlantInfo(false)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )
                    })()}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Instructions for adding GLB files */}
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-white">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-herbal-brown mb-4">Adding Custom 3D Model Files to Your Project</h2>

            <div className="space-y-4">
              <p>Follow these steps to add your own .glb model files to replace the placeholder duck models:</p>

              <div className="space-y-2">
                <h3 className="font-semibold text-herbal-brown">Step 1: Prepare your GLB files</h3>
                <p className="text-gray-700">
                  Ensure your 3D models are exported in GLB format from tools like Blender, Maya, or other 3D modeling
                  software. Optimize your models for web by keeping them under 5MB and with reduced polygon count.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-herbal-brown">Step 2: Add files to your project</h3>
                <p className="text-gray-700">
                  Place your .glb files in the <code className="bg-gray-100 px-1 rounded">public</code> directory of
                  your project. For example, if you have a model for mint, save it as{" "}
                  <code className="bg-gray-100 px-1 rounded">public/mint.glb</code>
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-herbal-brown">Step 3: Update the model mapping</h3>
                <p className="text-gray-700">
                  Open <code className="bg-gray-100 px-1 rounded">lib/db.ts</code> and find the{" "}
                  <code className="bg-gray-100 px-1 rounded">getModelPath</code> method. Update the{" "}
                  <code className="bg-gray-100 px-1 rounded">modelMap</code> object to include your new model:
                </p>
                <pre className="bg-gray-100 p-3 rounded overflow-auto text-sm">
                  {/* {const modelMap: Record<string, string> = {
                      basil: "/basil.glb",
                      rosemary: "/rosemary.glb",
                      tulsi: "/tulsi.glb", 
                      neem: "/neem.glb", 
                      birch: "/birch.glb",
                      aloevera: "/aloevera.glb",
                      chamomile: "/chamomile.glb",
                      lavender: "/lavender.glb",
                      fenugreek: "/fenugreek.glb",
                      ginseng: "/ginseng.glb",
                      mugwort: "/mugwort.glb"
}} */}
                </pre>
              </div>

              <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <h3 className="font-semibold text-herbal-brown">Tips for working with 3D models:</h3>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Ensure models are properly centered at origin point (0,0,0)</li>
                  <li>Apply proper scaling to your models before export</li>
                  <li>Test models individually before adding them to the project</li>
                  <li>Use compressed textures when possible to improve performance</li>
                  <li>Consider using level-of-detail (LOD) for complex models</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

