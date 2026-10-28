import React, { useState, useEffect } from "react"
import DitherChart from "./DitherChart"
import SelectButtons from "./SelectButtons"
import ColorPicker from "./ColorPicker"

const DitherSettings = () => {
  const [algorithm, setAlgorithm] = useState("bayer4")
  const [pattern, setPattern] = useState("sphere")
  const [pixelSize, setPixelSize] = useState(4)
  const [shape, setShape] = useState("square")
  const [invert, setInvert] = useState(false)
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
      <DitherChart
        algorithm={algorithm}
        pattern={pattern}
        pixelSize={pixelSize}
        shape={shape}
        invert={invert}
        dotColor={"#" + effectiveColor}
        className=""
      />

      <div className="grid md:grid-cols-2 gap-5 flex-wrap">
        <SelectButtons
          label="Algorithm"
          selected={algorithm}
          onValueChange={(v) => setAlgorithm(v)}
          values={[
            { label: "Bayer 4x4", value: "bayer4" },
            { label: "Bayer 8x8", value: "bayer8" },
            { label: "Floyd-Steinberg", value: "floyd" },
            { label: "Noise", value: "noise" },
          ]}
        />

        <SelectButtons
          label="Pattern"
          selected={pattern}
          onValueChange={(v) => setPattern(v)}
          values={[
            { label: "Sphere", value: "sphere" },
            { label: "Linear", value: "linear" },
            { label: "Radial", value: "radial" },
            { label: "Noise", value: "noise" },
            { label: "Waves", value: "waves" },
          ]}
        />

        <SelectButtons
          label="Pixel Size"
          selected={pixelSize}
          onValueChange={(v) => setPixelSize(v)}
          values={[2, 3, 4, 6, 8]}
        />

        <SelectButtons
          label="Shape"
          selected={shape}
          onValueChange={(v) => setShape(v)}
          values={[
            { label: "Square", value: "square" },
            { label: "Circle", value: "circle" },
            { label: "Cross", value: "cross" },
          ]}
        />

        <SelectButtons
          label="Tone"
          selected={invert}
          onValueChange={(v) => setInvert(v)}
          values={[
            { label: "Regular", value: false },
            { label: "Invert", value: true },
          ]}
        />

        <ColorPicker
          label="Dot Color"
          selected={effectiveColor}
          onValueChange={(c) => setCustomColor(c)}
          className="md:col-span-2"
        />
      </div>
    </div>
  )
}

export default DitherSettings
