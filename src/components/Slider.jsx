import React from "react"

const Slider = ({
  label,
  value,
  min = 1,
  max = 100,
  step = 1,
  onChange,
  unit = "",
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex justify-between items-center text-sm">
        <label className="text-gray-500">{label}</label>
        <span className="text-gray-700 font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-teal-600 cursor-pointer h-2 bg-gray-200 rounded-lg"
      />
    </div>
  )
}

export default Slider
