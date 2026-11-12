import { ArrowUpRight, Check, Lock } from 'lucide-react'
import { Link } from 'react-router'
import { missionPath } from '@/data/missions'
import type { JourneyMission } from '@/features/progress/use-journey'
import { cn } from '@/lib/utils'
import { cardStatusLabel } from './mission-status'

type MissionCardProps = {
  mission: JourneyMission
}

const statusIcon = {
  available: ArrowUpRight,
  completed: Check,
  locked: Lock,
}

export function MissionCard({ mission }: MissionCardProps) {
  const { status } = mission
  const locked = status === 'locked'
  const Icon = statusIcon[status]

  const content = (
    <>
      <div className="flex items-start justify-between">
        <span
          className={cn(
            'text-2xl font-bold tabular-nums',
            status === 'available' && 'text-brand-dim',
            status === 'completed' && 'text-success/70',
            locked && 'text-text-faint',
          )}
        >
          {mission.number}
        </span>
        <Icon
          className={cn(
            'size-4',
            status === 'available' && 'text-text-subtle transition-colors group-hover:text-brand',
            status === 'completed' && 'text-success',
            locked && 'text-text-faint',
          )}
          aria-hidden
        />
      </div>
      <h3 className="mt-3 text-base leading-snug text-foreground">{mission.title}</h3>
      <p
        className={cn(
          'mt-3 text-xs',
          status === 'available' && 'text-brand',
          status === 'completed' && 'text-success',
          locked && 'text-text-subtle',
        )}
      >
        {cardStatusLabel(mission)}
      </p>
    </>
  )

  const base = 'group block min-h-[180px] rounded-sm border bg-surface p-[18px] transition-colors'

  if (locked) {
    return (
      <div aria-disabled className={cn(base, 'cursor-not-allowed border-border')}>
        {content}
      </div>
    )
  }

  return (
    <Link
      to={missionPath(mission)}
      className={cn(
        base,
        'outline-none hover:bg-surface-raised focus-visible:ring-2 focus-visible:ring-ring',
        status === 'available' ? 'border-2 border-brand p-[17px]' : 'border-border',
      )}
    >
      {content}
    </Link>
  )
}
