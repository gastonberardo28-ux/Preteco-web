import { Button } from "@/components/ui";
import { HeroBackground } from "@/components/PageHero";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <HeroBackground />
      <div className="container-page flex min-h-[70vh] flex-col items-start justify-center gap-6 py-24">
        <p className="t-eyebrow">Error 404</p>
        <h1 className="t-display-sm max-w-[16ch]">No encontramos esta página.</h1>
        <p className="t-lead max-w-[50ch]">Puede que se haya movido o que el link esté mal escrito.</p>
        <div className="flex flex-wrap gap-3">
          <Button href="/" size="lg">
            Ir al inicio
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Contactanos
          </Button>
        </div>
      </div>
    </section>
  );
}
