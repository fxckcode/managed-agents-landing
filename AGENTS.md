# AGENTS.md — Pausa landing (fxckcode/managed-agents-landing)

Instrucciones para agentes (incluido Claude Managed Agents) que trabajan en este repo.
`CLAUDE.md` importa este archivo con `@AGENTS.md`; este es el único origen de instrucciones.

## Producto y restricciones

- Pausa es un producto **ficticio**. La landing es una demostración.
- Todo el copy visible y los metadatos están en **español** (`lang="es"`). Mantén el texto aprobado (issue #2).
- **No inventes** testimonios, logos de clientes, precios, estadísticas, claims de salud ni capacidades de producto.
- La lista de espera es **simulada**: el formulario no envía ni guarda datos. No añadas red, cookies, `localStorage`, `sessionStorage` ni backend sin un issue aprobado que cambie ese alcance.
- No copies código, instrucciones, lockfiles ni assets de `JoseCortezz25/template-starter-nextjs` (sin licencia declarada).

## Arquitectura

- Next.js 16 (App Router), React 19, TypeScript 5.9, pnpm 10. Node >= 20.9.
- `app/layout.tsx`: `<html lang="es">`, metadatos (title, description, OG, Twitter `summary`), skip link, cabecera y pie.
- `app/page.tsx`: secciones de la landing (hero, problema, beneficios, cómo funciona, FAQ, lista de espera).
- `components/waitlist-form.tsx`: componente cliente con la validación y el aviso de demo.
- `app/globals.css`: estilos globales. Respeta `prefers-reduced-motion` y el foco visible.
- `tests/landing.spec.ts` (Playwright): regresiones de formulario, metadatos, responsive y movimiento reducido. Configuración en `playwright.config.ts`.
- `.github/workflows/ci.yml`: en cada PR a `main` ejecuta install congelado, typecheck, build y tests.

## Comandos

```bash
pnpm install --frozen-lockfile   # instalar con el lockfile comprometido
pnpm typecheck                   # tsc --noEmit
pnpm build                       # build de producción
pnpm start                       # servir el build (puerto 3000 por defecto)
pnpm test                        # Playwright: pruebas de regresión contra el build (Chromium)
pnpm dev                         # desarrollo
```

Para `pnpm test` en local con un Chromium ya instalado, define `PW_CHROMIUM_PATH=/ruta/a/chromium`. La primera vez en una máquina nueva, `pnpm exec playwright install chromium` descarga el navegador.

Lint: no hay ESLint configurado todavía. Next 16 ya no incluye `next lint`; añadirlo es un corte separado.

No cambies versiones de dependencias sin justificarlo en el PR. Si añades una dependencia, actualiza `pnpm-lock.yaml` en el mismo commit.

## Flujo de trabajo para issues `fix-agent`

1. Lee el issue completo y **todos sus comentarios**.
2. Respeta `Blocked by`: si una dependencia no está resuelta, implementa el prerrequisito pequeño en tu rama o espera a que su PR esté listo.
3. Implementa **un solo corte vertical** del issue: pequeño, probable de revisar y verificable por separado.
4. Antes de abrir PR, ejecuta `pnpm install --frozen-lockfile`, `pnpm typecheck`, `pnpm build` y `pnpm test`, y pega la salida real en el reporte.
5. Si una pieza es comprobable solo en un navegador real, lector de pantalla o validador externo y no lo hiciste, márcala como **pendiente**. No la declares aprobada.
6. Si hay una decisión de producto, licencia o infraestructura que no puedes tomar, detente y pregunta en el issue.

## Estilo de cambios

- Commits y PRs en español o inglés, concisos; explica el porqué en el cuerpo.
- Mantén los cambios pequeños. No reformatees archivos no relacionados.
- Conserva los ids de sección, el skip link y los atributos de accesibilidad existentes.
