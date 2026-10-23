import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-start justify-center gap-6 py-24">
      <p className="font-mono text-accent">Error 404</p>
      <h1 className="font-mono text-[clamp(32px,5vw,56px)] leading-tight text-ink">No encontramos esta página.</h1>
      <p className="max-w-[50ch] text-lg text-muted">Puede que se haya movido o que el link esté mal escrito.</p>
      <div className="flex flex-wrap gap-3">
        <Button href="/">Ir al inicio</Button>
        <Button href="/contact" variant="secondary">
          Contactanos
        </Button>
      </div>
    </section>
  );
}
