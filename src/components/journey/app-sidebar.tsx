import { Lock } from 'lucide-react'
import { Eyebrow } from '@/components/common/eyebrow'
import { course } from '@/data/missions'
import { useJourney } from '@/features/progress/use-journey'
import { Brand } from './brand'
import { JourneyProgress } from './journey-progress'
import { MissionNavItem } from './mission-nav-item'

type AppSidebarProps = {
  onNavigate?: () => void
}

export function AppSidebar({ onNavigate }: AppSidebarProps) {
  const journey = useJourney()

  return (
    <div className="flex h-full flex-col gap-7 overflow-y-auto px-5 py-6">
      <Brand />

      <JourneyProgress completed={journey.completedCount} total={journey.total} />

      <nav aria-label="Missões" className="space-y-2">
        <Eyebrow className="tracking-[0.14em]">{course.dossier}</Eyebrow>
        <ul className="space-y-1.5">
          {journey.missions.map((mission) => (
            <li key={mission.id}>
              <MissionNavItem mission={mission} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      </nav>

      {!journey.isFinished && (
        <p className="flex gap-2.5 rounded-sm bg-surface p-3 text-xs leading-relaxed text-text-soft">
          <Lock className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
          Conclua todas as atividades da missão para liberar a próxima.
        </p>
      )}
    </div>
  )
}
