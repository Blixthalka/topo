import React, { useState, useEffect, useRef } from "react"
import DitherChart from "./DitherChart"
import SelectButtons from "./SelectButtons"
import SelectDropdown from "./SelectDropdown"
import ColorPicker from "./ColorPicker"
import { Upload, X } from "lucide-react"

const ALGORITHM_OPTIONS = [
  { label: "Atkinson (Macintosh '84)", value: "atkinson" },
  { label: "Floyd-Steinberg", value: "floyd" },
  { label: "Bayer 2×2 (Chunky 8-Bit)", value: "bayer2" },
  { label: "Bayer 4×4 (Classic)", value: "bayer4" },
  { label: "Bayer 8×8 (Smooth)", value: "bayer8" },
  { label: "Clustered Dot (Halftone)", value: "cluster" },
  { label: "Sierra Lite", value: "sierra" },
  { label: "Jarvis-Judice-Ninke (JJN)", value: "jjn" },
  { label: "Line Screen (Engraving)", value: "lines" },
  { label: "Noise (Stochastic)", value: "noise" },
]

const DitherSettings = () => {
  const [algorithm, setAlgorithm] = useState("atkinson")
  const [pattern, setPattern] = useState("sphere")
  const [pixelSize, setPixelSize] = useState(2)
  const [shape, setShape] = useState("cross")
  const [invert, setInvert] = useState(false)
  const [contrast, setContrast] = useState(1.7)
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1.0)
  const [customColor, setCustomColor] = useState(null)
  const [isDark, setIsDark] = useState(false)

  // Custom image upload & paste state
  const [imageElement, setImageElement] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
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
        setImageOffset({ x: 0, y: 0 })
        setZoom(1.0)
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }

  // Support direct Cmd+V / Ctrl+V paste from Figma or clipboard anywhere on the page
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
    setImageOffset({ x: 0, y: 0 })
    setZoom(1.0)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const effectiveColor = customColor || (isDark ? "c084fc" : "000000")

  return (
    <div className="p-5 border border-gray-200 dark:border-zinc-800 shadow-sm rounded grid gap-5 bg-white dark:bg-zinc-900">
      <DitherChart
        algorithm={algorithm}
        pattern={pattern}
        imageElement={imageElement}
        imageOffset={imageOffset}
        onImageOffsetChange={setImageOffset}
        zoom={zoom}
        onZoomChange={setZoom}
        contrast={contrast}
        pixelSize={pixelSize}
        shape={shape}
        invert={invert}
        dotColor={"#" + effectiveColor}
        onDropFile={handleFile}
        className=""
      />

      {/* Image Upload Dropzone / Active Bar */}
      <div className="w-full">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) handleFile(e.target.files[0])
          }}
        />

        {!imageElement ? (
          <div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                fileInputRef.current?.click()
              }
            }}
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setIsDragging(false)
              if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0])
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`border border-dashed rounded-lg p-3 sm:p-4 text-center cursor-pointer transition-all duration-150 ${
              isDragging
                ? "border-gray-900 bg-gray-100 dark:border-zinc-100 dark:bg-zinc-800"
                : "border-gray-300 dark:border-zinc-700 hover:border-gray-900 dark:hover:border-zinc-100 bg-gray-50/50 dark:bg-zinc-800/40"
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-1.5 py-1">
              <div className="p-1.5 rounded-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-sm text-gray-700 dark:text-zinc-300">
                <Upload className="w-4 h-4" />
              </div>
              <p className="text-xs font-medium text-gray-800 dark:text-zinc-200">
                Drop image to dither, click to browse, or paste with <kbd className="px-1.5 py-0.5 text-[10px] bg-gray-200 dark:bg-zinc-700 rounded font-mono">Cmd+V</kbd>
              </p>
              <p className="text-[11px] text-gray-400 dark:text-zinc-500">
                PNG, JPG, SVG, WebP
              </p>
            </div>
          </div>
        ) : (
          <div className="border border-gray-200 dark:border-zinc-700 rounded-lg px-3 py-2 bg-gray-50/70 dark:bg-zinc-800/60 flex items-center justify-between gap-3 shadow-sm">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors font-mono"
            >
              Click or drop to replace image
            </button>
            <button
              onClick={clearImage}
              title="Remove image and revert to procedural shapes"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-300 transition-colors font-mono"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-5 flex-wrap">
        <SelectDropdown
          label="Algorithm"
          selected={algorithm}
          onValueChange={(v) => setAlgorithm(v)}
          options={ALGORITHM_OPTIONS}
        />

        {imageElement ? (
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
        ) : (
          <SelectButtons
            label="Pattern"
            selected={pattern}
            onValueChange={(v) => setPattern(v)}
            values={[
              { label: "Sphere", value: "sphere" },
              { label: "Waves", value: "waves" },
              { label: "Noise", value: "noise" },
              { label: "Linear", value: "linear" },
              { label: "Radial", value: "radial" },
            ]}
          />
        )}

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
