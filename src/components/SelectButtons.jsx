import React from "react"
import IconButton from "./IconButton"

const SelectButtons = ({ values, selected, label, className = "", onValueChange, children, ...other }) => {
  return (
    <div className={className} {...other}>
      <label className="text-gray-500 text-sm">{label}</label>
      <div className="flex space-x-2 mt-2 flex-wrap gap-y-2">
        {values.map((v) => {
          const isObj = typeof v === "object" && v !== null
          const val = isObj ? v.value : v
          const text = isObj ? v.label : String(v)
          const isWide = text.length > 2

          return (
            <IconButton
              key={val}
              className={`${isWide ? "px-2.5 min-w-[2.25rem]" : "w-7"} ${
                selected === val ? " bg-gray-200 border-gray-300 font-medium " : ""
              }`}
              onClick={() => onValueChange(val)}
            >
              <span>{text}</span>
            </IconButton>
          )
        })}
      </div>
    </div>
  )
}

export default SelectButtons
