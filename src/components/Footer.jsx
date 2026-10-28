import React from "react"
import { ArrowUpRight } from "lucide-react"
import DarkModeToggle from "./DarkModeToggle"

const Footer = () => {
  return (
    <footer className="mt-20 sm:mt-24 mb-20 sm:mb-24 text-center select-none flex flex-col items-center">
      <DarkModeToggle className="mb-7" />
      <p className="text-xs font-mono text-gray-400 dark:text-neutral-500">
        topo · by{" "}
        <a
          href="https://x.com/blixthalka"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-gray-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors underline decoration-dotted underline-offset-4"
        >
          <span>@blixthalka</span>
          <ArrowUpRight className="w-3 h-3 opacity-60" />
        </a>
      </p>
    </footer>
  )
}

export default Footer
