import React, { useEffect, useRef, useState, useCallback } from "react"
import { select } from "d3-selection"
import { createNoise3D } from "simplex-noise"
import { RotateCwIcon, ClipboardIcon, DownloadIcon, Upload } from "lucide-react"
import IconButton from "./IconButton"

const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((row) => row.map((v) => (v + 0.5) / 16))

const BAYER_8X8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
].map((row) => row.map((v) => (v + 0.5) / 64))

const DitherChart = ({
  pixelSize = 2,
  algorithm = "bayer4",
  pattern = "sphere",
  imageElement = null,
  imageOffset = { x: 0, y: 0 },
  onImageOffsetChange = null,
  zoom = 1.0,
  onZoomChange = null,
  contrast = 1.7,
  shape = "cross",
  invert = false,
  dotColor = "#000000",
  onDropFile = null,
  className = "",
}) => {
  const ref = useRef()
  const wrapperRef = useRef()
  const [seed, setSeed] = useState(42)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isPanning, setIsPanning] = useState(false)
  const panStartRef = useRef({ x: 0, y: 0 })
  const initialOffsetRef = useRef({ x: 0, y: 0 })

  const sizeX = 600
  const sizeY = 400

  // Calculate maximum panning bounds so image can never be dragged outside canvas
  const getClampedOffset = useCallback(
    (rawX, rawY, currentZoom = zoom) => {
      if (!imageElement || !imageElement.naturalWidth || !imageElement.naturalHeight) {
        return { x: 0, y: 0 }
      }
      const imgAspect = imageElement.naturalWidth / imageElement.naturalHeight
      const canvasAspect = sizeX / sizeY
      let baseW, baseH

      // Always fit image entirely inside canvas (contain) by default
      if (imgAspect > canvasAspect) {
        baseW = sizeX
        baseH = sizeX / imgAspect
      } else {
        baseH = sizeY
        baseW = sizeY * imgAspect
      }

      const drawW = baseW * currentZoom
      const drawH = baseH * currentZoom

      const maxOffsetX = Math.abs(drawW - sizeX) / 2
      const maxOffsetY = Math.abs(drawH - sizeY) / 2

      return {
        x: Math.round(Math.max(-maxOffsetX, Math.min(maxOffsetX, rawX))),
        y: Math.round(Math.max(-maxOffsetY, Math.min(maxOffsetY, rawY))),
      }
    },
    [imageElement, zoom, sizeX, sizeY]
  )

  const maxOffset = getClampedOffset(Infinity, Infinity)
  const canPan = maxOffset.x > 1 || maxOffset.y > 1

  // Dragging / panning handlers on canvas
  const handleMouseDown = useCallback((e) => {
    if (!canPan || !onImageOffsetChange) return
    setIsPanning(true)
    panStartRef.current = { x: e.clientX, y: e.clientY }
    initialOffsetRef.current = { ...imageOffset }
  }, [canPan, imageOffset, onImageOffsetChange])

  const handleMouseMove = useCallback((e) => {
    if (!isPanning || !onImageOffsetChange) return
    const rect = wrapperRef.current?.getBoundingClientRect()
    if (!rect) return
    const scaleFactorX = sizeX / rect.width
    const scaleFactorY = sizeY / rect.height
    const dx = (e.clientX - panStartRef.current.x) * scaleFactorX
    const dy = (e.clientY - panStartRef.current.y) * scaleFactorY

    onImageOffsetChange(getClampedOffset(initialOffsetRef.current.x + dx, initialOffsetRef.current.y + dy))
  }, [isPanning, onImageOffsetChange, getClampedOffset, sizeX, sizeY])

  const handleMouseUp = useCallback(() => {
    setIsPanning(false)
  }, [])

  // Touch handlers for mobile / touch devices
  const handleTouchStart = useCallback((e) => {
    if (!canPan || !onImageOffsetChange || e.touches.length !== 1) return
    setIsPanning(true)
    panStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    initialOffsetRef.current = { ...imageOffset }
  }, [canPan, imageOffset, onImageOffsetChange])

  const handleTouchMove = useCallback((e) => {
    if (!isPanning || !onImageOffsetChange || e.touches.length !== 1) return
    const rect = wrapperRef.current?.getBoundingClientRect()
    if (!rect) return
    const scaleFactorX = sizeX / rect.width
    const scaleFactorY = sizeY / rect.height
    const dx = (e.touches[0].clientX - panStartRef.current.x) * scaleFactorX
    const dy = (e.touches[0].clientY - panStartRef.current.y) * scaleFactorY

    onImageOffsetChange(getClampedOffset(initialOffsetRef.current.x + dx, initialOffsetRef.current.y + dy))
  }, [isPanning, onImageOffsetChange, getClampedOffset, sizeX, sizeY])

  useEffect(() => {
    if (isPanning) {
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("touchend", handleMouseUp)
      return () => {
        window.removeEventListener("mouseup", handleMouseUp)
        window.removeEventListener("touchend", handleMouseUp)
      }
    }
  }, [isPanning, handleMouseUp])

  // Wheel / trackpad pinch to zoom on canvas
  useEffect(() => {
    const el = wrapperRef.current
    if (!el || !imageElement || !onZoomChange) return

    const handleWheel = (e) => {
      // Zoom with Ctrl / Cmd + wheel, or trackpad pinch gesture (fires with e.ctrlKey = true on Mac)
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        const factor = e.deltaY < 0 ? 1.06 : 0.94
        onZoomChange((prev) => Math.min(3.0, Math.max(0.2, Math.round(prev * factor * 100) / 100)))
      }
    }

    el.addEventListener("wheel", handleWheel, { passive: false })
    return () => el.removeEventListener("wheel", handleWheel)
  }, [imageElement, onZoomChange])

  useEffect(() => {
    select(ref.current).selectAll("*").remove()
    const svg = select(ref.current)

    const simplex = createNoise3D(() => {
      let s = seed
      return () => {
        s = Math.sin(s) * 10000
        return s - Math.floor(s)
      }
    })

    const step = Math.max(2, pixelSize)
    const cols = Math.floor(sizeX / step)
    const rows = Math.floor(sizeY / step)
    const centerX = sizeX / 2
    const centerY = sizeY / 2
    const maxRadius = Math.hypot(centerX, centerY)

    // Pre-render image to full 600x400 canvas with contain fit, zoom, and drag offsets
    let imageLuminanceGrid = null
    if (imageElement && imageElement.complete && imageElement.naturalWidth > 0) {
      try {
        const offscreen = document.createElement("canvas")
        offscreen.width = sizeX
        offscreen.height = sizeY
        const ctx = offscreen.getContext("2d", { willReadFrequently: true })

        const imgW = imageElement.naturalWidth
        const imgH = imageElement.naturalHeight
        const imgAspect = imgW / imgH
        const canvasAspect = sizeX / sizeY

        let baseW, baseH
        // Fit entire image inside canvas (contain) by default
        if (imgAspect > canvasAspect) {
          baseW = sizeX
          baseH = sizeX / imgAspect
        } else {
          baseH = sizeY
          baseW = sizeY * imgAspect
        }

        const drawW = baseW * zoom
        const drawH = baseH * zoom

        const clamped = getClampedOffset(imageOffset.x, imageOffset.y)
        const drawX = (sizeX - drawW) / 2 + clamped.x
        const drawY = (sizeY - drawH) / 2 + clamped.y

        ctx.drawImage(imageElement, drawX, drawY, drawW, drawH)
        const fullImgData = ctx.getImageData(0, 0, sizeX, sizeY).data

        imageLuminanceGrid = []
        for (let r = 0; r < rows; r++) {
          imageLuminanceGrid[r] = new Float32Array(cols)
          const py = Math.min(sizeY - 1, Math.max(0, Math.floor(r * step + step / 2)))

          for (let c = 0; c < cols; c++) {
            const px = Math.min(sizeX - 1, Math.max(0, Math.floor(c * step + step / 2)))
            const idx = (py * sizeX + px) * 4
            const a = fullImgData[idx + 3]

            if (a < 15) {
              imageLuminanceGrid[r][c] = invert ? 1 : 0
            } else {
              const lum = (0.299 * fullImgData[idx] + 0.587 * fullImgData[idx + 1] + 0.114 * fullImgData[idx + 2]) / 255
              const adjusted = (lum - 0.5) * contrast + 0.5
              imageLuminanceGrid[r][c] = Math.max(0, Math.min(1, adjusted))
            }
          }
        }
      } catch (err) {
        console.error("Error processing dither source image:", err)
      }
    }

    // Build continuous intensity field in [0, 1]
    const grid = []
    for (let r = 0; r < rows; r++) {
      grid[r] = new Float32Array(cols)
      const y = r * step + step / 2

      for (let c = 0; c < cols; c++) {
        const x = c * step + step / 2
        let val = 0.5

        if (imageLuminanceGrid) {
          val = imageLuminanceGrid[r][c]
        } else if (pattern === "sphere") {
          const radius = 135
          const dx = (x - centerX) / radius
          const dy = (y - centerY) / radius
          const d2 = dx * dx + dy * dy
          if (d2 <= 1) {
            const dz = Math.sqrt(1 - d2)
            const lx = -0.577
            const ly = -0.577
            const lz = 0.577
            const diff = -(dx * lx + dy * ly - dz * lz)
            val = Math.max(0, Math.min(1, diff * 0.95 + 0.05))
          } else {
            val = 0
          }
        } else if (pattern === "linear") {
          val = (x / sizeX) * 0.7 + (y / sizeY) * 0.3
        } else if (pattern === "radial") {
          const dist = Math.hypot(x - centerX, y - centerY)
          val = Math.max(0, 1 - dist / (maxRadius * 0.7))
        } else if (pattern === "noise") {
          const n = simplex(x * 0.005, y * 0.005, seed * 0.08)
          val = (n + 1) / 2
        } else if (pattern === "waves") {
          const dist = Math.hypot(x - centerX, y - centerY)
          val = (Math.sin(dist * 0.04 - seed) + 1) / 2
        }

        if (invert) {
          val = 1 - val
        }
        grid[r][c] = Math.max(0, Math.min(1, val))
      }
    }

    // Apply Dithering to produce binary on/off matrix
    const binary = []
    for (let r = 0; r < rows; r++) {
      binary[r] = new Uint8Array(cols)
    }

    if (algorithm === "bayer4") {
      for (let r = 0; r < rows; r++) {
        const by = r % 4
        for (let c = 0; c < cols; c++) {
          const bx = c % 4
          if (grid[r][c] > BAYER_4X4[by][bx]) {
            binary[r][c] = 1
          }
        }
      }
    } else if (algorithm === "bayer8") {
      for (let r = 0; r < rows; r++) {
        const by = r % 8
        for (let c = 0; c < cols; c++) {
          const bx = c % 8
          if (grid[r][c] > BAYER_8X8[by][bx]) {
            binary[r][c] = 1
          }
        }
      }
    } else if (algorithm === "floyd") {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const oldVal = grid[r][c]
          const newVal = oldVal >= 0.5 ? 1 : 0
          binary[r][c] = newVal
          const err = oldVal - newVal

          if (c + 1 < cols) grid[r][c + 1] += err * (7 / 16)
          if (r + 1 < rows) {
            if (c - 1 >= 0) grid[r + 1][c - 1] += err * (3 / 16)
            grid[r + 1][c] += err * (5 / 16)
            if (c + 1 < cols) grid[r + 1][c + 1] += err * (1 / 16)
          }
        }
      }
    } else if (algorithm === "noise") {
      let randSeed = seed
      const pseudo = () => {
        randSeed = (randSeed * 9301 + 49297) % 233280
        return randSeed / 233280
      }
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (grid[r][c] > pseudo()) {
            binary[r][c] = 1
          }
        }
      }
    }

    // Build compound SVG path for high-performance rendering & light vector export
    let d = ""
    const halfStep = step / 2
    const radius = Math.max(0.75, step * 0.45)
    const arm = step / 3

    for (let r = 0; r < rows; r++) {
      const y = r * step
      for (let c = 0; c < cols; c++) {
        if (binary[r][c] === 1) {
          const x = c * step

          if (shape === "square") {
            d += `M${x},${y}h${step}v${step}h${-step}z`
          } else if (shape === "circle") {
            const cx = x + halfStep
            const cy = y + halfStep
            d += `M${cx},${cy}m-${radius},0a${radius},${radius} 0 1,0 ${radius * 2},0a${radius},${radius} 0 1,0 -${radius * 2},0`
          } else if (shape === "cross") {
            d += `M${x + arm},${y}h${arm}v${arm}h${arm}v${arm}h${-arm}v${arm}h${-arm}v${-arm}h${-arm}v${-arm}h${arm}z`
          }
        }
      }
    }

    if (d) {
      svg.append("path").attr("d", d).attr("fill", dotColor)
    }
  }, [pixelSize, algorithm, pattern, imageElement, imageOffset, zoom, contrast, shape, invert, dotColor, seed, getClampedOffset])

  const copy = () => {
    const contents = select(wrapperRef.current).html()
    navigator.clipboard.writeText(contents)
  }

  const downloadFile = (name = "dither.svg") => {
    const contents = select(wrapperRef.current).html()
    const blob = new Blob([contents], { type: "image/svg+xml;charset=utf-8" })
    const dlink = document.createElement("a")
    dlink.download = name
    dlink.href = window.URL.createObjectURL(blob)
    document.body.appendChild(dlink)
    dlink.click()
    dlink.remove()
    setTimeout(() => {
      window.URL.revokeObjectURL(dlink.href)
    }, 1500)
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onDragOver={(e) => {
        if (!onDropFile) return
        e.preventDefault()
        setIsDragOver(true)
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        if (!onDropFile) return
        e.preventDefault()
        setIsDragOver(false)
        if (e.dataTransfer.files?.[0]) onDropFile(e.dataTransfer.files[0])
      }}
      className="relative select-none"
    >
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        ref={wrapperRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className={`relative ${canPan ? (isPanning ? "cursor-grabbing" : "cursor-grab") : ""}`}
      >
        <svg
          ref={ref}
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-auto ${className}`}
          viewBox={`0 0 ${sizeX} ${sizeY}`}
        />

        {/* Drag over overlay on canvas */}
        {isDragOver && (
          <div className="absolute inset-0 bg-white/90 dark:bg-zinc-950/90 border border-dashed border-gray-900 dark:border-zinc-100 rounded flex flex-col items-center justify-center gap-1.5 pointer-events-none transition-all">
            <Upload className="w-5 h-5 text-gray-900 dark:text-zinc-100" />
            <p className="text-xs font-mono text-gray-900 dark:text-zinc-100">
              drop image to dither
            </p>
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-3 gap-5 mt-5">
        <IconButton
          onClick={() => setSeed(Math.floor(Math.random() * 5000))}
          Icon={RotateCwIcon}
        >
          Regenerate
        </IconButton>
        <IconButton onClick={copy} Icon={ClipboardIcon}>
          Copy
        </IconButton>
        <IconButton
          className="bg-gray-900 hover:bg-black border-gray-900 hover:border-black !text-white dark:bg-zinc-100 dark:hover:bg-white dark:border-zinc-100 dark:hover:border-white dark:!text-zinc-900 font-medium transition-colors shadow-sm"
          onClick={() => downloadFile("dither.svg")}
          Icon={DownloadIcon}
        >
          Download
        </IconButton>
      </div>
    </div>
  )
}

export default DitherChart
