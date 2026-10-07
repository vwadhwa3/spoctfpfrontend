// Mock data for the frontend only — replace with API calls later.

export const STAGES = [
  { id: 'created', label: 'Application created', tone: 'created' },
  { id: 'review', label: 'Information for review', tone: 'review' },
  { id: 'vac', label: 'VAC account creation', tone: 'vac' },
  { id: 'appointment', label: 'Appointment monitoring', tone: 'appointment' },
  { id: 'submitted', label: 'Documents submitted', tone: 'submitted' },
  { id: 'decision', label: 'Visa decision', tone: 'decision' },
]

export const VISA_CATEGORIES = ['Work', 'Tourist', 'Student']
export const CITIES = ['London', 'Manchester', 'Birmingham', 'Edinburgh']
export const COUNTRIES = ['Germany', 'France', 'Italy', 'Spain', 'Netherlands']
export const CSRS = ['Tanvi Joshi', 'Rohan Mehta', 'Priya Nair']
export const TEAM_LEADS = ['Akanksha Sharma', 'Kunal Verma']

export const INITIAL_CASES = [
  { id: 'c1', name: 'Vivek K Singh', city: 'London', country: 'Germany', visa: 'Student', travelDate: '2026-05-22', csr: 'Tanvi Joshi', teamLead: 'Akanksha Sharma', stage: 'created', highPriority: false },
  { id: 'c2', name: 'Ananya Rao', city: 'Manchester', country: 'France', visa: 'Tourist', travelDate: '2026-06-04', csr: 'Rohan Mehta', teamLead: 'Akanksha Sharma', stage: 'created', highPriority: false },
  { id: 'c3', name: 'Arjun Kapoor', city: 'London', country: 'Italy', visa: 'Work', travelDate: '2026-06-18', csr: 'Tanvi Joshi', teamLead: 'Kunal Verma', stage: 'created', highPriority: false },
  { id: 'c4', name: 'Meera Iyer', city: 'Birmingham', country: 'Germany', visa: 'Student', travelDate: '2026-05-20', csr: 'Priya Nair', teamLead: 'Akanksha Sharma', stage: 'review', highPriority: true },
  { id: 'c5', name: 'Rahul Desai', city: 'London', country: 'Spain', visa: 'Tourist', travelDate: '2026-05-28', csr: 'Tanvi Joshi', teamLead: 'Kunal Verma', stage: 'review', highPriority: true },
  { id: 'c6', name: 'Sneha Patel', city: 'Edinburgh', country: 'Netherlands', visa: 'Work', travelDate: '2026-07-02', csr: 'Rohan Mehta', teamLead: 'Akanksha Sharma', stage: 'review', highPriority: false },
  { id: 'c7', name: 'Karan Malhotra', city: 'London', country: 'Germany', visa: 'Work', travelDate: '2026-06-10', csr: 'Tanvi Joshi', teamLead: 'Akanksha Sharma', stage: 'vac', highPriority: false },
  { id: 'c8', name: 'Ishita Gupta', city: 'Manchester', country: 'France', visa: 'Student', travelDate: '2026-05-25', csr: 'Priya Nair', teamLead: 'Kunal Verma', stage: 'appointment', highPriority: false },
  { id: 'c9', name: 'Dev Chauhan', city: 'London', country: 'Italy', visa: 'Tourist', travelDate: '2026-05-19', csr: 'Tanvi Joshi', teamLead: 'Akanksha Sharma', stage: 'appointment', highPriority: true },
  { id: 'c10', name: 'Nisha Reddy', city: 'Birmingham', country: 'Spain', visa: 'Work', travelDate: '2026-06-30', csr: 'Rohan Mehta', teamLead: 'Kunal Verma', stage: 'submitted', highPriority: false },
  { id: 'c11', name: 'Aditya Joshi', city: 'London', country: 'Germany', visa: 'Student', travelDate: '2026-07-15', csr: 'Priya Nair', teamLead: 'Akanksha Sharma', stage: 'decision', highPriority: false },
]

export const EMPTY_FILTERS = {
  visaCategories: [],
  city: '',
  country: '',
  csr: '',
  teamLead: '',
  travelDate: '',
}

export function formatDate(iso) {
  if (!iso) return ''
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
