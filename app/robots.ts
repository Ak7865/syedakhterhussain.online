import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
    ],
    sitemap: 'https://www.syedakhterhussain.online/sitemap.xml',
    host: 'https://www.syedakhterhussain.online/',
  }
}