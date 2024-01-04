import React from "react";
import ChartSettings from "../components/ChartSettings";
import Seo from "../components/seo";
import Layout from "../components/Layout";


const IndexPage = () => {

  return (

    <Layout>

      <h1 className="text-3xl font-medium">Topograhy</h1>
      <h3 className="text-gray-500  mt-3 text-lg">Generate a free svg topographic map for your next design</h3>
      <div className=" mt-20 ">
        <ChartSettings />
      </div>
    </Layout>

  )
}


export const Head = () => <Seo title="Topo" />

export default IndexPage;