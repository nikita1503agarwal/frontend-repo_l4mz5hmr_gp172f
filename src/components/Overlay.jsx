import React from 'react'

export default function Overlay({ selectedPart, onGenerate }) {
  return (
    <div className="pointer-events-none fixed inset-0 flex items-start justify-end p-6">
      <div className="pointer-events-auto w-full max-w-md rounded-2xl backdrop-blur-xl bg-white/50 border border-white/40 shadow-xl overflow-hidden">
        <div className="p-6 bg-gradient-to-b from-white/60 to-white/20">
          <h2 className="text-slate-800 font-semibold text-lg tracking-tight">BioView — Anatomy Insight</h2>
          <p className="text-slate-600 text-sm mt-1">Interactive 3D exploration of the human body</p>
        </div>
        <div className="p-6 space-y-4">
          {!selectedPart ? (
            <div className="text-slate-600">
              <p className="font-medium">Select a body part to learn more.</p>
              <p className="text-sm mt-2">Hover over highlighted areas and click to open detailed information.</p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800">{selectedPart}</h3>
                <span className="inline-flex items-center rounded-full bg-teal-100 text-teal-700 text-xs px-2 py-1">Focused</span>
              </div>
              <p className="text-slate-600 mt-3 leading-relaxed">
                This is a placeholder explanation for the selected anatomical region. In the full experience, an AI-generated summary will describe functions, related systems, and clinical relevance.
              </p>
              <button
                onClick={onGenerate}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 transition-colors"
              >
                Generate AI Explanation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
