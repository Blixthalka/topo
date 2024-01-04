import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/seo";
import FiveOfFive from "../components/FiveOfFive"

export default function Blog({ data }) {
  const { posts } = data.blog

  return (
    <Layout>
      <div className="">
        <FiveOfFive className="mb-20" />
        {posts.map(post => (
          <Link key={post.id} to={post.fields.slug} className="group">
            <article className="">
              <span className="text-sm py-1  rounded text-gray-600 group-hover:text-black">
                {post.frontmatter.date}
              </span>
              <h2 className="text-3xl font-medium mt-2">{post.frontmatter.title}</h2>
              <h3 className="text-gray-600 group-hover:text-black mt-3 text-lg">{post.frontmatter.subtitle}</h3>
            </article>
          </Link>
        ))}</div>
    </Layout>
  )
}

export const Head = () => <Seo title="Blog" />

export const pageQuery = graphql`
  query MyQuery {
    blog: allMarkdownRemark {
      posts: nodes {
        frontmatter {
          date(fromNow: true)
          title
          subtitle
        }
        fields {
            slug
        }
        excerpt
        id
      }
    }
  }
`