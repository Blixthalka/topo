import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import FlowSettings from "../components/FlowSettings"
import { Link } from "gatsby"
import { Sparkles, Layers, Sliders, FileCode } from "lucide-react"

const FlowFieldsPage = () => {
  return (
    <Layout>
      <div className="mb-8 mt-6 text-center">
        <h1 className="text-3xl font-medium">Flow Field SVG Generator</h1>
        <p className="text-gray-500 mt-3 text-lg max-w-xl mx-auto">
          Generate organic procedural flow field vectors and ribbon streamlines using simplex noise.
          100% free, customizable, and exportable as crisp SVG.
        </p>
      </div>

      <div className="my-8">
        <FlowSettings />
      </div>

      {/* SEO & Informational Section */}
      <article className="my-24 prose max-w-none text-gray-700">
        <div className="bg-white p-8 rounded-xl border border-teal-100 shadow-sm space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              What is a Flow Field Generator?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              A flow field (also known as a vector field) calculates an angle and velocity at every coordinate in space using multi-dimensional noise algorithms like Simplex or Perlin noise. Particles are dropped across the canvas and traced step-by-step through the invisible currents, producing stunning organic curves that resemble silk ribbons, liquid waves, magnetic field lines, or hair strands.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <FileCode className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Figma & Illustrator Ready</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Export clean SVG paths that open seamlessly in Figma, Adobe Illustrator, or Inkscape with editable vector strokes and transparent backgrounds.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <Sliders className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Infinite Procedural Variations</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Adjust turbulence, streamline length, line density, and stroke weights to generate subtle UI accents or dramatic hero illustration backdrops.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Web & Print High Resolution</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Because output is mathematical SVG, it scales infinitely without pixelation, making it perfect for responsive websites, merchandise, and architectural prints.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Explore More Tools</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Looking for elevation contours? Try our{" "}
                  <Link to="/" className="text-teal-700 underline font-medium">
                    Topography Generator
                  </Link>{" "}
                  or generate stacked{" "}
                  <Link to="/ridges/" className="text-teal-700 underline font-medium">
                    Ridge Lines
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
    title="Flow Field SVG Generator - Free Vector Wave Streamlines"
    description="Generate beautiful procedural flow field vectors and curl noise streamlines. Free online SVG export for web design, posters, and Figma illustrations."
    pathname="/flow-fields/"
  />
)

export default FlowFieldsPage
