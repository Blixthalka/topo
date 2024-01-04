import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import "./post.scss"
import Topo from "./topo_1.svg"

export default function BlogPost({ data }) {
    const post = data.markdownRemark

    return (
        <Layout>
            <div className="">
                <h2 className="text-3xl font-medium mt-2">{post.frontmatter.title}</h2>
                <h3 className="text-gray-500 mt-3 text-lg py-5">{post.frontmatter.subtitle}</h3>
                <div className="my-10 inner-blog">
                    <div dangerouslySetInnerHTML={{ __html: post.html }} />
                </div>

            </div>

            <Link to="/" className="lunk">
                <div className="forward group">
                    <Topo />
                    <span>
                        <p>Create a topograpic SVG here!</p>
                    </span>
                </div>
            </Link>
        </Layout>
    )
}


export const query = graphql`
  query BlogQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(fromNow: true)
        subtitle
      }
    }
  }
`