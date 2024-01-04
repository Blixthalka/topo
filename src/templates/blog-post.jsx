import { graphql } from "gatsby"
import React from "react"
import BlogEntry from "../components/BlogEntry"
import "./post.scss"

export default function BlogPost({ data }) {
  const post = data.markdownRemark

  return (
    <BlogEntry data={data} />
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