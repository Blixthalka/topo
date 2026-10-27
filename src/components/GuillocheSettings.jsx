import React, { useState } from "react"
import GuillocheChart from "./GuillocheChart"
import SelectButtons from "./SelectButtons"
import ColorPicker from "./ColorPicker"
import Slider from "./Slider"

const GuillocheSettings = () => {
  const [petals, setPetals] = useState(12)
  const [layers, setLayers] = useState(8)
  const [waveDepth, setWaveDepth] = useState(35)
  const [twist, setTwist] = useState(12)
  const [innerRadius, setInnerRadius] = useState(90)
  const [strokeWidth, setStrokeWidth] = useState(1)
  const [strokeColor, setStrokeColor] = useState("0f766e")

  return (
    <div className="p-5 border shadow-sm rounded grid gap-5 bg-white">
      <GuillocheChart
        petals={petals}
        layers={layers}
        waveDepth={waveDepth}
        twist={twist}
        innerRadius={innerRadius}
        strokeWidth={strokeWidth}
        strokeColor={"#" + strokeColor}
      />

      <div className="grid md:grid-cols-2 gap-5 pt-3 border-t border-gray-100">
        <SelectButtons
          label="Petal Harmonics"
          selected={petals}
          onValueChange={(v) => setPetals(v)}
          values={[6, 8, 12, 16, 24, 32]}
        />

        <SelectButtons
          label="Concentric Layers"
          selected={layers}
          onValueChange={(v) => setLayers(v)}
          values={[2, 4, 8, 12, 16]}
        />

        <Slider
          label="Wave Depth / Amplitude"
          value={waveDepth}
          min={10}
          max={75}
          step={5}
          onChange={(v) => setWaveDepth(v)}
        />

        <Slider
          label="Twist / Phase Rotation"
          value={twist}
          min={1}
          max={45}
          step={1}
          onChange={(v) => setTwist(v)}
        />

        <Slider
          label="Base Radius"
          value={innerRadius}
          min={40}
          max={140}
          step={5}
          onChange={(v) => setInnerRadius(v)}
        />

        <SelectButtons
          label="Stroke Width"
          selected={strokeWidth}
          onValueChange={(v) => setStrokeWidth(v)}
          values={[0.5, 1, 1.5, 2]}
        />

        <ColorPicker
          label="Stroke Color"
          selected={strokeColor}
          colors={["0f766e", "b45309", "1e293b", "7c3aed", "059669", "be123c"]}
          onValueChange={(c) => setStrokeColor(c)}
          className="md:col-span-2"
        />
      </div>
    </div>
  )
}

export default GuillocheSettings
