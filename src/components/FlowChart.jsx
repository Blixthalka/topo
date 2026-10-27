import React, { useEffect, useRef, useState } from "react"
import { line as d3Line, curveBasis } from "d3-shape"
import { select } from "d3-selection"
import { createNoise3D } from "simplex-noise"
import { RotateCwIcon, ClipboardIcon, DownloadIcon } from "lucide-react"
import IconButton from "./IconButton"

// Fast high-quality pseudo-random generator
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const FlowChart = ({
  flowMode = "ribbons", // 'ribbons' | 'swirls'
  density = 55,
  turbulence = 40,
  stepLength = 3,
  strokeWidth = 1.5,
  strokeColor = "#0f766e",
  className = "",
}) => {
  const ref = useRef()
  const wrapperRef = useRef()
  const [seed, setSeed] = useState(101)

  const sizeX = 600
  const sizeY = 400

  useEffect(() => {
    select(ref.current).selectAll("*").remove()

    const rng = mulberry32(seed)
    const simplex = createNoise3D(rng)

    const lineGenerator = d3Line()
      .x((d) => d[0])
      .y((d) => d[1])
      .curve(curveBasis)

    const paths = []

    if (flowMode === "ribbons") {
      // Continuous sweeping streamlines from boundary across the canvas
      const rows = density
      const scale = 0.002 + (turbulence / 100) * 0.003
      const curlAngle = (turbulence / 100) * Math.PI * 1.6
      const maxSteps = 240

      for (let i = 0; i < rows; i++) {
        let x = -20
        let y = (i / rows) * sizeY + (rng() - 0.5) * (sizeY / rows) * 0.9
        const pts = [[x, y]]

        for (let s = 0; s < maxSteps; s++) {
          const n = simplex(x * scale, y * scale, 0.25)
          const angle = n * curlAngle
          x += Math.cos(angle) * stepLength
          y += Math.sin(angle) * stepLength

          if (x > sizeX + 25 || y < -40 || y > sizeY + 40) break
          pts.push([x, y])
        }

        if (pts.length > 8) {
          paths.push(pts)
        }
      }
    } else {
      // Momentum-based bidirectional vortex streamlines
      const count = density * 3.5
      const scale = 0.0025 + (turbulence / 100) * 0.003
      const curlMult = 1.0 + (turbulence / 100) * 1.5
      const halfSteps = 45

      for (let i = 0; i < count; i++) {
        const startX = 20 + rng() * (sizeX - 40)
        const startY = 20 + rng() * (sizeY - 40)

        // Trace forward with momentum
        const fwd = []
        let x = startX
        let y = startY
        let vx = 0
        let vy = 0
        for (let s = 0; s < halfSteps; s++) {
          const angle = simplex(x * scale, y * scale, 0.4) * Math.PI * 2 * curlMult
          vx = vx * 0.72 + Math.cos(angle) * stepLength * 0.7
          vy = vy * 0.72 + Math.sin(angle) * stepLength * 0.7
          x += vx
          y += vy
          if (x < 5 || x > sizeX - 5 || y < 5 || y > sizeY - 5) break
          fwd.push([x, y])
        }

        // Trace backward with momentum
        const bwd = []
        x = startX
        y = startY
        vx = 0
        vy = 0
        for (let s = 0; s < halfSteps; s++) {
          const angle = simplex(x * scale, y * scale, 0.4) * Math.PI * 2 * curlMult + Math.PI
          vx = vx * 0.72 + Math.cos(angle) * stepLength * 0.7
          vy = vy * 0.72 + Math.sin(angle) * stepLength * 0.7
          x += vx
          y += vy
          if (x < 5 || x > sizeX - 5 || y < 5 || y > sizeY - 5) break
          bwd.push([x, y])
        }

        const full = [...bwd.reverse(), [startX, startY], ...fwd]
        if (full.length > 8) {
          paths.push(full)
        }
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
        .attr("stroke-opacity", flowMode === "ribbons" ? 0.85 : 0.75)
    })
  }, [seed, flowMode, density, turbulence, stepLength, strokeWidth, strokeColor])

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
