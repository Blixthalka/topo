import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import HalftoneSettings from "../components/HalftoneSettings"

const HalftonePage = () => {
  return (
    <Layout>
      <div className="mb-8 mt-6 text-center">
        <h1 className="text-3xl font-medium text-gray-900 dark:text-zinc-100">
          Vector Halftone & Dot Matrix SVG Generator
        </h1>
        <p className="text-gray-500 dark:text-zinc-400 mt-3 text-lg max-w-xl mx-auto">
          Generate modern procedural vector dot grids, wave halftones, and matrix patterns.
        </p>
      </div>

      <div className="my-8">
        <HalftoneSettings />
      </div>

      <div className="text-sm text-gray-500 dark:text-zinc-400 text-center my-20">
        Created by{" "}
        <a
          className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          href="https://x.com/blixthalka"
        >
          @blixthalka
        </a>
      </div>
    </Layout>
  )
}

export const Head = () => (
  <Seo
    title="Vector Halftone SVG Generator - Free Dot Matrix & Wave Patterns"
    description="Generate customizable procedural vector halftone grids, dot matrix waves, and crosshair patterns in SVG. Free online generator."
    pathname="/halftone/"
  />
)

export default HalftonePage
