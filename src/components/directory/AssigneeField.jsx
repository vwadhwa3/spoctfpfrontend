import { useId, useState } from 'react'
import { Pencil } from 'lucide-react'

/** Small uppercase label over a name, with a pencil that swaps the name for a select. */
function AssigneeField({ label, value, options, onChange }) {
  const [editing, setEditing] = useState(false)
  const id = useId()

  return (
    <div>
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
        {label}
      </label>
      {editing ? (
        <select
          id={id}
          autoFocus
          value={value}
          onChange={(event) => {
            onChange(event.target.value)
            setEditing(false)
          }}
          onBlur={() => setEditing(false)}
          className="mt-1 block h-9 rounded-[2px] border border-primary bg-white px-2 text-[15px] text-ink outline-none ring-1 ring-primary"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <div className="mt-1 flex h-9 items-center gap-2 text-[15px] text-ink">
          {value}
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-muted transition-colors hover:text-primary"
            aria-label={`Change ${label}`}
          >
            <Pencil className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      )}
    </div>
  )
}

export default AssigneeField
