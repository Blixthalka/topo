import React from "react"

const IconButton = ({ Icon, className = "", onClick, children, ...other }) => {
  return (
    <button
      {...other}
      className={`border border-gray-200 dark:border-zinc-700 text-sm flex space-x-3 items-center justify-center text-gray-500 dark:text-zinc-300 hover:text-gray-700 dark:hover:text-white p-1 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors ${className}`}
      onClick={onClick}
    >
      {children && <div>{children}</div>}
      {Icon && <Icon className="w-4 h-4" />}
    </button>
  )
}

export default IconButton
