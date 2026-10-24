# managed-agents-landing

Landing page de demostración de **Pausa**, un producto ficticio. Ver #1.

Construida con Next.js (App Router) + React + TypeScript.

## Versiones

- Node.js >= 20.9 (probado con 22.22)
- pnpm 10
- next 16.4.3, react / react-dom 19, typescript 5.9

## Comandos

```bash
pnpm install
pnpm dev        # desarrollo en http://localhost:3000
pnpm typecheck  # tsc --noEmit
pnpm build      # build de producción
pnpm start      # sirve el build de producción
```

## Notas

- El formulario de lista de espera es una demo: no hace peticiones de red ni
  guarda datos en cookies, localStorage o sessionStorage.
