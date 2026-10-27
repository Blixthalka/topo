import React, { useState } from "react"
import FlowChart from "./FlowChart"
import SelectButtons from "./SelectButtons"
import ColorPicker from "./ColorPicker"
import Slider from "./Slider"

const FlowSettings = () => {
  const [density, setDensity] = useState(250)
  const [strokeWidth, setStrokeWidth] = useState(1.5)
  const [strokeColor, setStrokeColor] = useState("0f766e")
  const [curliness, setCurliness] = useState(30) // maps to scale 0.001 - 0.006
  const [stepLength, setStepLength] = useState(6)

  return (
    <div className="p-5 border shadow-sm rounded grid gap-5 bg-white">
      <FlowChart
        density={density}
        strokeWidth={strokeWidth}
        strokeColor={"#" + strokeColor}
        scale={0.001 + (curliness / 100) * 0.005}
        stepLength={stepLength}
      />

      <div className="grid md:grid-cols-2 gap-5 pt-3 border-t border-gray-100">
        <SelectButtons
          label="Line Density"
          selected={density}
          onValueChange={(v) => setDensity(v)}
          values={[100, 180, 250, 350, 500]}
        />

        <SelectButtons
          label="Stroke Width"
          selected={strokeWidth}
          onValueChange={(v) => setStrokeWidth(v)}
          values={[1, 1.5, 2, 3, 4]}
        />

        <Slider
          label="Turbulence / Curl"
          value={curliness}
          min={10}
          max={100}
          step={5}
          onChange={(v) => setCurliness(v)}
        />

        <Slider
          label="Streamline Length"
          value={stepLength}
          min={3}
          max={12}
          step={1}
          onChange={(v) => setStepLength(v)}
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
