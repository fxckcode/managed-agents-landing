import { ImageResponse } from "next/og";

// Social card generated at build time (1200 × 630). Original artwork: only the
// approved Pausa name, colors and copy. No testimonials, prices or claims.
export const alt = "Pausa — Micro-descansos guiados para tu jornada frente a la pantalla";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COLORS = {
  bg: "#FBF8F3",
  bgSoft: "#E4ECE6",
  primary: "#4F7A63",
  accentDark: "#A4512F",
  text: "#1F2A24",
  muted: "#47524C",
};

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 56,
          padding: "0 80px",
          background: COLORS.bg,
          color: COLORS.text,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 280,
            height: 280,
            borderRadius: 140,
            background: COLORS.bgSoft,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              background: COLORS.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 26,
            }}
          >
            <div style={{ width: 26, height: 96, borderRadius: 13, background: COLORS.bg }} />
            <div style={{ width: 26, height: 96, borderRadius: 13, background: COLORS.bg }} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 40, fontWeight: 700, color: COLORS.primary }}>Pausa</div>
          <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.1, marginTop: 16 }}>
            Dos minutos para ti, cuando más los necesitas
          </div>
          <div style={{ fontSize: 28, color: COLORS.muted, marginTop: 24, lineHeight: 1.3 }}>
            Micro-descansos guiados para tu jornada frente a la pantalla
          </div>
          <div style={{ marginTop: 36, fontSize: 22, color: COLORS.accentDark, fontWeight: 700 }}>
            Demo · producto ficticio
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
