// Mock data for the frontend only — replace with API calls later.

export const CUSTOMERS = [
  { id: 'cu1', lead: 'Aarav Sharma', applicants: 3, csr: 'Neha Sharma', teamLead: 'Akanksha Sharma', phone: '+44 6987654334' },
  { id: 'cu2', lead: 'Vivek K Singh', applicants: 3, csr: 'Tanvi Joshi', teamLead: 'Akanksha Sharma', phone: '+44 6987654335' },
  { id: 'cu3', lead: 'Ananya Sharma', applicants: 3, csr: 'Tanvi Joshi', teamLead: 'Kunal Verma', phone: '+44 6987654336' },
  { id: 'cu4', lead: 'Aditya Gupta', applicants: 3, csr: 'Ananya Gupta', teamLead: 'Kunal Verma', phone: '+44 6987654337' },
  { id: 'cu5', lead: 'Sneha Singh', applicants: 3, csr: 'Neha Sharma', teamLead: 'Akanksha Sharma', phone: '+44 6987654338' },
  { id: 'cu6', lead: 'Arjun Mehta', applicants: 3, csr: 'Siddharth Rao', teamLead: 'Kunal Verma', phone: '+44 6987654339' },
  { id: 'cu7', lead: 'Devansh Kapoor', applicants: 3, csr: 'Tanvi Joshi', teamLead: 'Akanksha Sharma', phone: '+44 6987654340' },
  { id: 'cu8', lead: 'Kavya Nair', applicants: 1, csr: 'Siddharth Rao', teamLead: 'Kunal Verma', phone: '+44 6987654341' },
  { id: 'cu9', lead: 'Rohan Verma', applicants: 2, csr: 'Neha Sharma', teamLead: 'Akanksha Sharma', phone: '+44 6987654342' },
]

/** True when a customer matches the search term (customer lead, CSR or team lead). */
export function matchesCustomerSearch(customer, search) {
  const term = search.trim().toLowerCase()
  return !term || [customer.lead, customer.csr, customer.teamLead].some((v) => v.toLowerCase().includes(term))
}

/** wa.me link for a phone number like "+44 6987654334". */
export function whatsappUrl(phone) {
  return `https://wa.me/${phone.replace(/\D/g, '')}`
}
