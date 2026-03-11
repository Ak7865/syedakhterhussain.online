import type { Metadata } from 'next'
import './globals.css'

const SITE_URL = 'https://www.syedakhterhussain.online'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.syedakhterhussain.online'),
  title: {
    default: 'Syed Akhter Hussain | Web Developer in Nagaon, Assam',
    template: '%s | Syed Akhter Hussain',
  },
  description:
    'Syed Akhter Hussain — professional web developer in Nagaon, Assam. Expert in React, PHP, Node.js, MySQL & Firebase. Founder of 8BitBannar WebTech. Available for freelance projects across Assam, Guwahati & all India.',
  keywords: [
    'Syed Akhter Hussain',
    'Syed Akhter Hussain web developer',
    'Syed Akhter Hussain portfolio',
    'web developer in Nagaon',
    'web developer Nagaon Assam',
    'web developer in Assam',
    'web developer Assam',
    'web developer in Guwahati',
    'web developer Guwahati',
    'web developer Northeast India',
    'freelance web developer Assam',
    'freelance web developer Nagaon',
    'website developer Nagaon',
    'website developer Assam',
    'full stack web developer India',
    'React developer Assam',
    'PHP developer Assam',
    'hire web developer Assam',
    'website design Nagaon',
    'website development Assam',
    '8BitBannar',
    '8BitBannar web development',
    'React developer India',
    'Node.js developer Assam',
    'Firebase developer India',
    'MySQL developer Assam',
  ],
  authors: [{ name: 'Syed Akhter Hussain', url: SITE_URL }],
  creator: 'Syed Akhter Hussain',
  publisher: 'Syed Akhter Hussain',
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Syed Akhter Hussain — Web Developer',
    title: 'Syed Akhter Hussain | Web Developer in Nagaon, Assam',
    description:
      'Professional web developer in Nagaon, Assam. React · PHP · Node.js · Firebase · MySQL. Founder of 8BitBannar. Available for freelance across India.',
    images: [
      {
        url: "https://www.syedakhterhussain.online/og-banner.png",
        width: 1200,
        height: 630,
        alt: 'Syed Akhter Hussain — Full Stack Web Developer, Nagaon Assam',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Syed Akhter Hussain | Web Developer — Nagaon, Assam',
    description: 'Full Stack Web Developer from Nagaon, Assam. React, PHP, Node.js, Firebase. Founder of 8BitBannar.',
    images: [`${SITE_URL}/og-banner.png`],
  },
}

// ── Schema 1: Person ──────────────────────────────────────────────────────────
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Syed Akhter Hussain',
  givenName: 'Syed Akhter',
  familyName: 'Hussain',
  jobTitle: 'Full Stack Web Developer',
  description: 'Professional web developer in Nagaon, Assam specializing in React, PHP, Node.js, MySQL and Firebase. Founder of 8BitBannar WebTech.',
  url: SITE_URL,
  image: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/syed-akhter-hussain.jpeg`,
    width: 800,
    height: 800,
  },
  email: 'ah076145@gmail.com',
  telephone: '+91-9127222171',
  birthDate: '2001-02-13',
  nationality: { '@type': 'Country', name: 'India' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nagaon',
    addressRegion: 'Assam',
    postalCode: '782003',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: '26.3452', longitude: '92.6844' },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Barak Valley Engineering College', address: { '@type': 'PostalAddress', addressLocality: 'Karimganj', addressRegion: 'Assam', addressCountry: 'IN' } },
    { '@type': 'CollegeOrUniversity', name: 'Nalbari Polytechnic', address: { '@type': 'PostalAddress', addressLocality: 'Nalbari', addressRegion: 'Assam', addressCountry: 'IN' } },
  ],
  knowsAbout: ['Web Development', 'Full Stack Development', 'React.js', 'PHP', 'Node.js', 'JavaScript', 'MySQL', 'Firebase', 'Python', 'Java', 'HTML5', 'CSS3'],
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Web Developer',
    occupationLocation: { '@type': 'City', name: 'Nagaon, Assam, India' },
    skills: 'React, PHP, Node.js, MySQL, Firebase, JavaScript',
  },
  worksFor: {
    '@type': 'Organization',
    name: '8BitBannar',
    url: 'https://8bitbannar.in',
  },
  makesOffer: {
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: 'Web Development Services',
      areaServed: [
        { '@type': 'City', name: 'Nagaon' },
        { '@type': 'City', name: 'Guwahati' },
        { '@type': 'State', name: 'Assam' },
        { '@type': 'Country', name: 'India' },
      ],
    },
  },
  sameAs: ['https://github.com/Ak7865', 'https://8bitbannar.in/', SITE_URL],
}

// ── Schema 2: LocalBusiness — ranks for "web developer in Nagaon/Assam" ──────
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#business`,
  name: '8BitBannar — Web Development by Syed Akhter Hussain',
  description: 'Professional web development services in Nagaon, Assam. React, PHP, Node.js, Firebase, MySQL.',
  url: 'https://8bitbannar.in',
  telephone: '+91-9127222171',
  email: 'ah076145@gmail.com',
  founder: { '@id': `${SITE_URL}/#person` },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nagaon',
    addressRegion: 'Assam',
    postalCode: '782003',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: '26.3452', longitude: '92.6844' },
  areaServed: ['Nagaon', 'Guwahati', 'Assam', 'Northeast India', 'India'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web Development Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Design & Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'React.js Web Applications' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'PHP & MySQL Backend Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Maintenance & Support' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Firebase & Cloud Integration' } },
    ],
  },
  openingHours: 'Mo-Sa 09:00-20:00',
  priceRange: '₹₹',
}

// ── Schema 3: WebSite ─────────────────────────────────────────────────────────
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Syed Akhter Hussain Portfolio',
  description: 'Portfolio of Syed Akhter Hussain — Web Developer in Nagaon, Assam',
  publisher: { '@id': `${SITE_URL}/#person` },
  inLanguage: 'en-IN',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        {/* 3 schema types = Person + LocalBusiness + WebSite */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />

        {/* WhatsApp reads these directly — must be explicit */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="https://syedakhterhussain.online/og-banner.png" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Syed Akhter Hussain | Web Developer in Nagaon, Assam" />
        

        {/* Geo meta — local search ranking boost */}
        <meta name="geo.region" content="IN-AS" />
        <meta name="geo.placename" content="Nagaon, Assam, India" />
        <meta name="geo.position" content="26.3452;92.6844" />
        <meta name="ICBM" content="26.3452, 92.6844" />

        <meta httpEquiv="content-language" content="en-IN" />
        <link rel="alternate" hrefLang="en-IN" href={SITE_URL} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>{children}
        <script type='application/ld+json' dangerouslySetInnerHTML={{
          __html:JSON.stringify([
            personSchema,
            localBusinessSchema,
            websiteSchema,
          ]),
        }}>
          
        </script>
      </body>
    </html>
  )
}