import React from "react"
import ChartSettings from "../components/ChartSettings"
import Seo from "../components/seo"
import Layout from "../components/Layout"
import { ExternalLinkIcon } from "lucide-react"

const IndexPage = () => {
  return (
    <Layout>
      <div className="mb-8 mt-16 sm:mt-20">
        <div className="flex justify-center mb-2">
          <a
            href="https://blixthalka.gumroad.com/l/high-fidelity-topographic-svg-pack"
            className="inline-flex items-center gap-2 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-200 px-4 py-1 rounded-full text-sm hover:shadow-md hover:bg-teal-100 dark:hover:bg-zinc-800 transition-all duration-200"
          >
            <span>High-Fidelity Topographic SVGs</span>
            <ExternalLinkIcon className="w-4 h-4 stroke-gray-500 dark:stroke-zinc-400" />
          </a>
        </div>
        <h1 className="text-3xl font-medium text-center text-gray-900 dark:text-zinc-100">
          Topography SVG Generator
        </h1>
        <p className="text-gray-500 dark:text-zinc-400 mt-3 text-lg text-center">
          Generate a free svg topographic map for your next design!
        </p>
      </div>
      <div className="my-8">
        <ChartSettings />
      </div>
    </Layout>
  )
}

export const Head = () => <Seo pathname="/" />

export default IndexPage
