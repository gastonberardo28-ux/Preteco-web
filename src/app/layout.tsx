import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Preteco — IA, cloud, datos y desarrollo",
  description:
    "Implementamos IA para automatizar procesos, potenciar la toma de decisiones y acelerar la innovación empresarial.",
  metadataBase: new URL("https://preteco.com"),
  openGraph: {
    title: "Preteco",
    description: "Tu negocio, compilado para la era de la IA.",
    url: "https://preteco.com",
    siteName: "Preteco",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
