import { ChevronLeft, ChevronRight } from 'lucide-react'

const arrowClass =
  'flex h-12 w-12 items-center justify-center border transition-colors disabled:cursor-not-allowed disabled:border-line disabled:bg-white disabled:text-muted'

/** Prev / current page / next — the active arrow is filled, a disabled one is outlined. */
function Pagination({ page, pageCount, onPageChange }) {
  return (
    <nav className="flex items-center justify-center" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className={`${arrowClass} rounded-l-[2px] border-primary bg-primary text-white enabled:hover:bg-primary-soft`}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
      </button>
      <span
        className="flex h-12 min-w-[72px] items-center justify-center border-y border-line px-4 text-base text-ink"
        aria-current="page"
        title={`Page ${page} of ${pageCount}`}
      >
        {page}
      </span>
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pageCount}
        className={`${arrowClass} rounded-r-[2px] border-primary bg-primary text-white enabled:hover:bg-primary-soft`}
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
      </button>
    </nav>
  )
}

export default Pagination
