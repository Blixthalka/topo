import React, { useEffect, useRef, useState } from "react"
import { line as d3Line, curveLinearClosed } from "d3-shape"
import { select } from "d3-selection"
import { RotateCwIcon, ClipboardIcon, DownloadIcon } from "lucide-react"
import IconButton from "./IconButton"

const GuillocheChart = ({
  petals = 12,
  innerRadius = 90,
  outerRadius = 160,
  waveDepth = 35,
  layers = 6,
  twist = 8,
  strokeWidth = 1,
  strokeColor = "#0f766e",
  className = "",
}) => {
  const ref = useRef()
  const wrapperRef = useRef()
  const [seed, setSeed] = useState(13)

  const size = 520
  const center = size / 2

  useEffect(() => {
    select(ref.current).selectAll("*").remove()
    const svg = select(ref.current)

    const lineGenerator = d3Line()
      .x((d) => d[0])
      .y((d) => d[1])
      .curve(curveLinearClosed)

    const stepsPerLoop = 360
    const totalPoints = stepsPerLoop

    for (let layer = 0; layer < layers; layer++) {
      const layerOffset = (layer / Math.max(1, layers - 1)) * 30
      const currentR = innerRadius + layerOffset
      const phase = (layer * (twist * Math.PI)) / 180 + seed * 0.2

      const points = []
      for (let i = 0; i < totalPoints; i++) {
        const theta = (i / totalPoints) * Math.PI * 2
        // Modulated radius based on petal harmonics
        const r =
          currentR +
          waveDepth * Math.sin(petals * theta + phase) +
          (waveDepth * 0.3) * Math.cos(petals * 2 * theta - phase)

        const x = center + r * Math.cos(theta)
        const y = center + r * Math.sin(theta)
        points.push([x, y])
      }

      svg
        .append("path")
        .attr("d", lineGenerator(points))
        .attr("stroke", strokeColor)
        .attr("stroke-width", strokeWidth)
        .attr("fill", "none")
        .attr("stroke-opacity", 0.75 + (layer / layers) * 0.25)
    }
  }, [seed, petals, innerRadius, waveDepth, layers, twist, strokeWidth, strokeColor])

  const copy = () => {
    const contents = select(wrapperRef.current).html()
    navigator.clipboard.writeText(contents)
  }

  const downloadFile = (name = "guilloche-pattern.svg") => {
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
      <div ref={wrapperRef} className="bg-white rounded overflow-hidden border border-gray-100 flex justify-center py-4">
        <svg
          ref={ref}
          className={`max-w-md w-full h-auto ${className}`}
          viewBox={`0 0 ${size} ${size}`}
          xmlns="http://www.w3.org/2000/svg"
        />
      </div>
      <div className="grid sm:grid-cols-3 gap-5 mt-5">
        <IconButton
          onClick={() => setSeed(Math.floor(Math.random() * 100000))}
          Icon={RotateCwIcon}
        >
          Regenerate
        </IconButton>
        <IconButton onClick={copy} Icon={ClipboardIcon}>
          Copy SVG
        </IconButton>
        <IconButton
          className="bg-teal-700 border-teal-700 hover:border-teal-800 text-white hover:bg-teal-800 hover:text-white"
          onClick={() => downloadFile("guilloche-pattern.svg")}
          Icon={DownloadIcon}
        >
          Download SVG
        </IconButton>
      </div>
    </div>
  )
}

export default GuillocheChart
