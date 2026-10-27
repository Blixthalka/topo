import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import PillsSettings from "../components/PillsSettings"

const PillsPage = () => {
  return (
    <Layout>
      <div className="mb-8 mt-16 sm:mt-20 text-center">
        <h1 className="text-3xl font-medium text-gray-900 dark:text-zinc-100">
          Pill Pattern SVG Generator
        </h1>
        <p className="text-gray-500 dark:text-zinc-400 mt-3 text-lg max-w-xl mx-auto">
          Generate rotating pill and dash vector fields with uniform or dynamic flow waves.
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
    title="Pill Pattern SVG Generator - Directional Capsule & Dash Vector Field"
    description="Generate free procedural pill and dash pattern SVGs. Customize grid density, uniform capsule sizing, wave flow, and instant SVG export."
    pathname="/pills/"
  />
)

export default PillsPage
