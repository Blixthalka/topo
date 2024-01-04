import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "./Layout"
import "../templates/post.scss"
import Topo from "../templates/topo_1.svg"
import Seo from "./seo"
import FiveOfFive from "./FiveOfFive"

export default function BlogEntry({ data }) {
  const post = data.markdownRemark

  return (
    <Layout>
      <Seo title={post.frontmatter.title} />
      <FiveOfFive className="mb-20" />
      <div className="">
        <h2 className="text-3xl font-medium mt-2">{post.frontmatter.title}</h2>
        <h3 className="text-gray-500 mt-3 text-lg py-5">{post.frontmatter.subtitle}</h3>
        <div className=" inner-blog">
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </div>

      <Link to="/" className="">
        <div className="my-10 bg-[#040819] relative group rounded">
          <Topo className="stroke-gray-500 group-hover:stroke-gray-300" />
          <span className="text-white text-2xl absolute top-1/2 text-center w-full">
            <p>Create a topograpic SVG here!</p>
          </span>
        </div>
      </Link>
    </Layout>
  )
}
