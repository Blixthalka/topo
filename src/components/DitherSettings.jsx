import React, { useState, useEffect, useRef } from "react"
import DitherChart from "./DitherChart"
import SelectButtons from "./SelectButtons"
import IconButton from "./IconButton"
import ColorPicker from "./ColorPicker"
import { Upload, X } from "lucide-react"

const DitherSettings = () => {
  const [algorithm, setAlgorithm] = useState("bayer4")
  const [pattern, setPattern] = useState("sphere")
  const [pixelSize, setPixelSize] = useState(4)
  const [shape, setShape] = useState("square")
  const [invert, setInvert] = useState(false)
  const [contrast, setContrast] = useState(1.0)
  const [customColor, setCustomColor] = useState(null)
  const [isDark, setIsDark] = useState(false)

  // Custom image upload & paste state
  const [imageElement, setImageElement] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (typeof document === "undefined") return
    setIsDark(document.documentElement.classList.contains("dark"))

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return
    const reader = new FileReader()
    reader.onload = (e) => {
      if (typeof window === "undefined") return
      const img = new window.Image()
      img.onload = () => {
        setImageElement(img)
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }

  // Support direct Cmd+V / Ctrl+V paste anywhere on the page
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items
      if (!items) return
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith("image/")) {
          const file = items[i].getAsFile()
          if (file) {
            handleFile(file)
            break
          }
        }
      }
    }
    window.addEventListener("paste", handlePaste)
    return () => window.removeEventListener("paste", handlePaste)
  }, [])

  const clearImage = () => {
    setImageElement(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const effectiveColor = customColor || (isDark ? "c084fc" : "000000")

  return (
    <div className="p-5 border border-gray-200 dark:border-zinc-800 shadow-sm rounded grid gap-5 bg-white dark:bg-zinc-900">
      <DitherChart
        algorithm={algorithm}
        pattern={pattern}
        imageElement={imageElement}
        contrast={contrast}
        pixelSize={pixelSize}
        shape={shape}
        invert={invert}
        dotColor={"#" + effectiveColor}
        onDropFile={handleFile}
        className=""
      />

      <div className="grid md:grid-cols-2 gap-5 flex-wrap">
        {/* Source Selector (Procedural + Minimal Upload Pill) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 dark:text-zinc-400 text-sm">Source</span>
            <span className="text-[11px] text-gray-400 dark:text-zinc-500 font-mono">
              drop or Cmd+V
            </span>
          </div>
          <div className="flex space-x-2 flex-wrap gap-y-2">
            {[
              { label: "Sphere", value: "sphere" },
              { label: "Waves", value: "waves" },
              { label: "Noise", value: "noise" },
              { label: "Linear", value: "linear" },
              { label: "Radial", value: "radial" },
            ].map(({ label, value }) => {
              const isActive = !imageElement && pattern === value
              return (
                <IconButton
                  key={value}
                  className={`px-2.5 min-w-[2.25rem] ${
                    isActive
                      ? "bg-gray-200 border-gray-300 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white font-medium"
                      : ""
                  }`}
                  onClick={() => {
                    clearImage()
                    setPattern(value)
                  }}
                >
                  <span>{label}</span>
                </IconButton>
              )
            })}

            {imageElement ? (
              <IconButton
                className="px-2.5 min-w-[2.25rem] bg-gray-200 border-gray-300 dark:bg-zinc-700 dark:border-zinc-600 dark:text-white font-medium inline-flex items-center gap-1.5"
                onClick={clearImage}
                title="Remove image and revert to procedural shape"
              >
                <span>Image</span>
                <X className="w-3.5 h-3.5 opacity-70 hover:opacity-100" />
              </IconButton>
            ) : (
              <IconButton
                className="px-2.5 min-w-[2.25rem] text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white inline-flex items-center gap-1"
                onClick={() => fileInputRef.current?.click()}
                title="Upload image or drop onto canvas"
              >
                <Upload className="w-3 h-3 opacity-60" />
                <span>Upload</span>
              </IconButton>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleFile(e.target.files[0])
              }}
            />
          </div>
        </div>

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

        {imageElement && (
          <SelectButtons
            label="Contrast"
            selected={contrast}
            onValueChange={(v) => setContrast(v)}
            values={[
              { label: "Low", value: 0.7 },
              { label: "Normal", value: 1.0 },
              { label: "Punchy", value: 1.3 },
              { label: "High", value: 1.7 },
            ]}
          />
        )}

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
