import React, { useEffect, useRef, useState } from "react"
import { select } from "d3-selection"
import { createNoise3D } from "simplex-noise"
import { RotateCwIcon, ClipboardIcon, DownloadIcon } from "lucide-react"
import IconButton from "./IconButton"

const PillsChart = ({
  columns = 32,
  pillLength = 8,
  pillWidth = 2,
  sizing = "uniform", // "uniform" | "dynamic"
  patternType = "noise",
  pillColor = "#000000",
  className = "",
}) => {
  const ref = useRef()
  const wrapperRef = useRef()
  const [seed, setSeed] = useState(42)

  const sizeX = 600
  const sizeY = 400

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

    const margin = 20
    const availableWidth = sizeX - margin * 2
    const availableHeight = sizeY - margin * 2
    const step = availableWidth / columns
    const rows = Math.floor(availableHeight / step)
    const centerX = sizeX / 2
    const centerY = sizeY / 2

    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= columns; c++) {
        const x = margin + c * step
        const y = margin + r * step

        let factor = 0.5
        let angle = 0

        if (patternType === "noise") {
          const n = simplex(x * 0.004, y * 0.004, seed * 0.05)
          factor = (n + 1) / 2
          angle = n * 180
        } else if (patternType === "ripple") {
          const dist = Math.hypot(x - centerX, y - centerY)
          factor = (Math.sin(dist * 0.04 - seed) + 1) / 2
          angle = (Math.atan2(y - centerY, x - centerX) * 180) / Math.PI
        } else if (patternType === "diagonal") {
          factor = (Math.sin((x + y) * 0.025 + seed) + 1) / 2
          angle = 45 + Math.sin(x * 0.01 + seed) * 45
        } else if (patternType === "vortex") {
          const dx = x - centerX
          const dy = y - centerY
          const dist = Math.hypot(dx, dy)
          const theta = Math.atan2(dy, dx)
          angle = (theta + dist * 0.012 - seed * 0.2) * (180 / Math.PI) + 90
          factor = (Math.sin(dist * 0.035 - theta * 2 + seed) + 1) / 2
        } else if (patternType === "dipole") {
          const p1x = centerX - 110
          const p2x = centerX + 110
          const dx1 = x - p1x
          const dy1 = y - centerY
          const dx2 = x - p2x
          const dy2 = y - centerY
          const r1Sq = dx1 * dx1 + dy1 * dy1 + 400
          const r2Sq = dx2 * dx2 + dy2 * dy2 + 400
          const ex = dx1 / r1Sq - dx2 / r2Sq
          const ey = dy1 / r1Sq - dy2 / r2Sq
          angle = (Math.atan2(ey, ex) * 180) / Math.PI
          factor = Math.min(1, Math.max(0.18, Math.hypot(ex, ey) * 110))
        } else if (patternType === "saddle") {
          const dx = (x - centerX) / 80
          const dy = (y - centerY) / 80
          angle = (Math.atan2(-dy, dx) * 180) / Math.PI + Math.sin(seed * 0.1) * 20
          factor = (Math.sin((dx * dx - dy * dy) * 0.8 + seed) + 1) / 2
        } else if (patternType === "interference") {
          const p1x = centerX - 85
          const p2x = centerX + 85
          const d1 = Math.hypot(x - p1x, y - centerY)
          const d2 = Math.hypot(x - p2x, y - centerY)
          const w1 = Math.sin(d1 * 0.04 - seed)
          const w2 = Math.sin(d2 * 0.04 - seed)
          const gx = Math.cos(d1 * 0.04 - seed) * ((x - p1x) / (d1 + 1)) + Math.cos(d2 * 0.04 - seed) * ((x - p2x) / (d2 + 1))
          const gy = Math.cos(d1 * 0.04 - seed) * ((y - centerY) / (d1 + 1)) + Math.cos(d2 * 0.04 - seed) * ((y - centerY) / (d2 + 1))
          angle = (Math.atan2(gy, gx) * 180) / Math.PI + 90
          factor = ((w1 + w2) / 2 + 1) / 2
        }

        let len, w
        if (sizing === "uniform") {
          len = pillLength
          w = pillWidth
        } else {
          len = Math.max(2, factor * pillLength * 1.5)
          w = Math.max(1, factor * pillWidth * 1.5)
        }

        const rx = Math.min(len, w) / 2

        svg
          .append("rect")
          .attr("x", -len / 2)
          .attr("y", -w / 2)
          .attr("width", len)
          .attr("height", w)
          .attr("rx", rx)
          .attr("transform", `translate(${x}, ${y}) rotate(${angle})`)
          .attr("fill", pillColor)
      }
    }
  }, [seed, columns, pillLength, pillWidth, sizing, patternType, pillColor])

  const copy = () => {
    const contents = select(wrapperRef.current).html()
    navigator.clipboard.writeText(contents)
  }

  const downloadFile = (name = "flow-matrix.svg") => {
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
    <div>
      <div ref={wrapperRef}>
        <svg
          ref={ref}
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-auto ${className}`}
          viewBox={`0 0 ${sizeX} ${sizeY}`}
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-5 mt-5">
        <IconButton
          onClick={() => setSeed(Math.floor(Math.random() * 2000))}
          Icon={RotateCwIcon}
        >
          Regenerate
        </IconButton>
        <IconButton onClick={copy} Icon={ClipboardIcon}>
          Copy
        </IconButton>
        <IconButton
          className="bg-gray-900 hover:bg-black border-gray-900 hover:border-black !text-white dark:bg-zinc-100 dark:hover:bg-white dark:border-zinc-100 dark:hover:border-white dark:!text-zinc-900 font-medium transition-colors shadow-sm"
          onClick={() => downloadFile("flow-matrix.svg")}
          Icon={DownloadIcon}
        >
          Download
        </IconButton>
      </div>
    </div>
  )
}

export default PillsChart
