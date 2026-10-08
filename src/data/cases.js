// Mock data for the frontend only — replace with API calls later.

export const STAGES = [
  { id: 'created', label: 'Application created', tone: 'created' },
  { id: 'review', label: 'Information for review', tone: 'review' },
  { id: 'vac', label: 'VAC account creation', tone: 'vac' },
  { id: 'appointment', label: 'Appointment monitoring', tone: 'appointment' },
  { id: 'submitted', label: 'Documents submitted', tone: 'submitted' },
  { id: 'decision', label: 'Visa decision', tone: 'decision' },
]

export const VISA_CATEGORIES = ['Work', 'Tourist', 'Travel']
export const CITIES = ['London', 'Manchester', 'Birmingham', 'Edinburgh']
export const COUNTRIES = ['Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Switzerland', 'Belgium', 'Poland', 'Croatia']
export const CSRS = ['Tanvi Joshi', 'Rohan Mehta', 'Priya Nair', 'Neha Sharma', 'Ananya Gupta', 'Siddharth Rao']
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

// Case states shown in the "Active cases" table
export const CASE_STATES = [
  { id: 'created', label: 'Application created', tone: 'created' },
  { id: 'review', label: 'Information for review', tone: 'review' },
  { id: 'vac', label: 'VAC account creation', tone: 'vac' },
  { id: 'appointment', label: 'Appointment monitoring', tone: 'appointment' },
  { id: 'booked', label: 'Appointment booked', tone: 'booked' },
  { id: 'documents', label: 'Documents in review', tone: 'submitted' },
  { id: 'customerReview', label: 'Customer document review', tone: 'customer' },
]

const minutesAgo = (minutes) => new Date(Date.now() - minutes * 60_000).toISOString()

export const ACTIVE_CASES = [
  { id: 'a1', name: 'Aarav Sharma', customerLead: 'Aarav Sharma', city: 'London', country: 'France', visa: 'Student', travelDate: '2026-11-12', csr: 'Neha Sharma', teamLead: 'Akanksha Sharma', state: 'created', updatedAt: minutesAgo(2) },
  { id: 'a2', name: 'Vivek K Singh', customerLead: 'Vivek K Singh', city: 'Manchester', country: 'Germany', visa: 'Travel', travelDate: '2026-11-12', csr: 'Tanvi Joshi', teamLead: 'Akanksha Sharma', state: 'review', updatedAt: minutesAgo(60) },
  { id: 'a3', name: 'Ananya Sharma', customerLead: 'Ananya Sharma', city: 'London', country: 'Switzerland', visa: 'Travel', travelDate: '2026-11-12', csr: 'Tanvi Joshi', teamLead: 'Kunal Verma', state: 'vac', updatedAt: minutesAgo(120) },
  { id: 'a4', name: 'Aditya Gupta', customerLead: 'Aditya Gupta', city: 'Birmingham', country: 'Switzerland', visa: 'Travel', travelDate: '2026-11-12', csr: 'Ananya Gupta', teamLead: 'Kunal Verma', state: 'appointment', updatedAt: minutesAgo(30) },
  { id: 'a5', name: 'Sneha Singh', customerLead: 'Sneha Singh', city: 'London', country: 'Belgium', visa: 'Student', travelDate: '2026-11-12', csr: 'Neha Sharma', teamLead: 'Akanksha Sharma', state: 'booked', updatedAt: minutesAgo(13) },
  { id: 'a6', name: 'Arjun Mehta', customerLead: 'Arjun Mehta', city: 'Edinburgh', country: 'Poland', visa: 'Travel', travelDate: '2026-11-12', csr: 'Siddharth Rao', teamLead: 'Kunal Verma', state: 'documents', updatedAt: minutesAgo(60) },
  { id: 'a7', name: 'Devansh Kapoor', customerLead: 'Devansh Kapoor', city: 'London', country: 'Croatia', visa: 'Travel', travelDate: '2026-11-12', csr: 'Tanvi Joshi', teamLead: 'Akanksha Sharma', state: 'customerReview', updatedAt: minutesAgo(60) },
  { id: 'a8', name: 'Kavya Nair', customerLead: 'Kavya Nair', city: 'Manchester', country: 'Netherlands', visa: 'Work', travelDate: '2026-11-20', csr: 'Siddharth Rao', teamLead: 'Kunal Verma', state: 'created', updatedAt: minutesAgo(180) },
  { id: 'a9', name: 'Rohan Verma', customerLead: 'Rohan Verma', city: 'London', country: 'Italy', visa: 'Travel', travelDate: '2026-12-02', csr: 'Neha Sharma', teamLead: 'Akanksha Sharma', state: 'review', updatedAt: minutesAgo(240) },
  { id: 'a10', name: 'Ishaan Rao', customerLead: 'Ishaan Rao', city: 'Birmingham', country: 'Spain', visa: 'Student', travelDate: '2026-12-15', csr: 'Ananya Gupta', teamLead: 'Kunal Verma', state: 'documents', updatedAt: minutesAgo(1440) },
]

export const EMPTY_FILTERS = {
  visaCategories: [],
  city: '',
  country: '',
  csr: '',
  teamLead: '',
  travelDate: '',
}

const SINGLE_FILTER_KEYS = ['city', 'country', 'csr', 'teamLead', 'travelDate']

export function countActiveFilters(filters) {
  return filters.visaCategories.length + SINGLE_FILTER_KEYS.filter((key) => filters[key]).length
}

/** True when a case matches the search term (applicant name or visa category). */
export function matchesSearch(item, search) {
  const term = search.trim().toLowerCase()
  return !term || item.name.toLowerCase().includes(term) || item.visa.toLowerCase().includes(term)
}

/** True when a case matches every filter set in the filter drawer. */
export function matchesFilters(item, filters) {
  return (
    (!filters.visaCategories.length || filters.visaCategories.includes(item.visa)) &&
    SINGLE_FILTER_KEYS.every((key) => !filters[key] || item[key] === filters[key])
  )
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

/** "2 mins ago", "1 hour ago", "3 days ago" */
export function formatRelativeTime(iso, now = Date.now()) {
  const minutes = Math.max(0, Math.round((now - new Date(iso).getTime()) / 60_000))
  const plural = (count, unit) => `${count} ${unit}${count === 1 ? '' : 's'} ago`
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return plural(minutes, 'min')
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return plural(hours, 'hour')
  return plural(Math.floor(hours / 24), 'day')
}
