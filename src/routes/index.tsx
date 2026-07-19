import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <div className="flex items-center gap-4">
        <Button>The shadCN button</Button>
        <ThemeToggle />
      </div>
    </main>
  )
}
