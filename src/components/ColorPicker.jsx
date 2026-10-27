import React from "react"
import IconButton from "./IconButton"
import { HashIcon } from "lucide-react"
import { DEFAULT_COLORS } from "../utils/colors"

const ColorPicker = ({
  colors = DEFAULT_COLORS,
  label = "Stroke Color",
  selected,
  onValueChange,
  className = "",
  ...props
}) => {
  const normalizedColors = colors.map((c) =>
    typeof c === "string" ? { hex: c.replace("#", ""), name: `#${c}` } : { ...c, hex: c.hex.replace("#", "") }
  )

  const activeHex = selected?.replace("#", "").toLowerCase()

  return (
    <div className={className} {...props}>
      <label className="text-gray-500 dark:text-zinc-400 text-sm">{label}</label>

      <div className="flex space-x-2 flex-wrap items-center gap-y-1 mt-1">
        {normalizedColors.map(({ hex, name }) => {
          const isSelected = activeHex === hex.toLowerCase()
          return (
            <IconButton
              key={hex}
              title={name}
              aria-label={name}
              className={`rounded w-7 h-7 hover:bg-none mt-1 border border-gray-300 dark:border-zinc-700 transition-transform ${
                isSelected ? "!ring-2 !ring-teal-600 dark:!ring-teal-400 !ring-offset-1 dark:!ring-offset-zinc-900 scale-105" : ""
              }`}
              style={{ backgroundColor: "#" + hex }}
              onClick={() => onValueChange(hex)}
            />
          )
        })}

        <div className="flex items-center border border-gray-200 dark:border-zinc-700 rounded text-gray-500 dark:text-zinc-300 text-sm mt-1 overflow-hidden">
          <div className="px-1.5 h-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
            <HashIcon className="w-3.5 h-3.5" />
          </div>
          <input
            className="h-7 w-20 px-1 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-200 font-mono text-xs focus:outline-none uppercase"
            value={activeHex}
            placeholder="HEX"
            maxLength={6}
            onChange={(e) => onValueChange(e.target.value.replace("#", ""))}
          />
        </div>
      </div>
    </div>
  )
}

export default ColorPicker
