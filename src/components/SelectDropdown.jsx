import React from "react"
import { ChevronDown } from "lucide-react"

const SelectDropdown = ({ label, selected, options, onValueChange, className = "" }) => {
  return (
    <div className={className}>
      {label && (
        <label className="text-gray-500 dark:text-zinc-400 text-sm block mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={selected}
          onChange={(e) => onValueChange(e.target.value)}
          className="w-full appearance-none border border-gray-200 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 text-sm px-3 py-1.5 pr-8 hover:bg-gray-50 dark:hover:bg-zinc-700/60 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-zinc-100 cursor-pointer transition-colors"
        >
          {options.map((opt) => {
            const isObj = typeof opt === "object" && opt !== null
            const val = isObj ? opt.value : opt
            const text = isObj ? opt.label : String(opt)
            return (
              <option
                key={val}
                value={val}
                className="bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100"
              >
                {text}
              </option>
            )
          })}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-gray-400 dark:text-zinc-400">
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  )
}

export default SelectDropdown
