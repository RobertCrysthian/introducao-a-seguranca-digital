import { createBrowserRouter } from 'react-router'
import { getMission } from '@/data/missions'
import { JourneyLayout, type RouteHandle } from '@/layouts/journey-layout'
import { HomePage } from '@/pages/home'
import { MissionPage } from '@/pages/mission'
import { NotFoundPage } from '@/pages/not-found'

const journeyCrumb = { label: 'Jornada de aprendizagem', to: '/' }

export const router = createBrowserRouter([
  {
    path: '/',
    element: <JourneyLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        handle: { crumbs: () => [journeyCrumb, { label: 'Mapa inicial' }] } satisfies RouteHandle,
      },
      {
        path: 'missoes/:missionId',
        element: <MissionPage />,
        handle: {
          crumbs: ({ missionId }) => [
            journeyCrumb,
            { label: `Missão ${getMission(missionId)?.number ?? ''}` },
          ],
        } satisfies RouteHandle,
      },
      {
        path: '*',
        element: <NotFoundPage />,
        handle: { crumbs: () => [journeyCrumb, { label: 'Página não encontrada' }] } satisfies RouteHandle,
      },
    ],
  },
])
