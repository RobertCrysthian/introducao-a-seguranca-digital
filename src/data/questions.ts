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
  '04': [
    {
      id: '04-1',
      type: 'multiple-choice',
      prompt: 'Numa loja que você não conhece, qual forma de pagamento é a mais arriscada?',
      options: [
        {
          id: 'a',
          text: 'Cartão de crédito virtual',
          feedback:
            'O cartão virtual é uma das opções mais seguras: o número pode ser apagado depois da compra e a cobrança pode ser contestada.',
        },
        { id: 'b', text: 'Pix para uma pessoa física com nome diferente do da loja' },
        {
          id: 'c',
          text: 'Pagamento pelo checkout oficial de uma plataforma conhecida',
          feedback:
            'O checkout oficial de uma plataforma conhecida segura o pagamento e oferece suporte se algo der errado.',
        },
        {
          id: 'd',
          text: 'Cartão de crédito com aviso de compra ativado',
          feedback:
            'Com o aviso ativado, você fica sabendo na hora de qualquer cobrança e pode contestar com o banco.',
        },
      ],
      correctOptionId: 'b',
      feedback:
        'Um Pix cai na hora e é difícil de reverter. Se o nome de quem recebe não bate com o da loja, é um sinal forte de golpe.',
    },
    {
      id: '04-2',
      type: 'true-false',
      statement:
        '“Compras feitas pela internet podem ser canceladas em até 7 dias depois do recebimento, mesmo sem justificativa.”',
      answer: true,
      wrongFeedback: 'A lei garante esse prazo para compras feitas fora da loja física, sem precisar explicar o motivo.',
      feedback:
        'É o direito de arrependimento (art. 49 do Código de Defesa do Consumidor). Faça o pedido pelos canais oficiais da loja e guarde os comprovantes.',
    },
  ],
  '05': [
    {
      id: '05-1',
      type: 'multiple-choice',
      prompt:
        'Chega no WhatsApp, de um número desconhecido: “Oi mãe, troquei de número. Preciso de um Pix urgente, depois te explico.” O que fazer?',
      options: [
        {
          id: 'a',
          text: 'Fazer o Pix, porque é urgente',
          feedback: 'A urgência é justamente a armadilha: ela serve para você agir sem pensar.',
        },
        {
          id: 'b',
          text: 'Perguntar pelo mesmo número se é mesmo seu filho',
          feedback: 'Quem está do outro lado é o próprio golpista, e ele vai responder que sim.',
        },
        { id: 'c', text: 'Ligar para o número antigo e conhecido da pessoa para confirmar' },
        {
          id: 'd',
          text: 'Mandar metade do valor por segurança',
          feedback: 'Qualquer valor enviado vai para o golpista. Mandar metade não diminui o risco, só o prejuízo.',
        },
      ],
      correctOptionId: 'c',
      feedback:
        'O golpista conta com a pressa e com a emoção da vítima. Confirme sempre por outro canal, como uma ligação para o número que você já conhece.',
    },
    {
      id: '05-2',
      type: 'true-false',
      statement:
        '“Um funcionário do banco pode ligar e pedir sua senha ou o código do SMS para cancelar uma compra suspeita.”',
      answer: false,
      wrongFeedback: 'Esse é um dos golpes mais comuns: a “central do banco” é, na verdade, o golpista.',
      feedback:
        'Bancos nunca pedem senha, código ou transferência por telefone. Se receber uma ligação assim, desligue e ligue você mesmo para o número que está atrás do cartão.',
    },
  ],
}

export function getQuestions(missionId: string) {
  return questionsByMission[missionId] ?? []
}
