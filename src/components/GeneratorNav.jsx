import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { Sun, Moon, Menu, X } from "lucide-react"

const GENERATORS = [
  { name: "Topography", path: "/" },
  { name: "Ridge Lines", path: "/ridges/" },
  { name: "Voronoi", path: "/voronoi/" },
  { name: "Halftone", path: "/halftone/" },
  { name: "Flow Matrix", path: "/flow-matrix/" },
]

const GeneratorNav = () => {
  const [isDark, setIsDark] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
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

  const checkIsActive = (href, location) => {
    const current = (location?.pathname || "").replace(/\/+$/, "") || "/"
    const target = href.replace(/\/+$/, "") || "/"
    if (target === "/") return current === "/"
    if (target === "/halftone") return current === "/halftone" || current === "/dots"
    if (target === "/flow-matrix") return current === "/flow-matrix" || current === "/pills"
    return current === target || current.startsWith(target + "/")
  }

  const getDesktopLinkProps = ({ href, location }) => {
    const isActive = checkIsActive(href, location)
    return {
      className: `inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 ${
        isActive
          ? "bg-gray-900 text-white border-gray-900 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100 shadow-sm"
          : "bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white border-gray-200 dark:border-zinc-800"
      }`,
    }
  }

  const getMobileLinkProps = ({ href, location }) => {
    const isActive = checkIsActive(href, location)
    return {
      className: `flex items-center px-3.5 py-2 rounded-lg text-sm transition ${
        isActive
          ? "bg-gray-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium"
          : "text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
      }`,
    }
  }

  return (
    <header className="w-full mb-6 pt-2 pb-1">
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between gap-3">
        <nav aria-label="Generators" className="flex items-center gap-2">
          {GENERATORS.map(({ name, path }) => (
            <Link
              key={path}
              to={path}
              getProps={getDesktopLinkProps}
            >
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
          <div className="w-6 h-6 rounded-md bg-gray-900 text-white dark:bg-zinc-100 dark:text-zinc-900 flex items-center justify-center font-bold text-xs">
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
          {GENERATORS.map(({ name, path }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setIsMobileMenuOpen(false)}
              getProps={getMobileLinkProps}
            >
              <span>{name}</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

export default GeneratorNav
