import React, { useState } from "react"
import VoronoiChart from "./VoronoiChart"
import SelectButtons from "./SelectButtons"
import ColorPicker from "./ColorPicker"
import Slider from "./Slider"

const VoronoiSettings = () => {
  const [pointsCount, setPointsCount] = useState(80)
  const [mode, setMode] = useState("voronoi")
  const [relaxation, setRelaxation] = useState(2)
  const [showDots, setShowDots] = useState(true)
  const [strokeWidth, setStrokeWidth] = useState(1.5)
  const [strokeColor, setStrokeColor] = useState("0f766e")

  return (
    <div className="p-5 border shadow-sm rounded grid gap-5 bg-white">
      <VoronoiChart
        pointsCount={pointsCount}
        mode={mode}
        relaxation={relaxation}
        showDots={showDots}
        strokeWidth={strokeWidth}
        strokeColor={"#" + strokeColor}
      />

      <div className="grid md:grid-cols-2 gap-5 pt-3 border-t border-gray-100">
        <div>
          <label className="text-gray-500 text-sm">Diagram Mode</label>
          <div className="flex space-x-2 mt-2">
            {[
              { id: "voronoi", label: "Voronoi" },
              { id: "delaunay", label: "Delaunay" },
              { id: "both", label: "Dual" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`px-3 py-1 text-sm rounded border ${
                  mode === m.id
                    ? "bg-teal-700 text-white border-teal-700 font-medium"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <SelectButtons
          label="Cell Count"
          selected={pointsCount}
          onValueChange={(v) => setPointsCount(v)}
          values={[25, 50, 80, 140, 220]}
        />

        <Slider
          label="Lloyd Relaxation (Honeycomb vs Chaotic)"
          value={relaxation}
          min={0}
          max={6}
          step={1}
          onChange={(v) => setRelaxation(v)}
        />

        <div>
          <label className="text-gray-500 text-sm">Centroid Nodes</label>
          <div className="flex space-x-2 mt-2">
            {[true, false].map((val) => (
              <button
                key={String(val)}
                onClick={() => setShowDots(val)}
                className={`px-3 py-1 text-sm rounded border ${
                  showDots === val
                    ? "bg-teal-700 text-white border-teal-700 font-medium"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {val ? "Show Dots" : "Hide Dots"}
              </button>
            ))}
          </div>
        </div>

        <SelectButtons
          label="Stroke Width"
          selected={strokeWidth}
          onValueChange={(v) => setStrokeWidth(v)}
          values={[1, 1.5, 2, 3]}
        />

        <ColorPicker
          label="Stroke Color"
          selected={strokeColor}
          colors={["0f766e", "1e293b", "2563eb", "7c3aed", "059669", "d97706"]}
          onValueChange={(c) => setStrokeColor(c)}
          className="md:col-span-2"
        />
      </div>
    </div>
  )
}

export default VoronoiSettings
