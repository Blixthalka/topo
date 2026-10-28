import React, { useState, useEffect } from "react"
import RidgeChart from "./RidgeChart"
import SelectButtons from "./SelectButtons"
import ColorPicker from "./ColorPicker"

const RidgeSettings = () => {
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [lines, setLines] = useState(30)
  const [amplitude, setAmplitude] = useState(55)
  const [roughness, setRoughness] = useState(3)
  const [customStrokeColor, setCustomStrokeColor] = useState(null)
  const [isDark, setIsDark] = useState(false)

  // Listen to global dark mode changes
  useEffect(() => {
    if (typeof document === "undefined") return
    setIsDark(document.documentElement.classList.contains("dark"))

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  // In dark mode default to Lavender (#c084fc), in light mode default to black (#000000)
  const effectiveStrokeColor = customStrokeColor || (isDark ? "c084fc" : "000000")

  return (
    <div className="p-5 border border-gray-200 dark:border-zinc-800 shadow-sm rounded grid gap-5 bg-white dark:bg-zinc-900">
      <RidgeChart
        lineCount={lines}
        amplitude={amplitude}
        roughness={roughness}
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
          label="Lines"
          selected={lines}
          onValueChange={(v) => setLines(v)}
          values={[15, 20, 30, 40, 50, 60]}
        />

        <SelectButtons
          label="Peak Height"
          selected={amplitude}
          onValueChange={(v) => setAmplitude(v)}
          values={[25, 40, 55, 75, 95]}
        />

        <SelectButtons
          label="Roughness"
          selected={roughness}
          onValueChange={(v) => setRoughness(v)}
          values={[1, 2, 3, 4, 5]}
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

export default RidgeSettings
