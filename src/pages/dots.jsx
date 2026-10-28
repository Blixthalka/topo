import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import HalftoneSettings from "../components/HalftoneSettings"

const DotsPage = () => {
  return (
    <Layout>
      <div className="mb-8 mt-16 sm:mt-20 text-center">
        <h1 className="text-3xl font-medium text-gray-900 dark:text-zinc-100">
          Halftone SVG Generator
        </h1>
        <p className="text-gray-500 dark:text-zinc-400 mt-3 text-lg max-w-xl mx-auto">
          Generate a free svg halftone dot pattern for your next design!
        </p>
      </div>

      <div className="my-8">
        <HalftoneSettings />
      </div>
    </Layout>
  )
}

export const Head = () => (
  <Seo
    title="Halftone SVG Generator"
    description="Halftone SVG Generator - generate a free vector dot matrix for your next design!"
    pathname="/halftone/"
  />
)

export default DotsPage
