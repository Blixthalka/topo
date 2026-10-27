import React, { useEffect, useRef, useState } from "react"
import { line as d3Line, curveCatmullRom } from "d3-shape"
import { select } from "d3-selection"
import { createNoise3D } from "simplex-noise"
import { RotateCwIcon, ClipboardIcon, DownloadIcon } from "lucide-react"
import IconButton from "./IconButton"

const FlowChart = ({
  density = 250,
  strokeWidth = 1.5,
  strokeColor = "#0f766e",
  scale = 0.003,
  stepLength = 6,
  steps = 55,
  className = "",
}) => {
  const ref = useRef()
  const wrapperRef = useRef()
  const [seed, setSeed] = useState(42)

  const sizeX = 600
  const sizeY = 400

  useEffect(() => {
    select(ref.current).selectAll("*").remove()

    const simplex = createNoise3D(() => {
      let s = seed
      return () => {
        s = Math.sin(s) * 10000
        return s - Math.floor(s)
      }
    })

    const lineGenerator = d3Line()
      .x((d) => d[0])
      .y((d) => d[1])
      .curve(curveCatmullRom)

    const paths = []
    const margin = 20

    // Seed points across canvas
    for (let i = 0; i < density; i++) {
      let x = margin + Math.random() * (sizeX - margin * 2)
      let y = margin + Math.random() * (sizeY - margin * 2)
      const points = [[x, y]]

      for (let s = 0; s < steps; s++) {
        const angle = simplex(x * scale, y * scale, seed * 0.1) * Math.PI * 4
        x += Math.cos(angle) * stepLength
        y += Math.sin(angle) * stepLength

        if (x < 0 || x > sizeX || y < 0 || y > sizeY) break
        points.push([x, y])
      }

      if (points.length > 2) {
        paths.push(points)
      }
    }

    const svg = select(ref.current)
    paths.forEach((pts) => {
      svg
        .append("path")
        .attr("d", lineGenerator(pts))
        .attr("stroke", strokeColor)
        .attr("stroke-width", strokeWidth)
        .attr("fill", "none")
        .attr("stroke-linecap", "round")
        .attr("stroke-opacity", 0.85)
    })
  }, [seed, density, strokeWidth, strokeColor, scale, stepLength, steps])

  const copy = () => {
    const contents = select(wrapperRef.current).html()
    navigator.clipboard.writeText(contents)
  }

  const downloadFile = (name = "flow-field.svg") => {
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
      <div ref={wrapperRef} className="bg-white rounded overflow-hidden border border-gray-100">
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
          onClick={() => downloadFile("flow-field.svg")}
          Icon={DownloadIcon}
        >
          Download SVG
        </IconButton>
      </div>
    </div>
  )
}

export default FlowChart
