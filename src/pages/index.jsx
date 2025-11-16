import React from "react"
import ChartSettings from "../components/ChartSettings"
import Seo from "../components/seo"
import Layout from "../components/Layout"
import { ExternalLinkIcon } from "lucide-react";

const IndexPage = () => {
  return (
    <Layout>
      <div className="my-20 ">
        <div className="flex justify-center mb-5">
          <a
            href="https://blixthalka.gumroad.com/l/high-fidelity-topographic-svg-pack"
            className="inline-flex items-center gap-2 border px-4 py-1 rounded-full text-sm font-medium hover:shadow-md hover:bg-teal-100 transition-all duration-200"
          >
            <span>High-Fidelity Topographic SVGs</span>
            <ExternalLinkIcon className="w-4 h-4 stroke-gray-500" />
          </a>
        </div>
        <h1 className="text-3xl font-medium text-center">
          Topography SVG Generator
        </h1>
        <h3 className="text-gray-500 mt-3 text-lg text-center">
          Generate a free svg topographic map for your next design!
        </h3>
      </div>
      <div className="my-20">
        <ChartSettings />
      </div>
      <div className="text-sm text-gray-500 text-center my-20">
        Created by{" "}
        <a
          className="text-blue-500 hover:text-blue-600"
          href="https://x.com/blixthalka"
        >
          @blixthalka
        </a>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo />

export default IndexPage
