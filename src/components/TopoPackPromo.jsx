import React from "react"
import { ExternalLinkIcon } from "lucide-react"
import Carousel from "./Carousel"
import sample1 from "../images/sample_1.png"
import sample2 from "../images/sample_2.png"
import sample3 from "../images/sample_3.png"
import sample4 from "../images/sample_4.png"
import sample5 from "../images/sample_5.png"
import sample6 from "../images/sample_6.png"

const TopoPackPromo = () => {
  return (
    <section className="my-28 sm:my-36">
      <h2 className="font-medium mb-4 text-2xl text-center text-gray-900 dark:text-zinc-100">
        High-Fidelity Topographic SVG Pack
      </h2>
      <p className="text-gray-500 dark:text-zinc-400 mb-6 text-base sm:text-lg text-center max-w-2xl mx-auto">
        I've curated a comprehensive library of 63 high-fidelity topographic SVGs, meticulously crafted and selected to enhance the quality of your projects.
      </p>

      <div className="mt-8 max-w-4xl mx-auto">
        <Carousel
          images={[sample1, sample2, sample3, sample4, sample5, sample6]}
          alt="Topographic SVG samples"
        />
      </div>

      <div className="mt-6 flex flex-col items-center">
        <p className="text-gray-500 dark:text-zinc-400 text-sm mb-3">One-time purchase of 49$ · Instant download</p>
        <a
          href="https://blixthalka.gumroad.com/l/high-fidelity-topographic-svg-pack"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-sm hover:shadow-sm transform transition"
        >
          <span>Check it out</span>
          <ExternalLinkIcon className="w-4 h-4 stroke-white" />
        </a>
      </div>
    </section>
  )
}

export default TopoPackPromo
