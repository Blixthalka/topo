import React, { useState, useEffect } from "react"
import Chart from "../components/Chart"
import SelectButtons from "./SelectButtons"
import ColorPicker from "./ColorPicker"

const ChartSettings = () => {
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [lines, setLines] = useState(20)
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
      <Chart
        strokeWidth={strokeWidth}
        lines={lines}
        strokeColor={"#" + effectiveStrokeColor}
        className=""
      />

      <div className="grid md:grid-cols-2 gap-5 flex-wrap">
        <SelectButtons
          label="Stroke Width"
          selected={strokeWidth}
          onValueChange={(v) => setStrokeWidth(v)}
          values={[1, 2, 3, 4, 5, 6, 7, 8]}
        />
        <SelectButtons
          label="Lines"
          selected={lines}
          onValueChange={(v) => setLines(v)}
          values={[5, 10, 15, 20, 30, 40, 50, 70]}
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

export default ChartSettings
