import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Eye, EyeOff, Flag, MapPin, Phone, Stamp, Tag, User } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar.jsx'
import Topbar from '../components/layout/Topbar.jsx'
import StateBadge from '../components/cases/StateBadge.jsx'
import AssigneeField from '../components/directory/AssigneeField.jsx'
import { DetailCard, DetailFields } from '../components/directory/DetailCard.jsx'
import { Checkbox } from '../components/ui/FormControls.jsx'
import { CSRS, MINIMUM_DEPOSIT, TEAM_LEADS, formatDate, formatDateTime, formatGBP } from '../data/cases.js'
import { getCustomerProfile, whatsappUrl } from '../data/customers.js'

/** Inline "a | b" meta row under the customer name. */
function MetaRow({ items }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-body">
      {items.map(({ icon: Icon, text }, index) => (
        <span key={text} className="flex items-center gap-1.5">
          {index > 0 && <span className="mr-1.5 h-4 w-px bg-line" aria-hidden="true" />}
          <Icon className="h-4 w-4 text-muted" strokeWidth={1.75} />
          {text}
        </span>
      ))}
    </p>
  )
}

function CustomerDetailView({ customerId }) {
  const profile = getCustomerProfile(customerId)

  const [search, setSearch] = useState('')
  const [csr, setCsr] = useState(profile?.csr)
  const [teamLead, setTeamLead] = useState(profile?.teamLead)
  const [vacRequired, setVacRequired] = useState(profile?.vac.required)
  const [showPassword, setShowPassword] = useState(false)
  const [applicantIndex, setApplicantIndex] = useState(0)

  if (!profile) return <Navigate to="/spoc/directory" replace />

  const applicant = profile.applicants[applicantIndex]
  const { vac } = profile

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <div className="ml-60 flex min-h-screen min-w-0 flex-col">
        <Topbar search={search} onSearchChange={setSearch} userName="SPOC" />

        <main className="flex min-w-0 flex-1 flex-col px-8 pb-12 pt-9">
          <Link to="/spoc/directory" className="flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            Back to directory
          </Link>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <StateBadge state={profile.state} />
                {profile.subStatus && (
                  <span className="inline-flex whitespace-nowrap rounded-full bg-neutral-100 px-2.5 py-1 text-[13px] leading-none text-body">
                    {profile.subStatus}
                  </span>
                )}
              </div>

              <h2 className="mt-4 text-[32px] font-semibold leading-tight text-primary">{profile.name}</h2>

              <div className="mt-3 flex flex-col gap-2">
                <MetaRow items={[{ icon: MapPin, text: profile.city }, { icon: Flag, text: profile.country }]} />
                <MetaRow
                  items={[
                    { icon: Stamp, text: `${profile.visa} visa` },
                    { icon: Tag, text: profile.servicePack },
                    { icon: CalendarDays, text: formatDate(profile.travelDate) },
                  ]}
                />
                <p className="flex items-center gap-1.5 text-[15px] text-body">
                  <User className="h-4 w-4 text-muted" strokeWidth={1.75} />
                  {profile.customerLead}
                  <a
                    href={whatsappUrl(profile.phone)}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-whatsapp transition-opacity hover:opacity-80"
                    aria-label={`Message ${profile.customerLead} on WhatsApp (${profile.phone})`}
                  >
                    <Phone className="h-2.5 w-2.5 fill-white text-white" strokeWidth={1.5} />
                  </a>
                </p>
              </div>
            </div>

            <div className="flex gap-10">
              <AssigneeField label="CSR" value={csr} options={CSRS} onChange={setCsr} />
              <AssigneeField label="Lead" value={teamLead} options={TEAM_LEADS} onChange={setTeamLead} />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-6">
            <DetailCard title="VAC account">
              <dl className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <dt className="text-sm text-muted">Account status</dt>
                  <dd className="mt-1.5">
                    <Checkbox label="VAC account required" checked={vacRequired} onChange={setVacRequired} />
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Username</dt>
                  <dd className="mt-1 text-[15px] text-ink">{(vacRequired && vac.username) || '-'}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Password</dt>
                  <dd className="mt-1 flex items-center gap-2 text-[15px] text-ink">
                    {vacRequired && vac.password ? (
                      <>
                        <span className="font-mono">{showPassword ? vac.password : '•'.repeat(vac.password.length)}</span>
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="text-muted transition-colors hover:text-primary"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" strokeWidth={1.75} /> : <Eye className="h-4 w-4" strokeWidth={1.75} />}
                        </button>
                      </>
                    ) : (
                      '-'
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Status</dt>
                  <dd className="mt-1 text-[15px] text-ink">{(vacRequired && vac.status) || '-'}</dd>
                </div>
              </dl>
            </DetailCard>

            {profile.applicants.length > 1 && (
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Applicants">
                {profile.applicants.map((a, index) => (
                  <button
                    key={a.id}
                    type="button"
                    role="tab"
                    aria-selected={index === applicantIndex}
                    onClick={() => setApplicantIndex(index)}
                    className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                      index === applicantIndex
                        ? 'border-primary bg-primary text-white'
                        : 'border-line bg-white text-body hover:border-primary hover:text-primary'
                    }`}
                  >
                    Applicant {index + 1} · {a.firstName} {a.surname}
                  </button>
                ))}
              </div>
            )}

            <DetailCard title="Personal information" collapsible>
              <DetailFields
                fields={[
                  { label: 'Name', value: applicant.firstName },
                  { label: 'Surname', value: applicant.surname },
                  {
                    label: 'Have you ever been known by a different name?',
                    value: applicant.otherName ? `Yes — ${applicant.otherName}` : 'No',
                    span: 2,
                  },
                  { label: 'Date of birth', value: formatDate(applicant.dateOfBirth) },
                  { label: 'Place of birth', value: applicant.placeOfBirth },
                  { label: 'Country of birth', value: applicant.countryOfBirth },
                  { label: 'Current nationality', value: applicant.nationality },
                  { label: 'Gender', value: applicant.gender },
                  { label: 'Marital status', value: applicant.maritalStatus },
                ]}
              />
            </DetailCard>

            <DetailCard title="Travel documents details" collapsible>
              <DetailFields
                fields={[
                  { label: 'Document type', value: applicant.documentType },
                  { label: 'Document number', value: applicant.documentNumber },
                  { label: 'Date of issue', value: formatDate(applicant.issueDate) },
                  { label: 'Valid until', value: formatDate(applicant.expiryDate) },
                  { label: 'Issuing country', value: applicant.issuingCountry },
                ]}
              />
            </DetailCard>

            <DetailCard
              title="Payment breakdown"
              collapsible
              actions={
                <span
                  className={`text-sm font-medium ${profile.totalPaid >= MINIMUM_DEPOSIT ? 'text-stage-submitted' : 'text-stage-created'}`}
                >
                  {formatGBP(profile.totalPaid)} of {formatGBP(MINIMUM_DEPOSIT)} paid
                </span>
              }
            >
              <div className="flex flex-col gap-6">
                {profile.payments.map((p, index) => (
                  <div key={p.reference} className={index > 0 ? 'border-t border-line-soft pt-6' : ''}>
                    <DetailFields
                      fields={[
                        { label: 'Payment amount', value: formatGBP(p.amount) },
                        { label: 'Bank account', value: p.bankAccount },
                        { label: 'Payment date and time', value: formatDateTime(p.paidAt) },
                        { label: 'Payment reference', value: p.reference },
                      ]}
                    />
                  </div>
                ))}
              </div>
            </DetailCard>
          </div>
        </main>
      </div>
    </div>
  )
}

// Keyed by id so edits (CSR, VAC toggle, selected applicant) don't leak between customers
function CustomerDetail() {
  const { customerId } = useParams()
  return <CustomerDetailView key={customerId} customerId={customerId} />
}

export default CustomerDetail
