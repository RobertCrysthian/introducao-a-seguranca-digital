import type { MultipleChoiceQuestion as MultipleChoice, Question, TrueFalseQuestion } from '@/data/questions'
import { DragAndDropQuestion } from './drag-and-drop-question'
import { MultipleChoiceQuestion } from './multiple-choice-question'

type QuestionRendererProps = {
  question: Question
  number: number
  onCorrect?: () => void
}

/** Verdadeiro ou falso é uma múltipla escolha com duas alternativas fixas. */
function toMultipleChoice(question: TrueFalseQuestion): MultipleChoice {
  const correct = question.answer ? 'true' : 'false'
  return {
    id: question.id,
    type: 'multiple-choice',
    prompt: question.statement,
    options: [
      { id: 'true', text: 'Verdadeiro', feedback: correct === 'true' ? undefined : question.wrongFeedback },
      { id: 'false', text: 'Falso', feedback: correct === 'false' ? undefined : question.wrongFeedback },
    ],
    correctOptionId: correct,
    feedback: question.feedback,
  }
}

/** Escolhe o componente certo para cada tipo de questão. */
export function QuestionRenderer({ question, ...props }: QuestionRendererProps) {
  switch (question.type) {
    case 'multiple-choice':
      return <MultipleChoiceQuestion question={question} {...props} />
    case 'true-false':
      return (
        <MultipleChoiceQuestion
          question={toMultipleChoice(question)}
          kind="Verdadeiro ou falso"
          markers={['V', 'F']}
          {...props}
        />
      )
    case 'drag-and-drop':
      return <DragAndDropQuestion question={question} {...props} />
  }
}
