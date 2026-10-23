import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://preteco.com"),
  title: {
    default: "Preteco | IA, cloud, datos y desarrollo",
    template: "%s | Preteco",
  },
  description:
    "Impulsamos tu evolución digital con IA, tecnología y datos. Consultora con más de 25 años en sistemas críticos, cloud, desarrollo y seguridad en Latinoamérica.",
  openGraph: { siteName: "Preteco", locale: "es_AR", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${dmSans.variable} ${dmMono.variable}`}>
      <body className="min-h-screen antialiased">
        <a
          href="#contenido"
          className="sr-only z-50 rounded bg-accent px-4 py-2 font-medium text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
