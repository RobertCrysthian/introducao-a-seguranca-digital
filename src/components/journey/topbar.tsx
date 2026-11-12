import { MapIcon, Menu } from 'lucide-react'
import { Fragment } from 'react'
import { Link } from 'react-router'
import { Tag } from '@/components/common/tag'
import { Button } from '@/components/ui/button'

export type Crumb = {
  label: string
  to?: string
}

type TopbarProps = {
  crumbs: Crumb[]
  onOpenMenu?: () => void
}

export function Topbar({ crumbs, onOpenMenu }: TopbarProps) {
  return (
    <header className="flex h-[76px] items-center gap-3 border-b px-4 sm:px-10">
      <Button
        variant="ghost"
        size="icon"
        className="-ml-2 lg:hidden"
        onClick={onOpenMenu}
        aria-label="Abrir menu"
      >
        <Menu />
      </Button>

      <nav aria-label="Trilha de navegação" className="flex min-w-0 items-center gap-2 text-[13px]">
        <MapIcon className="hidden size-4 shrink-0 text-text-faint sm:block" aria-hidden />
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1
          return (
            <Fragment key={crumb.label}>
              {index > 0 && <span className="text-text-faint">/</span>}
              {crumb.to && !last ? (
                <Link to={crumb.to} className="truncate text-muted-foreground hover:text-foreground">
                  {crumb.label}
                </Link>
              ) : (
                <span className={last ? 'truncate text-foreground' : 'truncate text-muted-foreground'}>
                  {crumb.label}
                </span>
              )}
            </Fragment>
          )
        })}
      </nav>

      <Tag className="ml-auto hidden tracking-wide uppercase sm:inline-flex">
        Modo aprendiz • Sem pressa
      </Tag>
    </header>
  )
}
