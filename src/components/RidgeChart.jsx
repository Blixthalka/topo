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
  fillMode = "solid", // "solid" (occluded with theme bg) | "none" (transparent wireframe)
  className = "",
}) => {
  const ref = useRef()
  const wrapperRef = useRef()
  const [seed, setSeed] = useState(101)
  const [isDark, setIsDark] = useState(false)

  const sizeX = 600
  const sizeY = 400

  // Synchronize with document dark mode
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

    // Dynamic startY with headroom so high peaks never get chopped off at the top
    const startY = Math.max(50, Math.round(amplitude * 0.55 + 20))
    const endY = sizeY - 25
    const lineSpacing = (endY - startY) / (lineCount - 1)
    const centerX = sizeX / 2
    const stepX = 5
    const noiseScale = 0.003 * roughness
    const spread = 145

    for (let i = 0; i < lineCount; i++) {
      const baseY = startY + i * lineSpacing
      // Gentle taper for the top 2-3 rows so the first ridge builds up organically
      const topTaper = Math.min(1, (i + 1) / 3)
      const points = []

      // Full edge-to-edge calculation (0 to sizeX)
      for (let x = 0; x <= sizeX; x += stepX) {
        const dist = Math.abs(x - centerX)
        const envelope = Math.exp(-Math.pow(dist / spread, 2))

        const n1 = simplex(x * noiseScale, i * 0.18, seed)
        const n2 = 0.35 * simplex(x * noiseScale * 2.5, i * 0.18, seed + 10)
        const rawNoise = Math.max(0, n1 + n2)

        const peakY = Math.max(10, baseY - rawNoise * amplitude * envelope * topTaper)
        points.push([x, peakY])
      }

      // Occlusion polygon if fillMode is solid (SVG canvas remains 100% transparent)
      if (fillMode !== "none") {
        const closedPoints = [...points, [sizeX, sizeY], [0, sizeY]]
        svg
          .append("path")
          .attr("d", lineGenerator(closedPoints))
          .attr("fill", bgColor)
          .attr("stroke", "none")
      }

      svg
        .append("path")
        .attr("d", lineGenerator(points))
        .attr("stroke", strokeColor)
        .attr("stroke-width", strokeWidth)
        .attr("fill", "none")
        .attr("stroke-linecap", "round")
    }
  }, [seed, lineCount, amplitude, roughness, strokeWidth, strokeColor, isDark, fillMode])

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
