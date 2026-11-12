import type { JourneyMission } from '@/features/progress/use-journey'

/** Texto curto de status usado na sidebar. */
export function navStatusLabel(mission: JourneyMission) {
  switch (mission.status) {
    case 'completed':
      return 'Concluída'
    case 'available':
      return 'Disponível • sua missão'
    case 'locked':
      return 'Bloqueada'
  }
}

/** Texto de status mais descritivo usado nos cards da trilha. */
export function cardStatusLabel(mission: JourneyMission) {
  switch (mission.status) {
    case 'completed':
      return 'Concluída • revisar'
    case 'available':
      return mission.previous ? 'Disponível • sua missão' : 'Disponível • comece por aqui'
    case 'locked':
      return `Bloqueada • conclua a missão ${mission.previous?.number}`
  }
}
