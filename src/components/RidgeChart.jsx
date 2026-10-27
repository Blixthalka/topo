import React, { useEffect, useRef, useState } from "react"
import { line as d3Line, curveBasis } from "d3-shape"
import { select } from "d3-selection"
import { createNoise3D } from "simplex-noise"
import { RotateCwIcon, ClipboardIcon, DownloadIcon } from "lucide-react"
import IconButton from "./IconButton"

const RidgeChart = ({
  lineCount = 30,
  amplitude = 50,
  roughness = 3,
  strokeWidth = 2,
  strokeColor = "#71717a",
  className = "",
}) => {
  const ref = useRef()
  const wrapperRef = useRef()
  const [seed, setSeed] = useState(101)
  const [isDark, setIsDark] = useState(false)

  const sizeX = 600
  const sizeY = 400

  // Synchronize with document dark mode class
  useEffect(() => {
    if (typeof document === "undefined") return
    setIsDark(document.documentElement.classList.contains("dark"))

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

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
    const bgColor = isDark ? "#18181b" : "#ffffff"

    const lineGenerator = d3Line()
      .x((d) => d[0])
      .y((d) => d[1])
      .curve(curveBasis)

    const startY = 30
    const endY = sizeY - 30
    const lineSpacing = (endY - startY) / (lineCount - 1)
    const centerX = sizeX / 2
    const stepX = 5
    const noiseScale = 0.003 * roughness
    const spread = 150

    for (let i = 0; i < lineCount; i++) {
      const baseY = startY + i * lineSpacing
      const points = []

      for (let x = 20; x <= sizeX - 20; x += stepX) {
        const dist = Math.abs(x - centerX)
        const envelope = Math.exp(-Math.pow(dist / spread, 2))

        const n1 = simplex(x * noiseScale, i * 0.18, seed)
        const n2 = 0.35 * simplex(x * noiseScale * 2.5, i * 0.18, seed + 10)
        const rawNoise = Math.max(0, n1 + n2)

        const peakY = baseY - rawNoise * amplitude * envelope
        points.push([x, peakY])
      }

      const firstX = points[0][0]
      const lastX = points[points.length - 1][0]
      const closedPoints = [...points, [lastX, sizeY], [firstX, sizeY]]

      // Hidden line occlusion fill matching card background
      svg
        .append("path")
        .attr("d", lineGenerator(closedPoints))
        .attr("fill", bgColor)
        .attr("stroke", "none")

      // Line stroke
      svg
        .append("path")
        .attr("d", lineGenerator(points))
        .attr("stroke", strokeColor)
        .attr("stroke-width", strokeWidth)
        .attr("fill", "none")
        .attr("stroke-linecap", "round")
    }
  }, [seed, lineCount, amplitude, roughness, strokeWidth, strokeColor, isDark])

  const copy = () => {
    const contents = select(wrapperRef.current).html()
    navigator.clipboard.writeText(contents)
  }

  const downloadFile = (name = "ridges.svg") => {
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
          onClick={() => downloadFile("ridges.svg")}
          Icon={DownloadIcon}
        >
          Download
        </IconButton>
      </div>
    </div>
  )
}

export default RidgeChart
