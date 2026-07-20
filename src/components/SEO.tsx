import { useEffect } from "react"

const SITE_URL = "https://victoriaballons.ru"

interface SEOProps {
  title: string
  description: string
  path?: string
}

function setMetaByName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute("name", name)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

function setMetaByProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute("property", property)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement("link")
    el.setAttribute("rel", "canonical")
    document.head.appendChild(el)
  }
  el.setAttribute("href", href)
}

export default function SEO({ title, description, path }: SEOProps) {
  useEffect(() => {
    document.title = title

    setMetaByName("description", description)
    setMetaByProperty("og:title", title)
    setMetaByProperty("og:description", description)

    const url = `${SITE_URL}${path ?? "/"}`
    setMetaByProperty("og:url", url)
    setCanonical(url)
  }, [title, description, path])

  return null
}
