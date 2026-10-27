import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import RidgeSettings from "../components/RidgeSettings"
import { Link } from "gatsby"
import { Activity, ShieldCheck, Download, Code } from "lucide-react"

const RidgesPage = () => {
  return (
    <Layout>
      <div className="mb-8 mt-6 text-center">
        <h1 className="text-3xl font-medium">Ridge Line Plot SVG Generator</h1>
        <p className="text-gray-500 mt-3 text-lg max-w-xl mx-auto">
          Generate stacked mountain ridge plots and Joy Division ("Unknown Pleasures") style procedural elevation waves. Free SVG export.
        </p>
      </div>

      <div className="my-8">
        <RidgeSettings />
      </div>

      {/* SEO Content Section */}
      <article className="my-24 prose max-w-none text-gray-700">
        <div className="bg-white p-8 rounded-xl border border-teal-100 shadow-sm space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              About Ridge Line (Joy Division) Plots
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Ridge plots (also known as ridgeline plots, joyplots, or crest plots) visualize slices of 3D mathematical surfaces by drawing stacked parallel horizontal lines. When displaced vertically by simulated noise peaks or elevation data, foreground lines occlude the background lines behind them, producing a striking illusion of depth, physical terrain, and radio pulsar frequencies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">True Hidden Line Occlusion</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Every ridge is constructed with masked underlying polygons, ensuring clean visual stacking without tangled intersecting wireframes when imported into design software.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Dark & Light Themes</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Toggle between the classic high-contrast pulsar black backdrop or modern minimal light design styles with a single click.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <Download className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Instant Vector Export</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Copy direct SVG XML code to your clipboard for instant pasting into Figma or download clean `.svg` files ready for laser cutting, plotting, or print.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <Code className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">More Vector Generators</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Also check out our{" "}
                  <Link to="/" className="text-teal-700 underline font-medium">
                    Topography Generator
                  </Link>{" "}
                  and{" "}
                  <Link to="/flow-fields/" className="text-teal-700 underline font-medium">
                    Flow Field Generator
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
    title="Ridge Line Plot SVG Generator - Joy Division Style Mountain Waves"
    description="Generate Joy Division / Unknown Pleasures style ridge line plots and mountain elevation wave SVGs. Free vector generator with hidden line removal."
    pathname="/ridges/"
  />
)

export default RidgesPage
