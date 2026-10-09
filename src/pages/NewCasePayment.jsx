import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Banknote, Plus } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar.jsx'
import Topbar from '../components/layout/Topbar.jsx'
import Stepper from '../components/new-case/Stepper.jsx'
import { SectionHeading } from '../components/new-case/FormSection.jsx'
import PaymentSummary from '../components/new-case/PaymentSummary.jsx'
import PaymentRow from '../components/new-case/PaymentRow.jsx'
import { OutlineButton, PrimaryButton } from '../components/ui/FormControls.jsx'
import { EMPTY_PAYMENT, MINIMUM_DEPOSIT, formatGBP } from '../data/cases.js'

const STEPS = ['Details', 'Payment', 'Review']

const newPayment = () => ({ ...EMPTY_PAYMENT, key: crypto.randomUUID() })

function NewCasePayment() {
  const navigate = useNavigate()
  const location = useLocation()
  const { from, draft } = location.state ?? {}

  const [search, setSearch] = useState('')
  const [payments, setPayments] = useState(() => (draft?.payments?.length ? draft.payments : [newPayment()]))
  const [error, setError] = useState('')

  // Reached without filling in the details step (e.g. direct URL / refresh) — start there.
  if (!draft) return <Navigate to="/spoc/cases/new" replace state={{ from }} />

  const totalPaid = payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0)

  const updatePayment = (index, next) => {
    setError('')
    setPayments((prev) => prev.map((p, i) => (i === index ? next : p)))
  }

  // At least one payment row is always shown — removing the last one clears it instead
  const removePayment = (index) =>
    setPayments((prev) => (prev.length === 1 ? [newPayment()] : prev.filter((_, i) => i !== index)))

  // Keep everything entered so far when stepping back to the details form
  const backToDetails = () => navigate('/spoc/cases/new', { state: { from, draft: { ...draft, payments } } })

  const handleSubmit = (event) => {
    event.preventDefault()
    if (totalPaid < MINIMUM_DEPOSIT) {
      setError(`Total paid must be at least the minimum deposit of ${formatGBP(MINIMUM_DEPOSIT)}.`)
      return
    }

    navigate('/spoc/cases/new/review', { state: { from, draft: { ...draft, payments } } })
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <div className="ml-60 flex min-h-screen min-w-0 flex-col">
        <Topbar search={search} onSearchChange={setSearch} userName="SPOC" />

        <main className="flex min-w-0 flex-1 flex-col px-8 pb-12 pt-9">
          <button
            type="button"
            onClick={backToDetails}
            className="flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            Back to details
          </button>

          <h2 className="mt-8 text-[32px] font-semibold leading-tight text-primary">Add new case</h2>
          <p className="mt-1.5 text-[15px] text-body">
            Configure a new visa application. Verify details against official visa application documentation.
          </p>

          <div className="mt-6">
            <Stepper steps={STEPS} current={1} />
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col">
            <PaymentSummary minimum={MINIMUM_DEPOSIT} totalPaid={totalPaid} />

            <section className="mt-8 rounded-[2px] border border-line">
              <header className="flex h-14 items-center border-b border-line bg-neutral-50 px-6">
                <SectionHeading icon={Banknote}>Payment breakdown</SectionHeading>
              </header>
              <div className="divide-y divide-line-soft">
                {payments.map((payment, index) => (
                  <div key={payment.key} className="p-6">
                    <PaymentRow
                      payment={payment}
                      index={index}
                      onChange={(next) => updatePayment(index, next)}
                      onRemove={() => removePayment(index)}
                    />
                  </div>
                ))}
              </div>
            </section>

            <OutlineButton
              type="button"
              onClick={() => setPayments((prev) => [...prev, newPayment()])}
              className="mt-8 h-12 w-fit px-5"
            >
              <Plus className="h-5 w-5" strokeWidth={1.5} />
              Add new payment
            </OutlineButton>

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-8">
              <button
                type="button"
                onClick={backToDetails}
                className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
                Back to details
              </button>

              <div className="flex items-center gap-4">
                {error && (
                  <p role="alert" className="text-sm text-alert">
                    {error}
                  </p>
                )}
                <OutlineButton type="button" onClick={() => navigate(from ?? '/spoc/dashboard')} className="h-12 px-6">
                  Cancel
                </OutlineButton>
                <PrimaryButton type="submit" className="h-12 px-6">
                  Save &amp; continue
                </PrimaryButton>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

export default NewCasePayment
