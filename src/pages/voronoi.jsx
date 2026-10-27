import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import VoronoiSettings from "../components/VoronoiSettings"
import { Link } from "gatsby"
import { Shapes, Hexagon, Cpu, Compass } from "lucide-react"

const VoronoiPage = () => {
  return (
    <Layout>
      <div className="mb-8 mt-6 text-center">
        <h1 className="text-3xl font-medium">Voronoi & Delaunay SVG Generator</h1>
        <p className="text-gray-500 mt-3 text-lg max-w-xl mx-auto">
          Generate clean mathematical Voronoi cell diagrams and Delaunay triangulations. Free SVG export with Lloyd relaxation controls.
        </p>
      </div>

      <div className="my-8">
        <VoronoiSettings />
      </div>

      {/* SEO Content Section */}
      <article className="my-24 prose max-w-none text-gray-700">
        <div className="bg-white p-8 rounded-xl border border-teal-100 shadow-sm space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Understanding Voronoi Diagrams and Delaunay Triangulation
            </h2>
            <p className="text-gray-600 leading-relaxed">
              A Voronoi diagram partitions a plane into polygonal regions around seed points such that every location inside a cell is closer to its seed than to any other. The dual mathematical graph is the Delaunay triangulation, which connects points into non-overlapping triangles without any point falling inside the circumcircle of any triangle. Voronoi structures are found everywhere in nature: giraffe coats, dragonfly wings, plant cell walls, and foam bubbles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <Hexagon className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Lloyd’s Relaxation Algorithm</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Smooth chaotic random distributions into harmonious, quasi-hexagonal organic honeycomb meshes by iteratively nudging seeds toward their polygon centroids.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <Shapes className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Triple Mode Rendering</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Toggle seamlessly between biological Voronoi cell mosaics, architectural low-poly Delaunay triangular facets, or both superimposed.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <Cpu className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Clean SVG Polygons</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Export vector paths that import into Figma, Blender (for 3D extrusion/displacement), and CNC or laser cutting applications.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Discover Other Vector Tools</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Explore our{" "}
                  <Link to="/" className="text-teal-700 underline font-medium">
                    Topography Generator
                  </Link>
                  ,{" "}
                  <Link to="/ridges/" className="text-teal-700 underline font-medium">
                    Ridge Lines
                  </Link>
                  , and{" "}
                  <Link to="/halftone/" className="text-teal-700 underline font-medium">
                    Halftone Generator
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <div className="text-sm text-gray-500 text-center my-16">
        Created by{" "}
        <a
          className="text-teal-700 hover:text-teal-800 font-medium"
          href="https://x.com/blixthalka"
          target="_blank"
          rel="noopener noreferrer"
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
