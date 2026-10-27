import React, { useEffect, useRef, useState } from "react"
import { line as d3Line, curveBasis } from "d3-shape"
import { select } from "d3-selection"
import { createNoise3D } from "simplex-noise"
import { RotateCwIcon, ClipboardIcon, DownloadIcon } from "lucide-react"
import IconButton from "./IconButton"

const RidgeChart = ({
  lineCount = 40,
  amplitude = 55,
  spread = 140,
  roughness = 4,
  strokeWidth = 1.5,
  strokeColor = "#0f766e",
  isDark = false,
  className = "",
}) => {
  const ref = useRef()
  const wrapperRef = useRef()
  const [seed, setSeed] = useState(101)

  const sizeX = 600
  const sizeY = 440

  useEffect(() => {
    select(ref.current).selectAll("*").remove()

    const simplex = createNoise3D(() => {
      let s = seed
      return () => {
        s = Math.sin(s) * 10000
        return s - Math.floor(s)
      }
    })

    const svg = select(ref.current)
    const bgColor = isDark ? "#090d16" : "#ffffff"

    // Background rect
    svg
      .append("rect")
      .attr("width", sizeX)
      .attr("height", sizeY)
      .attr("fill", bgColor)

    const lineGenerator = d3Line()
      .x((d) => d[0])
      .y((d) => d[1])
      .curve(curveBasis)

    const startY = 40
    const endY = sizeY - 40
    const lineSpacing = (endY - startY) / (lineCount - 1)
    const centerX = sizeX / 2
    const stepX = 5
    const noiseScale = 0.003 * roughness

    for (let i = 0; i < lineCount; i++) {
      const baseY = startY + i * lineSpacing
      const points = []

      for (let x = 30; x <= sizeX - 30; x += stepX) {
        // Gaussian envelope centered at centerX
        const dist = Math.abs(x - centerX)
        const envelope = Math.exp(-Math.pow(dist / spread, 2))

        // Multi-octave noise for rich mountain peaks
        const n1 = simplex(x * noiseScale, i * 0.18, seed)
        const n2 = 0.4 * simplex(x * noiseScale * 2.5, i * 0.18, seed + 10)
        const rawNoise = Math.max(0, n1 + n2)

        const peakY = baseY - rawNoise * amplitude * envelope
        points.push([x, peakY])
      }

      // Create closed path for occlusion (hidden line removal)
      const firstX = points[0][0]
      const lastX = points[points.length - 1][0]
      const closedPoints = [...points, [lastX, sizeY], [firstX, sizeY]]

      // Fill polygon to mask lines beneath
      svg
        .append("path")
        .attr("d", lineGenerator(closedPoints))
        .attr("fill", bgColor)
        .attr("stroke", "none")

      // Draw top stroke
      svg
        .append("path")
        .attr("d", lineGenerator(points))
        .attr("stroke", strokeColor)
        .attr("stroke-width", strokeWidth)
        .attr("fill", "none")
        .attr("stroke-linecap", "round")
    }
  }, [seed, lineCount, amplitude, spread, roughness, strokeWidth, strokeColor, isDark])

  const copy = () => {
    const contents = select(wrapperRef.current).html()
    navigator.clipboard.writeText(contents)
  }

  const downloadFile = (name = "ridge-lines.svg") => {
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
      <div ref={wrapperRef} className="rounded overflow-hidden border border-gray-100 shadow-inner">
        <svg
          ref={ref}
          className={`w-full h-auto ${className}`}
          viewBox={`0 0 ${sizeX} ${sizeY}`}
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
          onClick={() => downloadFile("ridge-lines.svg")}
          Icon={DownloadIcon}
        >
          Download SVG
        </IconButton>
      </div>
    </div>
  )
}

export default RidgeChart
