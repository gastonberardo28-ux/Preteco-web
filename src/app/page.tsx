import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StackTicker } from "@/components/StackTicker";
import { Services } from "@/components/Services";
import { AiReadiness } from "@/components/AiReadiness";
import { Cases } from "@/components/Cases";
import { Team } from "@/components/Team";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StackTicker />
        <Services />
        <AiReadiness />
        <Cases />
        <Team />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
