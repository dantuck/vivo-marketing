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
