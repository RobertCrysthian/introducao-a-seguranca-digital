import { useMemo } from 'react'
import { missions, type Mission } from '@/data/missions'
import { progressStore, useProgressState } from './progress-store'

export type MissionStatus = 'completed' | 'available' | 'locked'

export type JourneyMission = Mission & {
  status: MissionStatus
  /** Missão anterior — a que precisa ser concluída para liberar esta */
  previous?: Mission
}

/**
 * Regra de progressão: uma missão só fica disponível quando a anterior
 * foi concluída. A primeira está sempre liberada.
 */
export function useJourney() {
  const { completed } = useProgressState()

  return useMemo(() => {
    const done = new Set(completed)

    const items: JourneyMission[] = missions.map((mission, index) => {
      const previous = missions[index - 1]
      const status: MissionStatus = done.has(mission.id)
        ? 'completed'
        : !previous || done.has(previous.id)
          ? 'available'
          : 'locked'
      return { ...mission, status, previous }
    })

    const completedCount = items.filter((m) => m.status === 'completed').length
    const availableCount = items.filter((m) => m.status === 'available').length
    const lockedCount = items.filter((m) => m.status === 'locked').length

    return {
      missions: items,
      total: items.length,
      completedCount,
      availableCount,
      lockedCount,
      /** Próxima missão a fazer (ou undefined se a jornada terminou) */
      current: items.find((m) => m.status === 'available'),
      isFinished: completedCount === items.length,
      isUnlocked: (id: string) =>
        items.some((m) => m.id === id && m.status !== 'locked'),
      completeMission: progressStore.completeMission,
      reset: progressStore.reset,
    }
  }, [completed])
}
