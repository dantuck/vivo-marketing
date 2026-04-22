# Vivo Marketing Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page Astro 6 + UnoCSS marketing site for the vivo CLI tool at `vivo-marketing/`.

**Architecture:** Static Astro 6 site — one page (`src/pages/index.astro`) composing nine Astro components in narrative scroll order. UnoCSS provides utility classes backed by CSS custom property tokens defined in `global.css`. A theme switcher (dark/light/system) sets a class on `<html>` with localStorage persistence and an anti-flash inline script.

**Tech Stack:** Astro 6, UnoCSS (`unocss` + `@unocss/astro`), TypeScript, CSS custom properties for theming.

---

## File Map

| File | Purpose |
|---|---|
| `package.json` | Project manifest + scripts |
| `astro.config.mjs` | Astro config with UnoCSS integration |
| `uno.config.ts` | UnoCSS preset + CSS-variable-backed theme tokens |
| `tsconfig.json` | TypeScript config |
| `src/env.d.ts` | Astro type reference |
| `src/styles/global.css` | CSS variable tokens for dark/light, base reset |
| `src/scripts/theme.ts` | Theme switcher logic (apply, init, set) |
| `src/pages/index.astro` | Page shell: head, anti-flash script, component composition |
| `src/components/Nav.astro` | Sticky nav + theme pill |
| `src/components/Hero.astro` | Badge, H1, install command, CTAs |
| `src/components/HowItWorks.astro` | 4-step horizontal flow |
| `src/components/Features.astro` | 3-column borderless feature grid |
| `src/components/Config.astro` | 2-col prose + KDL code block |
| `src/components/Remotes.astro` | S3 + B2 cards |
| `src/components/QuickStart.astro` | Numbered step list |
| `src/components/Install.astro` | 3-col install method cards |
| `src/components/Footer.astro` | Footer with links + license |

---

## Task 1: Scaffold project files

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/env.d.ts`

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "vivo-marketing",
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^6.0.0"
  },
  "devDependencies": {
    "@unocss/astro": "latest",
    "@unocss/preset-wind": "latest",
    "unocss": "latest"
  }
}
```

- [ ] **Step 2: Write `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config'
import UnoCSS from '@unocss/astro'

export default defineConfig({
  integrations: [UnoCSS({ injectReset: false })],
})
```

- [ ] **Step 3: Write `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 4: Write `src/env.d.ts`**

```ts
/// <reference path="../.astro/types.d.ts" />
```

- [ ] **Step 5: Install dependencies**

Run from `vivo-marketing/`:
```bash
npm install
```

Expected: `node_modules/` created, `package-lock.json` written.

- [ ] **Step 6: Create minimal placeholder page so dev server starts**

`src/pages/index.astro`:
```astro
---
---
<html><body><p>placeholder</p></body></html>
```

- [ ] **Step 7: Verify dev server starts**

```bash
npm run dev
```

Expected: server starts on `http://localhost:4321` with no errors.

- [ ] **Step 8: Commit**

```bash
git init
git add package.json astro.config.mjs tsconfig.json src/env.d.ts src/pages/index.astro
git commit -m "chore: scaffold astro project"
```

---

## Task 2: UnoCSS config + global CSS

**Files:**
- Create: `uno.config.ts`
- Create: `src/styles/global.css`

- [ ] **Step 1: Write `uno.config.ts`**

```ts
import { defineConfig } from 'unocss'
import presetWind from '@unocss/preset-wind'

export default defineConfig({
  presets: [presetWind()],
  theme: {
    colors: {
      bg: 'var(--bg)',
      bg2: 'var(--bg2)',
      bg3: 'var(--bg3)',
      accent: 'var(--accent)',
      accent2: 'var(--accent2)',
      muted: 'var(--muted)',
      border: 'var(--border)',
      codebg: 'var(--code-bg)',
      codetext: 'var(--code-text)',
    },
    fontFamily: {
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
    },
  },
})
```

- [ ] **Step 2: Write `src/styles/global.css`**

```css
:root, .dark {
  --bg: #1e2130;
  --bg2: #252839;
  --bg3: #2d3148;
  --accent: #34d399;
  --accent2: #10b981;
  --text: #f1f5f9;
  --muted: #94a3b8;
  --border: #334155;
  --code-bg: #0d1117;
  --code-text: #e6edf3;
}

.light {
  --bg: #f8fafc;
  --bg2: #f1f5f9;
  --bg3: #e2e8f0;
  --accent: #10b981;
  --accent2: #059669;
  --text: #0f172a;
  --muted: #64748b;
  --border: #cbd5e1;
  --code-bg: #1e2130;
  --code-text: #e6edf3;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg);
  color: var(--text);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 15px;
  line-height: 1.6;
  transition: background-color 0.2s, color 0.2s;
}

code, pre, kbd {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

a { color: inherit; text-decoration: none; }
```

- [ ] **Step 3: Commit**

```bash
git add uno.config.ts src/styles/global.css
git commit -m "feat: add unocss config and global css tokens"
```

---

## Task 3: Theme switcher script + page shell

**Files:**
- Create: `src/scripts/theme.ts`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write `src/scripts/theme.ts`**

```ts
export type Theme = 'dark' | 'light' | 'system'

function applyTheme(theme: Theme): void {
  const root = document.documentElement
  root.classList.remove('dark', 'light')

  if (theme === 'dark') {
    root.classList.add('dark')
  } else if (theme === 'light') {
    root.classList.add('light')
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    root.classList.add(prefersDark ? 'dark' : 'light')
  }
}

export function initTheme(): void {
  const saved = (localStorage.getItem('theme') ?? 'system') as Theme
  applyTheme(saved)

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const current = (localStorage.getItem('theme') ?? 'system') as Theme
    if (current === 'system') applyTheme('system')
  })
}

export function setTheme(theme: Theme): void {
  localStorage.setItem('theme', theme)
  applyTheme(theme)
}
```

- [ ] **Step 2: Replace `src/pages/index.astro` with the full page shell**

```astro
---
import 'virtual:uno.css'
import '../styles/global.css'
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Vivo — encrypted backups synced everywhere. A restic wrapper with multi-remote support, SOPS/age secrets, and a single command to run it all." />
  <title>Vivo — Encrypted backups. Synced everywhere.</title>
  <script is:inline>
    (function () {
      var theme = localStorage.getItem('theme') || 'system';
      var root = document.documentElement;
      root.classList.remove('dark', 'light');
      if (theme === 'dark') {
        root.classList.add('dark');
      } else if (theme === 'light') {
        root.classList.add('light');
      } else {
        root.classList.add(
          window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        );
      }
    })();
  </script>
</head>
<body>
  <p>Shell ready — components coming.</p>
</body>
</html>
```

- [ ] **Step 3: Verify build succeeds**

```bash
npm run build
```

Expected: `dist/` created, no errors.

- [ ] **Step 4: Commit**

```bash
git add src/scripts/theme.ts src/pages/index.astro
git commit -m "feat: add theme switcher script and page shell"
```

---

## Task 4: Nav component

**Files:**
- Create: `src/components/Nav.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write `src/components/Nav.astro`**

```astro
---
---

<nav>
  <a href="/" class="nav-logo">
    <div class="logo-mark">V</div>
    <span>vivo</span>
  </a>
  <div class="nav-links">
    <a href="#how-it-works">How it works</a>
    <a href="#features">Features</a>
    <a href="#install">Install</a>
    <a href="https://github.com/dantuck/vivo" target="_blank" rel="noopener" class="nav-external">
      GitHub ↗
    </a>
    <div class="theme-pill" role="group" aria-label="Theme">
      <button class="theme-btn" data-theme-value="light" aria-label="Light theme">☀</button>
      <button class="theme-btn" data-theme-value="dark" aria-label="Dark theme">◐</button>
      <button class="theme-btn" data-theme-value="system" aria-label="System theme">⬡</button>
    </div>
  </div>
</nav>

<script>
  import { initTheme, setTheme } from '../scripts/theme.ts'

  initTheme()

  function syncButtons() {
    const current = localStorage.getItem('theme') ?? 'system'
    document.querySelectorAll<HTMLButtonElement>('.theme-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.themeValue === current)
    })
  }

  syncButtons()

  document.querySelectorAll<HTMLButtonElement>('.theme-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const value = btn.dataset.themeValue as 'dark' | 'light' | 'system'
      setTheme(value)
      syncButtons()
    })
  })
</script>

<style>
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 48px;
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    background: var(--bg);
    z-index: 100;
    transition: background 0.2s;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    font-size: 18px;
    color: var(--text);
  }

  .logo-mark {
    width: 32px;
    height: 32px;
    background: var(--accent);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 800;
    color: #0f172a;
    flex-shrink: 0;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 24px;
    font-size: 14px;
  }

  .nav-links a {
    color: var(--muted);
    transition: color 0.15s;
  }

  .nav-links a:hover { color: var(--text); }
  .nav-external { color: var(--accent) !important; }

  .theme-pill {
    display: flex;
    gap: 2px;
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 4px 6px;
  }

  .theme-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 3px 8px;
    border-radius: 14px;
    font-size: 13px;
    color: var(--muted);
    transition: background 0.15s, color 0.15s;
  }

  .theme-btn.active {
    background: var(--accent);
    color: #0f172a;
    font-weight: 600;
  }

  @media (max-width: 640px) {
    nav { padding: 14px 20px; }
    .nav-links a:not(.nav-external) { display: none; }
  }
</style>
```

- [ ] **Step 2: Add Nav to `src/pages/index.astro`**

Replace `<body>` content:
```astro
---
import 'virtual:uno.css'
import '../styles/global.css'
import Nav from '../components/Nav.astro'
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Vivo — encrypted backups synced everywhere. A restic wrapper with multi-remote support, SOPS/age secrets, and a single command to run it all." />
  <title>Vivo — Encrypted backups. Synced everywhere.</title>
  <script is:inline>
    (function () {
      var theme = localStorage.getItem('theme') || 'system';
      var root = document.documentElement;
      root.classList.remove('dark', 'light');
      if (theme === 'dark') {
        root.classList.add('dark');
      } else if (theme === 'light') {
        root.classList.add('light');
      } else {
        root.classList.add(
          window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        );
      }
    })();
  </script>
</head>
<body>
  <Nav />
  <main>
    <p style="padding: 40px; color: var(--muted);">Content coming…</p>
  </main>
</body>
</html>
```

- [ ] **Step 3: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Nav.astro src/pages/index.astro
git commit -m "feat: add nav with theme switcher"
```

---

## Task 5: Hero component

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write `src/components/Hero.astro`**

```astro
---
const INSTALL_CMD = 'curl -sSf https://raw.githubusercontent.com/dantuck/vivo/main/install.sh | sh'
const VERSION = 'v0.4.2'
---

<section class="hero" id="hero">
  <div class="hero-inner">
    <div class="badge">
      <span class="badge-dot"></span>
      {VERSION} — now on crates.io
    </div>

    <h1>
      Encrypted backups.<br />
      <span class="accent">Synced everywhere.</span>
    </h1>

    <p class="subtitle">
      Vivo wraps restic to orchestrate backups with multi-remote sync — S3, B2, and more.
      Credentials stay encrypted at rest with SOPS + age.
    </p>

    <div class="install-box">
      <span class="prompt">$</span>
      <code id="install-cmd">{INSTALL_CMD}</code>
      <button class="copy-btn" id="copy-btn" aria-label="Copy install command">
        <span id="copy-label">copy</span>
      </button>
    </div>

    <div class="cta-row">
      <a href="#quick-start" class="btn-primary">Get started</a>
      <a href="https://github.com/dantuck/vivo" target="_blank" rel="noopener" class="btn-secondary">
        View on GitHub
      </a>
      <a href="https://crates.io/crates/vivo" target="_blank" rel="noopener" class="btn-secondary">
        crates.io
      </a>
    </div>
  </div>
</section>

<script>
  const btn = document.getElementById('copy-btn')!
  const label = document.getElementById('copy-label')!
  const cmd = document.getElementById('install-cmd')!

  btn.addEventListener('click', async () => {
    await navigator.clipboard.writeText(cmd.textContent ?? '')
    label.textContent = 'copied!'
    setTimeout(() => { label.textContent = 'copy' }, 2000)
  })
</script>

<style>
  .hero {
    background: var(--bg);
    padding: 96px 48px 80px;
    transition: background 0.2s;
  }

  .hero-inner {
    max-width: 720px;
    margin: 0 auto;
    text-align: center;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 5px 14px;
    font-size: 13px;
    color: var(--muted);
    margin-bottom: 28px;
  }

  .badge-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent);
    flex-shrink: 0;
  }

  h1 {
    font-size: clamp(36px, 6vw, 56px);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--text);
    margin-bottom: 20px;
  }

  .accent { color: var(--accent); }

  .subtitle {
    font-size: 18px;
    color: var(--muted);
    max-width: 540px;
    margin: 0 auto 36px;
    line-height: 1.7;
  }

  .install-box {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: var(--code-bg);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 16px;
    margin-bottom: 28px;
    max-width: 100%;
    overflow-x: auto;
  }

  .prompt { color: var(--accent); font-size: 14px; flex-shrink: 0; }

  code {
    font-size: 13px;
    color: var(--code-text);
    white-space: nowrap;
  }

  .copy-btn {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 5px;
    padding: 3px 10px;
    font-size: 12px;
    color: var(--muted);
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.15s, color 0.15s;
  }

  .copy-btn:hover { background: var(--bg2); color: var(--text); }

  .cta-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .btn-primary {
    background: var(--accent);
    color: #0f172a;
    font-weight: 600;
    font-size: 14px;
    padding: 10px 22px;
    border-radius: 8px;
    transition: opacity 0.15s;
    display: inline-block;
  }

  .btn-primary:hover { opacity: 0.9; }

  .btn-secondary {
    background: var(--bg2);
    color: var(--text);
    font-size: 14px;
    padding: 10px 22px;
    border-radius: 8px;
    border: 1px solid var(--border);
    transition: background 0.15s;
    display: inline-block;
  }

  .btn-secondary:hover { background: var(--bg3); }

  @media (max-width: 640px) {
    .hero { padding: 64px 20px 56px; }
    .install-box { font-size: 11px; }
  }
</style>
```

- [ ] **Step 2: Add Hero to `src/pages/index.astro`**

In the frontmatter, add: `import Hero from '../components/Hero.astro'`

In `<main>`, replace placeholder with: `<Hero />`

- [ ] **Step 3: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro src/pages/index.astro
git commit -m "feat: add hero section"
```

---

## Task 6: HowItWorks component

**Files:**
- Create: `src/components/HowItWorks.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write `src/components/HowItWorks.astro`**

```astro
---
const steps = [
  { num: 1, title: 'Backup', desc: 'restic snapshots your directories to a local repository' },
  { num: 2, title: 'Check', desc: 'repo integrity is verified before any remote sync' },
  { num: 3, title: 'Forget', desc: 'old snapshots are pruned by your retention policy' },
  { num: 4, title: 'Sync', desc: 'data is pushed to all configured remote backends' },
]
---

<section class="how" id="how-it-works">
  <div class="inner">
    <p class="label">How it works</p>
    <h2>One command.<br />Four phases.</h2>

    <div class="steps">
      <div class="connector"></div>
      {steps.map((s) => (
        <div class="step">
          <div class="circle">{s.num}</div>
          <h3>{s.title}</h3>
          <p>{s.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .how {
    background: var(--bg2);
    padding: 80px 48px;
    transition: background 0.2s;
  }

  .inner {
    max-width: 900px;
    margin: 0 auto;
  }

  .label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 12px;
  }

  h2 {
    font-size: clamp(28px, 4vw, 38px);
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--text);
    margin-bottom: 56px;
  }

  .steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    position: relative;
  }

  .connector {
    position: absolute;
    top: 23px;
    left: calc(12.5% + 12px);
    right: calc(12.5% + 12px);
    height: 2px;
    background: linear-gradient(to right, var(--accent), var(--accent2));
    opacity: 0.35;
    z-index: 0;
  }

  .step {
    text-align: center;
    padding: 0 16px;
    position: relative;
    z-index: 1;
  }

  .circle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--bg2);
    border: 2px solid var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 16px;
    color: var(--accent);
    margin: 0 auto 16px;
  }

  .step h3 {
    font-size: 16px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 6px;
  }

  .step p {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.5;
  }

  @media (max-width: 640px) {
    .how { padding: 64px 20px; }
    .steps { grid-template-columns: 1fr 1fr; gap: 32px; }
    .connector { display: none; }
  }
</style>
```

- [ ] **Step 2: Add to `src/pages/index.astro`**

Import: `import HowItWorks from '../components/HowItWorks.astro'`

In `<main>` after `<Hero />`, add: `<HowItWorks />`

- [ ] **Step 3: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/HowItWorks.astro src/pages/index.astro
git commit -m "feat: add how-it-works section"
```

---

## Task 7: Features component

**Files:**
- Create: `src/components/Features.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write `src/components/Features.astro`**

```astro
---
const features = [
  {
    icon: '🔐',
    title: 'Credentials encrypted at rest',
    body: 'SOPS + age keeps your remote keys out of plaintext configs. Secrets are decrypted in-memory only at runtime.',
  },
  {
    icon: '☁️',
    title: 'Multi-remote sync',
    body: 'Push the same backup to S3, Backblaze B2, MinIO, and more in one run. Add as many remotes as you need.',
  },
  {
    icon: '⏭️',
    title: 'Step control',
    body: 'Use --start-step to skip already-completed phases. Resume from forget, or run sync-only.',
  },
  {
    icon: '🔄',
    title: 'Self-updating',
    body: 'Run `vivo update` to pull the latest release. Background version checks notify you after each run.',
  },
  {
    icon: '🔗',
    title: 'Task chaining',
    body: 'Tasks can call other tasks and run shell commands post-backup. Circular references are detected and skipped.',
  },
  {
    icon: '🧪',
    title: 'Dry-run mode',
    body: 'Test your full configuration without writing a single byte. Skips remote sync, forwards --dry-run to restic.',
  },
]
---

<section class="features" id="features">
  <div class="inner">
    <p class="label">Features</p>
    <h2>Everything restic<br />was missing.</h2>
    <div class="grid">
      {features.map((f) => (
        <div class="feature">
          <div class="icon" aria-hidden="true">{f.icon}</div>
          <h3>{f.title}</h3>
          <p>{f.body}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .features {
    background: var(--bg);
    padding: 80px 48px;
    transition: background 0.2s;
  }

  .inner {
    max-width: 900px;
    margin: 0 auto;
  }

  .label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 12px;
  }

  h2 {
    font-size: clamp(28px, 4vw, 38px);
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--text);
    margin-bottom: 48px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px 32px;
  }

  .icon { font-size: 22px; margin-bottom: 12px; }

  .feature h3 {
    font-size: 16px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 8px;
  }

  .feature p {
    font-size: 14px;
    color: var(--muted);
    line-height: 1.65;
  }

  @media (max-width: 768px) {
    .features { padding: 64px 20px; }
    .grid { grid-template-columns: 1fr 1fr; gap: 32px 24px; }
  }

  @media (max-width: 480px) {
    .grid { grid-template-columns: 1fr; }
  }
</style>
```

- [ ] **Step 2: Add to `src/pages/index.astro`**

Import: `import Features from '../components/Features.astro'`

After `<HowItWorks />`, add: `<Features />`

- [ ] **Step 3: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Features.astro src/pages/index.astro
git commit -m "feat: add features section"
```

---

## Task 8: Config component

**Files:**
- Create: `src/components/Config.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write `src/components/Config.astro`**

```astro
---
---

<section class="config" id="config">
  <div class="inner">
    <p class="label">Configuration</p>
    <h2>KDL config.<br />Human-readable.</h2>

    <div class="layout">
      <div class="prose">
        <p>
          Configure backups in a clean <a href="https://kdl.dev" target="_blank" rel="noopener">KDL</a> file.
          Set your repo, directories to back up, retention policy, and remote destinations — all in one place.
        </p>
        <p>
          Secrets are stored separately in a SOPS-encrypted YAML file and injected as environment
          variables at runtime — never written to disk in plaintext.
        </p>
        <div class="path-box">
          <span class="path-label">Default config path</span>
          <code>~/.config/vivo/backup.kdl</code>
        </div>
        <div class="path-box">
          <span class="path-label">Default secrets path</span>
          <code>~/.config/vivo/secrets.yaml</code>
        </div>
      </div>

      <div class="code-block">
        <div class="code-header">
          <span class="dot dot-r"></span>
          <span class="dot dot-y"></span>
          <span class="dot dot-g"></span>
          <span class="file-name">backup.kdl</span>
        </div>
        <pre class="code-body"><span class="cmt">// default task to run</span>
<span class="key">default-task</span> <span class="str">"backup"</span>

<span class="key">tasks</span> &#123;
    <span class="key">task</span> <span class="str">"backup"</span> &#123;
        <span class="key">backup</span> &#123;
            <span class="key">repo</span> <span class="str">"$HOME/.local/share/restic/main"</span>
            <span class="key">directory</span> <span class="str">"$HOME"</span>
            <span class="key">exclude-file</span> <span class="str">"$HOME/.config/vivo/excludes"</span>

            <span class="key">retention</span> &#123;
                <span class="key">daily</span>   <span class="num">7</span>
                <span class="key">weekly</span>  <span class="num">5</span>
                <span class="key">monthly</span> <span class="num">12</span>
                <span class="key">yearly</span>  <span class="num">2</span>
            &#125;

            <span class="key">remote</span> <span class="str">"s3:https://s3.amazonaws.com/my-bucket"</span> &#123;
                <span class="key">credentials</span> <span class="str">"aws"</span>
            &#125;
            <span class="key">remote</span> <span class="str">"b2:my-bucket:restic/main"</span> &#123;
                <span class="key">credentials</span> <span class="str">"b2"</span>
            &#125;
        &#125;

        <span class="key">command</span> <span class="str">"notify-send 'Backup complete'"</span>
    &#125;
&#125;</pre>
      </div>
    </div>
  </div>
</section>

<style>
  .config {
    background: var(--bg2);
    padding: 80px 48px;
    transition: background 0.2s;
  }

  .inner {
    max-width: 960px;
    margin: 0 auto;
  }

  .label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 12px;
  }

  h2 {
    font-size: clamp(28px, 4vw, 38px);
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--text);
    margin-bottom: 48px;
  }

  .layout {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 48px;
    align-items: start;
  }

  .prose p {
    font-size: 15px;
    color: var(--muted);
    line-height: 1.7;
    margin-bottom: 16px;
  }

  .prose a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; }

  .path-box {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .path-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted);
  }

  .path-box code {
    background: var(--code-bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 7px 12px;
    font-size: 13px;
    color: var(--accent);
    display: block;
    margin-top: 2px;
  }

  .code-block {
    background: var(--code-bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }

  .code-header {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 16px;
    border-bottom: 1px solid var(--border);
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .dot-r { background: #ff5f57; }
  .dot-y { background: #febc2e; }
  .dot-g { background: #28c840; }

  .file-name {
    font-size: 12px;
    color: var(--muted);
    margin-left: 8px;
    font-family: ui-monospace, monospace;
  }

  .code-body {
    padding: 20px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 13px;
    line-height: 1.7;
    color: var(--code-text);
    margin: 0;
    overflow-x: auto;
    white-space: pre;
  }

  .cmt { color: #8b949e; }
  .key { color: #7ee787; }
  .str { color: #a5d6ff; }
  .num { color: #79c0ff; }

  @media (max-width: 768px) {
    .config { padding: 64px 20px; }
    .layout { grid-template-columns: 1fr; }
  }
</style>
```

- [ ] **Step 2: Add to `src/pages/index.astro`**

Import: `import Config from '../components/Config.astro'`

After `<Features />`, add: `<Config />`

- [ ] **Step 3: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Config.astro src/pages/index.astro
git commit -m "feat: add config section with KDL code block"
```

---

## Task 9: Remotes component

**Files:**
- Create: `src/components/Remotes.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write `src/components/Remotes.astro`**

```astro
---
const remotes = [
  {
    title: 'S3-compatible',
    body: 'AWS S3, MinIO, rustfs, or any S3-compatible endpoint. Uses restic copy for fast, verified transfer. Initialize the remote repo once before first sync.',
    tag: 's3:https://s3.amazonaws.com/my-bucket',
    init: 'restic init --repo s3:https://s3.amazonaws.com/my-bucket',
  },
  {
    title: 'Backblaze B2',
    body: 'Cost-effective cold storage via the b2 CLI. Uses b2 sync with automatic replacement of stale files. No remote restic repo initialization needed.',
    tag: 'b2:my-bucket:restic/main',
    init: null,
  },
]
---

<section class="remotes" id="remotes">
  <div class="inner">
    <p class="label">Remote Backends</p>
    <h2>Your data.<br />Your clouds.</h2>

    <div class="grid">
      {remotes.map((r) => (
        <div class="card">
          <h3>{r.title}</h3>
          <p>{r.body}</p>
          <div class="tag">{r.tag}</div>
          {r.init && (
            <div class="init-block">
              <span class="init-label">Initialize once</span>
              <code>{r.init}</code>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .remotes {
    background: var(--bg);
    padding: 80px 48px;
    transition: background 0.2s;
  }

  .inner {
    max-width: 900px;
    margin: 0 auto;
  }

  .label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 12px;
  }

  h2 {
    font-size: clamp(28px, 4vw, 38px);
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--text);
    margin-bottom: 40px;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 28px;
    transition: background 0.2s;
  }

  .card h3 {
    font-size: 17px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 10px;
  }

  .card > p {
    font-size: 14px;
    color: var(--muted);
    line-height: 1.65;
    margin-bottom: 16px;
  }

  .tag {
    display: inline-block;
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 5px;
    padding: 3px 10px;
    font-family: ui-monospace, monospace;
    font-size: 12px;
    color: var(--accent);
  }

  .init-block {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .init-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--muted);
  }

  .init-block code {
    background: var(--code-bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 7px 12px;
    font-size: 12px;
    color: var(--code-text);
    display: block;
    font-family: ui-monospace, monospace;
    overflow-x: auto;
    white-space: nowrap;
  }

  @media (max-width: 640px) {
    .remotes { padding: 64px 20px; }
    .grid { grid-template-columns: 1fr; }
  }
</style>
```

- [ ] **Step 2: Add to `src/pages/index.astro`**

Import: `import Remotes from '../components/Remotes.astro'`

After `<Config />`, add: `<Remotes />`

- [ ] **Step 3: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Remotes.astro src/pages/index.astro
git commit -m "feat: add remote backends section"
```

---

## Task 10: QuickStart component

**Files:**
- Create: `src/components/QuickStart.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write `src/components/QuickStart.astro`**

```astro
---
const steps = [
  {
    title: 'Initialize vivo',
    desc: 'Checks prerequisites and scaffolds your config and secrets files.',
    cmd: 'vivo init',
  },
  {
    title: 'Edit your config',
    desc: 'Set your repo path, directories to back up, and remote destinations.',
    cmd: 'vivo config edit',
  },
  {
    title: 'Add your secrets',
    desc: 'Set your restic password and remote credentials, encrypted with SOPS + age.',
    cmd: 'vivo secrets edit',
  },
  {
    title: 'Run a backup',
    desc: 'Dry-run first to verify your setup, then run the real backup.',
    cmd: 'vivo --dry-run\nvivo',
  },
]
---

<section class="quickstart" id="quick-start">
  <div class="inner">
    <p class="label">Quick Start</p>
    <h2>Up and running<br />in four commands.</h2>

    <div class="steps">
      {steps.map((s, i) => (
        <div class="step">
          <div class="num" aria-hidden="true">{i + 1}</div>
          <div class="content">
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <pre class="cmd"><span class="prompt">$</span> {s.cmd}</pre>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .quickstart {
    background: var(--bg2);
    padding: 80px 48px;
    transition: background 0.2s;
  }

  .inner {
    max-width: 700px;
    margin: 0 auto;
  }

  .label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 12px;
  }

  h2 {
    font-size: clamp(28px, 4vw, 38px);
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: var(--text);
    margin-bottom: 40px;
  }

  .steps {
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .step {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }

  .num {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--accent);
    color: #0f172a;
    font-weight: 700;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .content h3 {
    font-size: 16px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 4px;
  }

  .content p {
    font-size: 14px;
    color: var(--muted);
    margin-bottom: 10px;
  }

  .cmd {
    background: var(--code-bg);
    border: 1px solid var(--border);
    border-radius: 7px;
    padding: 10px 14px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 13px;
    color: var(--code-text);
    margin: 0;
    white-space: pre;
    line-height: 1.7;
  }

  .prompt { color: var(--accent); }

  @media (max-width: 640px) {
    .quickstart { padding: 64px 20px; }
  }
</style>
```

- [ ] **Step 2: Add to `src/pages/index.astro`**

Import: `import QuickStart from '../components/QuickStart.astro'`

After `<Remotes />`, add: `<QuickStart />`

- [ ] **Step 3: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/QuickStart.astro src/pages/index.astro
git commit -m "feat: add quick start section"
```

---

## Task 11: Install component

**Files:**
- Create: `src/components/Install.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write `src/components/Install.astro`**

```astro
---
const methods = [
  {
    title: 'One-line install',
    desc: 'Linux and macOS. Downloads the latest binary from GitHub Releases and verifies the SHA256 checksum.',
    code: 'curl -sSf https://raw.githubusercontent.com/dantuck/vivo/main/install.sh | sh',
  },
  {
    title: 'From Cargo',
    desc: 'Requires Rust installed. Builds from source and installs to your Cargo bin directory.',
    code: 'cargo install vivo',
  },
  {
    title: 'Build from source',
    desc: 'Clone from Codeberg or GitHub and build manually.',
    code: 'git clone https://codeberg.org/tuck/vivo\ncd vivo\ncargo build --release\ncp target/release/vivo /usr/local/bin/',
  },
]
---

<section class="install" id="install">
  <div class="inner">
    <p class="label">Install</p>
    <h2>Get vivo.</h2>

    <div class="grid">
      {methods.map((m) => (
        <div class="card">
          <h3>{m.title}</h3>
          <p>{m.desc}</p>
          <pre class="code"><span class="prompt">$</span> {m.code}</pre>
        </div>
      ))}
    </div>

    <div class="self-update">
      <p>
        Already installed? Run <code>vivo update</code> to upgrade to the latest release,
        or <code>vivo update --dry-run</code> to preview without applying.
      </p>
    </div>
  </div>
</section>

<style>
  .install {
    background: var(--bg);
    padding: 80px 48px;
    transition: background 0.2s;
  }

  .inner {
    max-width: 960px;
    margin: 0 auto;
  }

  .label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 12px;
  }

  h2 {
    font-size: clamp(28px, 4vw, 38px);
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--text);
    margin-bottom: 36px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 32px;
  }

  .card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px;
    transition: background 0.2s;
  }

  .card h3 {
    font-size: 15px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 8px;
  }

  .card > p {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .code {
    background: var(--code-bg);
    border: 1px solid var(--border);
    border-radius: 7px;
    padding: 10px 12px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 12px;
    color: var(--code-text);
    margin: 0;
    white-space: pre;
    overflow-x: auto;
    line-height: 1.7;
  }

  .prompt { color: var(--accent); }

  .self-update {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 16px 20px;
  }

  .self-update p {
    font-size: 14px;
    color: var(--muted);
  }

  .self-update code {
    background: var(--bg3);
    border-radius: 4px;
    padding: 1px 6px;
    font-family: ui-monospace, monospace;
    font-size: 13px;
    color: var(--accent);
  }

  @media (max-width: 768px) {
    .install { padding: 64px 20px; }
    .grid { grid-template-columns: 1fr; }
  }
</style>
```

- [ ] **Step 2: Add to `src/pages/index.astro`**

Import: `import Install from '../components/Install.astro'`

After `<QuickStart />`, add: `<Install />`

- [ ] **Step 3: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Install.astro src/pages/index.astro
git commit -m "feat: add install section"
```

---

## Task 12: Footer component

**Files:**
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write `src/components/Footer.astro`**

```astro
---
const links = [
  { label: 'GitHub', href: 'https://github.com/dantuck/vivo' },
  { label: 'Codeberg', href: 'https://codeberg.org/tuck/vivo' },
  { label: 'crates.io', href: 'https://crates.io/crates/vivo' },
  { label: 'CHANGELOG', href: 'https://github.com/dantuck/vivo/blob/main/CHANGELOG.md' },
]
---

<footer>
  <div class="logo">
    <div class="logo-mark">V</div>
    <span>vivo</span>
  </div>
  <nav class="links" aria-label="Footer links">
    {links.map((l) => (
      <a href={l.href} target="_blank" rel="noopener">{l.label}</a>
    ))}
  </nav>
  <p class="license">Apache-2.0 OR MIT</p>
</footer>

<style>
  footer {
    border-top: 1px solid var(--border);
    padding: 28px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
    transition: border-color 0.2s;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    font-size: 15px;
    color: var(--text);
  }

  .logo-mark {
    width: 24px;
    height: 24px;
    background: var(--accent);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 800;
    color: #0f172a;
  }

  .links {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  .links a {
    font-size: 13px;
    color: var(--muted);
    transition: color 0.15s;
  }

  .links a:hover { color: var(--text); }

  .license {
    font-size: 12px;
    color: var(--muted);
  }

  @media (max-width: 640px) {
    footer { padding: 24px 20px; flex-direction: column; align-items: flex-start; gap: 16px; }
  }
</style>
```

- [ ] **Step 2: Add to `src/pages/index.astro`**

Import: `import Footer from '../components/Footer.astro'`

After `</main>`, add `<Footer />` before `</body>`.

- [ ] **Step 3: Verify build succeeds**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.astro src/pages/index.astro
git commit -m "feat: add footer"
```

---

## Task 13: Final index.astro (complete composition)

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write the final `src/pages/index.astro`**

Ensure it matches exactly:

```astro
---
import 'virtual:uno.css'
import '../styles/global.css'
import Nav from '../components/Nav.astro'
import Hero from '../components/Hero.astro'
import HowItWorks from '../components/HowItWorks.astro'
import Features from '../components/Features.astro'
import Config from '../components/Config.astro'
import Remotes from '../components/Remotes.astro'
import QuickStart from '../components/QuickStart.astro'
import Install from '../components/Install.astro'
import Footer from '../components/Footer.astro'
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Vivo — encrypted backups synced everywhere. A restic wrapper with multi-remote support, SOPS/age secrets, and a single command to run it all." />
  <title>Vivo — Encrypted backups. Synced everywhere.</title>
  <script is:inline>
    (function () {
      var theme = localStorage.getItem('theme') || 'system';
      var root = document.documentElement;
      root.classList.remove('dark', 'light');
      if (theme === 'dark') {
        root.classList.add('dark');
      } else if (theme === 'light') {
        root.classList.add('light');
      } else {
        root.classList.add(
          window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        );
      }
    })();
  </script>
</head>
<body>
  <Nav />
  <main>
    <Hero />
    <HowItWorks />
    <Features />
    <Config />
    <Remotes />
    <QuickStart />
    <Install />
  </main>
  <Footer />
</body>
</html>
```

- [ ] **Step 2: Final production build**

```bash
npm run build
```

Expected: `dist/index.html` generated, no errors or warnings.

- [ ] **Step 3: Preview the built site**

```bash
npm run preview
```

Open `http://localhost:4321` and verify:
- Dark theme loads without flash
- Theme switcher toggles correctly between dark/light/system
- All 7 sections render in order
- Nav links scroll to sections
- Copy button in hero works
- Site is readable in light mode

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete vivo marketing site"
```

---

## Self-Review

**Spec coverage:**
- ✅ Astro 6 + UnoCSS + TypeScript
- ✅ Dark/light/system theme switcher with localStorage + prefers-color-scheme
- ✅ Anti-flash inline script in head
- ✅ Sticky nav with anchor links
- ✅ Hero: badge, H1, install command box with copy, CTA buttons
- ✅ How It Works: 4-step flow with connecting line
- ✅ Features: 3-column grid, 6 features, no card borders
- ✅ Config: 2-col prose + syntax-highlighted KDL block with traffic-light header
- ✅ Remotes: S3 + B2 cards with URL format examples
- ✅ Quick Start: numbered steps with commands
- ✅ Install: 3-col cards + self-update note
- ✅ Footer: logo, links, license
- ✅ CSS custom property tokens in global.css
- ✅ No external fonts, no analytics

**Placeholder scan:** No TBDs or TODOs in any task.

**Type consistency:** `Theme` type defined in `theme.ts` (Task 3), imported and used in `Nav.astro` (Task 4) as `'dark' | 'light' | 'system'` matching the export.
