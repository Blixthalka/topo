import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { Mountain, Activity, Shapes, Grid, Sun, Moon, Menu, X } from "lucide-react"

const GENERATORS = [
  { name: "Topography", path: "/", icon: Mountain },
  { name: "Ridge Lines", path: "/ridges/", icon: Activity },
  { name: "Voronoi", path: "/voronoi/", icon: Shapes },
  { name: "Halftone", path: "/halftone/", icon: Grid },
]

const GeneratorNav = () => {
  const [isDark, setIsDark] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem("topo-theme")
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialDark = savedTheme ? savedTheme === "dark" : prefersDark

    setIsDark(initialDark)
    if (initialDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    const nextDark = !isDark
    setIsDark(nextDark)
    if (nextDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("topo-theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("topo-theme", "light")
    }
  }

  return (
    <header className="w-full mb-6 pt-2 pb-1">
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between gap-3">
        <nav aria-label="Generators" className="flex items-center gap-2">
          {GENERATORS.map(({ name, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              activeClassName="!bg-teal-700 !text-white !border-teal-700 shadow-sm"
              partiallyActive={path !== "/"}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-zinc-800 transition-all duration-150"
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{name}</span>
            </Link>
          ))}
        </nav>

        {/* Desktop Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Light mode" : "Dark mode"}
          className="p-2 rounded-full bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300 border border-gray-200 dark:border-zinc-800 transition shadow-sm"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
        </button>
      </div>

      {/* Mobile Header Bar */}
      <div className="flex md:hidden items-center justify-between py-1">
        <Link
          to="/"
          className="font-semibold text-sm tracking-tight text-gray-900 dark:text-zinc-100 flex items-center gap-2"
        >
          <div className="w-6 h-6 rounded-md bg-teal-700 text-white flex items-center justify-center font-bold text-xs">
            T
          </div>
          <span>Topo Suite</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Mobile Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-lg bg-white/80 dark:bg-zinc-900/80 text-gray-700 dark:text-zinc-300 border border-gray-200 dark:border-zinc-800 transition shadow-sm"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
          </button>

          {/* Mobile Burger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="p-2 rounded-lg bg-white/80 dark:bg-zinc-900/80 text-gray-700 dark:text-zinc-300 border border-gray-200 dark:border-zinc-800 transition shadow-sm"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 p-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-lg space-y-1">
          {GENERATORS.map(({ name, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setIsMobileMenuOpen(false)}
              activeClassName="!bg-teal-700 !text-white font-medium"
              partiallyActive={path !== "/"}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
            >
              <Icon className="w-4 h-4" />
              <span>{name}</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

export default GeneratorNav
