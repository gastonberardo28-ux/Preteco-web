import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Effects } from "@/components/Effects";
import { JsonLd } from "@/components/ui";
import { home } from "@/content/pages/home";
import { SITE_URL, organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-dm-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: home.seo.title, template: "%s | Preteco" },
  description: home.seo.description,
  alternates: { canonical: "/" },
  openGraph: { siteName: "Preteco", locale: "es_AR", type: "website", title: home.seo.title, description: home.seo.description },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#121700",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${dmSans.variable} ${dmMono.variable}`}>
      <body className="min-h-screen antialiased">
        <a
          href="#contenido"
          className="sr-only z-50 rounded-full bg-accent px-4 py-2 font-medium text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Saltar al contenido
        </a>
        <Effects />
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <JsonLd data={organizationJsonLd} />
      </body>
    </html>
  );
}
