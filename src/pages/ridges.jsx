import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/seo"
import RidgeSettings from "../components/RidgeSettings"

const RidgesPage = () => {
  return (
    <Layout>
      <div className="mb-8 mt-16 sm:mt-20 text-center">
        <h1 className="text-3xl font-medium text-gray-900 dark:text-zinc-100">
          Ridge Lines SVG Generator
        </h1>
        <p className="text-gray-500 dark:text-zinc-400 mt-3 text-lg max-w-xl mx-auto">
          Generate a free svg ridge line plot for your next design!
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
    title="Ridge Lines SVG Generator"
    description="Ridge Lines SVG Generator - generate free Joy Division style elevation waves for your next design!"
    pathname="/ridges/"
  />
)

export default RidgesPage
