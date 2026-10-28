import React from "react"
import GeneratorNav from "./GeneratorNav"
import Footer from "./Footer"
import TopoPackPromo from "./TopoPackPromo"

const Layout = ({ children, showPromo = true }) => {
  return (
    <div className="bg-teal-50 dark:bg-zinc-950 min-h-screen text-gray-900 dark:text-zinc-100 transition-colors duration-150 flex flex-col justify-between font-mono">
      <div className="mx-auto max-w-3xl p-5 pb-12 w-full">
        <GeneratorNav />
        {children}
        {showPromo && <TopoPackPromo />}
        <Footer />
      </div>
    </div>
  )
}

export default Layout
