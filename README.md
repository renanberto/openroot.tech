# OpenRoot OS

Portfolio estatico estilo desktop OS/terminal para openroot.tech.

## Release atual

**OS Release 1 / PROD**

Este e o primeiro baseline real para producao. Historico de releases experimentais foi removido do pacote.

## Rodar local

```bash
npm install
npm run dev
```

## Validar producao

```bash
npm run rc:check
```

## Deploy

O deploy usa GitHub Actions e publica `apps/renanberto/dist` no GitHub Pages.
