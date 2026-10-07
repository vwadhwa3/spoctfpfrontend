import CaseCard from './CaseCard.jsx'

// Full class names so Tailwind can detect them (tokens live in index.css)
const TONES = {
  created: { header: 'bg-stage-created-bg text-stage-created border-stage-created', badge: 'bg-stage-created-badge' },
  review: { header: 'bg-stage-review-bg text-stage-review border-stage-review', badge: 'bg-stage-review-badge' },
  vac: { header: 'bg-stage-vac-bg text-stage-vac border-stage-vac', badge: 'bg-stage-vac-badge' },
  appointment: { header: 'bg-stage-appointment-bg text-stage-appointment border-stage-appointment', badge: 'bg-stage-appointment-badge' },
  submitted: { header: 'bg-stage-submitted-bg text-stage-submitted border-stage-submitted', badge: 'bg-stage-submitted-badge' },
  decision: { header: 'bg-stage-decision-bg text-stage-decision border-stage-decision', badge: 'bg-stage-decision-badge' },
}

function StageColumn({ stage, cases }) {
  const tone = TONES[stage.tone] ?? TONES.created

  return (
    <section className="flex w-[272px] shrink-0 flex-col">
      <header
        className={`flex h-[38px] items-center justify-between border-b-2 px-2 text-base font-medium ${tone.header}`}
      >
        <span className="truncate">{stage.label}</span>
        <span
          className={`flex h-[22px] min-w-[22px] items-center justify-center rounded-full px-1.5 text-sm ${tone.badge}`}
        >
          {cases.length}
        </span>
      </header>

      <div className="mt-7 flex flex-col gap-6">
        {cases.length === 0 ? (
          <p className="rounded-[3px] border border-dashed border-line px-4 py-8 text-center text-sm text-muted">
            No cases in this stage
          </p>
        ) : (
          cases.map((item) => <CaseCard key={item.id} item={item} />)
        )}
      </div>
    </section>
  )
}

export default StageColumn
