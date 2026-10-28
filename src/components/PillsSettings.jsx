import React, { useState, useEffect } from "react"
import PillsChart from "./PillsChart"
import SelectButtons from "./SelectButtons"
import ColorPicker from "./ColorPicker"

const PillsSettings = () => {
  const [columns, setColumns] = useState(32)
  const [pillLength, setPillLength] = useState(8)
  const [sizing, setSizing] = useState("uniform")
  const [patternType, setPatternType] = useState("noise")
  const [customColor, setCustomColor] = useState(null)
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

  const effectiveColor = customColor || (isDark ? "c084fc" : "000000")

  return (
    <div className="p-5 border border-gray-200 dark:border-zinc-800 shadow-sm rounded grid gap-5 bg-white dark:bg-zinc-900">
      <PillsChart
        columns={columns}
        pillLength={pillLength}
        sizing={sizing}
        patternType={patternType}
        pillColor={"#" + effectiveColor}
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
          label="Sizing"
          selected={sizing}
          onValueChange={(v) => setSizing(v)}
          values={[
            { label: "Uniform", value: "uniform" },
            { label: "Dynamic", value: "dynamic" },
          ]}
        />

        <SelectButtons
          label="Density"
          selected={columns}
          onValueChange={(v) => setColumns(v)}
          values={[16, 24, 32, 40, 48]}
        />

        <SelectButtons
          label="Pill Length"
          selected={pillLength}
          onValueChange={(v) => setPillLength(v)}
          values={[6, 8, 10, 14, 18, 22, 26]}
        />

        <ColorPicker
          label="Pill Color"
          selected={effectiveColor}
          onValueChange={(c) => setCustomColor(c)}
          className="md:col-span-2"
        />
      </div>
    </div>
  )
}

export default PillsSettings
