import { cn } from '@/lib/utils'

/** Chip informativo discreto ("16 missões • 1 jornada"). */
export function Tag({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-sm bg-surface px-2 py-1.5 text-[11px] leading-none text-text-soft',
        className,
      )}
      {...props}
    />
  )
}
