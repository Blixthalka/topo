import React, { useState } from "react"
import RidgeChart from "./RidgeChart"
import SelectButtons from "./SelectButtons"
import ColorPicker from "./ColorPicker"
import Slider from "./Slider"
import IconButton from "./IconButton"
import { Moon, Sun } from "lucide-react"

const RidgeSettings = () => {
  const [lineCount, setLineCount] = useState(40)
  const [amplitude, setAmplitude] = useState(65)
  const [spread, setSpread] = useState(140)
  const [roughness, setRoughness] = useState(4)
  const [strokeWidth, setStrokeWidth] = useState(1.5)
  const [isDark, setIsDark] = useState(false)
  const [strokeColor, setStrokeColor] = useState("0f766e")

  return (
    <div className={`p-5 border shadow-sm rounded grid gap-5 ${isDark ? "bg-gray-900 border-gray-800" : "bg-white"}`}>
      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
        <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          Theme Preview
        </span>
        <button
          onClick={() => {
            const next = !isDark
            setIsDark(next)
            setStrokeColor(next ? "38bdf8" : "0f766e")
          }}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium border transition ${
            isDark
              ? "bg-gray-800 text-yellow-300 border-gray-700 hover:bg-gray-700"
              : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
          }`}
        >
          {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          <span>{isDark ? "Light Mode" : "Joy Division Dark Mode"}</span>
        </button>
      </div>

      <RidgeChart
        lineCount={lineCount}
        amplitude={amplitude}
        spread={spread}
        roughness={roughness}
        strokeWidth={strokeWidth}
        strokeColor={"#" + strokeColor}
        isDark={isDark}
      />

      <div className="grid md:grid-cols-2 gap-5 pt-3 border-t border-gray-100">
        <SelectButtons
          label="Line Count"
          selected={lineCount}
          onValueChange={(v) => setLineCount(v)}
          values={[20, 30, 40, 55, 75]}
        />

        <SelectButtons
          label="Stroke Width"
          selected={strokeWidth}
          onValueChange={(v) => setStrokeWidth(v)}
          values={[1, 1.5, 2, 3]}
        />

        <Slider
          label="Peak Amplitude (Height)"
          value={amplitude}
          min={20}
          max={120}
          step={5}
          onChange={(v) => setAmplitude(v)}
        />

        <Slider
          label="Peak Spread (Width)"
          value={spread}
          min={70}
          max={260}
          step={10}
          onChange={(v) => setSpread(v)}
        />

        <Slider
          label="Terrain Roughness"
          value={roughness}
          min={1}
          max={8}
          step={1}
          onChange={(v) => setRoughness(v)}
        />

        <ColorPicker
          label="Stroke Color"
          selected={strokeColor}
          colors={
            isDark
              ? ["ffffff", "38bdf8", "34d399", "f472b6", "fbbf24"]
              : ["0f766e", "18181b", "0284c7", "4f46e5", "e11d48"]
          }
          onValueChange={(c) => setStrokeColor(c)}
          className="md:col-span-2"
        />
      </div>
    </div>
  )
}

export default RidgeSettings
