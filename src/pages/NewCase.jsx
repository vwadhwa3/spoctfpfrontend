import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, UserCog, Users } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar.jsx'
import Topbar from '../components/layout/Topbar.jsx'
import Stepper from '../components/new-case/Stepper.jsx'
import { FormCard, SectionHeading } from '../components/new-case/FormSection.jsx'
import ApplicantCard from '../components/new-case/ApplicantCard.jsx'
import { DateField, OutlineButton, PhoneField, PrimaryButton, SelectField, TextField } from '../components/ui/FormControls.jsx'
import {
  ADDON_PACKS,
  CITIES,
  COUNTRIES,
  CSRS,
  EMPTY_APPLICANT,
  SERVICE_PACKS,
  TEAM_LEADS,
  VISA_CATEGORIES,
} from '../data/cases.js'

const STEPS = ['Details', 'Payment', 'Review']

const BACK_LABELS = {
  '/spoc/cases': 'Back to cases',
  '/spoc/dashboard': 'Back to dashboard',
}

const EMPTY_LEAD = {
  fullName: '',
  phoneCode: '+44',
  phone: '',
  country: '',
  city: '',
  travelDate: '',
  visa: '',
  servicePack: '',
  addOn: '',
  csr: '',
  teamLead: '',
}

const newApplicant = () => ({ ...EMPTY_APPLICANT, key: crypto.randomUUID() })

function NewCase() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = BACK_LABELS[location.state?.from] ? location.state.from : '/spoc/dashboard'

  const [search, setSearch] = useState('')
  const [lead, setLead] = useState(EMPTY_LEAD)
  const [applicants, setApplicants] = useState(() => [newApplicant()])

  const today = new Date().toISOString().slice(0, 10)
  const setLeadField = (key) => (value) => setLead((prev) => ({ ...prev, [key]: value }))

  const updateApplicant = (index, next) =>
    setApplicants((prev) => prev.map((a, i) => (i === index ? next : a)))

  // A case needs at least one applicant — removing the last one clears it instead
  const removeApplicant = (index) =>
    setApplicants((prev) => (prev.length === 1 ? [newApplicant()] : prev.filter((_, i) => i !== index)))

  const handleSubmit = (event) => {
    event.preventDefault()
    // Payment / Review steps aren't built yet — hand the case back to the list it came from.
    const newCase = {
      ...lead,
      id: `c${Date.now()}`,
      name: lead.fullName,
      customerLead: lead.fullName,
      phone: `${lead.phoneCode} ${lead.phone}`,
      applicants: applicants.map(({ document, ...rest }) => ({ ...rest, documentName: document?.name ?? null })),
      stage: 'created',
      state: 'created',
      highPriority: false,
      updatedAt: new Date().toISOString(),
    }
    navigate(from, { state: { newCase } })
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <div className="ml-60 flex min-h-screen min-w-0 flex-col">
        <Topbar search={search} onSearchChange={setSearch} userName="SPOC" />

        <main className="flex min-w-0 flex-1 flex-col px-8 pb-12 pt-9">
          <Link to={from} className="flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            {BACK_LABELS[from]}
          </Link>

          <h2 className="mt-8 text-[32px] font-semibold leading-tight text-primary">Add new case</h2>
          <p className="mt-1.5 text-[15px] text-body">
            Configure a new visa application. Verify details against official visa application documentation.
          </p>

          <div className="mt-6">
            <Stepper steps={STEPS} current={0} />
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col">
            <FormCard header={<SectionHeading icon={UserCog}>Customer lead information</SectionHeading>}>
              <TextField id="lead-name" label="Full name*" required value={lead.fullName} onChange={(e) => setLeadField('fullName')(e.target.value)} />
              <PhoneField
                id="lead-phone"
                label="WhatsApp number*"
                required
                code={lead.phoneCode}
                onCodeChange={setLeadField('phoneCode')}
                number={lead.phone}
                onNumberChange={setLeadField('phone')}
              />
              <SelectField id="lead-country" label="Destination country*" required value={lead.country} onChange={setLeadField('country')} options={COUNTRIES} placeholder="" />

              <SelectField id="lead-city" label="Application city*" required value={lead.city} onChange={setLeadField('city')} options={CITIES} placeholder="" />
              <DateField id="lead-travel" label="Tentative travel date*" required min={today} value={lead.travelDate} onChange={setLeadField('travelDate')} />
              <SelectField id="lead-visa" label="Visa category*" required value={lead.visa} onChange={setLeadField('visa')} options={VISA_CATEGORIES} placeholder="" />

              <SelectField id="lead-pack" label="Services packs*" required value={lead.servicePack} onChange={setLeadField('servicePack')} options={SERVICE_PACKS} placeholder="" />
              <SelectField id="lead-addon" label="Add-on packs" value={lead.addOn} onChange={setLeadField('addOn')} options={ADDON_PACKS} placeholder="" />
              <SelectField id="lead-csr" label="Assigned CSR*" required value={lead.csr} onChange={setLeadField('csr')} options={CSRS} placeholder="" />

              <SelectField id="lead-team-lead" label="Assigned team lead*" required value={lead.teamLead} onChange={setLeadField('teamLead')} options={TEAM_LEADS} placeholder="" />
            </FormCard>

            <div className="mt-10">
              <SectionHeading icon={Users}>Applicant details</SectionHeading>
            </div>

            <div className="mt-5 flex flex-col gap-6">
              {applicants.map((applicant, index) => (
                <ApplicantCard
                  key={applicant.key}
                  applicant={applicant}
                  index={index}
                  total={applicants.length}
                  onChange={(next) => updateApplicant(index, next)}
                  onRemove={() => removeApplicant(index)}
                />
              ))}
            </div>

            <OutlineButton
              type="button"
              onClick={() => setApplicants((prev) => [...prev, newApplicant()])}
              className="mt-8 h-12 w-fit px-5"
            >
              <Plus className="h-5 w-5" strokeWidth={1.5} />
              Add new applicant
            </OutlineButton>

            <div className="mt-8 flex justify-end gap-4 border-t border-line pt-8">
              <OutlineButton type="button" onClick={() => navigate(from)} className="h-12 px-6">
                Cancel
              </OutlineButton>
              <PrimaryButton type="submit" className="h-12 px-6">
                Save &amp; continue
              </PrimaryButton>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

export default NewCase
