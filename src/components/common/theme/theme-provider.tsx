import { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light' | 'vaporwave' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeProviderContext = createContext<ThemeProviderState | null>(null)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'todo-app-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof localStorage === 'undefined') {
      return defaultTheme
    }
    return (localStorage.getItem(storageKey) as Theme | null) ?? defaultTheme
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const root = window.document.documentElement
    root.classList.remove('light', 'dark', 'vaporwave')

    if (theme === 'system') {
      const systemTheme =
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(storageKey, newTheme)
      }
      setTheme(newTheme)
    },
    toggleTheme: () => {
      const cycle: Theme[] = ['light', 'dark', 'vaporwave']
      const currentIndex = cycle.indexOf(theme)
      const nextTheme =
        currentIndex === -1 ? 'light' : cycle[(currentIndex + 1) % cycle.length]

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(storageKey, nextTheme)
      }
      setTheme(nextTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
