import React, { useState, useEffect } from "react"
import VoronoiChart from "./VoronoiChart"
import SelectButtons from "./SelectButtons"
import ColorPicker from "./ColorPicker"

const VoronoiSettings = () => {
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [pointsCount, setPointsCount] = useState(50)
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

  const effectiveStrokeColor = customStrokeColor || (isDark ? "cbd5e1" : "71717a")

  return (
    <div className="p-5 border border-gray-200 dark:border-zinc-800 shadow-sm rounded grid gap-5 bg-white dark:bg-zinc-900">
      <VoronoiChart
        pointsCount={pointsCount}
        strokeWidth={strokeWidth}
        strokeColor={"#" + effectiveStrokeColor}
        className=""
      />

      <div className="grid md:grid-cols-2 gap-5 flex-wrap">
        <SelectButtons
          label="Stroke Width"
          selected={strokeWidth}
          onValueChange={(v) => setStrokeWidth(v)}
          values={[1, 2, 3, 4, 5, 6]}
        />

        <SelectButtons
          label="Cells"
          selected={pointsCount}
          onValueChange={(v) => setPointsCount(v)}
          values={[20, 35, 50, 75, 100, 150]}
        />

        <ColorPicker
          label="Stroke Color"
          selected={effectiveStrokeColor}
          onValueChange={(c) => setCustomStrokeColor(c)}
          className="md:col-span-2"
        />
      </div>
    </div>
  )
}

export default VoronoiSettings
