import React from "react"
import { Link } from "gatsby"
import { Mountain, Activity, Shapes, Grid } from "lucide-react"

const GENERATORS = [
  { name: "Topography", path: "/", icon: Mountain },
  { name: "Ridge Lines", path: "/ridges/", icon: Activity },
  { name: "Voronoi", path: "/voronoi/", icon: Shapes },
  { name: "Halftone", path: "/halftone/", icon: Grid },
]

const GeneratorNav = () => {
  return (
    <nav
      aria-label="Generators"
      className="w-full mb-6 pt-2 pb-1 overflow-x-auto scrollbar-none"
    >
      <div className="flex items-center justify-start sm:justify-center gap-2 min-w-max pb-1 px-1">
        {GENERATORS.map(({ name, path, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            activeClassName="!bg-teal-700 !text-white !border-teal-700 shadow-sm"
            partiallyActive={path !== "/"}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 border border-teal-100/80 transition-all duration-150"
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{name}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default GeneratorNav
