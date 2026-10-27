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

      <div className="my-40">
        <h2 className="text-medium mb-5 text-2xl text-center text-gray-900 dark:text-zinc-100">
          High-Fidelity Topographic SVG Pack
        </h2>
        <p className="text-gray-500 dark:text-zinc-400 mb-5 text-lg text-center">
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
          <p className="text-gray-500 dark:text-zinc-400 text-sm mb-3">One-time purchase of 49$ · Instant download</p>
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
    </Layout>
  )
}

export const Head = () => <Seo pathname="/" />

export default IndexPage
