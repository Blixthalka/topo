import React from "react"
import { Link } from "gatsby"
import { Mountain, Waves, Activity, Sparkles, Shapes, Grid } from "lucide-react"

const GENERATORS = [
  { name: "Topography", path: "/", icon: Mountain },
  { name: "Flow Fields", path: "/flow-fields/", icon: Waves },
  { name: "Ridge Lines", path: "/ridges/", icon: Activity },
  { name: "Guilloché", path: "/guilloche/", icon: Sparkles },
  { name: "Voronoi", path: "/voronoi/", icon: Shapes },
  { name: "Halftone", path: "/halftone/", icon: Grid },
]

const GeneratorNav = () => {
  return (
    <nav
      aria-label="Generators"
      className="w-full mb-8 pt-4 pb-2 border-b border-teal-100/60 overflow-x-auto scrollbar-none"
    >
      <div className="flex items-center justify-start sm:justify-center gap-2 min-w-max pb-2 px-1">
        {GENERATORS.map(({ name, path, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            activeClassName="!bg-teal-700 !text-white !border-teal-700 shadow-sm"
            partiallyActive={path !== "/"}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900 border border-teal-100 transition-all duration-150"
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
