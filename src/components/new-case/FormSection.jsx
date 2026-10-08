/** Small uppercase section heading with an icon. */
export function SectionHeading({ icon: Icon, children }) {
  return (
    <h3 className="flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.12em] text-body">
      {Icon && <Icon className="h-[18px] w-[18px] text-muted" strokeWidth={1.75} />}
      {children}
    </h3>
  )
}

/**
 * Bordered card with a tinted header strip; children are laid out on a 3-column grid.
 * When `collapsed`, the body stays mounted (keeps field values) but is hidden.
 */
export function FormCard({ header, children, collapsed = false, bodyId, ...props }) {
  return (
    <section className="rounded-[2px] border border-line" {...props}>
      <header
        className={`flex h-14 items-center justify-between gap-4 bg-neutral-50 px-6 ${collapsed ? '' : 'border-b border-line'}`}
      >
        {header}
      </header>
      <div id={bodyId} className={`${collapsed ? 'hidden' : 'grid'} grid-cols-1 gap-x-10 gap-y-6 p-6 md:grid-cols-3`}>
        {children}
      </div>
    </section>
  )
}
