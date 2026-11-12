import { Check, ChevronRight, Lock } from 'lucide-react'
import { NavLink } from 'react-router'
import { missionPath } from '@/data/missions'
import type { JourneyMission } from '@/features/progress/use-journey'
import { cn } from '@/lib/utils'
import { navStatusLabel } from './mission-status'

type MissionNavItemProps = {
  mission: JourneyMission
  onNavigate?: () => void
}

export function MissionNavItem({ mission, onNavigate }: MissionNavItemProps) {
  const { status } = mission
  const locked = status === 'locked'

  const content = (
    <>
      <span
        className={cn(
          'w-5 shrink-0 text-sm font-bold tabular-nums',
          status === 'available' ? 'text-brand' : 'text-text-soft',
        )}
      >
        {mission.number}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] leading-snug text-text-soft">{mission.title}</span>
        <span
          className={cn(
            'block text-[11px] leading-snug',
            status === 'available' && 'text-brand',
            status === 'completed' && 'text-success',
            locked && 'text-text-subtle',
          )}
        >
          {navStatusLabel(mission)}
        </span>
      </span>
      {status === 'available' && <ChevronRight className="size-4 shrink-0 text-brand" aria-hidden />}
      {status === 'completed' && <Check className="size-4 shrink-0 text-success" aria-hidden />}
      {locked && <Lock className="size-4 shrink-0 text-text-subtle" aria-hidden />}
    </>
  )

  const base = 'flex min-h-12 items-center gap-2.5 rounded-sm py-2 pr-1.5 pl-2 transition-colors'

  if (locked) {
    return (
      <div
        aria-disabled
        title="Conclua a missão anterior para liberar"
        className={cn(base, 'cursor-not-allowed')}
      >
        {content}
      </div>
    )
  }

  return (
    <NavLink
      to={missionPath(mission)}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          base,
          'outline-none focus-visible:ring-2 focus-visible:ring-ring',
          status === 'available' && 'bg-surface hover:bg-surface-raised',
          status === 'completed' && 'bg-surface-raised hover:bg-surface-raised/70',
          isActive && 'ring-1 ring-brand/60',
        )
      }
    >
      {content}
    </NavLink>
  )
}
