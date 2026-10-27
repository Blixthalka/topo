import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import HalftoneSettings from "../components/HalftoneSettings"

const DotsPage = () => {
  return (
    <Layout>
      <div className="mb-8 mt-16 sm:mt-20 text-center">
        <h1 className="text-3xl font-medium text-gray-900 dark:text-zinc-100">
          Vector Halftone & Dot Matrix SVG Generator
        </h1>
        <p className="text-gray-500 dark:text-zinc-400 mt-3 text-lg max-w-xl mx-auto">
          Generate procedural vector dot grids, wave halftones, and organic matrix patterns.
        </p>
      </div>

      <div className="my-8">
        <HalftoneSettings />
      </div>
    </Layout>
  )
}

export const Head = () => (
  <Seo
    title="Vector Halftone & Dot Matrix SVG Generator - Free Dot Pattern SVG"
    description="Generate free procedural vector halftone dot grids, wave matrix patterns, and organic dot vectors. Customizable density, sizing, and instant SVG export."
    pathname="/dots/"
  />
)

export default DotsPage
