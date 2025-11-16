import React from "react"
import ChartSettings from "../components/ChartSettings"
import Seo from "../components/seo"
import Layout from "../components/Layout"
import { ExternalLinkIcon } from "lucide-react";
import Carousel from "../components/Carousel"
import sample1 from "../images/sample_1.png"
import sample2 from "../images/sample_2.png"
import sample3 from "../images/sample_3.png"
import sample4 from "../images/sample_4.png"
import sample5 from "../images/sample_5.png"
import sample6 from "../images/sample_6.png"

const IndexPage = () => {
  return (
    <Layout>
      <div className="mb-8 mt-20 ">
        <div className="flex justify-center mb-2">
          <a
            href="https://blixthalka.gumroad.com/l/high-fidelity-topographic-svg-pack"
            className="inline-flex items-center gap-2 border px-4 py-1 rounded-full text-sm  hover:shadow-md hover:bg-teal-100 transition-all duration-200"
          >
            <span>High-Fidelity Topographic SVGs</span>
            <ExternalLinkIcon className="w-4 h-4 stroke-gray-500" />
          </a>
        </div>
        <h1 className="text-3xl font-medium text-center">
          Topography SVG Generator
        </h1>
        <p className="text-gray-500 mt-3 text-lg text-center">
          Generate a free svg topographic map for your next design!
        </p>
      </div>
      <div className="my-8">
        <ChartSettings />
      </div>


      <div className="my-40">
        <h2 className="text-medium mb-5 text-2xl text-center">High-Fidelity Topographic SVG Pack</h2>
        <p className="text-gray-500 mb-5 text-lg text-center">
       I've curated a comprehensive library of 63 high-fidelity topographic SVGs, meticulously crafted and selected to enhance the quality of your projects.
        </p>

        <div className="mt-8 max-w-4xl mx-auto">
          <Carousel
            images={[
              sample1,
              sample2,
              sample3,
              sample4,
              sample5,
              sample6
            ]}
            alt="Topographic SVG samples"
          />
        </div>

        <div className="mt-6 flex flex-col items-center">
          <p className="text-gray-500 text-sm mb-3">One-time purchase of 99$ · Instant download</p>
          <a
            href="https://blixthalka.gumroad.com/l/high-fidelity-topographic-svg-pack"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-sm  hover:shadow-sm  transform transition"
          >
            <span>Claim Your Pack</span>
            <ExternalLinkIcon className="w-4 h-4 stroke-white" />
          </a>
          
        </div>
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
