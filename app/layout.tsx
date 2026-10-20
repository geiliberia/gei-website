import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

const description =
  "Greenpeace Environmental Initiative is a Monrovia-based community organisation planting trees, restoring land and building sustainable livelihoods across Liberia.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Tree planting and climate action in Liberia`, template: `%s | ${site.name}` },
  description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_LR",
    title: `${site.name} | Tree planting and climate action in Liberia`,
    description,
    images: [{ url: "/images/logo.jpg", width: 715, height: 547, alt: `${site.name} logo` }],
  },
  twitter: { card: "summary", title: site.name, description, images: ["/images/logo.jpg"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0B4A2A", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "NGO",
            name: site.name,
            alternateName: [site.alias, "GEI Liberia"],
            url: site.url,
            logo: `${site.url}/images/logo.jpg`,
            foundingDate: String(site.founded),
            description,
            telephone: site.phones.map((p) => p.display),
            address: {
              "@type": "PostalAddress",
              streetAddress: site.address.line,
              addressLocality: site.address.city,
              addressCountry: site.address.countryCode,
            },
            areaServed: "LR",
          }}
        />
        <a href="#main" className="sr-only z-50 bg-sun px-4 py-2 font-semibold text-ink no-underline focus:not-sr-only focus:absolute focus:left-3 focus:top-3">
          Skip to main content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
