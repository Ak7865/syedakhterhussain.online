import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
    ],
    sitemap: 'https://syed-akhter-hussain-port.vercel.app/sitemap.xml',
    host: 'https://syed-akhter-hussain-port.vercel.app',
  }
}