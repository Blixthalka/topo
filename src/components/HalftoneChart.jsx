import React, { useEffect, useRef, useState } from "react"
import { select } from "d3-selection"
import { createNoise3D } from "simplex-noise"
import { RotateCwIcon, ClipboardIcon, DownloadIcon } from "lucide-react"
import IconButton from "./IconButton"

const HalftoneChart = ({
  columns = 36,
  maxSize = 6,
  patternType = "noise",
  dotColor = "#000000",
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

        if (patternType === "noise") {
          const n = simplex(x * 0.005, y * 0.005, seed * 0.05)
          factor = (n + 1) / 2
        } else if (patternType === "ripple") {
          const dist = Math.hypot(x - centerX, y - centerY)
          factor = (Math.sin(dist * 0.04 - seed) + 1) / 2
        } else if (patternType === "diagonal") {
          factor = (Math.sin((x + y) * 0.025 + seed) + 1) / 2
        }

        const currentSize = minSize + factor * (maxSize - minSize)
        if (currentSize <= 0.3) continue

        svg
          .append("circle")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", currentSize)
          .attr("fill", dotColor)
      }
    }
  }, [seed, columns, maxSize, patternType, dotColor])

  const copy = () => {
    const contents = select(wrapperRef.current).html()
    navigator.clipboard.writeText(contents)
  }

  const downloadFile = (name = "halftone.svg") => {
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
          className="bg-gray-900 hover:bg-black border-gray-900 hover:border-black !text-white dark:bg-zinc-100 dark:hover:bg-white dark:border-zinc-100 dark:hover:border-white dark:!text-zinc-900 font-medium transition-colors shadow-sm"
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
