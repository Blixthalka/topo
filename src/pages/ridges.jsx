import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import RidgeSettings from "../components/RidgeSettings"

const RidgesPage = () => {
  return (
    <Layout>
      <div className="mb-8 mt-6 text-center">
        <h1 className="text-3xl font-medium text-gray-900 dark:text-zinc-100">
          Ridge Line Plot SVG Generator
        </h1>
        <p className="text-gray-500 dark:text-zinc-400 mt-3 text-lg max-w-xl mx-auto">
          Generate stacked mountain ridge plots and Joy Division ("Unknown Pleasures") style procedural elevation waves.
        </p>
      </div>

      <div className="my-8">
        <RidgeSettings />
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
