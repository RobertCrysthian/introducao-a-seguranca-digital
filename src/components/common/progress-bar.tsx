import { cn } from '@/lib/utils'

type ProgressBarProps = {
  value: number
  max: number
  className?: string
  label?: string
}

export function ProgressBar({ value, max, className, label }: ProgressBarProps) {
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className={cn('h-1 w-full overflow-hidden rounded-full bg-track', className)}
    >
      <div
        className="h-full rounded-full bg-brand transition-[width] duration-500 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
