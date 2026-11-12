import { ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'
import { course } from '@/data/missions'

export function Brand() {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-sm bg-surface">
        <ShieldCheck className="size-5 text-brand" aria-hidden />
      </span>
      <span className="max-w-[10rem] text-lg leading-tight text-foreground">{course.title}</span>
    </Link>
  )
}
