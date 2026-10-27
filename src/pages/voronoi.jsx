import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import VoronoiSettings from "../components/VoronoiSettings"

const VoronoiPage = () => {
  return (
    <Layout>
      <div className="mb-8 mt-6 text-center">
        <h1 className="text-3xl font-medium text-gray-900 dark:text-zinc-100">
          Voronoi & Delaunay SVG Generator
        </h1>
        <p className="text-gray-500 dark:text-zinc-400 mt-3 text-lg max-w-xl mx-auto">
          Generate clean mathematical Voronoi cell diagrams and Delaunay triangulations.
        </p>
      </div>

      <div className="my-8">
        <VoronoiSettings />
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
    title="Voronoi & Delaunay SVG Generator - Procedural Geometric Cell Mesh"
    description="Generate free Voronoi cell diagrams and Delaunay triangulation vectors. Features Lloyd relaxation, centroid nodes, and instant SVG export."
    pathname="/voronoi/"
  />
)

export default VoronoiPage
