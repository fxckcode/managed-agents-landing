import type { Metadata } from "next";
import "./globals.css";

const TITLE =
  "Pausa — Micro-descansos guiados para tu jornada frente a la pantalla";
const DESCRIPTION =
  "Pausa es una app ficticia que te recuerda tomar descansos breves y te guía en pausas de 2 minutos durante tu jornada.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "es_ES",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>

        <header className="site-header">
          <div className="container header-inner">
            <a className="logo" href="#inicio" aria-label="Pausa, ir al inicio">
              <svg aria-hidden="true" width="28" height="28" viewBox="0 0 28 28">
                <circle cx="14" cy="14" r="13" fill="#4F7A63" />
                <rect x="9" y="8" width="3.5" height="12" rx="1.75" fill="#FBF8F3" />
                <rect x="15.5" y="8" width="3.5" height="12" rx="1.75" fill="#FBF8F3" />
              </svg>
              Pausa
            </a>
            <nav aria-label="Principal">
              <ul className="nav-list">
                <li>
                  <a href="#beneficios">Beneficios</a>
                </li>
                <li>
                  <a href="#como-funciona">Cómo funciona</a>
                </li>
                <li>
                  <a href="#preguntas">Preguntas</a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {children}

        <footer className="site-footer">
          <div className="container">
            <p>
              Pausa es un producto ficticio creado como demostración. No es un
              servicio real.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
