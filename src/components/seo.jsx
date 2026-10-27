import { graphql, useStaticQuery } from "gatsby"
import * as React from "react"

function Seo({ description, title, pathname = "", children }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  )

  const siteMetadata = site.siteMetadata
  const metaDescription = description || siteMetadata.description
  const pageTitle = title ? `${title} | Topo Tools` : siteMetadata.title
  const siteUrl = siteMetadata.siteUrl || "https://topography.blixthalka.com"
  const canonicalUrl = `${siteUrl}${pathname.startsWith("/") ? pathname : `/${pathname}`}`

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title || siteMetadata.title,
    "description": metaDescription,
    "url": canonicalUrl,
    "applicationCategory": "DesignApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={siteMetadata?.author || `@blixthalka`} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />

      <script type="application/ld+json">
        {JSON.stringify(schemaJson)}
      </script>

      {children}
    </>
  )
}

export default Seo
