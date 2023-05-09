import React, { useState } from "react";
import Seo from "../components/seo"
import Chart from "../components/Chart";
import ChartSettings from "../components/ChartSettings";


const IndexPage = () => {

  return (
    <div className="bg-teal-50 min-h-screen">

      <div className="mx-auto max-w-3xl px-5">

        <h1 className="text-3xl font-medium  pt-20">Topograhy</h1>
        <h3 className="text-gray-500  mt-3 text-lg">Generate a svg topographic map for your next design</h3>
        <div className=" my-20 ">

          <ChartSettings />
        </div>
      </div>
    </div>
  )
}


export const Head = () => <Seo title="Topo" />

export default IndexPage;