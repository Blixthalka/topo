import React from "react"
import IconButton from "./IconButton"
import { HashIcon } from "lucide-react"

const ColorPicker = ({ colors, label, selected, onValueChange, className = "", ...props }) => {
  return (
    <div className={className} {...props}>
      <label className="text-gray-500 dark:text-zinc-400 text-sm">{label}</label>

      <div className="flex space-x-2 flex-wrap items-center">
        {colors.map((c) => (
          <IconButton
            key={c}
            className={`rounded w-7 h-7 hover:bg-none mt-2 ${
              selected === c ? "ring-2 ring-teal-500 ring-offset-1 dark:ring-offset-zinc-900" : ""
            }`}
            style={{ backgroundColor: "#" + c }}
            onClick={() => onValueChange(c)}
          />
        ))}

        <div className="flex items-center border border-gray-200 dark:border-zinc-700 rounded text-gray-500 dark:text-zinc-300 text-sm mt-2 overflow-hidden">
          <div className="px-1.5 h-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
            <HashIcon className="w-3.5 h-3.5" />
          </div>
          <input
            className="h-7 w-20 px-1 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-200 focus:outline-none"
            value={selected}
            onChange={(e) => onValueChange(e.target.value.replace("#", ""))}
          />
        </div>
      </div>
    </div>
  )
}

export default ColorPicker
