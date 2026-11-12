import { useSyncExternalStore } from 'react'

/**
 * Progresso do usuário persistido no localStorage.
 * Guarda apenas os ids das missões concluídas; todo o resto (missão
 * disponível, bloqueios, contadores) é derivado em `useJourney`.
 */
const STORAGE_KEY = 'seguranca-digital:progress:v1'

type ProgressState = {
  completed: string[]
}

const emptyState: ProgressState = { completed: [] }
const listeners = new Set<() => void>()

let cachedRaw: string | null | undefined
let cachedState: ProgressState = emptyState

function read(): ProgressState {
  let raw: string | null = null
  try {
    raw = localStorage.getItem(STORAGE_KEY)
  } catch {
    return cachedState
  }
  if (raw === cachedRaw) return cachedState

  cachedRaw = raw
  try {
    const parsed = raw ? (JSON.parse(raw) as Partial<ProgressState>) : null
    cachedState = Array.isArray(parsed?.completed)
      ? { completed: parsed.completed.filter((id) => typeof id === 'string') }
      : emptyState
  } catch {
    cachedState = emptyState
  }
  return cachedState
}

function write(state: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Sem storage disponível (modo privado, bloqueio): mantém só em memória.
    cachedRaw = undefined
    cachedState = state
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

export const progressStore = {
  completeMission(id: string) {
    const { completed } = read()
    if (completed.includes(id)) return
    write({ completed: [...completed, id] })
  },
  reset() {
    write(emptyState)
  },
}

export function useProgressState() {
  return useSyncExternalStore(subscribe, read, () => emptyState)
}
