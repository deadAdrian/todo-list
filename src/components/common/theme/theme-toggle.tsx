import { useEffect, useState } from 'react'
import { Moon, Palmtree, Sun } from 'lucide-react'
import { useTheme } from '@/components/common/theme/theme-provider'
import { Button } from '@/components/ui/pixelact-ui/button'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="default"
        title="Alternar tema"
        className="!absolute bottom-1 right-1 cursor-pointer"
        style={{
          paddingLeft: '14px',
          paddingBottom: '10px',
        }}
      >
        <Sun className="h-5 w-5" />
        <span className="sr-only">Alternar tema</span>
      </Button>
    )
  }

  return (
    <Button
      variant="default"
      onClick={toggleTheme}
      title={`Alternar tema (Atual: ${theme})`}
      className="!absolute bottom-1 right-1 cursor-pointer z-10"
      style={{
        paddingLeft: '16px',
        paddingBottom: '10px',
      }}
    >
      {theme === 'light' && <Sun className="h-5 w-5" />}
      {theme === 'dark' && <Moon className="h-5 w-5" />}
      {theme === 'vaporwave' && <Palmtree className="h-5 w-5 text-[#ff71ce]" />}
      {theme === 'system' && <Sun className="h-5 w-5" />}
      <span className="sr-only">Alternar tema</span>
    </Button>
  )
}
