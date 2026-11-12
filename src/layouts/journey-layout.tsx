import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Outlet, useMatches, type Params } from 'react-router'
import { AppSidebar } from '@/components/journey/app-sidebar'
import { Topbar, type Crumb } from '@/components/journey/topbar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/** Cada rota declara sua trilha de navegação em `handle.crumbs`. */
export type RouteHandle = {
  crumbs?: (params: Params) => Crumb[]
}

function useCrumbs(): Crumb[] {
  const matches = useMatches()
  for (let i = matches.length - 1; i >= 0; i--) {
    const handle = matches[i].handle as RouteHandle | undefined
    if (handle?.crumbs) return handle.crumbs(matches[i].params)
  }
  return []
}

export function JourneyLayout() {
  const crumbs = useCrumbs()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <div className="min-h-svh bg-background text-foreground lg:grid lg:grid-cols-[280px_1fr]">
      {/* Sidebar fixa (desktop) */}
      <aside className="sticky top-0 hidden h-svh bg-sidebar lg:block">
        <AppSidebar />
      </aside>

      {/* Sidebar em gaveta (mobile) */}
      <div
        className={cn('fixed inset-0 z-40 lg:hidden', !menuOpen && 'pointer-events-none')}
        aria-hidden={!menuOpen}
      >
        <div
          className={cn(
            'absolute inset-0 bg-black/60 transition-opacity',
            menuOpen ? 'opacity-100' : 'opacity-0',
          )}
          onClick={() => setMenuOpen(false)}
        />
        <aside
          className={cn(
            'absolute inset-y-0 left-0 w-[280px] max-w-[85vw] border-r bg-sidebar transition-transform duration-300',
            menuOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3"
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
          >
            <X />
          </Button>
          <AppSidebar onNavigate={() => setMenuOpen(false)} />
        </aside>
      </div>

      <div className="flex min-w-0 flex-col">
        <Topbar crumbs={crumbs} onOpenMenu={() => setMenuOpen(true)} />
        <main className="flex-1 px-4 pt-10 pb-10 sm:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
