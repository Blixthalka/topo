import React, { useEffect, useRef, useState } from "react"
import { select } from "d3-selection"
import { createNoise3D } from "simplex-noise"
import { RotateCwIcon, ClipboardIcon, DownloadIcon } from "lucide-react"
import IconButton from "./IconButton"

const HalftoneChart = ({
  columns = 36,
  maxSize = 6,
  patternType = "noise",
  shapeType = "circle",
  dotColor = "#71717a",
  className = "",
}) => {
  const ref = useRef()
  const wrapperRef = useRef()
  const [seed, setSeed] = useState(55)

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
    const minSize = 1

    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= columns; c++) {
        const x = margin + c * step
        const y = margin + r * step

        let factor = 0.5
        let angle = 0

        if (patternType === "noise") {
          const n = simplex(x * 0.005, y * 0.005, seed * 0.05)
          factor = (n + 1) / 2
          angle = n * 180
        } else if (patternType === "ripple") {
          const dist = Math.hypot(x - centerX, y - centerY)
          factor = (Math.sin(dist * 0.04 - seed) + 1) / 2
          angle = (Math.atan2(y - centerY, x - centerX) * 180) / Math.PI
        } else if (patternType === "diagonal") {
          factor = (Math.sin((x + y) * 0.025 + seed) + 1) / 2
          angle = 45
        }

        const currentSize = minSize + factor * (maxSize - minSize)
        if (currentSize <= 0.3) continue

        if (shapeType === "circle") {
          svg
            .append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", currentSize)
            .attr("fill", dotColor)
        } else if (shapeType === "cross") {
          const arm = currentSize * 1.5
          const w = Math.max(1, currentSize * 0.35)
          const g = svg.append("g").attr("transform", `translate(${x}, ${y}) rotate(${angle})`)
          g.append("rect")
            .attr("x", -arm)
            .attr("y", -w / 2)
            .attr("width", arm * 2)
            .attr("height", w)
            .attr("fill", dotColor)
          g.append("rect")
            .attr("x", -w / 2)
            .attr("y", -arm)
            .attr("width", w)
            .attr("height", arm * 2)
            .attr("fill", dotColor)
        } else if (shapeType === "dash") {
          const len = currentSize * 2.8
          const w = Math.max(1.2, currentSize * 0.5)
          svg
            .append("rect")
            .attr("x", -len / 2)
            .attr("y", -w / 2)
            .attr("width", len)
            .attr("height", w)
            .attr("rx", w / 2)
            .attr("transform", `translate(${x}, ${y}) rotate(${angle})`)
            .attr("fill", dotColor)
        }
      }
    }
  }, [seed, columns, maxSize, patternType, shapeType, dotColor])

  const copy = () => {
    const contents = select(wrapperRef.current).html()
    navigator.clipboard.writeText(contents)
  }

  const downloadFile = (name = "halftone.svg") => {
    const contents = select(wrapperRef.current).html()
    const blob = new Blob([contents], { type: "image/svg+xml" })
    const dlink = document.createElement("a")
    dlink.download = name
    dlink.href = window.URL.createObjectURL(blob)
    dlink.click()
    dlink.remove()
  }

  return (
    <div>
      <div ref={wrapperRef}>
        <svg
          ref={ref}
          className={` ${className}`}
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
          className="bg-green-600 border-green-600 hover:border-green-700 text-white hover:bg-green-700 hover:text-white"
          onClick={() => downloadFile("halftone.svg")}
          Icon={DownloadIcon}
        >
          Download
        </IconButton>
      </div>
    </div>
  )
}

export default HalftoneChart
