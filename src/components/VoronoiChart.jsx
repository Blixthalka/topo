import React, { useEffect, useRef, useState } from "react"
import { Delaunay } from "d3-delaunay"
import { polygonCentroid } from "d3-polygon"
import { select } from "d3-selection"
import { RotateCwIcon, ClipboardIcon, DownloadIcon } from "lucide-react"
import IconButton from "./IconButton"

const VoronoiChart = ({
  pointsCount = 60,
  mode = "voronoi",
  relaxation = 2,
  showDots = false,
  strokeWidth = 2,
  strokeColor = "#71717a",
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
    let points = []
    for (let i = 0; i < pointsCount; i++) {
      points.push([
        padding + pseudoRandom() * (sizeX - padding * 2),
        padding + pseudoRandom() * (sizeY - padding * 2),
      ])
    }

    for (let r = 0; r < relaxation; r++) {
      const del = Delaunay.from(points)
      const vor = del.voronoi([0, 0, sizeX, sizeY])
      const relaxed = []
      for (let i = 0; i < points.length; i++) {
        const poly = vor.cellPolygon(i)
        if (poly && poly.length > 2) {
          relaxed.push(polygonCentroid(poly))
        } else {
          relaxed.push(points[i])
        }
      }
      points = relaxed
    }

    const delaunay = Delaunay.from(points)
    const voronoi = delaunay.voronoi([0, 0, sizeX, sizeY])

    if (mode === "delaunay" || mode === "both") {
      svg
        .append("path")
        .attr("d", delaunay.render())
        .attr("stroke", mode === "both" ? "#94a3b8" : strokeColor)
        .attr("stroke-width", mode === "both" ? 1 : strokeWidth)
        .attr("stroke-dasharray", mode === "both" ? "3,3" : "none")
        .attr("fill", "none")
        .attr("stroke-opacity", mode === "both" ? 0.6 : 1)
    }

    if (mode === "voronoi" || mode === "both") {
      svg
        .append("path")
        .attr("d", voronoi.render())
        .attr("stroke", strokeColor)
        .attr("stroke-width", strokeWidth)
        .attr("fill", "none")
        .attr("stroke-linejoin", "round")
    }

    if (showDots) {
      points.forEach(([x, y]) => {
        svg
          .append("circle")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", strokeWidth * 1.5)
          .attr("fill", strokeColor)
      })
    }
  }, [seed, pointsCount, mode, relaxation, showDots, strokeWidth, strokeColor])

  const copy = () => {
    const contents = select(wrapperRef.current).html()
    navigator.clipboard.writeText(contents)
  }

  const downloadFile = (name = "voronoi.svg") => {
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
