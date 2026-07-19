import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  })

  it('deve renderizar o botão de alternar tema', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>,
    )

    const button = screen.getByRole('button', { name: /alternar tema/i })
    expect(button).toBeDefined()
  })

  it('deve alternar a classe dark na tag html ao clicar no botão', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>,
    )

    const button = screen.getByRole('button', { name: /alternar tema/i })

    expect(document.documentElement.classList.contains('dark')).toBe(false)

    fireEvent.click(button)
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    fireEvent.click(button)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('deve salvar a preferência de tema no localStorage ao alternar', () => {
    render(
      <ThemeProvider defaultTheme="light" storageKey="test-theme-key">
        <ThemeToggle />
      </ThemeProvider>,
    )

    const button = screen.getByRole('button', { name: /alternar tema/i })

    fireEvent.click(button)
    expect(localStorage.getItem('test-theme-key')).toBe('dark')

    fireEvent.click(button)
    expect(localStorage.getItem('test-theme-key')).toBe('light')
  })
})
