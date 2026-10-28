import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import DitherSettings from "../components/DitherSettings"

const DitherPage = () => {
  return (
    <Layout>
      <div className="mb-8 mt-16 sm:mt-20 text-center">
        <h1 className="text-3xl font-medium text-gray-900 dark:text-zinc-100">
          Dither SVG Generator
        </h1>
        <p className="text-gray-500 dark:text-zinc-400 mt-3 text-lg max-w-xl mx-auto">
          Generate a free svg dither pattern for your next design!
        </p>
      </div>

      <div className="my-8">
        <DitherSettings />
      </div>
    </Layout>
  )
}

export const Head = () => (
  <Seo
    title="Dither SVG Generator"
    description="Dither SVG Generator - generate free 1-bit procedural dither patterns for your next design!"
    pathname="/dither/"
  />
)

export default DitherPage
