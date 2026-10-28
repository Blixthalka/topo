import React, { useState, useEffect } from "react"
import HalftoneChart from "./HalftoneChart"
import SelectButtons from "./SelectButtons"
import ColorPicker from "./ColorPicker"

const HalftoneSettings = () => {
  const [columns, setColumns] = useState(36)
  const [maxSize, setMaxSize] = useState(6)
  const [patternType, setPatternType] = useState("noise")
  const [customStrokeColor, setCustomStrokeColor] = useState(null)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (typeof document === "undefined") return
    setIsDark(document.documentElement.classList.contains("dark"))

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  const effectiveStrokeColor = customStrokeColor || (isDark ? "c084fc" : "000000")

  return (
    <div className="p-5 border border-gray-200 dark:border-zinc-800 shadow-sm rounded grid gap-5 bg-white dark:bg-zinc-900">
      <HalftoneChart
        columns={columns}
        maxSize={maxSize}
        patternType={patternType}
        dotColor={"#" + effectiveStrokeColor}
        className=""
      />

      <div className="grid md:grid-cols-2 gap-5 flex-wrap">
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
          label="Dot Size"
          selected={maxSize}
          onValueChange={(v) => setMaxSize(v)}
          values={[4, 6, 8, 10, 12]}
        />

        <SelectButtons
          label="Grid Density"
          selected={columns}
          onValueChange={(v) => setColumns(v)}
          values={[20, 28, 36, 44, 52]}
        />

        <ColorPicker
          label="Dot Color"
          selected={effectiveStrokeColor}
          onValueChange={(c) => setCustomStrokeColor(c)}
          className="md:col-span-2"
        />
      </div>
    </div>
  )
}

export default HalftoneSettings
