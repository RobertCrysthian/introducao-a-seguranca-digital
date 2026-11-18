import { useState } from 'react'
import { Check, GripVertical, RotateCcw, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { DragAndDropItem, DragAndDropQuestion as Question } from '@/data/questions'
import { cn } from '@/lib/utils'
import { QuestionFeedback } from './question-feedback'
import { QuestionHeader } from './question-header'

type DragAndDropQuestionProps = {
  question: Question
  /** Número exibido no rótulo ("Questão 2") */
  number: number
  /** Chamado quando a pessoa acerta a questão */
  onCorrect?: () => void
}

/** Onde cada item está: id da categoria, ou ausente quando ainda está no banco. */
type Placement = Record<string, string | undefined>

const POOL = 'pool'

function shuffle<T>(list: T[]) {
  const copy = [...list]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/**
 * Questão de arrastar e soltar: a pessoa distribui os itens entre as categorias
 * e confere. Funciona com mouse (arrastar) e com toque/teclado (selecionar o
 * item e depois a categoria).
 */
export function DragAndDropQuestion({ question, number, onCorrect }: DragAndDropQuestionProps) {
  const [items] = useState(() => shuffle(question.items))
  const [placement, setPlacement] = useState<Placement>({})
  const [selectedId, setSelectedId] = useState<string>()
  const [overZone, setOverZone] = useState<string>()
  const [checked, setChecked] = useState(false)

  const headingId = `question-${question.id}`
  const pool = items.filter((item) => !placement[item.id])
  const allPlaced = pool.length === 0
  const wrongItems = items.filter((item) => placement[item.id] && placement[item.id] !== item.categoryId)
  const solved = checked && wrongItems.length === 0

  function place(itemId: string, zone: string) {
    if (solved) return
    setPlacement((current) => ({ ...current, [itemId]: zone === POOL ? undefined : zone }))
    setSelectedId(undefined)
    setChecked(false)
  }

  function toggleSelect(itemId: string) {
    if (solved) return
    setSelectedId((current) => (current === itemId ? undefined : itemId))
  }

  function check() {
    setChecked(true)
    setSelectedId(undefined)
    if (wrongItems.length === 0) onCorrect?.()
  }

  function retry() {
    // Devolve ao banco só o que estava errado; o que já está certo fica.
    setPlacement((current) => {
      const next = { ...current }
      for (const item of wrongItems) delete next[item.id]
      return next
    })
    setChecked(false)
  }

  /** Props de uma área que recebe itens (banco ou categoria). */
  function dropZone(zone: string) {
    return {
      onDragOver: (event: React.DragEvent) => {
        if (solved) return
        event.preventDefault()
        setOverZone(zone)
      },
      onDragLeave: (event: React.DragEvent) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOverZone(undefined)
      },
      onDrop: (event: React.DragEvent) => {
        event.preventDefault()
        setOverZone(undefined)
        const itemId = event.dataTransfer.getData('text/plain')
        if (itemId) place(itemId, zone)
      },
    }
  }

  function renderItem(item: DragAndDropItem) {
    const status = !checked || !placement[item.id] ? undefined : placement[item.id] === item.categoryId ? 'right' : 'wrong'
    return (
      <li key={item.id}>
        <ItemCard
          item={item}
          status={status}
          selected={selectedId === item.id}
          locked={solved}
          onSelect={() => toggleSelect(item.id)}
        />
      </li>
    )
  }

  return (
    <section className="space-y-5" aria-labelledby={headingId}>
      <QuestionHeader id={headingId} number={number} kind="Arrastar e soltar" prompt={question.prompt} />

      {!solved && (
        <div
          {...dropZone(POOL)}
          className={cn(
            'rounded-sm border border-dashed p-4 transition-colors',
            overZone === POOL ? 'border-brand bg-surface-raised' : 'border-border',
          )}
        >
          {pool.length > 0 ? (
            <ul className="flex flex-wrap gap-2" role="list" aria-label="Atitudes para classificar">
              {pool.map(renderItem)}
            </ul>
          ) : (
            <p className="py-2 text-center text-sm text-text-subtle">
              Todas as atitudes foram classificadas. Arraste uma para cá se quiser devolvê-la.
            </p>
          )}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {question.categories.map((category) => {
          const placed = items.filter((item) => placement[item.id] === category.id)
          const canReceive = Boolean(selectedId) && placement[selectedId!] !== category.id
          return (
            <div
              key={category.id}
              {...dropZone(category.id)}
              className={cn(
                'flex min-h-48 flex-col gap-3 rounded-sm border bg-surface p-4 transition-colors',
                overZone === category.id ? 'border-brand bg-surface-raised' : 'border-border',
                canReceive && 'border-brand/60',
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-foreground">{category.label}</h3>
                <span className="text-xs tabular-nums text-text-subtle">{placed.length}</span>
              </div>

              {placed.length > 0 && (
                <ul className="flex flex-col gap-2" role="list" aria-label={category.label}>
                  {placed.map(renderItem)}
                </ul>
              )}

              {canReceive ? (
                <button
                  type="button"
                  onClick={() => place(selectedId!, category.id)}
                  className="mt-auto rounded-sm border border-dashed border-brand px-3 py-2.5 text-sm text-brand transition-colors outline-none hover:bg-brand/10 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Colocar aqui
                </button>
              ) : (
                placed.length === 0 && (
                  <p className="m-auto text-center text-xs text-text-faint">Solte as atitudes aqui</p>
                )
              )}
            </div>
          )
        })}
      </div>

      {!solved && (
        <div className="flex flex-wrap items-center gap-3">
          {checked ? (
            <Button variant="outline" onClick={retry} className="h-10 px-4">
              <RotateCcw data-icon="inline-start" />
              Tentar novamente
            </Button>
          ) : (
            <Button onClick={check} disabled={!allPlaced} className="h-10 px-4">
              Verificar resposta
            </Button>
          )}
          {!allPlaced && !checked && (
            <span className="text-sm text-text-subtle">
              Arraste ou toque em uma atitude e depois na categoria.
            </span>
          )}
        </div>
      )}

      <div aria-live="polite">
        {checked &&
          (solved ? (
            <QuestionFeedback tone="success" title="Resposta correta!">
              {question.feedback}
            </QuestionFeedback>
          ) : (
            <QuestionFeedback
              tone="error"
              title={
                wrongItems.length === 1
                  ? '1 atitude está na categoria errada.'
                  : `${wrongItems.length} atitudes estão na categoria errada.`
              }
            >
              As marcadas em vermelho estão no lugar errado: use “Tentar novamente” para devolvê-las e
              reorganizar. {question.feedback}
            </QuestionFeedback>
          ))}
      </div>
    </section>
  )
}

type ItemCardProps = {
  item: DragAndDropItem
  status?: 'right' | 'wrong'
  selected: boolean
  locked: boolean
  onSelect: () => void
}

function ItemCard({ item, status, selected, locked, onSelect }: ItemCardProps) {
  const [dragging, setDragging] = useState(false)
  const StatusIcon = status === 'right' ? Check : status === 'wrong' ? X : GripVertical

  return (
    <button
      type="button"
      draggable={!locked}
      onDragStart={(event) => {
        event.dataTransfer.setData('text/plain', item.id)
        event.dataTransfer.effectAllowed = 'move'
        setDragging(true)
      }}
      onDragEnd={() => setDragging(false)}
      onClick={onSelect}
      disabled={locked}
      aria-pressed={selected}
      className={cn(
        'flex w-full items-center gap-3 rounded-sm border bg-surface-raised px-3 py-2.5 text-left text-sm text-foreground transition-colors outline-none',
        'focus-visible:ring-2 focus-visible:ring-ring',
        !locked && 'cursor-grab hover:border-text-faint active:cursor-grabbing',
        locked && 'cursor-default',
        !status && 'border-border',
        selected && 'border-brand ring-1 ring-brand',
        status === 'right' && 'border-success bg-success/10',
        status === 'wrong' && 'border-destructive bg-destructive/10',
        dragging && 'opacity-40',
      )}
    >
      <StatusIcon
        className={cn(
          'size-4 shrink-0',
          !status && 'text-text-faint',
          status === 'right' && 'text-success',
          status === 'wrong' && 'text-destructive',
        )}
        aria-hidden
      />
      <span>{item.text}</span>
      {status && <span className="sr-only">{status === 'right' ? '(correto)' : '(incorreto)'}</span>}
    </button>
  )
}
