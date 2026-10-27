import React, { useState } from "react"
import FlowChart from "./FlowChart"
import SelectButtons from "./SelectButtons"
import ColorPicker from "./ColorPicker"
import Slider from "./Slider"

const FlowSettings = () => {
  const [flowMode, setFlowMode] = useState("ribbons")
  const [density, setDensity] = useState(55)
  const [turbulence, setTurbulence] = useState(45)
  const [stepLength, setStepLength] = useState(3)
  const [strokeWidth, setStrokeWidth] = useState(1.5)
  const [strokeColor, setStrokeColor] = useState("0f766e")

  return (
    <div className="p-5 border shadow-sm rounded grid gap-5 bg-white">
      <FlowChart
        flowMode={flowMode}
        density={density}
        turbulence={turbulence}
        stepLength={stepLength}
        strokeWidth={strokeWidth}
        strokeColor={"#" + strokeColor}
      />

      <div className="grid md:grid-cols-2 gap-5 pt-3 border-t border-gray-100">
        <div>
          <label className="text-gray-500 text-sm">Flow Style</label>
          <div className="flex space-x-2 mt-2">
            {[
              { id: "ribbons", label: "Silky Ribbons" },
              { id: "swirls", label: "Vortex Swirls" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setFlowMode(m.id)}
                className={`px-3 py-1.5 text-sm rounded border ${
                  flowMode === m.id
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
          label="Line Density"
          selected={density}
          onValueChange={(v) => setDensity(v)}
          values={[30, 45, 55, 75, 100]}
        />

        <Slider
          label="Turbulence & Wave Curl"
          value={turbulence}
          min={10}
          max={90}
          step={5}
          onChange={(v) => setTurbulence(v)}
        />

        <Slider
          label="Flow Speed / Step"
          value={stepLength}
          min={2}
          max={6}
          step={0.5}
          onChange={(v) => setStepLength(v)}
        />

        <SelectButtons
          label="Stroke Width"
          selected={strokeWidth}
          onValueChange={(v) => setStrokeWidth(v)}
          values={[1, 1.5, 2, 3]}
        />

        <ColorPicker
          label="Stroke Color"
          selected={strokeColor}
          colors={["0f766e", "0284c7", "6366f1", "d97706", "e11d48", "18181b"]}
          onValueChange={(c) => setStrokeColor(c)}
          className="md:col-span-2"
        />
      </div>
    </div>
  )
}

export default FlowSettings
