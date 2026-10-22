
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const SITE_URL = "https://www.syedakhterhussain.online";
const COMPANY_URL = "https://8bitbannar.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Syed Akhter Hussain | Web Developer in Assam",
    template: "%s | Syed Akhter Hussain",
  },

  description:
    "Syed Akhter Hussain is a web developer from Nagaon, Assam, specializing in React, JavaScript, PHP, Node.js, MySQL and Firebase. Founder of 8BitBannar. Explore projects, skills and web development services.",

  applicationName: "Syed Akhter Hussain Portfolio",
  authors: [
    {
      name: "Syed Akhter Hussain",
      url: SITE_URL,
    },
  ],
  creator: "Syed Akhter Hussain",
  publisher: "Syed Akhter Hussain",

  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Syed Akhter Hussain Portfolio",

    title: "Syed Akhter Hussain | Web Developer in Assam",

    description:
      "Explore the portfolio, web development projects and technical skills of Syed Akhter Hussain, founder of 8BitBannar in Assam.",

    images: [
      {
        url: "/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Syed Akhter Hussain — Web Developer and Founder of 8BitBannar",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Syed Akhter Hussain | Web Developer",
    description:
      "Web developer from Assam. Explore React, JavaScript, PHP, Node.js, Firebase and full-stack development projects.",
    images: [
      {
        url: "/og-banner.jpg",
        alt: "Syed Akhter Hussain — Web Developer",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#212529",
};

const personSchema = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Syed Akhter Hussain",
  alternateName: ["Ak7865", "Mr. AK"],
  url: SITE_URL,

  image: {
    "@type": "ImageObject",
    url: `${SITE_URL}/syed-akhter-hussain.jpg`,
  },

  jobTitle: "Web Developer",
  description:
    "Web developer from Nagaon, Assam, working with React, JavaScript, PHP, Node.js, MySQL and Firebase. Founder of 8BitBannar.",

  knowsAbout: [
    "Web Development",
    "Full-Stack Development",
    "React",
    "JavaScript",
    "Node.js",
    "PHP",
    "MySQL",
    "Firebase",
    "HTML",
    "CSS",
    "REST APIs",
  ],

  worksFor: {
    "@id": `${COMPANY_URL}/#organization`,
  },

  sameAs: [
    "https://github.com/Ak7865",
    "https://8bitbannar.in/",
    "https://www.linkedin.com/in/syed-akhter-hussain-026361233",
    "https://instagram.com/syed_akhter_hussain",
  ],
};

const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Syed Akhter Hussain Portfolio",
  description:
    "Official portfolio of Syed Akhter Hussain, web developer and founder of 8BitBannar.",
  inLanguage: "en-IN",
  publisher: {
    "@id": `${SITE_URL}/#person`,
  },
};

const portfolioSchema = {
  "@context": "https://schema.org",
  "@graph": [personSchema, websiteSchema],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body>
        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(portfolioSchema).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />
      </body>
    </html>
  );
}
