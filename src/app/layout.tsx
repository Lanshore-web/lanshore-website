import type { Metadata } from "next";
import Script from "next/script";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileContactBar from "@/components/MobileContactBar";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, webSiteSchema, localBusinessSchemas } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

const avenirBook = localFont({
  src: "../../public/fonts/AvenirLTPro-Book.woff2",
  variable: "--font-avenir-book",
  display: "swap",
  fallback: ["Roboto", "system-ui", "sans-serif"],
});

const avenirBlack = localFont({
  src: "../../public/fonts/AvenirLTPro-Black.woff2",
  variable: "--font-avenir-black",
  display: "swap",
  fallback: ["Roboto", "system-ui", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Fallback only — every page sets its own `title`. No `title.template`: the
  // per-page strings already carry the "| Lanshore" suffix.
  title: "Agentic SPM by Lanshore",
  description:
    "Agentic SPM by Lanshore pairs 15+ years of sales performance management delivery with AI agents that run comp operations, answer executive questions, and fill platform gaps.",
  openGraph: {
    siteName: "Lanshore",
    type: "website",
    locale: "en_US",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${avenirBook.variable} ${avenirBlack.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Answer-engine index. /llms.txt is found by convention; this link
            advertises it to crawlers that look for one. React hoists it. */}
        <link rel="alternate" type="text/plain" href="/llms.txt" />
        <JsonLd data={organizationSchema} />
        <JsonLd data={webSiteSchema} />
        {localBusinessSchemas.map((schema) => (
          <JsonLd key={schema["@id"]} data={schema} />
        ))}
        <Header />
        <main className="flex-1 pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileContactBar />
        {/* HubSpot tracking (portal 6603479, NA2) */}
        <Script
          id="hs-script-loader"
          src="https://js-na2.hs-scripts.com/6603479.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
