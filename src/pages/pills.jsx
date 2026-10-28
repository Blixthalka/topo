import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import PillsSettings from "../components/PillsSettings"

const PillsPage = () => {
  return (
    <Layout>
      <div className="mb-8 mt-16 sm:mt-20 text-center">
        <h1 className="text-3xl font-medium text-gray-900 dark:text-zinc-100">
          Flow Matrix SVG Generator
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
    title="Flow Matrix SVG Generator - Directional Capsule & Flow Fields"
    description="Generate free procedural flow matrix patterns and directional capsule vector fields. Features uniform sizing, wave flow orientation, and instant SVG export."
    pathname="/flow-matrix/"
  />
)

export default PillsPage
