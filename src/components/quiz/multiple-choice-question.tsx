import { useState } from 'react'
import { Check, X } from 'lucide-react'
import type { MultipleChoiceQuestion as Question } from '@/data/questions'
import { cn } from '@/lib/utils'
import { QuestionFeedback } from './question-feedback'
import { QuestionHeader } from './question-header'

type MultipleChoiceQuestionProps = {
  question: Question
  /** Número exibido no rótulo ("Questão 1") */
  number: number
  /** Chamado quando a pessoa acerta a questão */
  onCorrect?: () => void
  /** Tipo exibido no rótulo ("Questão 1 • Múltipla escolha") */
  kind?: string
  /** Marcadores das alternativas; por padrão, letras (A, B, C...) */
  markers?: string[]
}

const letters = 'ABCDEFGHIJ'.split('')

/**
 * Questão de múltipla escolha. Ao errar, mostra o porquê e permite tentar
 * de novo; ao acertar, trava as alternativas e mostra a explicação.
 */
export function MultipleChoiceQuestion({
  question,
  number,
  onCorrect,
  kind = 'Múltipla escolha',
  markers = letters,
}: MultipleChoiceQuestionProps) {
  const [selectedId, setSelectedId] = useState<string>()
  const selected = question.options.find((option) => option.id === selectedId)
  const answeredCorrectly = selectedId === question.correctOptionId
  const headingId = `question-${question.id}`

  function choose(optionId: string) {
    if (answeredCorrectly) return
    setSelectedId(optionId)
    if (optionId === question.correctOptionId) onCorrect?.()
  }

  return (
    <section className="space-y-5" aria-labelledby={headingId}>
      <QuestionHeader id={headingId} number={number} kind={kind} prompt={question.prompt} />

      <ul className="grid gap-3" role="list">
        {question.options.map((option, index) => {
          const isSelected = option.id === selectedId
          const isCorrect = option.id === question.correctOptionId
          const showRight = isSelected && isCorrect
          const showWrong = isSelected && !isCorrect

          return (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => choose(option.id)}
                disabled={answeredCorrectly && !isSelected}
                aria-pressed={isSelected}
                className={cn(
                  'flex w-full items-center gap-4 rounded-sm border bg-surface px-4 py-3.5 text-left text-sm transition-colors outline-none',
                  'focus-visible:ring-2 focus-visible:ring-ring',
                  !isSelected && 'border-border hover:bg-surface-raised',
                  showRight && 'border-success bg-success/10',
                  showWrong && 'border-destructive bg-destructive/10',
                  answeredCorrectly && !isSelected && 'cursor-default opacity-50 hover:bg-surface',
                )}
              >
                <span
                  className={cn(
                    'flex size-7 shrink-0 items-center justify-center rounded-sm border text-xs font-semibold',
                    'border-border text-text-subtle',
                    showRight && 'border-success bg-success text-primary-foreground',
                    showWrong && 'border-destructive bg-destructive text-primary-foreground',
                  )}
                  aria-hidden
                >
                  {showRight ? <Check className="size-4" /> : showWrong ? <X className="size-4" /> : markers[index]}
                </span>
                <span className="text-foreground">{option.text}</span>
              </button>
            </li>
          )
        })}
      </ul>

      <div aria-live="polite">
        {selected &&
          (answeredCorrectly ? (
            <QuestionFeedback tone="success" title="Resposta correta!">
              {question.feedback}
            </QuestionFeedback>
          ) : (
            <QuestionFeedback tone="error" title="Resposta incorreta. Tente novamente!">
              {selected.feedback && <>{selected.feedback} </>}
              {question.feedback}
            </QuestionFeedback>
          ))}
      </div>
    </section>
  )
}
