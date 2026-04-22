# Vivo Marketing Site — Design Spec

## Overview

A single-page marketing site for the `vivo` CLI tool, built with **Astro 6** and **UnoCSS**. The site showcases what vivo does, walks through its key features, and highlights all installation methods.

## Stack

- **Framework**: Astro 6 (static output, no SSR needed)
- **Styling**: UnoCSS with attributify mode disabled — standard utility classes only
- **Theme**: Dark/light/system switcher implemented via a class on `<html>` (`class="dark"` or `class="light"`); system default reads `prefers-color-scheme`
- **Language**: TypeScript

## Visual Design

**Aesthetic**: Dark but polished. Deep slate background (`#1e2130`) with slightly elevated surface levels (`#252839`, `#2d3148`). Green accent (`#34d399` / `#10b981`). Clean sans-serif body type. Monospace for all code and terminal content.

**Theme variables** (CSS custom properties):

| Token | Dark | Light |
|---|---|---|
| `--bg` | `#1e2130` | `#f8fafc` |
| `--bg2` | `#252839` | `#f1f5f9` |
| `--bg3` | `#2d3148` | `#e2e8f0` |
| `--accent` | `#34d399` | `#10b981` |
| `--text` | `#f1f5f9` | `#0f172a` |
| `--muted` | `#94a3b8` | `#64748b` |
| `--border` | `#334155` | `#cbd5e1` |
| `--code-bg` | `#0d1117` | `#1e2130` |
| `--code-text` | `#e6edf3` | `#e6edf3` |

UnoCSS theme config extends these tokens so utilities like `bg-bg2`, `text-accent`, `border-border` work throughout.

**Theme switcher**: Three-button pill in the nav (☀ Light / ◐ Dark / ⬡ System). Clicking sets a `data-theme` attribute on `<html>`. JavaScript reads `prefers-color-scheme` for system mode. State persists in `localStorage`.

## Page Structure

Narrative scroll — sections flow top to bottom. Alternating section backgrounds (`--bg` / `--bg2`) provide visual separation without hard dividers.

### 1. Nav (sticky)

- Logo mark (green square with "V") + wordmark "vivo"
- Links: How it works · Features · Install · GitHub ↗
- Theme switcher pill (right side)

### 2. Hero

- Badge: `v{version} — now on crates.io` (green dot + pill)
- H1: "Encrypted backups. **Synced everywhere.**" (accent on second line)
- Subtitle: one-sentence description of what vivo does
- Install command box: dark code block with copy button
- CTA buttons: "Get started" (primary/accent), "View on GitHub", "crates.io" (secondary)

### 3. How It Works (`--bg2` background)

- Section label + H2
- 4-step horizontal flow with numbered circles connected by a faint accent-colored line: **Backup → Check → Forget → Sync**
- Each step: number circle, step name, one-line description

### 4. Features (`--bg` background)

- Section label + H2
- 3-column grid, 6 features, no card borders — icon + bold title + body paragraph:
  1. Credentials encrypted at rest (SOPS + age)
  2. Multi-remote sync (S3, B2, MinIO)
  3. Step control (`--start-step`)
  4. Self-updating (`vivo update`)
  5. Task chaining (calls + commands, circular ref detection)
  6. Dry-run mode

### 5. Configuration (`--bg2` background)

- Section label + H2
- Two-column layout: explanatory prose on the left, syntax-highlighted KDL code block on the right
- Code block: macOS-style traffic light header, monospace body with keyword/string/key coloring
- Default config path shown below the prose

### 6. Remote Backends (`--bg` background)

- Section label + H2
- 2-column card grid (with border): S3-compatible and Backblaze B2
- Each card: title, description, monospace URL format example

### 7. Quick Start (`--bg2` background)

- Section label + H2
- Vertical numbered list of 4 steps: `vivo init` → `vivo config edit` → `vivo secrets edit` → `vivo --dry-run && vivo`
- Each step: green numbered circle, title, description, dark code block

### 8. Install (`--bg` background)

- Section label + H2
- 3-column card grid: One-line install (curl) · From Cargo · Build from source
- Each card has a brief description and a dark inline code block

### 9. Footer

- Logo + wordmark (left)
- Links: GitHub · Codeberg · crates.io · CHANGELOG (center)
- License: "Apache-2.0 OR MIT" (right)

## Astro Component Architecture

```
src/
  pages/
    index.astro         # page shell: imports all sections
  components/
    Nav.astro           # sticky nav + theme switcher
    Hero.astro          # hero section
    HowItWorks.astro    # 4-step flow
    Features.astro      # 3-column feature grid
    Config.astro        # 2-col prose + KDL code block
    Remotes.astro       # S3 + B2 cards
    QuickStart.astro    # numbered steps
    Install.astro       # 3-col install methods
    Footer.astro        # footer
  styles/
    global.css          # CSS custom property tokens, base reset
  scripts/
    theme.ts            # theme switcher logic (localStorage + prefers-color-scheme)
```

`index.astro` composes all section components in order. Each component is self-contained with its own scoped styles where needed; shared tokens come from `global.css`.

## UnoCSS Configuration

- Preset: `@unocss/preset-wind` (Tailwind-compatible utilities)
- Theme extension: maps `--bg`, `--bg2`, `--text`, `--accent`, `--muted`, `--border`, `--code-bg` tokens to utility names
- Dark mode: `class` strategy (`.dark` on `<html>`)
- No attributify mode

## Theme Switcher Behaviour

1. On page load: read `localStorage.getItem('theme')`. If set, apply. Otherwise use `prefers-color-scheme`.
2. On button click: write to `localStorage`, update `<html>` class (`dark` / `light` / remove both for system).
3. System mode: add a `matchMedia` listener to update the class if the OS preference changes while the page is open.
4. No flash of wrong theme: inline `<script>` in `<head>` applies the theme before first paint.

## Content Notes

- Version badge in the hero should be static initially (hardcoded `v0.4.2`); can be made dynamic later via a fetch to the GitHub releases API.
- All install URLs use the GitHub raw URL from the README: `https://raw.githubusercontent.com/dantuck/vivo/main/install.sh`
- Copy button in the install box uses `navigator.clipboard.writeText`.
- No analytics, no tracking, no external fonts — fully self-contained static output.

## Build & Dev

```bash
cd vivo-marketing
npm create astro@latest .   # initial scaffold (done during implementation)
npm run dev                 # dev server
npm run build               # static output to dist/
npm run preview             # preview built output
```
