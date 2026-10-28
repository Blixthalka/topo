import React, { useEffect, useRef, useState } from "react"
import { Delaunay } from "d3-delaunay"
import { select } from "d3-selection"
import { RotateCwIcon, ClipboardIcon, DownloadIcon } from "lucide-react"
import IconButton from "./IconButton"

const VoronoiChart = ({
  pointsCount = 60,
  strokeWidth = 2,
  strokeColor = "#000000",
  className = "",
}) => {
  const ref = useRef()
  const wrapperRef = useRef()
  const [seed, setSeed] = useState(77)

  const sizeX = 600
  const sizeY = 400

  useEffect(() => {
    select(ref.current).selectAll("*").remove()
    const svg = select(ref.current)

    let s = seed
    const pseudoRandom = () => {
      s = Math.sin(s) * 10000
      return s - Math.floor(s)
    }

    const padding = 10
    const points = []
    for (let i = 0; i < pointsCount; i++) {
      points.push([
        padding + pseudoRandom() * (sizeX - padding * 2),
        padding + pseudoRandom() * (sizeY - padding * 2),
      ])
    }

    const delaunay = Delaunay.from(points)
    const voronoi = delaunay.voronoi([0, 0, sizeX, sizeY])

    svg
      .append("path")
      .attr("d", voronoi.render())
      .attr("stroke", strokeColor)
      .attr("stroke-width", strokeWidth)
      .attr("fill", "none")
      .attr("stroke-linejoin", "round")
  }, [seed, pointsCount, strokeWidth, strokeColor])

  const copy = () => {
    const contents = select(wrapperRef.current).html()
    navigator.clipboard.writeText(contents)
  }

  const downloadFile = (name = "voronoi.svg") => {
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
          onClick={() => downloadFile("voronoi.svg")}
          Icon={DownloadIcon}
        >
          Download
        </IconButton>
      </div>
    </div>
  )
}

export default VoronoiChart
