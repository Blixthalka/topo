import React from "react"
import GeneratorNav from "./GeneratorNav"

const Layout = ({ children }) => {
  return (
    <div className="bg-teal-50 min-h-screen text-gray-900">
      <div className="mx-auto max-w-3xl p-5">
        <GeneratorNav />
        {children}
      </div>
    </div>
  )
}

export default Layout
