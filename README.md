# Florent Tariolle Portfolio

Personal research portfolio built with Astro and deployed to [tariolle.github.io](https://tariolle.github.io).

## Development

```bash
pnpm install
pnpm dev
pnpm build
```

Projects are defined in `src/data/work.ts`; the CV is synchronized from `Tariolle/curriculum-vitae` at build time. Pushes and hourly builds deploy through GitHub Actions.
