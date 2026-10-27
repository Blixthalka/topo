import React, { useState } from "react"
import HalftoneChart from "./HalftoneChart"
import SelectButtons from "./SelectButtons"
import ColorPicker from "./ColorPicker"

const HalftoneSettings = () => {
  const [columns, setColumns] = useState(36)
  const [maxSize, setMaxSize] = useState(6)
  const [patternType, setPatternType] = useState("noise")
  const [shapeType, setShapeType] = useState("circle")
  const [strokeColor, setStrokeColor] = useState("71717a")

  return (
    <div className="p-5 border border-gray-200 dark:border-zinc-800 shadow-sm rounded grid gap-5 bg-white dark:bg-zinc-900">
      <HalftoneChart
        columns={columns}
        maxSize={maxSize}
        patternType={patternType}
        shapeType={shapeType}
        dotColor={"#" + strokeColor}
        className=""
      />

      <div className="grid md:grid-cols-2 gap-5 flex-wrap">
        <SelectButtons
          label="Shape"
          selected={shapeType}
          onValueChange={(v) => setShapeType(v)}
          values={[
            { label: "Dots", value: "circle" },
            { label: "Crosses", value: "cross" },
            { label: "Pills", value: "dash" },
          ]}
        />

        <SelectButtons
          label="Wave"
          selected={patternType}
          onValueChange={(v) => setPatternType(v)}
          values={[
            { label: "Noise", value: "noise" },
            { label: "Ripple", value: "ripple" },
            { label: "Diagonal", value: "diagonal" },
          ]}
        />

        <SelectButtons
          label="Grid Density"
          selected={columns}
          onValueChange={(v) => setColumns(v)}
          values={[20, 28, 36, 44, 52]}
        />

        <SelectButtons
          label="Dot Size"
          selected={maxSize}
          onValueChange={(v) => setMaxSize(v)}
          values={[4, 6, 8, 10, 12]}
        />

        <ColorPicker
          label="Stroke Color"
          selected={strokeColor}
          onValueChange={(c) => setStrokeColor(c)}
          className="md:col-span-2"
        />
      </div>
    </div>
  )
}

export default HalftoneSettings
