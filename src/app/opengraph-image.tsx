import { ImageResponse } from "next/og";

/* Imagen que se ve al compartir cualquier página del sitio en redes o WhatsApp. */
export const alt = "Preteco · IA, cloud, datos y desarrollo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 80% 20%, #2b2552 0%, #121700 55%)",
          color: "#f6ffd6",
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: 44, color: "#cbff00", letterSpacing: -1 }}>preteco</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, lineHeight: 1.05, color: "#cbff00", letterSpacing: -3, maxWidth: 900 }}>
            Impulsamos tu evolución digital con IA, tecnología y datos
          </div>
          <div style={{ fontSize: 28, color: "#a594ff", letterSpacing: 4 }}>IA · CLOUD · DATOS · DESARROLLO</div>
        </div>
      </div>
    ),
    size,
  );
}
