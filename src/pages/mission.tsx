import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Link, Navigate, useNavigate, useParams } from 'react-router'
import { Eyebrow } from '@/components/common/eyebrow'
import { InfoCallout } from '@/components/common/info-callout'
import { Tag } from '@/components/common/tag'
import { QuestionRenderer } from '@/components/quiz/question-renderer'
import { Button } from '@/components/ui/button'
import { getMission, missionPath, missions } from '@/data/missions'
import { getQuestions } from '@/data/questions'
import { useJourney } from '@/features/progress/use-journey'

/**
 * Página provisória de missão.
 * O conteúdo real de cada missão ainda será desenhado a partir do Figma;
 * por enquanto ela existe para validar o bloqueio de rotas e o progresso.
 */
export function MissionPage() {
  const { missionId } = useParams()
  const navigate = useNavigate()
  const journey = useJourney()
  const mission = getMission(missionId)
  // Ids das questões acertadas (são prefixados pela missão, então não colidem entre missões)
  const [correctIds, setCorrectIds] = useState<Set<string>>(() => new Set())

  if (!mission) return <Navigate to="/" replace />
  // Guarda de rota: missões bloqueadas não podem ser acessadas pela URL.
  if (!journey.isUnlocked(mission.id)) return <Navigate to="/" replace />

  const index = missions.indexOf(mission)
  const next = missions[index + 1]
  const completed = journey.missions[index].status === 'completed'
  const questions = getQuestions(mission.id)
  const allCorrect = questions.every((question) => correctIds.has(question.id))

  function handleComplete() {
    journey.completeMission(mission!.id)
    navigate(next ? missionPath(next) : '/')
  }

  return (
    <div className="max-w-3xl space-y-10">
      <div className="flex items-center justify-between gap-4">
        <Eyebrow>
          Missão {mission.number} de {journey.total}
        </Eyebrow>
        <Tag>Aprenda → investigue → pratique</Tag>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight sm:text-[40px] sm:leading-tight">
        {mission.title}
      </h1>

      {questions.length > 0 ? (
        <div className="space-y-12">
          {questions.map((question, i) => (
            <QuestionRenderer
              key={question.id}
              question={question}
              number={i + 1}
              onCorrect={() => setCorrectIds((ids) => new Set(ids).add(question.id))}
            />
          ))}
        </div>
      ) : (
        <InfoCallout title="Conteúdo em construção">
          As atividades desta missão serão adicionadas em breve. Por enquanto, conclua a missão para
          liberar a próxima e acompanhar seu progresso na barra lateral.
        </InfoCallout>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" asChild className="h-11 px-4">
          <Link to="/">
            <ArrowLeft data-icon="inline-start" />
            Voltar ao mapa
          </Link>
        </Button>
        {completed ? (
          <span className="inline-flex items-center gap-2 text-sm text-success">
            <Check className="size-4" aria-hidden /> Missão concluída
          </span>
        ) : (
          <Button onClick={handleComplete} disabled={!allCorrect} className="h-11 px-4">
            Concluir missão
            <ArrowRight data-icon="inline-end" />
          </Button>
        )}
        {!completed && !allCorrect && (
          <span className="text-sm text-text-subtle">Acerte as questões para concluir a missão.</span>
        )}
      </div>
    </div>
  )
}
