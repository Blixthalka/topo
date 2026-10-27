import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import HalftoneSettings from "../components/HalftoneSettings"
import { Link } from "gatsby"
import { Grid, Eye, Cpu, Sliders } from "lucide-react"

const HalftonePage = () => {
  return (
    <Layout>
      <div className="mb-8 mt-6 text-center">
        <h1 className="text-3xl font-medium">Vector Halftone & Dot Matrix SVG Generator</h1>
        <p className="text-gray-500 mt-3 text-lg max-w-xl mx-auto">
          Generate modern procedural vector dot grids, wave halftones, and matrix patterns. 100% free, customizable, and exportable as clean SVG.
        </p>
      </div>

      <div className="my-8">
        <HalftoneSettings />
      </div>

      {/* SEO Content Section */}
      <article className="my-24 prose max-w-none text-gray-700">
        <div className="bg-white p-8 rounded-xl border border-teal-100 shadow-sm space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              What is a Vector Halftone Generator?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Halftone is a reprographic technique that simulates continuous tone imagery through the use of dots varying either in size or spacing. In digital vector generative design, halftone dot matrices use mathematical functions—such as simplex noise fields, concentric distance ripples, or interference waves—to create hypnotic optical illusions of physical volume, lighting, and movement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <Grid className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Multiple Primitive Shapes</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Switch between circular dots, technical crosshairs, and angled pills to produce editorial Swiss typography textures or retro CRT display vibes.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <Sliders className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Procedural Wave Modulations</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Choose between natural turbulence (simplex noise), geometric water drops (radial ripples), or directional waves.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <Cpu className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Lightweight Vector Geometry</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Generates optimized SVG <code>&lt;circle&gt;</code> and <code>&lt;rect&gt;</code> elements that stay lightweight (under a few kilobytes) while offering infinite scalable fidelity.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <Eye className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Explore Other Generators</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Browse our full generative suite:{" "}
                  <Link to="/" className="text-teal-700 underline font-medium">
                    Topography
                  </Link>
                  ,{" "}
                  <Link to="/flow-fields/" className="text-teal-700 underline font-medium">
                    Flow Fields
                  </Link>
                  ,{" "}
                  <Link to="/ridges/" className="text-teal-700 underline font-medium">
                    Ridge Lines
                  </Link>
                  , and{" "}
                  <Link to="/voronoi/" className="text-teal-700 underline font-medium">
                    Voronoi
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
    title="Vector Halftone SVG Generator - Free Dot Matrix & Wave Patterns"
    description="Generate customizable procedural vector halftone grids, dot matrix waves, and crosshair patterns in SVG. Free online generator."
    pathname="/halftone/"
  />
)

export default HalftonePage
