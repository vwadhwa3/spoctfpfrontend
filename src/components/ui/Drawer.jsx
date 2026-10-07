import { useEffect } from 'react'
import { X } from 'lucide-react'

/**
 * Right-side sliding panel with a blurred backdrop.
 * Stays mounted so the slide-in / slide-out transition can play.
 */
function Drawer({ open, onClose, title, children, footer, widthClass = 'w-full max-w-[362px]' }) {
  // Close on Escape + lock page scroll while open
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => event.key === 'Escape' && onClose()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-white/30 backdrop-blur-[6px] transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`absolute right-0 top-0 flex h-full flex-col bg-white shadow-[-8px_0_24px_rgba(1,30,65,0.08)] transition-transform duration-300 ease-out ${widthClass} ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mx-10 mt-16 flex items-center justify-between border-b border-line pb-3">
          <h2 className="text-xl font-semibold text-primary">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-muted transition-colors hover:bg-neutral-100 hover:text-primary"
            aria-label="Close panel"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="scrollbar-none flex-1 overflow-y-auto px-10 pt-12 pb-6">{children}</div>

        {footer && <div className="px-10 pb-10">{footer}</div>}
      </aside>
    </div>
  )
}

export default Drawer
