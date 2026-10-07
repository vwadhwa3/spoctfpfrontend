import { ChevronDown, Check } from 'lucide-react'

const fieldBase =
  'h-11 w-full rounded-[2px] border border-line bg-white px-3.5 text-[15px] text-body outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary'

/** Native select styled to match the design (placeholder shown when value is empty). */
export function SelectField({ label, value, onChange, options, placeholder, id, required }) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          value={value}
          required={required}
          onChange={(event) => onChange(event.target.value)}
          className={`${fieldBase} cursor-pointer appearance-none pr-10 ${value ? 'text-body' : 'text-body/90'}`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

export function TextField({ label, id, className = '', ...props }) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <input id={id} className={`${fieldBase} placeholder:text-body/90 ${className}`} {...props} />
    </div>
  )
}

/** Square checkbox with navy fill when checked. */
export function Checkbox({ label, checked, onChange }) {
  return (
    <label className="inline-flex cursor-pointer select-none items-center gap-2 text-[15px] text-body">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />
      <span
        className={`flex h-[22px] w-[22px] items-center justify-center rounded-[3px] border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40 ${
          checked ? 'border-primary bg-primary' : 'border-line bg-white'
        }`}
      >
        {checked && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
      </span>
      {label}
    </label>
  )
}

export function PrimaryButton({ className = '', children, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-[2px] bg-primary px-6 text-[15px] font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function OutlineButton({ className = '', children, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-[2px] border border-primary bg-white px-6 text-[15px] font-medium text-primary transition-colors hover:bg-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
