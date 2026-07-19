import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ThemeProvider } from '#/components/common/theme/theme-provider'
import { ThemeToggle } from '#/components/common/theme/theme-toggle'

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

  it('deve alternar entre light, dark e vaporwave na tag html ao clicar no botão', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>,
    )

    const button = screen.getByRole('button', { name: /alternar tema/i })

    expect(document.documentElement.classList.contains('light')).toBe(true)

    // 1st click -> dark
    fireEvent.click(button)
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    // 2nd click -> vaporwave
    fireEvent.click(button)
    expect(document.documentElement.classList.contains('vaporwave')).toBe(true)

    // 3rd click -> back to light
    fireEvent.click(button)
    expect(document.documentElement.classList.contains('light')).toBe(true)
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
    expect(localStorage.getItem('test-theme-key')).toBe('vaporwave')

    fireEvent.click(button)
    expect(localStorage.getItem('test-theme-key')).toBe('light')
  })
})
