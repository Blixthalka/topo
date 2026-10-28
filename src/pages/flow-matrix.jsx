import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import PillsSettings from "../components/PillsSettings"

const FlowMatrixPage = () => {
  return (
    <Layout>
      <div className="mb-8 mt-16 sm:mt-20 text-center">
        <h1 className="text-3xl font-medium text-gray-900 dark:text-zinc-100">
          Flow Matrix SVG Generator
        </h1>
        <p className="text-gray-500 dark:text-zinc-400 mt-3 text-lg max-w-xl mx-auto">
          Generate a free svg flow matrix for your next design!
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
    title="Flow Matrix SVG Generator"
    description="Flow Matrix SVG Generator - generate a free directional vector field for your next design!"
    pathname="/flow-matrix/"
  />
)

export default FlowMatrixPage
