import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import PillsSettings from "../components/PillsSettings"

const PillsPage = () => {
  return (
    <Layout>
      <div className="mb-8 mt-16 sm:mt-20 text-center">
        <h1 className="text-3xl font-medium text-gray-900 dark:text-zinc-100">
          Vector Field & Pill Pattern SVG Generator
        </h1>
        <p className="text-gray-500 dark:text-zinc-400 mt-3 text-lg max-w-xl mx-auto">
          Generate directional capsule vectors, dash matrices, and procedural flow fields with uniform or dynamic sizing.
        </p>
      </div>

      <div className="my-8">
        <PillsSettings />
      </div>
    </Layout>
  )
}

export const Head = () => (
  <Seo
    title="Vector Field & Pill Pattern SVG Generator - Directional Flow & Dash Matrix"
    description="Generate free procedural pill patterns, dash vector fields, and capsule matrices in SVG. Features uniform capsule sizing, wave flow orientation, and instant SVG export."
    pathname="/pills/"
  />
)

export default PillsPage
