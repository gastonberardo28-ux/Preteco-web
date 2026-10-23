/* Set de íconos propio (trazo 1.75, grilla de 24 px) para mantener un estilo único en todo el sitio. */

const paths = {
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
      <path d="M4.5 5.5v6.5c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V5.5" />
      <path d="M4.5 12v6.5c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V12" />
    </>
  ),
  server: (
    <>
      <rect x="3.5" y="4" width="17" height="7" rx="2" />
      <rect x="3.5" y="13" width="17" height="7" rx="2" />
      <path d="M7.5 7.5h.01M7.5 16.5h.01M11 7.5h6M11 16.5h6" />
    </>
  ),
  cloud: <path d="M7 18.5h10a4.5 4.5 0 0 0 .6-8.96A6 6 0 0 0 6.1 9.1 4.75 4.75 0 0 0 7 18.5Z" />,
  sparkles: (
    <>
      <path d="M11 3.5 12.6 8a2 2 0 0 0 1.4 1.4l4.5 1.6-4.5 1.6a2 2 0 0 0-1.4 1.4L11 18.5 9.4 14a2 2 0 0 0-1.4-1.4L3.5 11 8 9.4A2 2 0 0 0 9.4 8Z" />
      <path d="M18.5 3v3.5M20.25 4.75h-3.5M18.5 16.5v3M20 18h-3" />
    </>
  ),
  bot: (
    <>
      <rect x="4" y="8" width="16" height="11" rx="3" />
      <path d="M12 4v4M9 13h.01M15 13h.01M9.5 16.5h5M2 13v2M22 13v2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 21s7.5-3.2 7.5-9.5V5.8L12 3 4.5 5.8v5.7C4.5 17.8 12 21 12 21Z" />
      <path d="m9 11.8 2.2 2.2L15.5 9.7" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="m10.85 12.15 8.65-8.65M16.5 6.5l2.5 2.5M14.5 8.5l2 2" />
    </>
  ),
  code: <path d="m8.5 7.5-5 4.5 5 4.5M15.5 7.5l5 4.5-5 4.5M13.5 4.5l-3 15" />,
  refresh: (
    <>
      <path d="M20 11.5A8 8 0 0 0 6.2 6.3L4 8.5" />
      <path d="M4 4v4.5h4.5M4 12.5a8 8 0 0 0 13.8 5.2L20 15.5" />
      <path d="M20 20v-4.5h-4.5" />
    </>
  ),
  layout: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="2.5" />
      <path d="M3.5 9h17M9.5 9v11" />
    </>
  ),
  activity: <path d="M3 12h4l2.5-6.5 5 13L17 12h4" />,
  layers: (
    <>
      <path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8Z" />
      <path d="m3.5 12.5 8.5 4.5 8.5-4.5M3.5 16.5 12 21l8.5-4.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M21.5 20a6.5 6.5 0 0 0-4-6" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="m8.5 13.3-1.5 7.2 5-2.5 5 2.5-1.5-7.2" />
    </>
  ),
  message: <path d="M20.5 12a8.5 8.5 0 0 1-12.4 7.55L3.5 20.5l1-4.4A8.5 8.5 0 1 1 20.5 12Z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20.5 20.5-4.9-4.9" />
    </>
  ),
  pen: (
    <>
      <path d="M15.5 4.5 19.5 8.5 8.5 19.5H4.5v-4Z" />
      <path d="m13 7 4 4" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 15.5 8.5 12c1.6-4.7 4.8-8 11-8.5-.5 6.2-3.8 9.4-8.5 11Z" />
      <path d="M8.5 12H5l2.5-3.5h4M12 15.5V19l3.5-2.5v-4M5.5 18.5c.6-1.9 1.5-2.6 3-3" />
    </>
  ),
  handshake: (
    <>
      <path d="m11 17 2 2a1.4 1.4 0 0 0 2-2" />
      <path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2l-3.9-3.9a2.8 2.8 0 0 0-4 0l-.9.9a1.4 1.4 0 0 1-2-2l2.8-2.8a4 4 0 0 1 4.9-.6l.5.3a3 3 0 0 0 2.1.4L21 6" />
      <path d="m21 5 1 9-2 2M3 5 2 14l6.5 6.5a1.4 1.4 0 0 0 2-2M3 6h8" />
    </>
  ),
  chart: (
    <>
      <path d="M3.5 3.5v17h17" />
      <path d="m7.5 15 4-4.5 3 3 5.5-6" />
    </>
  ),
  graduation: (
    <>
      <path d="m2.5 9 9.5-5 9.5 5-9.5 5Z" />
      <path d="M6.5 11v4.5c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3V11M21.5 9v5.5" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3.5 10v4a1 1 0 0 0 1 1h2l8 4.5v-15l-8 4.5h-2a1 1 0 0 0-1 1Z" />
      <path d="M18 9a4 4 0 0 1 0 6M7 15l1.5 5h2.5l-1.2-4.4" />
    </>
  ),
  scale: (
    <>
      <path d="M12 3.5v17M7.5 20.5h9M4 7.5h16M6 7.5 3 14a3 3 0 0 0 6 0Zm12 0-3 6.5a3 3 0 0 0 6 0Z" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  arrowRight: <path d="M4 12h15M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  download: <path d="M12 3.5v12M7 11l5 5 5-5M4.5 20h15" />,
  mapPin: (
    <>
      <path d="M12 21s-7-6-7-11.5a7 7 0 1 1 14 0C19 15 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.3 3.5 5.2 3.5 8.5s-1.1 6.2-3.5 8.5c-2.4-2.3-3.5-5.2-3.5-8.5S9.6 5.8 12 3.5Z" />
    </>
  ),
  box: (
    <>
      <path d="m12 3 8.5 4.5v9L12 21l-8.5-4.5v-9Z" />
      <path d="m3.5 7.5 8.5 4.5 8.5-4.5M12 12v9" />
    </>
  ),
  plug: (
    <>
      <path d="M9 3.5v4M15 3.5v4M6.5 7.5h11v4a5.5 5.5 0 0 1-11 0Z" />
      <path d="M12 17v3.5" />
    </>
  ),
  zap: <path d="M13 2.5 4.5 13.5H12L11 21.5l8.5-11H12Z" />,
  book: (
    <>
      <path d="M4 5.5A2 2 0 0 1 6 3.5h13.5v15H6a2 2 0 0 0-2 2Z" />
      <path d="M4 20.5a2 2 0 0 1 2-2h13.5V21H6" />
    </>
  ),
  file: (
    <>
      <path d="M14 3.5H6.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V9Z" />
      <path d="M14 3.5V9h5.5M8.5 13h7M8.5 16.5h5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  phone: <path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3 4.5 1.8V19a1.5 1.5 0 0 1-1.5 1.5A16.5 16.5 0 0 1 3.5 5.5 1.5 1.5 0 0 1 5 4Z" />,
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
    >
      {paths[name]}
    </svg>
  );
}

/* Ícono dentro de una "baldosa" con borde y brillo: uso consistente en cards. */
export function IconTile({
  name,
  tone = "violet",
  size = "md",
}: {
  name: IconName;
  tone?: "violet" | "lime";
  size?: "md" | "lg";
}) {
  const toneCls =
    tone === "lime"
      ? "border-accent/30 bg-accent/10 text-accent shadow-[0_0_24px_-6px_rgb(203_255_0/0.45)]"
      : "border-violet/30 bg-violet/10 text-violet shadow-[0_0_24px_-6px_rgb(165_148_255/0.5)]";
  const sizeCls = size === "lg" ? "size-14 rounded-2xl [&_svg]:size-7" : "size-11 rounded-xl [&_svg]:size-5";
  return (
    <span className={`inline-flex items-center justify-center border ${toneCls} ${sizeCls}`}>
      <Icon name={name} />
    </span>
  );
}
