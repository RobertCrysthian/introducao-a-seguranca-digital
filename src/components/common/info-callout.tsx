import { Info, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type InfoCalloutProps = {
  title: string
  children: React.ReactNode
  icon?: LucideIcon
  className?: string
}

export function InfoCallout({ title, children, icon: Icon = Info, className }: InfoCalloutProps) {
  return (
    <aside className={cn('flex gap-4 rounded-sm bg-surface px-5 py-4', className)}>
      <Icon className="mt-0.5 size-4 shrink-0 text-text-faint" aria-hidden />
      <div className="space-y-1 text-sm leading-relaxed text-text-soft">
        <p>{title}</p>
        <p>{children}</p>
      </div>
    </aside>
  )
}
