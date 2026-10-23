/* Se vuelve a montar en cada navegación: da una transición suave entre páginas. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
