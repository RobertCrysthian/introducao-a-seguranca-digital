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
  /** Como chamar os itens nas mensagens ("1 atitude está…", "2 endereços estão…") */
  itemNoun: { singular: string; plural: string }
  /** Exibe os itens em fonte monoespaçada (útil para endereços, onde 0 e O se confundem) */
  monospace?: boolean
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
      itemNoun: { singular: 'atitude', plural: 'atitudes' },
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
    {
      id: '02-2',
      type: 'multiple-choice',
      prompt:
        'Você clicou para baixar um boleto e o arquivo se chama “boleto_2026.pdf.exe”. O que fazer?',
      options: [
        {
          id: 'a',
          text: 'Abrir, porque é um PDF',
          feedback: 'O “.pdf” no meio do nome é só disfarce. O arquivo termina em “.exe”, então não é um PDF.',
        },
        { id: 'b', text: 'Não abrir e apagar o arquivo, porque é um programa disfarçado' },
        {
          id: 'c',
          text: 'Abrir e, se não funcionar, apagar',
          feedback: 'Ao abrir, o programa já é executado. O vírus pode se instalar mesmo que pareça que “não funcionou”.',
        },
        {
          id: 'd',
          text: 'Enviar para um amigo testar',
          feedback: 'Isso só passa o risco adiante: o computador do seu amigo pode ser infectado no seu lugar.',
        },
      ],
      correctOptionId: 'b',
      feedback:
        'O que vale é a última extensão. Um arquivo “.exe” é um programa e pode instalar vírus no computador.',
    },
  ],
  '03': [
    {
      id: '03-1',
      type: 'drag-and-drop',
      prompt: 'Arraste cada endereço para “Parece oficial” ou “Suspeito”.',
      categories: [
        { id: 'official', label: 'Parece oficial' },
        { id: 'suspicious', label: 'Suspeito' },
      ],
      items: [
        { id: 'gov', text: 'www.gov.br', categoryId: 'official' },
        { id: 'amaz0n', text: 'www.amaz0n.com.br', categoryId: 'suspicious' },
        { id: 'bb', text: 'www.bb.com.br', categoryId: 'official' },
        { id: 'bb-fake', text: 'www.bb-atualizacao-cadastral.com', categoryId: 'suspicious' },
        { id: 'ml', text: 'www.mercadolivre.com.br', categoryId: 'official' },
        { id: 'ml-fake', text: 'www.mercadolivre-ofertas.shop', categoryId: 'suspicious' },
      ],
      itemNoun: { singular: 'endereço', plural: 'endereços' },
      monospace: true,
      feedback:
        'Os sites falsos imitam o nome real: trocam letras por números, colocam palavras como “atualização” ou “ofertas” e usam terminações estranhas como .shop ou .net.',
    },
    {
      id: '03-2',
      type: 'drag-and-drop',
      prompt:
        'Maria quer comprar uma airfryer e entrou em um site que encontrou na internet. Arraste cada situação para o lugar certo.',
      categories: [
        { id: 'red-flag', label: '🚩 Sinal de site falso' },
        { id: 'normal', label: '✅ Normal, não indica golpe' },
      ],
      items: [
        {
          id: 'address',
          text: 'O endereço é magazineluiza-ofertas.shop em vez de magazineluiza.com.br',
          categoryId: 'red-flag',
        },
        { id: 'ads', text: 'A tela está cheia de anúncios piscando: “Clique aqui! Você ganhou!”', categoryId: 'red-flag' },
        {
          id: 'price',
          text: 'O preço está muito mais barato que nas outras lojas, com o aviso “Só hoje! Faltam 5 minutos!”',
          categoryId: 'red-flag',
        },
        { id: 'slow', text: 'A página demorou alguns segundos para abrir', categoryId: 'normal' },
        { id: 'ranking', text: 'O site não apareceu em primeiro lugar na pesquisa do Google', categoryId: 'normal' },
      ],
      itemNoun: { singular: 'situação', plural: 'situações' },
      feedback:
        'Prestar atenção no endereço, no excesso de anúncios e em preços bons demais com pressa ajuda a evitar a maioria dos golpes. Uma página lenta ou fora do topo da pesquisa não diz nada sobre ser falsa.',
    },
  ],
}

export function getQuestions(missionId: string) {
  return questionsByMission[missionId] ?? []
}
