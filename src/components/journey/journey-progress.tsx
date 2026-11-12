import { ProgressBar } from '@/components/common/progress-bar'

type JourneyProgressProps = {
  completed: number
  total: number
}

export function JourneyProgress({ completed, total }: JourneyProgressProps) {
  return (
    <div className="rounded-sm bg-surface px-3.5 py-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-text-soft">Sua jornada</span>
        <span className="font-semibold text-brand tabular-nums">
          {completed}/{total}
        </span>
      </div>
      <ProgressBar value={completed} max={total} label="Progresso da jornada" className="mt-3" />
    </div>
  )
}
