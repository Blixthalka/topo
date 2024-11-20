import React from "react"
import ChartSettings from "../components/ChartSettings"
import Seo from "../components/seo"
import Layout from "../components/Layout"

const IndexPage = () => {
  return (
    <Layout>
      <div className="my-20">
        <h1 className="text-3xl font-medium">Topography SVG Generator</h1>
        <h3 className="text-gray-500 mt-3 text-lg">
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
