<div align="center">

# 🛡️ Introdução à segurança digital

**Uma jornada interativa para aprender a se proteger na internet, missão por missão.**

Projeto de extensão do 2º ano de Sistemas de Informação da **UNESPAR**
<br />
Robert, Manolo, Eduardo, João e André

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

</div>

---

## 📖 Sobre o projeto

O site é um **dossiê de segurança digital** em formato de jornada. Cada tópico é uma **missão** com questões práticas sobre situações do dia a dia: senhas, sites falsos, compras online, golpes no WhatsApp e muito mais.

- 🗺️ **Mapa da jornada**: a página inicial mostra todas as missões e o que já foi feito.
- 🔒 **Progressão por etapas**: uma missão só é liberada depois que a anterior é concluída.
- 🧩 **Questões interativas** de três tipos:
  - **Múltipla escolha**
  - **Verdadeiro ou falso**
  - **Arrastar e soltar** (funciona com mouse, toque e teclado)
- 💬 **Feedback imediato**: quem acerta vê a explicação; quem erra vê o porquê do erro e pode tentar de novo.
- 💾 **Sem servidor**: o progresso fica salvo no próprio navegador (`localStorage`).

---

## 🚀 Como rodar

### Pré-requisitos

- [**Node.js**](https://nodejs.org/) **20.19 ou superior** (recomendado: 22 LTS)
- **npm**, que já vem com o Node

Para conferir as versões instaladas:

```bash
node -v
npm -v
```

### Passo a passo

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd vite-shadcn-base

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Pronto! Abra **http://localhost:5173** no navegador. As alterações no código aparecem na tela na hora, sem precisar recarregar.

### Comandos disponíveis

| Comando           | O que faz                                                   |
| ----------------- | ----------------------------------------------------------- |
| `npm run dev`     | Inicia o site em modo de desenvolvimento                    |
| `npm run build`   | Confere os tipos e gera a versão final na pasta `dist/`     |
| `npm run preview` | Abre a versão gerada pelo `build`, para testar antes de publicar |
| `npm run lint`    | Procura problemas no código com o Oxlint                    |

> 💡 **Quer recomeçar a jornada do zero?** Abra as ferramentas do navegador (F12) → **Application** → **Local Storage** e apague a chave `seguranca-digital:progress:v1`.

---

## 🗂️ Estrutura

```
src/
├── data/
│   ├── missions.ts        # Lista de missões (títulos do dossiê)
│   └── questions.ts       # Questões de cada missão
├── components/
│   ├── quiz/              # Componentes das questões (múltipla escolha, V/F, arrastar e soltar)
│   ├── journey/           # Barra lateral, cards do mapa, progresso, topo e rodapé
│   ├── common/            # Peças pequenas reaproveitáveis (rótulos, avisos, barra de progresso)
│   └── ui/                # Componentes base do shadcn/ui
├── features/progress/     # Regras de progressão e gravação no localStorage
├── layouts/               # Estrutura comum às páginas (barra lateral + conteúdo)
├── pages/                 # Páginas: mapa inicial, missão e "não encontrada"
├── routes/                # Rotas do site
└── index.css              # Paleta de cores e tema
```

**Rotas**

- `/`: mapa inicial da jornada
- `/missoes/01`, `/missoes/02`…: página de cada missão (bloqueada até a anterior ser concluída)

---

## ✏️ Como editar o conteúdo

Todo o conteúdo fica em `src/data/`. **Não é preciso mexer em nenhum componente** para trocar textos ou criar questões.

### Renomear uma missão

Em [`src/data/missions.ts`](src/data/missions.ts), troque o texto na lista `titles`. A ordem da lista é a ordem das missões.

### Adicionar uma questão

Em [`src/data/questions.ts`](src/data/questions.ts), as questões ficam agrupadas pelo número da missão (`'01'`, `'02'`…). Basta adicionar um item na lista da missão desejada. O botão **Concluir missão** só é liberado quando todas as questões dela estiverem corretas.

<details>
<summary><b>Múltipla escolha</b></summary>

```ts
{
  id: '06-1',
  type: 'multiple-choice',
  prompt: 'Qual das senhas abaixo é a mais segura?',
  options: [
    { id: 'a', text: '123456', feedback: 'Explicação exibida se a pessoa escolher esta.' },
    { id: 'b', text: 'Cachorro!Azul#Pula47' },
  ],
  correctOptionId: 'b',
  feedback: 'Explicação geral, exibida ao acertar (e também ao errar).',
}
```

</details>

<details>
<summary><b>Verdadeiro ou falso</b></summary>

```ts
{
  id: '06-2',
  type: 'true-false',
  statement: '“O cadeado ao lado do endereço garante que o site é confiável.”',
  answer: false,
  wrongFeedback: 'Explicação exibida ao errar (opcional).',
  feedback: 'Explicação geral, exibida ao acertar (e também ao errar).',
}
```

</details>

<details>
<summary><b>Arrastar e soltar</b></summary>

```ts
{
  id: '06-3',
  type: 'drag-and-drop',
  prompt: 'Arraste cada endereço para “Parece oficial” ou “Suspeito”.',
  categories: [
    { id: 'official', label: 'Parece oficial' },
    { id: 'suspicious', label: 'Suspeito' },
  ],
  items: [
    { id: 'gov', text: 'www.gov.br', categoryId: 'official' },
    { id: 'amaz0n', text: 'www.amaz0n.com.br', categoryId: 'suspicious' },
  ],
  itemNoun: { singular: 'endereço', plural: 'endereços' }, // usado em "2 endereços estão na categoria errada"
  monospace: true, // opcional: fonte monoespaçada, boa para endereços
  feedback: 'Explicação geral, exibida ao acertar (e também ao errar).',
}
```

Os itens aparecem embaralhados para quem responde.

</details>

> ⚠️ O `id` de cada questão precisa ser único. A convenção é `missão-número`, como `'03-2'`.

### Mudar as cores

Todas as cores ficam em variáveis no começo de [`src/index.css`](src/index.css), no bloco `:root`. Ao alterar uma variável `--palette-*`, a cor muda no site inteiro.

---

## 🧰 Tecnologias

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) para o desenvolvimento e o build
- [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) para o visual
- [React Router](https://reactrouter.com/) para as rotas
- [Lucide](https://lucide.dev/) para os ícones
- [Oxlint](https://oxc.rs/) para a análise do código

---

<div align="center">

Feito com 💙 para o Projeto de Extensão 1 • UNESPAR

</div>
