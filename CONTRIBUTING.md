# Contributing

Contributions are welcome — typo fixes, copy improvements, design tweaks, or new sections.

## Getting started

```bash
pnpm install
pnpm dev
```

The site is a single Astro page (`src/pages/index.astro`) composed from components in `src/components/`. Each component maps roughly to a page section (Hero, Features, Install, etc.).

## Making changes

- Keep the design consistent with the existing dark/light theme system (`src/scripts/theme.ts`, CSS variables in `src/styles/global.css`).
- Run `pnpm build` before submitting to catch any build errors.
- For copy changes that affect Vivo's documented behavior, verify accuracy against the [vivo-cli](https://github.com/dantuck/vivo) source or README.

## Submitting

Open a pull request against `main`. There are no formal review gates — small, focused PRs merge faster.
