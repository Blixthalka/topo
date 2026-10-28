import React, { useEffect, useRef, useState } from "react"
import { select } from "d3-selection"
import { createNoise3D } from "simplex-noise"
import { RotateCwIcon, ClipboardIcon, DownloadIcon } from "lucide-react"
import IconButton from "./IconButton"

const PillsChart = ({
  columns = 32,
  pillLength = 16,
  sizing = "uniform", // "uniform" | "dynamic"
  patternType = "noise",
  pillColor = "#71717a",
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
        }

        let len, w
        if (sizing === "uniform") {
          len = pillLength
          w = Math.max(2, Math.round(pillLength * 0.28))
        } else {
          len = Math.max(3, factor * pillLength * 1.5)
          w = Math.max(1.8, factor * pillLength * 0.38)
        }

        svg
          .append("rect")
          .attr("x", -len / 2)
          .attr("y", -w / 2)
          .attr("width", len)
          .attr("height", w)
          .attr("rx", w / 2)
          .attr("transform", `translate(${x}, ${y}) rotate(${angle})`)
          .attr("fill", pillColor)
      }
    }
  }, [seed, columns, pillLength, sizing, patternType, pillColor])

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
          className="bg-green-600 border-green-600 hover:border-green-700 !text-white dark:!text-white hover:bg-green-700"
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
