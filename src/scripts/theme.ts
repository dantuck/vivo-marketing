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
