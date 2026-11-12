import { ArrowRight, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'
import { Eyebrow } from '@/components/common/eyebrow'
import { InfoCallout } from '@/components/common/info-callout'
import { Tag } from '@/components/common/tag'
import { MissionCard } from '@/components/journey/mission-card'
import { PageFooter } from '@/components/journey/page-footer'
import { Button } from '@/components/ui/button'
import { missionPath, missions } from '@/data/missions'
import { useJourney } from '@/features/progress/use-journey'

export function HomePage() {
  const journey = useJourney()
  // Ao terminar a jornada, o CTA leva de volta à primeira missão para revisão.
  const target = journey.current ?? missions[0]
  const ctaLabel = journey.isFinished
    ? 'Revisar missões'
    : journey.completedCount === 0
      ? `Iniciar missão ${target.number}`
      : `Continuar missão ${target.number}`

  return (
    <div className="space-y-12">
      <section>
        <div className="flex items-center justify-between gap-4">
          <Eyebrow>Seu primeiro caso</Eyebrow>
          <Tag>{journey.total} missões • 1 jornada</Tag>
        </div>
        <h1 className="mt-8 text-3xl font-semibold tracking-tight text-foreground sm:text-[40px] sm:leading-tight">
          Toda boa investigação começa com você.
        </h1>
        <p className="mt-10 text-base text-muted-foreground sm:mt-28">
          Aprenda a proteger suas contas, reconhecer armadilhas e agir com calma. Resolva{' '}
          {journey.total} missões de Segurança Digital, uma de cada vez.
        </p>
      </section>

      <section className="flex flex-col gap-6 sm:px-7 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <Eyebrow tone="brand" className="font-bold">
            Academia aberta • Dossiê 001
          </Eyebrow>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-[26px]">
            Seu olhar atento é a melhor ferramenta.
          </h2>
          <p className="mt-3 text-sm text-text-soft">
            Investigue e-mails, mensagens e lojas fictícias em um ambiente de treino. Nenhum dado ou
            senha real será solicitado.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Button asChild className="h-12 rounded-md px-5 text-[15px] font-normal">
              <Link to={missionPath(target)}>
                {ctaLabel}
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <span className="text-sm text-brand">
              {journey.completedCount}/{journey.total} concluídas
            </span>
          </div>
        </div>

        <div className="flex w-full shrink-0 flex-col items-center justify-center gap-2 rounded-sm bg-surface px-5 py-6 text-center md:w-[190px]">
          <ShieldCheck
            className={journey.isFinished ? 'size-11 text-success' : 'size-11 text-brand'}
            strokeWidth={1.5}
            aria-hidden
          />
          <p className="mt-1 text-base font-semibold text-foreground">Guardião digital</p>
          <p className="text-xs leading-relaxed text-text-soft">
            {journey.isFinished ? 'Selo conquistado!' : 'Um selo ao concluir todas as missões.'}
          </p>
        </div>
      </section>

      <InfoCallout title="Uma missão de cada vez">
        Conclua todas as atividades da missão para liberar a próxima. Use dicas, confira a
        explicação e tente novamente quantas vezes precisar. Não há penalização definitiva por
        erro.
      </InfoCallout>

      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-foreground">Sua trilha de investigação</h2>
          <Tag>
            {String(journey.availableCount).padStart(2, '0')} disponível ·{' '}
            {journey.lockedCount} bloqueadas
          </Tag>
        </div>
        <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
          {journey.missions.map((mission) => (
            <li key={mission.id}>
              <MissionCard mission={mission} />
            </li>
          ))}
        </ul>
        <PageFooter />
      </section>
    </div>
  )
}
