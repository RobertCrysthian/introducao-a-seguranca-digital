import { Eyebrow } from '@/components/common/eyebrow'

type QuestionHeaderProps = {
  id: string
  number: number
  kind: string
  prompt: string
}

/** Rótulo "Questão N • Tipo" + enunciado. O `id` é usado no aria-labelledby da seção. */
export function QuestionHeader({ id, number, kind, prompt }: QuestionHeaderProps) {
  return (
    <div className="space-y-2">
      <Eyebrow tone="brand">
        Questão {number} • {kind}
      </Eyebrow>
      <h2 id={id} className="text-xl font-semibold text-foreground">
        {prompt}
      </h2>
    </div>
  )
}
