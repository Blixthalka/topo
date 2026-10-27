import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import GuillocheSettings from "../components/GuillocheSettings"
import { Link } from "gatsby"
import { Sparkles, Award, Lock, Palette } from "lucide-react"

const GuillochePage = () => {
  return (
    <Layout>
      <div className="mb-8 mt-6 text-center">
        <h1 className="text-3xl font-medium">Guilloché Pattern SVG Generator</h1>
        <p className="text-gray-500 mt-3 text-lg max-w-xl mx-auto">
          Create intricate mathematical rosettes, banknote security linework, and spirograph engravings. Free vector SVG download.
        </p>
      </div>

      <div className="my-8">
        <GuillocheSettings />
      </div>

      {/* SEO Content Section */}
      <article className="my-24 prose max-w-none text-gray-700">
        <div className="bg-white p-8 rounded-xl border border-teal-100 shadow-sm space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              What is Guilloché Engraving?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Guilloché is a decorative engraving technique where precise, intricate geometric patterns are mechanically etched into metal or paper. Traditionally created with rose engine lathes, guilloché has been celebrated for centuries on luxury watch dials, official diplomas, stock certificates, and paper currency to prevent counterfeit replication.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Anti-Counterfeit & Certificate Aesthetics</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Design authentic-looking awards, official certificates, security borders, and luxury product seals with geometric precision.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Harmonic Mathematical Precision</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Modulate radial harmonic frequencies and phase offsets to produce rosette petals, moiré interferences, and spiraling mandalas.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <Palette className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Clean Resolution-Independent Vectors</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Fine linework in raster PNG formats often suffers from harsh moiré and pixelation. Mathematical SVG keeps every hairline razor-sharp at any zoom level.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">More Design Generators</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Explore our{" "}
                  <Link to="/" className="text-teal-700 underline font-medium">
                    Topography Generator
                  </Link>
                  ,{" "}
                  <Link to="/flow-fields/" className="text-teal-700 underline font-medium">
                    Flow Fields
                  </Link>
                  , and{" "}
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
    title="Guilloché Pattern SVG Generator - Banknote Rosettes & Spirographs"
    description="Generate intricate Guilloché rosettes, certificate borders, and banknote geometric patterns in SVG. Free mathematical vector generator."
    pathname="/guilloche/"
  />
)

export default GuillochePage
