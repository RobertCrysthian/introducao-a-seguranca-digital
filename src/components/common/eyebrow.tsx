import { cn } from '@/lib/utils'

type EyebrowProps = React.ComponentProps<'p'> & {
  tone?: 'muted' | 'brand'
}

/** Rótulo curto em caixa alta usado acima de títulos e seções. */
export function Eyebrow({ tone = 'muted', className, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        'text-[11px] font-semibold tracking-[0.18em] uppercase',
        tone === 'brand' ? 'text-brand' : 'text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}
