import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import HalftoneSettings from "../components/HalftoneSettings"

const DotsPage = () => {
  return (
    <Layout>
      <div className="mb-8 mt-16 sm:mt-20 text-center">
        <h1 className="text-3xl font-medium text-gray-900 dark:text-zinc-100">
          Dot Matrix & Halftone SVG Generator
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
    title="Dot Matrix & Halftone SVG Generator - Procedural Vector Dot Grids"
    description="Generate customizable procedural vector dot matrix grids, wave halftones, and organic patterns in SVG. Free online generator."
    pathname="/dots/"
  />
)

export default DotsPage
