"use client"

import type React from "react"
import { useState, useRef, Suspense, useEffect, use } from "react"

// Extend the Window interface to include rotationTimer
declare global {
  interface Window {
    rotationTimer?: ReturnType<typeof setTimeout>;
  }
}
import Link from "next/link"
import { ArrowLeft, X, Info, Leaf, Dna } from "lucide-react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { db } from "@/lib/db" // Assuming db is correctly set up
import * as THREE from "three"
// Removed 'use' import as it's no longer needed here
// import { use } from 'react';

// Custom cursor component
function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setVisible(true)
      const handleMouseLeave = () => setVisible(false)

      // Debounce adding listeners slightly to ensure canvas exists
      const timerId = setTimeout(() => {
        window.addEventListener("mousemove", updatePosition)
        const canvasElement = document.querySelector("canvas")
        canvasElement?.addEventListener("mouseenter", handleMouseEnter)
        canvasElement?.addEventListener("mouseleave", handleMouseLeave)
      }, 100)

      return () => {
        clearTimeout(timerId)
        window.removeEventListener("mousemove", updatePosition)
        const canvasElement = document.querySelector("canvas")
        canvasElement?.removeEventListener("mouseenter", handleMouseEnter)
        canvasElement?.removeEventListener("mouseleave", handleMouseLeave)
      }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed w-4 h-4 rounded-full bg-herbal-green opacity-70 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: position.x,
        top: position.y,
        boxShadow: "0 0 10px 2px rgba(146, 212, 131, 0.6)",
      }}
    />
  )
}

// Sparkle particle effect for rotation interactions
function SparkleParticles({ active = true, color = "#92d483", count = 50 }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const { camera } = useThree()
  const [particles, setParticles] = useState<{ position: THREE.Vector3; velocity: THREE.Vector3; life: number }[]>([])
  const dummy = useRef(new THREE.Object3D())
  const lastRotation = useRef(0); // Keep track of camera rotation for effect trigger

  // Initialize particles
  useEffect(() => {
    if (!mesh.current) return

    // Create particles in a sphere around the model
    // Create particles in a sphere around the model
const newParticles = Array.from({ length: count }, () => {
  const theta = Math.random() * Math.PI * 2
  const phi = Math.acos(2 * Math.random() - 1)
  const r = 2 + Math.random() * 1 // Adjust radius as needed

  const x = r * Math.sin(phi) * Math.cos(theta)
  const y = r * Math.sin(phi) * Math.sin(theta)
  const z = r * Math.cos(phi)

  return {
    position: new THREE.Vector3(x, y, z),
    velocity: new THREE.Vector3(
      (Math.random() - 0.5) * 0.01,
      (Math.random() - 0.5) * 0.01,
      (Math.random() - 0.5) * 0.01
    ),
    life: Math.random(),
  }
})

setParticles(newParticles)

// Position all particles initially
newParticles.forEach((particle, i) => {
  dummy.current.position.copy(particle.position)
  dummy.current.updateMatrix()
  mesh.current?.setMatrixAt(i, dummy.current.matrix)
})

if (mesh.current) {
  mesh.current.instanceMatrix.needsUpdate = true
}
  }, [count]) // Re-initialize if count changes

  // Animate particles
  useFrame((state, delta) => {
    if (!mesh.current || !active) return // Only animate if active

    // Update and animate each particle
    const updatedParticles = particles.map((particle) => {
      particle.position.add(particle.velocity)
      particle.life -= 0.01
    
      if (particle.life <= 0) {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const r = 2 + Math.random() * 1
    
        particle.position.set(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
        particle.velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        )
        particle.life = Math.random()
      }
    
      return particle
    })
    
    updatedParticles.forEach((particle, i) => {
      dummy.current.position.copy(particle.position)
      dummy.current.scale.setScalar(Math.max(0, particle.life * 0.5))
      dummy.current.updateMatrix()
      mesh.current!.setMatrixAt(i, dummy.current.matrix)
    })
    
    mesh.current.instanceMatrix.needsUpdate = true
    setParticles(updatedParticles)
  })



  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 8, 8]} /> {/* Small sphere for particles */}
      {/* Using meshBasicMaterial as lighting is simple here */}
      <meshBasicMaterial color={color} transparent opacity={0.6} depthWrite={false} />
       {/* Removed pointLight from inside meshBasicMaterial, it doesn't belong there */}
    </instancedMesh>
  )
}

// Particle system for hover/click effects
function Particles({ count = 200, color = "#92d483", active = true }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const dummy = useRef(new THREE.Object3D())
  const particlesData = useRef<
    { position: THREE.Vector3; velocity: THREE.Vector3; acceleration: THREE.Vector3; life: number }[]
  >([])

  // Initialize particles
  useEffect(() => {
    if (!mesh.current) return

    particlesData.current = Array.from({ length: count }, () => ({
      position: new THREE.Vector3((Math.random() - 0.5) * 2, Math.random() * 2, (Math.random() - 0.5) * 2),
      velocity: new THREE.Vector3(0, 0, 0),
      acceleration: new THREE.Vector3((Math.random() - 0.5) * 0.001, Math.random() * 0.001, (Math.random() - 0.5) * 0.001),
      life: Math.random(),
    }))
    
    particlesData.current.forEach((particle, i) => {
      dummy.current.position.copy(particle.position)
      dummy.current.scale.setScalar(Math.max(0, particle.life * 0.5))
      dummy.current.updateMatrix()
      mesh.current?.setMatrixAt(i, dummy.current.matrix)
    })
    
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true
    }
  }, [count]) // Re-initialize if count changes

  // Animate particles
  useFrame(() => {
    if (!mesh.current || !active) {
        // Optionally reset particles when inactive if desired
        if (mesh.current && particlesData.current.length > 0) {
        //     // Code to reset positions/velocities if needed when !active
                mesh.current.instanceMatrix.needsUpdate = true;
        }
        return;
    }


    particlesData.current.forEach((particle, i) => {
      particle.velocity.add(particle.acceleration)
      particle.position.add(particle.velocity)
      particle.life -= 0.005
    
      if (particle.life <= 0) {
        particle.position.set((Math.random() - 0.5) * 2, Math.random() * 2, (Math.random() - 0.5) * 2)
        particle.velocity.set(0, 0, 0)
        particle.acceleration.set((Math.random() - 0.5) * 0.001, Math.random() * 0.001, (Math.random() - 0.5) * 0.001)
        particle.life = 1
      }
    
      dummy.current.position.copy(particle.position)
      dummy.current.scale.setScalar(Math.max(0, particle.life * 0.5))
      dummy.current.updateMatrix()
      mesh.current?.setMatrixAt(i, dummy.current.matrix)
    })
    
    mesh.current.instanceMatrix.needsUpdate = true
  })

    // Don't render if not active
    if (!active) return null

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 8, 8]} /> {/* Particle geometry */}
      <meshBasicMaterial color={color} transparent opacity={0.6} depthWrite={false} /> {/* Particle material */}
    </instancedMesh>
  )
}


// Component to load and display the GLTF plant model
function PlantModelLoader({ modelPath, onClick }: { modelPath: string; onClick: () => void }) {
    const group = useRef<THREE.Group>(null);
    const gltf = useGLTF(modelPath); // Load the model
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [growthScale, setGrowthScale] = useState(1); // For click animation
    const [isRotating, setIsRotating] = useState(false); // State for sparkle effect
    const lastRotation = useRef(0);
    const { camera, controls } = useThree(); // Get camera and controls

    // Effect to track camera rotation via OrbitControls change event
    useEffect(() => {
        const orbitControls = controls as unknown as (THREE.EventDispatcher & { target: THREE.Vector3, update: () => void,addEventListener:(type: string, listener: (event: any) => void)=>void, removeEventListener:(type: string, listener: (event: any) => void)=>void}); // Cast controls

        if (!orbitControls) return

const handleControlChange = () => {
  const currentYRotation = camera.rotation.y
  const delta = Math.abs(currentYRotation - lastRotation.current)

  if (delta > 0.005) {
    setIsRotating(true)
    lastRotation.current = currentYRotation
    clearTimeout(window.rotationTimer)
    window.rotationTimer = setTimeout(() => {
      setIsRotating(false)
    }, 500)
  }
}

orbitControls.addEventListener("change", handleControlChange)

return () => {
  orbitControls.removeEventListener("change", handleControlChange)
  clearTimeout(window.rotationTimer)
}
    }, [controls, camera]); // Depend on controls and camera


  // Growth animation on click
  useEffect(() => {
    let growInterval: NodeJS.Timeout | undefined;
    if (clicked) {
      growInterval = setInterval(() => {
        setGrowthScale((prev) => {
          if (prev < 1.1) return prev + 0.005; // Grow slightly
          clearInterval(growInterval);
          return 1.1; // Max grow scale
        });
      }, 30); // Animation speed
    } else {
      // Optionally animate shrinking back, or just snap back
      setGrowthScale(1); // Reset scale when not clicked
    }
    return () => clearInterval(growInterval); // Cleanup interval
  }, [clicked]);

  // Gentle swaying animation + hover bobbing
  useFrame((state) => {
    if (group.current) {
      // Gentle sway using sine wave on Y rotation
      group.current.rotation.y += Math.sin(state.clock.getElapsedTime() * 0.5) * 0.001;

      // Bob up and down slightly when hovered
      if (hovered) {
        group.current.position.y = Math.sin(state.clock.getElapsedTime() * 3) * 0.05 - 3
      } else {
        group.current.position.y = -3
      }
    
      group.current.scale.set(growthScale, growthScale, growthScale)
    }
  });

  // Ensure GLTF scene is loaded
   if (!gltf || !gltf.scene) {
       // Optional: Render a placeholder or null while loading, handled by Suspense generally
       return null;
   }

  return (
    <group
      ref={group}
      onClick={(e) => {
        e.stopPropagation(); // Prevent event bubbling
        setClicked(!clicked); // Toggle clicked state
        onClick(); // Call the passed onClick handler (e.g., to show details)
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "none"; // Use custom cursor
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
         // Don't reset clicked state on pointer out
        document.body.style.cursor = "auto"; // Restore default cursor
      }}
      dispose={null} // Prevent auto-disposal if needed elsewhere
    >
      {/* Adjust scale and position as needed for your model */}
      <primitive object={gltf.scene} scale={3} position={[0, 2, 0]} />
      {/* Attach particle effects */}
      <Particles active={hovered || clicked} />
      <SparkleParticles active={isRotating} color="#ffd786" />
    </group>
  );
}


// Error boundary specific to 3D rendering issues
function ModelErrorBoundary({ children }: { children: React.ReactNode }) {
    const [hasError, setHasError] = useState(false);
    const [errorInfo, setErrorInfo] = useState<any>(null); // Store error info if needed

    useEffect(() => {
        // This catches errors specifically within the boundary during rendering
        const componentDidCatch = (error: Error, errorInfo: React.ErrorInfo) => {
            console.error("3D Model Error Boundary Caught:", error, errorInfo);
            setHasError(true);
            setErrorInfo(errorInfo); // Optionally store more info
        };

        // Simulate componentDidCatch with useEffect for functional components
        // Note: React's official ErrorBoundary class component is more robust for this.
        // This is a basic functional equivalent. For complex cases, consider a class component.
        // This effect setup might not catch all render-phase errors perfectly.

        // A generic window error listener can act as a fallback, but might be too broad.
        const genericErrorHandler = (event: ErrorEvent) => {
             // Check if the error originates from within your Canvas/3D components
             // This check is basic and might need refinement based on error details
             if (event.message.includes('WebGL') || event.message.includes('Three')) {
                 console.error("Generic Error Handler Caught Possible 3D Error:", event.error);
                 setHasError(true);
                 // Prevent default console error if handled
                 // event.preventDefault();
             }
        };

        window.addEventListener("error", genericErrorHandler)

        return () => {
          window.removeEventListener("error", genericErrorHandler)
        }
    }, []);


    if (hasError) {
        return (
            <div className="flex items-center justify-center h-full bg-red-50 rounded-lg p-4">
                <div className="text-center">
                <h3 className="text-lg font-semibold text-red-700 mb-2">Oops! 3D Model Error</h3>
                <p className="text-sm text-red-600">
                    Something went wrong while loading the model. Please try refreshing.
                </p>
                 {/* Optionally show more details for debugging */}
                 {/* {errorInfo && <pre className="text-xs text-left mt-2 bg-red-100 p-2 overflow-auto">{JSON.stringify(errorInfo, null, 2)}</pre>} */}
                </div>
            </div>
        );
    }

    return <>{children}</>;
}


// Preload models (Keep this outside the component at the module level)
// Ensure these paths are correct relative to your public folder
const modelFiles = [
    "/assets/3d/basil.glb", "/assets/3d/rosemary.glb", "/assets/3d/aloevera.glb", "/assets/3d/birch.glb",
    "/assets/3d/chamomile.glb", "/assets/3d/fenugreek.glb", "/assets/3d/ginseng.glb", "/assets/3d/lavender.glb",
    "/assets/3d/mugwort.glb", "/assets/3d/neem.glb"
];
modelFiles.forEach((path) => {
  useGLTF.preload(path);
});


// Main Page Component
export default function PlantDetailPage({ params }: { params: { id: string } }) {
  // --- Corrected Parameter Handling (using React.use as recommended by Next.js >= 14.2) ---
  const resolvedParams = use(params); // Unwrap the params promise provided by Next.js
  const { id } = resolvedParams;
  // --- End Correction ---

  const [showDetails, setShowDetails] = useState(false);
  const [modelPath, setModelPath] = useState<string | null>(null);
  const [dataError, setDataError] = useState<string | null>(null);

  // Fetch plant data and model path
   // Using useEffect to handle potential async operations or data fetching side effects
   useEffect(() => {
    try {
      const path = db.getModelPath(id); // Get path using the unwrapped id
      setModelPath(path);
      setDataError(null);
    } catch (error: any) {
        console.error("Error fetching plant data or model path:", error);
        setDataError(error.message || "Failed to load plant information.");
        setModelPath(null);
    }
  }, [id]); // Dependency is the unwrapped id // Re-run effect if id changes


   // Fetch other plant details (assuming db functions are synchronous)
   // Use placeholder or handle potential null values safely
   const plant = db.getPlantById(id);
   const hindiName = plant ? db.getHindiName(id) : null;
   const scientificInfo = plant ? db.getScientificInfo(id) : null;
   const gradientClass = plant ? db.getPlantGradient(id) : 'bg-gray-200'; // Default gradient
   const patternClass = plant ? db.getPlantPattern(id) : ''; // Default pattern

    // Handle cases where plant data or model path failed to load
    if (dataError) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                 <header className="w-full max-w-4xl mx-auto px-4 py-6 bg-white shadow-sm mb-8">
                    <Button variant="ghost" asChild className="mr-4">
                        <Link href="/"><ArrowLeft className="h-5 w-5 mr-2" />Back to Garden</Link>
                    </Button>
                 </header>
                <div className="text-center text-red-600 bg-red-100 p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Error Loading Plant</h2>
                    <p>{dataError}</p>
                </div>
            </div>
        );
    }

    // Handle case where plant data is not found for the ID
    if (!plant) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                 <header className="w-full max-w-4xl mx-auto px-4 py-6 bg-white shadow-sm mb-8">
                     <Button variant="ghost" asChild className="mr-4">
                         <Link href="/"><ArrowLeft className="h-5 w-5 mr-2" />Back to Garden</Link>
                     </Button>
                 </header>
                <div className="text-center text-gray-700 bg-yellow-100 p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Plant Not Found</h2>
                    <p>Could not find details for the requested plant ID: {id}</p>
                </div>
            </div>
        );
    }

  return (
    <div className={`min-h-screen ${patternClass}`}>
       <header className="bg-white shadow-sm sticky top-0 z-10">
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center">
        <Button variant="ghost" asChild className="mr-4 flex-shrink-0">
          <Link href="/">
            <ArrowLeft className="h-5 w-5 mr-1 md:mr-2" />
            <span className="hidden sm:inline">Back to Garden</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </Button>
        <div className="flex-grow min-w-0">
          <h1 className="text-xl md:text-2xl font-bold text-herbal-brown truncate">
            {plant.name}
          </h1>
          {hindiName && <p className="text-sm text-herbal-brown truncate">{hindiName}</p>}
        </div>
      </div>
    </div>
  </header>

  <main className="container mx-auto px-4 py-8">
    <div className="grid md:grid-cols-2 gap-8">
      <div className={`${gradientClass} rounded-xl shadow-lg p-4 h-[500px] md:h-[600px] relative overflow-hidden`}>
        <ModelErrorBoundary>
          <Suspense
            fallback={
              <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                <p className="text-herbal-brown font-semibold animate-pulse">Loading 3D Model...</p>
              </div>
            }
          >
            {modelPath ? (
              <Canvas shadows>
                <ambientLight intensity={1.0} />
                <directionalLight
                  position={[8, 10, 5]}
                  intensity={1.5}
                  castShadow
                  shadow-mapSize-width={1024}
                  shadow-mapSize-height={1024}
                />
                <spotLight position={[-10, 10, -5]} angle={0.3} penumbra={1} intensity={1.0} castShadow />
                <PlantModelLoader modelPath={modelPath} onClick={() => setShowDetails(!showDetails)} />
                <Environment preset="forest" />
                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                />
              </Canvas>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-herbal-brown font-semibold">Model not available.</p>
              </div>
            )}
          </Suspense>
        </ModelErrorBoundary>

        <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4 bg-white/80 backdrop-blur-sm rounded-lg p-2 md:p-3 text-center text-xs md:text-sm">
          <p className="text-gray-800 font-medium">Click model for details. Drag to rotate, Scroll to zoom.</p>
          <p className="text-gray-600 mt-1">Rotation triggers sparkle effects!</p>
        </div>
      </div>

      <div className="flex flex-col">
        {showDetails ? (
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 flex-grow overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-herbal-brown">{plant.name}</h2>
                {hindiName && <p className="text-base md:text-lg text-herbal-brown">{hindiName}</p>}
                <p className="text-sm italic text-gray-500">{plant.scientificName}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowDetails(false)}
                className="h-8 w-8 flex-shrink-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <Tabs defaultValue="general" className="flex flex-col flex-grow">
              <TabsList className="grid grid-cols-3 mb-4 w-full">
                <TabsTrigger value="general">
                  <Info className="h-4 w-4 mr-1 md:mr-2" />General
                </TabsTrigger>
                <TabsTrigger value="scientific">
                  <Dna className="h-4 w-4 mr-1 md:mr-2" />Scientific
                </TabsTrigger>
                <TabsTrigger value="remedies">
                  <Leaf className="h-4 w-4 mr-1 md:mr-2" />Remedies
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4 flex-grow">
                <div>
                  <h3 className="text-lg font-semibold text-herbal-brown mb-2">Description</h3>
                  <p className="text-gray-700 text-sm md:text-base">{plant.description || 'Not available.'}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-herbal-brown mb-2">Growing Conditions</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm md:text-base">
                    <li>
                      <span className="font-medium">Sunlight:</span> {plant.growingConditions?.sunlight || 'N/A'}
                    </li>
                    <li>
                      <span className="font-medium">Soil:</span> {plant.growingConditions?.soil || 'N/A'}
                    </li>
                    <li>
                      <span className="font-medium">Water:</span> {plant.growingConditions?.water || 'N/A'}
                    </li>
                    <li>
                      <span className="font-medium">Temperature:</span> {plant.growingConditions?.temperature || 'N/A'}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-herbal-brown mb-2">Medicinal Uses</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm md:text-base">
                    {plant.medicinalUses?.length > 0
                      ? plant.medicinalUses.map((use, index) => <li key={index}>{use}</li>)
                      : <li>Not specified.</li>}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-herbal-brown mb-2">Historical Significance</h3>
                  <p className="text-gray-700 text-sm md:text-base">{plant.historicalSignificance || 'Not available.'}</p>
                </div>
              </TabsContent>

              <TabsContent value="scientific" className="space-y-4 flex-grow">
                {scientificInfo ? (
                  <>
                    <div>
                      <h3 className="text-lg font-semibold text-herbal-brown mb-2">Classification</h3>
                      <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm md:text-base">
                        <li>
                          <span className="font-medium">Kingdom:</span> {scientificInfo.kingdom || 'N/A'}
                        </li>
                        <li>
                          <span className="font-medium">Order:</span> {scientificInfo.order || 'N/A'}
                        </li>
                        <li>
                          <span className="font-medium">Family:</span> {plant.classification?.family || 'N/A'}
                        </li>
                        {plant.classification?.subfamily && (
                          <li>
                            <span className="font-medium">Subfamily:</span> {plant.classification.subfamily}
                          </li>
                        )}
                        <li>
                          <span className="font-medium">Genus:</span> {plant.classification?.genus || 'N/A'}
                        </li>
                        <li>
                          <span className="font-medium">Species:</span> {plant.classification?.species || 'N/A'}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-herbal-brown mb-2">Chemical Constituents</h3>
                      <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm md:text-base">
                        {scientificInfo.chemicalConstituents?.length > 0
                          ? scientificInfo.chemicalConstituents.map((chemical, index) => <li key={index}>{chemical}</li>)
                          : <li>Not specified.</li>}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-herbal-brown mb-2">Research Studies</h3>
                      <p className="text-gray-700 text-sm md:text-base">{scientificInfo.researchStudies || 'Not available.'}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500 italic">Scientific information not available.</p>
                )}
              </TabsContent>

              <TabsContent value="remedies" className="space-y-4 flex-grow">
                <div>
                  <h3 className="text-lg font-semibold text-herbal-brown mb-2">Properties</h3>
                  <div className="flex flex-wrap gap-2">
                    {plant.properties?.length > 0 ? (
                      plant.properties.map((property, index) => (
                        <span key={index} className="px-3 py-1 bg-herbal-green/20 text-herbal-brown rounded-full text-xs md:text-sm">
                          {property}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 italic text-sm">Not specified.</span>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-herbal-brown mb-2">Home Remedies</h3>
                  <div className="space-y-3">
                    {plant.homeRemedies?.length > 0 ? (
                      plant.homeRemedies.map((remedy, index) => (
                        <div key={index} className="bg-herbal-yellow/20 p-3 rounded-md text-sm md:text-base">
                          <p className="font-medium text-herbal-brown">{remedy.ailment || 'Ailment not specified'}</p>
                          <p className="text-gray-700 mt-1">
                            <span className="font-medium">Preparation:</span> {remedy.preparation || 'N/A'}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium">Usage:</span> {remedy.usage || 'N/A'}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 italic text-sm">No home remedies listed.</p>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-herbal-brown mb-2">Garden Benefits</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm md:text-base">
                    {plant.gardenBenefits?.length > 0
                      ? plant.gardenBenefits.map((benefit, index) => <li key={index}>{benefit}</li>)
                      : <li>Not specified.</li>}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full flex-grow">
            <div className="text-center p-6 bg-white/90 rounded-lg shadow-md max-w-md">
              <h3 className="text-xl font-semibold text-herbal-brown mb-2">Explore {plant.name}</h3>
              <p className="text-gray-700 mb-4">
                Click on the 3D model to your left to discover detailed information about this medicinal plant.
              </p>
              <Button onClick={() => setShowDetails(true)} className="bg-herbal-green hover:bg-herbal-darkGreen text-white">
                View Plant Details
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  </main>

  <footer className="text-center py-4 mt-8 text-xs text-gray-500">
    Plant data provided for informational purposes only. Consult a professional for medical advice.
  </footer>
</div>
  )
}