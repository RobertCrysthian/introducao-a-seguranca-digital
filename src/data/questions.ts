export type QuestionOption = {
  id: string
  text: string
  /** Explicação exibida quando esta alternativa (errada) é escolhida */
  feedback?: string
}

export type MultipleChoiceQuestion = {
  id: string
  type: 'multiple-choice'
  prompt: string
  options: QuestionOption[]
  correctOptionId: string
  /** Explicação geral, exibida ao acertar (e como complemento ao errar) */
  feedback: string
}

export type DragAndDropCategory = {
  id: string
  label: string
}

export type DragAndDropItem = {
  id: string
  text: string
  /** Categoria correta deste item */
  categoryId: string
}

export type DragAndDropQuestion = {
  id: string
  type: 'drag-and-drop'
  prompt: string
  categories: DragAndDropCategory[]
  items: DragAndDropItem[]
  /** Explicação geral, exibida ao acertar (e como complemento ao errar) */
  feedback: string
}

export type TrueFalseQuestion = {
  id: string
  type: 'true-false'
  /** Afirmação que a pessoa deve julgar */
  statement: string
  answer: boolean
  /** Explicação exibida ao escolher a alternativa errada (antes da explicação geral) */
  wrongFeedback?: string
  /** Explicação geral, exibida ao acertar (e como complemento ao errar) */
  feedback: string
}

export type Question = MultipleChoiceQuestion | DragAndDropQuestion | TrueFalseQuestion

/** Questões de cada missão, indexadas pelo id da missão. */
export const questionsByMission: Record<string, Question[]> = {
  '01': [
    {
      id: '01-1',
      type: 'multiple-choice',
      prompt: 'Qual das senhas abaixo é a mais segura?',
      options: [
        {
          id: 'a',
          text: '123456',
          feedback: 'Sequências numéricas estão entre as senhas mais usadas do mundo e são quebradas em segundos.',
        },
        {
          id: 'b',
          text: 'maria1985',
          feedback: 'Nome e ano de nascimento são informações fáceis de descobrir, inclusive pelas redes sociais.',
        },
        { id: 'c', text: 'Cachorro!Azul#Pula47' },
        {
          id: 'd',
          text: 'senha123',
          feedback: 'A própria palavra "senha" seguida de uma sequência é um dos primeiros palpites de qualquer golpista.',
        },
      ],
      correctOptionId: 'c',
      feedback:
        'Uma senha forte é longa e mistura letras maiúsculas e minúsculas, números e símbolos. Nomes, datas de nascimento e sequências são os primeiros palpites dos golpistas.',
    },
    {
      id: '01-2',
      type: 'drag-and-drop',
      prompt:
        'Arraste cada atitude para a categoria certa: “Protege minha conta” ou “Coloca minha conta em risco”.',
      categories: [
        { id: 'protects', label: 'Protege minha conta' },
        { id: 'risk', label: 'Coloca minha conta em risco' },
      ],
      items: [
        { id: '2fa', text: 'Ativar a verificação em duas etapas', categoryId: 'protects' },
        { id: 'same-password', text: 'Usar a mesma senha em todos os sites', categoryId: 'risk' },
        { id: 'login-alerts', text: 'Conferir alertas de “novo login” na conta', categoryId: 'protects' },
        { id: 'sms-code', text: 'Passar o código do SMS para quem ligou pedindo', categoryId: 'risk' },
        { id: 'password-manager', text: 'Usar um gerenciador de senhas', categoryId: 'protects' },
        { id: 'sticky-note', text: 'Deixar a senha anotada num papel colado no monitor', categoryId: 'risk' },
      ],
      feedback:
        'Se você repete a senha, um vazamento em um único site abre todas as outras contas. Já a verificação em duas etapas impede o acesso mesmo quando alguém descobre a senha.',
    },
  ],
  '02': [
    {
      id: '02-1',
      type: 'true-false',
      statement: '“O cadeado ao lado do endereço do site garante que ele é confiável.”',
      answer: false,
      wrongFeedback: 'O cadeado não diz nada sobre quem está por trás do site.',
      feedback:
        'O cadeado só mostra que a conexão é criptografada. Sites falsos também podem ter cadeado, então confira sempre o endereço.',
    },
  ],
}

export function getQuestions(missionId: string) {
  return questionsByMission[missionId] ?? []
}
