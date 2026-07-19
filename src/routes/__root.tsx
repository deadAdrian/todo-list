import {
  HeadContent,
  Link,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { ThemeProvider } from '#/components/common/theme/theme-provider'
import { ThemeToggle } from '#/components/common/theme/theme-toggle'

import appCss from '../styles.css?url'

interface MyRouterContext {
  queryClient: QueryClient
}

function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center p-4">
      <h1 className="text-2xl font-bold">404 - Página Não Encontrada</h1>
      <p className="text-sm opacity-80">
        A página que você procura não existe ou foi movida.
      </p>
      <Link to="/" className="underline">
        Voltar para o início
      </Link>
    </div>
  )
}

function RootError({ error }: { error: Error }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center p-4">
      <h1 className="text-2xl font-bold text-destructive">
        Erro ao carregar dados
      </h1>
      <p className="text-sm opacity-80 max-w-md">{error.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="underline cursor-pointer"
      >
        Tentar novamente
      </button>
    </div>
  )
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  notFoundComponent: NotFound,
  errorComponent: RootError,
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'To-do List App',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body
        className="h-dvh bg-background text-foreground transition-colors duration-200 relative"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <ThemeToggle />
          {children}
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              {
                name: 'Tanstack Query',
                render: <ReactQueryDevtoolsPanel />,
              },
            ]}
          />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
