import React, { useState } from "react"
import HalftoneChart from "./HalftoneChart"
import SelectButtons from "./SelectButtons"
import ColorPicker from "./ColorPicker"
import Slider from "./Slider"

const HalftoneSettings = () => {
  const [columns, setColumns] = useState(36)
  const [maxSize, setMaxSize] = useState(6)
  const [patternType, setPatternType] = useState("noise")
  const [shapeType, setShapeType] = useState("circle")
  const [dotColor, setDotColor] = useState("0f766e")

  return (
    <div className="p-5 border shadow-sm rounded grid gap-5 bg-white">
      <HalftoneChart
        columns={columns}
        maxSize={maxSize}
        patternType={patternType}
        shapeType={shapeType}
        dotColor={"#" + dotColor}
      />

      <div className="grid md:grid-cols-2 gap-5 pt-3 border-t border-gray-100">
        <div>
          <label className="text-gray-500 text-sm">Wave Algorithm</label>
          <div className="flex space-x-2 mt-2">
            {[
              { id: "noise", label: "Simplex Noise" },
              { id: "ripple", label: "Ripple" },
              { id: "diagonal", label: "Diagonal" },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPatternType(p.id)}
                className={`px-3 py-1 text-sm rounded border ${
                  patternType === p.id
                    ? "bg-teal-700 text-white border-teal-700 font-medium"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-gray-500 text-sm">Shape</label>
          <div className="flex space-x-2 mt-2">
            {[
              { id: "circle", label: "Dots" },
              { id: "cross", label: "Crosses" },
              { id: "dash", label: "Pills" },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => setShapeType(s.id)}
                className={`px-3 py-1 text-sm rounded border ${
                  shapeType === s.id
                    ? "bg-teal-700 text-white border-teal-700 font-medium"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <SelectButtons
          label="Grid Density"
          selected={columns}
          onValueChange={(v) => setColumns(v)}
          values={[24, 30, 36, 44, 52]}
        />

        <Slider
          label="Max Particle Size"
          value={maxSize}
          min={3}
          max={12}
          step={0.5}
          onChange={(v) => setMaxSize(v)}
        />

        <ColorPicker
          label="Dot Color"
          selected={dotColor}
          colors={["0f766e", "18181b", "0284c7", "7c3aed", "ea580c", "059669"]}
          onValueChange={(c) => setDotColor(c)}
          className="md:col-span-2"
        />
      </div>
    </div>
  )
}

export default HalftoneSettings
