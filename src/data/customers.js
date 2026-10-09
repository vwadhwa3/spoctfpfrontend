// Mock data for the frontend only — replace with API calls later.
import { ACTIVE_CASES, MINIMUM_DEPOSIT } from './cases.js'

const APPLICANT_POOL = [
  { firstName: 'Emma', surname: 'Carter', otherName: '', dateOfBirth: '1996-03-14', placeOfBirth: 'Manchester', countryOfBirth: 'United Kingdom', nationality: 'British', gender: 'Female', maritalStatus: 'Single', documentType: 'Passport', documentNumber: '563829174', issueDate: '2021-06-12', expiryDate: '2031-06-11', issuingCountry: 'United Kingdom' },
  { firstName: 'Rahul', surname: 'Sharma', otherName: '', dateOfBirth: '1990-11-07', placeOfBirth: 'Delhi', countryOfBirth: 'India', nationality: 'Indian', gender: 'Male', maritalStatus: 'Married', documentType: 'Passport', documentNumber: 'M8822890', issueDate: '2023-01-12', expiryDate: '2033-01-11', issuingCountry: 'India' },
  { firstName: 'Priya', surname: 'Sharma', otherName: 'Priya Iyer', dateOfBirth: '1992-04-21', placeOfBirth: 'Chennai', countryOfBirth: 'India', nationality: 'British', gender: 'Female', maritalStatus: 'Married', documentType: 'Passport', documentNumber: '548120937', issueDate: '2022-08-03', expiryDate: '2032-08-02', issuingCountry: 'United Kingdom' },
  { firstName: 'Oliver', surname: 'Bennett', otherName: '', dateOfBirth: '1988-09-30', placeOfBirth: 'Leeds', countryOfBirth: 'United Kingdom', nationality: 'British', gender: 'Male', maritalStatus: 'Single', documentType: 'Passport', documentNumber: '531904826', issueDate: '2020-02-17', expiryDate: '2030-02-16', issuingCountry: 'United Kingdom' },
  { firstName: 'Aisha', surname: 'Khan', otherName: '', dateOfBirth: '2001-12-05', placeOfBirth: 'Birmingham', countryOfBirth: 'United Kingdom', nationality: 'British', gender: 'Female', maritalStatus: 'Single', documentType: 'Emergency travel document', documentNumber: 'ETD449201', issueDate: '2025-10-01', expiryDate: '2026-12-31', issuingCountry: 'United Kingdom' },
  { firstName: 'Arnav', surname: 'Mehta', otherName: '', dateOfBirth: '2014-06-18', placeOfBirth: 'London', countryOfBirth: 'United Kingdom', nationality: 'British', gender: 'Male', maritalStatus: 'Single', documentType: 'Passport', documentNumber: '577310245', issueDate: '2024-03-09', expiryDate: '2029-03-08', issuingCountry: 'United Kingdom' },
]

const applicants = (...indexes) => indexes.map((i, n) => ({ id: `ap${i}-${n}`, ...APPLICANT_POOL[i] }))

const payment = (amount, bankAccount, paidAt, reference) => ({ amount, bankAccount, paidAt, reference })

// `caseId` links a customer to their case in ACTIVE_CASES
export const CUSTOMERS = [
  {
    id: 'cu1', caseId: 'a1', lead: 'Aarav Sharma', csr: 'Neha Sharma', teamLead: 'Akanksha Sharma', phone: '+44 6987654334', servicePack: 'Standard',
    applicants: applicants(1, 2, 5),
    vac: { required: true, username: 'aarav_001', password: '123456ab', status: 'Active' },
    payments: [payment(10_000, 'HSBC •••• 1093', '2026-05-24T14:00', 'VT-AHS-9821'), payment(5_000, 'Barclays •••• 4821', '2026-05-24T14:10', 'VT-AHS-9822')],
  },
  {
    id: 'cu2', caseId: 'a2', lead: 'Vivek K Singh', csr: 'Tanvi Joshi', teamLead: 'Akanksha Sharma', phone: '+44 6987654335', servicePack: 'Standard',
    applicants: applicants(0, 3, 4),
    vac: { required: true, username: 'vivek_009', password: '123456xy', status: 'Active' },
    payments: [payment(500, 'Lloyds •••• 7756', '2026-05-20T10:30', 'VT-VKS-1180')],
  },
  {
    id: 'cu3', caseId: 'a3', lead: 'Ananya Sharma', csr: 'Tanvi Joshi', teamLead: 'Kunal Verma', phone: '+44 6987654336', servicePack: 'Premium',
    applicants: applicants(2, 1, 5),
    vac: { required: true, username: 'ananya_s', password: 'pass7781', status: 'Pending' },
    payments: [payment(12_000, 'NatWest •••• 3310', '2026-05-18T09:15', 'VT-ANS-4410')],
  },
  {
    id: 'cu4', caseId: 'a4', lead: 'Aditya Gupta', csr: 'Ananya Gupta', teamLead: 'Kunal Verma', phone: '+44 6987654337', servicePack: 'Concierge',
    applicants: applicants(3, 0, 4),
    vac: { required: true, username: 'aditya_g4', password: 'ag442019', status: 'Active' },
    payments: [payment(8_000, 'HSBC •••• 1093', '2026-05-12T16:45', 'VT-ADG-2290'), payment(4_000, 'HSBC •••• 1093', '2026-05-19T11:00', 'VT-ADG-2291')],
  },
  {
    id: 'cu5', caseId: 'a5', lead: 'Sneha Singh', csr: 'Neha Sharma', teamLead: 'Akanksha Sharma', phone: '+44 6987654338', servicePack: 'Standard',
    applicants: applicants(4, 2, 0),
    vac: { required: true, username: 'sneha_s5', password: 'ss900311', status: 'Active' },
    payments: [payment(10_000, 'Barclays •••• 4821', '2026-05-02T13:20', 'VT-SNS-7012')],
  },
  {
    id: 'cu6', caseId: 'a6', lead: 'Arjun Mehta', csr: 'Siddharth Rao', teamLead: 'Kunal Verma', phone: '+44 6987654339', servicePack: 'Premium',
    applicants: applicants(5, 3, 1),
    vac: { required: false, username: '', password: '', status: '' },
    payments: [payment(15_000, 'Lloyds •••• 7756', '2026-04-28T15:05', 'VT-ARM-3321')],
  },
  {
    id: 'cu7', caseId: 'a7', lead: 'Devansh Kapoor', csr: 'Tanvi Joshi', teamLead: 'Akanksha Sharma', phone: '+44 6987654340', servicePack: 'Standard',
    applicants: applicants(1, 4, 2),
    vac: { required: true, username: 'devansh_k', password: 'dk551200', status: 'Active' },
    payments: [payment(6_000, 'NatWest •••• 3310', '2026-04-20T12:00', 'VT-DVK-6610'), payment(6_000, 'NatWest •••• 3310', '2026-04-27T12:00', 'VT-DVK-6611')],
  },
  {
    id: 'cu8', caseId: 'a8', lead: 'Kavya Nair', csr: 'Siddharth Rao', teamLead: 'Kunal Verma', phone: '+44 6987654341', servicePack: 'Concierge',
    applicants: applicants(0),
    vac: { required: false, username: '', password: '', status: '' },
    payments: [payment(2_500, 'HSBC •••• 1093', '2026-05-26T17:40', 'VT-KVN-0192')],
  },
  {
    id: 'cu9', caseId: 'a9', lead: 'Rohan Verma', csr: 'Neha Sharma', teamLead: 'Akanksha Sharma', phone: '+44 6987654342', servicePack: 'Standard',
    applicants: applicants(3, 5),
    vac: { required: true, username: 'rohan_v9', password: 'rv118822', status: 'Locked' },
    payments: [payment(10_000, 'Barclays •••• 4821', '2026-05-15T08:50', 'VT-RHV-5530')],
  },
]

/** A customer joined with their case, or null when the id is unknown. */
export function getCustomerProfile(id) {
  const customer = CUSTOMERS.find((c) => c.id === id)
  if (!customer) return null
  const kase = ACTIVE_CASES.find((c) => c.id === customer.caseId)
  const totalPaid = customer.payments.reduce((sum, p) => sum + p.amount, 0)
  return {
    ...kase,
    ...customer,
    totalPaid,
    // Secondary status shown next to the case state
    subStatus: totalPaid < MINIMUM_DEPOSIT ? 'Deposit amount review' : null,
  }
}

/** True when a customer matches the search term (customer lead, CSR or team lead). */
export function matchesCustomerSearch(customer, search) {
  const term = search.trim().toLowerCase()
  return !term || [customer.lead, customer.csr, customer.teamLead].some((v) => v.toLowerCase().includes(term))
}

/** wa.me link for a phone number like "+44 6987654334". */
export function whatsappUrl(phone) {
  return `https://wa.me/${phone.replace(/\D/g, '')}`
}
