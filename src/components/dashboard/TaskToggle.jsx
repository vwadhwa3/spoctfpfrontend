const OPTIONS = [
  { id: 'all', label: 'All tasks' },
  { id: 'assigned', label: 'Assigned tasks' },
]

/** Two-way switch above the board: every case, or only the ones with an assigned CSR. */
function TaskToggle({ value, onChange }) {
  return (
    <div className="flex h-10 rounded-full border border-line bg-white p-0.5" role="group" aria-label="Task view">
      {OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(option.id)}
          aria-pressed={value === option.id}
          className={`rounded-full px-5 text-[15px] transition-colors ${
            value === option.id ? 'bg-primary font-medium text-white' : 'text-ink hover:text-primary'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default TaskToggle
