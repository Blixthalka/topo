import React from "react"
import { Link } from "gatsby"

const GENERATORS = [
  { name: "Topography", path: "/" },
  { name: "Ridge Lines", path: "/ridges/" },
  { name: "Voronoi", path: "/voronoi/" },
  { name: "Halftone", path: "/halftone/" },
  { name: "Flow Matrix", path: "/flow-matrix/" },
  { name: "Dither", path: "/dither/" },
]

const GeneratorNav = () => {
  const checkIsActive = (href, location) => {
    const current = (location?.pathname || "").replace(/\/+$/, "") || "/"
    const target = href.replace(/\/+$/, "") || "/"
    if (target === "/") return current === "/"
    if (target === "/halftone") return current === "/halftone" || current === "/dots"
    if (target === "/flow-matrix") return current === "/flow-matrix" || current === "/pills"
    return current === target || current.startsWith(target + "/")
  }

  const getLinkProps = ({ href, location }) => {
    const isActive = checkIsActive(href, location)
    return {
      className: `inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all duration-150 ${
        isActive
          ? "bg-gray-900 text-white border-gray-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100 shadow-sm"
          : "bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white border-gray-200 dark:border-zinc-800"
      }`,
    }
  }

  return (
    <header className="w-full mb-6 pt-2 pb-1">
      <nav aria-label="Generators" className="flex items-center justify-center gap-2 flex-wrap">
        {GENERATORS.map(({ name, path }) => (
          <Link
            key={path}
            to={path}
            getProps={getLinkProps}
          >
            <span>{name}</span>
          </Link>
        ))}
      </nav>
    </header>
  )
}

export default GeneratorNav
