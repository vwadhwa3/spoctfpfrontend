import { Fragment, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Banknote, UserCog, Users } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar.jsx'
import Topbar from '../components/layout/Topbar.jsx'
import Stepper from '../components/new-case/Stepper.jsx'
import { ReviewCard, ReviewFields } from '../components/new-case/ReviewCard.jsx'
import { OutlineButton, PrimaryButton } from '../components/ui/FormControls.jsx'
import { formatDate, formatDateTime, formatGBP } from '../data/cases.js'

const STEPS = ['Details', 'Payment', 'Review']

function NewCaseReview() {
  const navigate = useNavigate()
  const location = useLocation()
  const { from, draft } = location.state ?? {}

  const [search, setSearch] = useState('')

  // Reached without going through the earlier steps (e.g. direct URL / refresh) — start over.
  if (!draft?.payments) return <Navigate to="/spoc/cases/new" replace state={{ from }} />

  const { lead, applicants, payments } = draft

  // Edits go back to the owning step with everything entered so far
  const editDetails = () => navigate('/spoc/cases/new', { state: { from, draft } })
  const backToPayment = () => navigate('/spoc/cases/new/payment', { state: { from, draft } })

  const handleSubmit = () => {
    const newCase = {
      ...lead,
      id: `c${Date.now()}`,
      name: lead.fullName,
      customerLead: lead.fullName,
      phone: `${lead.phoneCode} ${lead.phone}`,
      applicants: applicants.map(({ document, ...rest }) => ({ ...rest, documentName: document?.name ?? null })),
      payments: payments.map((p) => ({
        amount: Number(p.amount),
        bankAccount: p.bankAccount,
        // datetime-local has no zone; Date parses it as local time, toISOString stores it as UTC
        paidAt: new Date(p.paidAt).toISOString(),
        reference: p.reference,
      })),
      totalPaid: payments.reduce((sum, p) => sum + Number(p.amount), 0),
      stage: 'created',
      state: 'created',
      highPriority: false,
      updatedAt: new Date().toISOString(),
    }
    navigate(from ?? '/spoc/dashboard', { state: { newCase } })
  }

  const backLink = (
    <button
      type="button"
      onClick={backToPayment}
      className="flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
    >
      <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
      Back to payment
    </button>
  )

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <div className="ml-60 flex min-h-screen min-w-0 flex-col">
        <Topbar search={search} onSearchChange={setSearch} userName="SPOC" />

        <main className="flex min-w-0 flex-1 flex-col px-8 pb-12 pt-9">
          {backLink}

          <h2 className="mt-8 text-[32px] font-semibold leading-tight text-primary">Add new case</h2>
          <p className="mt-1.5 text-[15px] text-body">
            Configure a new visa application. Verify details against official visa application documentation.
          </p>

          <div className="mt-6">
            <Stepper steps={STEPS} current={2} />
          </div>

          <div className="mt-8 flex flex-col gap-8">
            <ReviewCard icon={UserCog} title="Customer lead information" onEdit={editDetails} editLabel="Edit customer lead information">
              <ReviewFields
                fields={[
                  ['Full name', lead.fullName],
                  ['WhatsApp number', `${lead.phoneCode} ${lead.phone}`],
                  ['Destination country', lead.country],
                  ['Application city', lead.city],
                  ['Tentative travel date', formatDate(lead.travelDate)],
                  ['Visa category', lead.visa],
                  ['Services packs', lead.servicePack],
                  ['Add-on packs', lead.addOn],
                  ['Assigned CSR', lead.csr],
                  ['Assigned team lead', lead.teamLead],
                ]}
              />
            </ReviewCard>

            <ReviewCard icon={Users} title="Applicant details summary" onEdit={editDetails} editLabel="Edit applicant details">
              <div className="flex flex-col gap-6">
                {applicants.map((applicant, index) => (
                  <Fragment key={applicant.key}>
                    {index > 0 && <hr className="border-line-soft" />}
                    <div>
                      <span className="inline-flex rounded-full bg-priority-bg px-3 py-1 text-xs font-medium text-priority">
                        Applicant {index + 1}
                      </span>
                      <div className="mt-5">
                        <ReviewFields
                          fields={[
                            ['First name', applicant.firstName],
                            ['Surname', applicant.surname],
                            ['Sex', applicant.sex],
                            ['Date of birth', formatDate(applicant.dateOfBirth)],
                            ['Document type', applicant.documentType],
                            ['Document number', applicant.documentNumber],
                            ['Issue date', formatDate(applicant.issueDate)],
                            ['Expiry date', formatDate(applicant.expiryDate)],
                            ['Nationality', applicant.nationality],
                            ['Place of birth', applicant.placeOfBirth],
                            ['Phone number', `${applicant.phoneCode} ${applicant.phone}`],
                            ['Upload travel document', applicant.document?.name],
                          ]}
                        />
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </ReviewCard>

            <ReviewCard icon={Banknote} title="Payment breakdown" onEdit={backToPayment} editLabel="Edit payments">
              <div className="flex flex-col gap-6">
                {payments.map((payment, index) => (
                  <Fragment key={payment.key}>
                    {index > 0 && <hr className="border-line-soft" />}
                    <ReviewFields
                      fields={[
                        ['Payment amount', formatGBP(Number(payment.amount))],
                        ['Bank account', payment.bankAccount],
                        ['Payment date and time', formatDateTime(payment.paidAt)],
                        ['Payment reference', payment.reference],
                      ]}
                    />
                  </Fragment>
                ))}
              </div>
            </ReviewCard>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-8">
            {backLink}

            <div className="flex items-center gap-4">
              <OutlineButton type="button" onClick={() => navigate(from ?? '/spoc/dashboard')} className="h-12 px-6">
                Cancel
              </OutlineButton>
              <PrimaryButton type="button" onClick={handleSubmit} className="h-12 px-6">
                Confirm &amp; submit
              </PrimaryButton>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default NewCaseReview
