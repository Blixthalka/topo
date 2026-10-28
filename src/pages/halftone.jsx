import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import HalftoneSettings from "../components/HalftoneSettings"

const HalftonePage = () => {
  return (
    <Layout>
      <div className="mb-8 mt-16 sm:mt-20 text-center">
        <h1 className="text-3xl font-medium text-gray-900 dark:text-zinc-100">
          Halftone SVG Generator
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
    title="Halftone SVG Generator - Free Vector Dot Matrix & Waves"
    description="Generate free procedural vector halftone grids and wave dot matrix patterns in SVG. Customizable dot radius, wave amplitude, density, and instant SVG export."
    pathname="/halftone/"
  />
)

export default HalftonePage
