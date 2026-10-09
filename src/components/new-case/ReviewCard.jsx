import { Pencil } from 'lucide-react'
import { SectionHeading } from './FormSection.jsx'

/** Read-only summary card with a section heading and an edit shortcut back to the step that owns it. */
export function ReviewCard({ icon, title, onEdit, editLabel, children }) {
  return (
    <section className="rounded-[2px] border border-line">
      <header className="flex h-14 items-center justify-between gap-4 border-b border-line bg-neutral-50 px-6">
        <SectionHeading icon={icon}>{title}</SectionHeading>
        <button
          type="button"
          onClick={onEdit}
          className="flex h-8 w-8 items-center justify-center rounded-[2px] text-muted transition-colors hover:bg-neutral-200/60 hover:text-ink"
          aria-label={editLabel}
        >
          <Pencil className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </button>
      </header>
      <div className="p-6">{children}</div>
    </section>
  )
}

/** 4-column label / value grid. `fields` is a list of [label, value] pairs; empty values show "-". */
export function ReviewFields({ fields }) {
  return (
    <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
      {fields.map(([label, value]) => (
        <div key={label} className="min-w-0">
          <dt className="text-xs font-medium uppercase tracking-[0.08em] text-muted">{label}</dt>
          <dd className="mt-1.5 truncate text-[15px] text-ink" title={value || undefined}>
            {value || '-'}
          </dd>
        </div>
      ))}
    </dl>
  )
}
