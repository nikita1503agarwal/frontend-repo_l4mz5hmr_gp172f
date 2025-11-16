import React, { useState, useCallback } from 'react'
import Scene from './components/Scene'
import Overlay from './components/Overlay'
import Spline from '@splinetool/react-spline'

function App() {
  const [selectedPart, setSelectedPart] = useState(null)

  const handleSelect = useCallback((partName) => {
    setSelectedPart(partName)
  }, [])

  const handleGenerate = useCallback(() => {
    // Placeholder for AI generation trigger
    alert(`AI explanation requested for: ${selectedPart ?? 'none'}`)
  }, [selectedPart])

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background radial gradient for medical cleanliness */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-slate-50 to-slate-100" />

      {/* Futuristic healthcare Spline hero as subtle background object */}
      <div className="absolute top-0 left-0 right-0 h-40 md:h-56 lg:h-64 pointer-events-none">
        <Spline scene="https://prod.spline.design/Zn7XRxnnbSat5OJG/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* 3D Scene */}
      <div className="relative h-screen">
        <Scene onSelect={handleSelect} />
      </div>

      {/* Overlay side panel */}
      <Overlay selectedPart={selectedPart} onGenerate={handleGenerate} />

      {/* Branding header */}
      <header className="pointer-events-none absolute top-4 left-0 right-0 flex items-center justify-center">
        <div className="pointer-events-auto inline-flex items-center gap-3 rounded-full bg-white/60 backdrop-blur-md border border-white/40 px-4 py-2 shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-500" />
          <span className="text-sm font-medium text-slate-700">BioView — Interactive 3D Anatomy</span>
        </div>
      </header>
    </div>
  )
}

export default App
