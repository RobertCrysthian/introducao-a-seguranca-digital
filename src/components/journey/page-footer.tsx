import { Shield } from 'lucide-react'
import { course } from '@/data/missions'

export function PageFooter() {
  return (
    <footer className="flex flex-wrap items-center gap-x-6 gap-y-1 rounded-sm bg-footer px-2 py-3 text-[11px] text-text-faint">
      <span className="flex items-center gap-4">
        <Shield className="size-4 shrink-0" aria-hidden />
        {course.credits}
      </span>
      <span className="ml-auto">Segurança Digital</span>
    </footer>
  )
}
