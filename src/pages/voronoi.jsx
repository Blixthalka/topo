import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import VoronoiSettings from "../components/VoronoiSettings"

const VoronoiPage = () => {
  return (
    <Layout>
      <div className="mb-8 mt-16 sm:mt-20 text-center">
        <h1 className="text-3xl font-medium text-gray-900 dark:text-zinc-100">
          Voronoi Diagram SVG Generator
        </h1>
        <p className="text-gray-500 dark:text-zinc-400 mt-3 text-lg max-w-xl mx-auto">
          Generate clean mathematical Voronoi cell diagrams and organic mesh partitions.
        </p>
      </div>

      <div className="my-8">
        <VoronoiSettings />
      </div>
    </Layout>
  )
}

export const Head = () => (
  <Seo
    title="Voronoi Diagram SVG Generator - Procedural Organic Cell Mesh"
    description="Generate free organic Voronoi cell diagram vectors with customizable cell count, stroke width, and instant SVG export."
    pathname="/voronoi/"
  />
)

export default VoronoiPage
