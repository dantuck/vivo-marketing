# vivo-marketing

Marketing website for [Vivo](https://github.com/dantuck/vivo) — an encrypted backup orchestrator built on restic with multi-remote sync and SOPS/age secrets.

Built with [Astro](https://astro.build) and [UnoCSS](https://unocss.dev). Deployed to Cloudflare Pages.

## Development

Requires Node 24+ (managed via `.node-version` with [fnm](https://github.com/Schniz/fnm)) and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev       # start dev server at localhost:4321
pnpm build     # production build → dist/
pnpm preview   # preview the production build locally
```

## Project Structure

```
src/
  components/   # Astro components (Hero, Features, Install, etc.)
  pages/        # index.astro — the single-page site
  styles/       # global.css
  scripts/      # theme.ts — dark/light/system theme toggle
```

## License

MIT — see [LICENSE](LICENSE).
