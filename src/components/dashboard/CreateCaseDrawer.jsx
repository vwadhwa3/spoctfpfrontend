import { useState } from 'react'
import Drawer from '../ui/Drawer.jsx'
import { Checkbox, SelectField, TextField, PrimaryButton, OutlineButton } from '../ui/FormControls.jsx'
import { CITIES, COUNTRIES, CSRS, TEAM_LEADS, VISA_CATEGORIES } from '../../data/cases.js'

const EMPTY_CASE = {
  name: '',
  phone: '',
  city: '',
  country: '',
  visa: '',
  travelDate: '',
  csr: '',
  teamLead: '',
  highPriority: false,
}

function CreateCaseDrawer({ open, onClose, onCreate }) {
  const [form, setForm] = useState(EMPTY_CASE)
  const set = (key) => (value) => setForm((prev) => ({ ...prev, [key]: value }))

  const close = () => {
    setForm(EMPTY_CASE)
    onClose()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onCreate({ ...form, id: `c${Date.now()}`, stage: 'created' })
    close()
  }

  return (
    <Drawer
      open={open}
      onClose={close}
      title="Create new case"
      widthClass="w-full max-w-[420px]"
      footer={
        <div className="flex gap-3 border-t border-line pt-4">
          <PrimaryButton type="submit" form="create-case-form" className="h-12 flex-1">
            Create case
          </PrimaryButton>
          <OutlineButton type="button" onClick={close} className="h-12 flex-1">
            Cancel
          </OutlineButton>
        </div>
      }
    >
      <form id="create-case-form" onSubmit={handleSubmit} className="space-y-5">
        <TextField
          id="c-name"
          label="Applicant name"
          required
          value={form.name}
          onChange={(event) => set('name')(event.target.value)}
          placeholder="e.g. Vivek K Singh"
        />
        <TextField
          id="c-phone"
          label="WhatsApp number"
          type="tel"
          value={form.phone}
          onChange={(event) => set('phone')(event.target.value)}
          placeholder="+44 7700 900000"
        />
        <SelectField id="c-city" label="Application city" required value={form.city} onChange={set('city')} options={CITIES} placeholder="Select city" />
        <SelectField id="c-country" label="Destination country" required value={form.country} onChange={set('country')} options={COUNTRIES} placeholder="Select country" />
        <SelectField id="c-visa" label="Visa category" required value={form.visa} onChange={set('visa')} options={VISA_CATEGORIES} placeholder="Select visa category" />
        <TextField
          id="c-date"
          label="Travel date"
          type="date"
          required
          value={form.travelDate}
          onChange={(event) => set('travelDate')(event.target.value)}
        />
        <SelectField id="c-csr" label="Assigned CSR" required value={form.csr} onChange={set('csr')} options={CSRS} placeholder="Select CSR" />
        <SelectField id="c-lead" label="Assigned team lead" required value={form.teamLead} onChange={set('teamLead')} options={TEAM_LEADS} placeholder="Select team lead" />
        <Checkbox label="Mark as high priority" checked={form.highPriority} onChange={set('highPriority')} />
      </form>
    </Drawer>
  )
}

export default CreateCaseDrawer
