import { Link } from 'react-router'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">404 — Página não encontrada</h1>
      <Button asChild variant="outline">
        <Link to="/">Voltar ao mapa inicial</Link>
      </Button>
    </div>
  )
}
