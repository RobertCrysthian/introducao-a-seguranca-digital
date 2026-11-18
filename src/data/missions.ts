export type Mission = {
  id: string
  /** Número exibido com dois dígitos ("01", "02"...) */
  number: string
  title: string
}

const titles = [
  'Proteção de conta e senhas fortes',
  'Navegação segura na internet',
  'Atenção para sites falsos',
  'Comprando online com segurança',
  'Identificação de golpes digitais',
  'Sites falsos',
  'Downloads suspeitos',
  'Compras online',
  'Reputação dos vendedores',
  'Pagamentos, devoluções e reembolsos',
  'Bom demais para ser verdade?',
  'Scam: reconheça o golpe',
  'Scams mais comuns',
  'Como evitar scams?',
  'Fui ‘scammado’, e agora?',
  'Evitando na prática!',
]

export const missions: Mission[] = titles.map((title, index) => {
  const number = String(index + 1).padStart(2, '0')
  return { id: number, number, title }
})

export const course = {
  title: 'Introdução à segurança digital',
  dossier: 'Dossiê • Segurança digital',
  credits:
    'Robert, Manolo, Eduardo, João e André • 2º Ano de Sistemas de Informação • UNESPAR / Extensão 1',
}

export function getMission(id: string | undefined) {
  return missions.find((mission) => mission.id === id)
}

export function missionPath(mission: Mission) {
  return `/missoes/${mission.id}`
}
