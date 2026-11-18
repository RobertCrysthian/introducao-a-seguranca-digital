import { CircleCheck, CircleX } from 'lucide-react'
import { cn } from '@/lib/utils'

type QuestionFeedbackProps = {
  tone: 'success' | 'error'
  title: string
  children: React.ReactNode
}

/** Caixa de retorno exibida após responder uma questão. */
export function QuestionFeedback({ tone, title, children }: QuestionFeedbackProps) {
  const Icon = tone === 'success' ? CircleCheck : CircleX
  return (
    <div
      className={cn(
        'flex gap-4 rounded-sm border px-5 py-4',
        tone === 'success' ? 'border-success/40 bg-success/10' : 'border-destructive/40 bg-destructive/10',
      )}
    >
      <Icon
        className={cn('mt-0.5 size-4 shrink-0', tone === 'success' ? 'text-success' : 'text-destructive')}
        aria-hidden
      />
      <div className="space-y-1 text-sm leading-relaxed">
        <p className={cn('font-medium', tone === 'success' ? 'text-success' : 'text-destructive')}>{title}</p>
        <p className="text-text-soft">{children}</p>
      </div>
    </div>
  )
}
