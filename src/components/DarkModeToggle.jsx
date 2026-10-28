import React, { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"

const DarkModeToggle = ({ className = "" }) => {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("topo-theme")
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialDark = savedTheme ? savedTheme === "dark" : prefersDark

    const syncThemeColor = (dark) => {
      let meta = document.querySelector('meta[name="theme-color"]')
      if (!meta) {
        meta = document.createElement("meta")
        meta.name = "theme-color"
        document.head.appendChild(meta)
      }
      meta.content = dark ? "#09090b" : "#f0fdfa"
    }

    setIsDark(initialDark)
    syncThemeColor(initialDark)
    if (initialDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    const observer = new MutationObserver(() => {
      const isCurrentlyDark = document.documentElement.classList.contains("dark")
      setIsDark(isCurrentlyDark)
      syncThemeColor(isCurrentlyDark)
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
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
    <button
      onClick={toggleDarkMode}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`p-2 rounded-full bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-300 border border-gray-200 dark:border-zinc-800 transition shadow-sm cursor-pointer ${className}`}
    >
      {mounted && isDark ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-gray-600 dark:text-zinc-400" />
      )}
    </button>
  )
}

export default DarkModeToggle
