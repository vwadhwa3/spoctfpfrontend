import { useCallback, useMemo, useState } from 'react'
import { Download, Plus, SlidersHorizontal, ChevronDown } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar.jsx'
import Topbar from '../components/layout/Topbar.jsx'
import StageColumn from '../components/dashboard/StageColumn.jsx'
import FilterDrawer from '../components/dashboard/FilterDrawer.jsx'
import CreateCaseDrawer from '../components/dashboard/CreateCaseDrawer.jsx'
import { PrimaryButton } from '../components/ui/FormControls.jsx'
import { STAGES, INITIAL_CASES, EMPTY_FILTERS } from '../data/cases.js'

const SORTERS = {
  travelDate: { label: 'Travel dates', fn: (a, b) => a.travelDate.localeCompare(b.travelDate) },
  name: { label: 'Applicant name', fn: (a, b) => a.name.localeCompare(b.name) },
  priority: { label: 'Priority', fn: (a, b) => Number(b.highPriority) - Number(a.highPriority) },
}

function exportCsv(rows) {
  const headers = ['Name', 'City', 'Country', 'Visa', 'Travel date', 'CSR', 'Team lead', 'Stage', 'High priority']
  const lines = rows.map((r) =>
    [r.name, r.city, r.country, r.visa, r.travelDate, r.csr, r.teamLead, r.stage, r.highPriority ? 'Yes' : 'No']
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(','),
  )
  const blob = new Blob([[headers.join(','), ...lines].join('\n')], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = Object.assign(document.createElement('a'), { href: url, download: 'cases.csv' })
  link.click()
  URL.revokeObjectURL(url)
}

function Dashboard() {
  const [cases, setCases] = useState(INITIAL_CASES)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [sortBy, setSortBy] = useState('travelDate')
  const [filterOpen, setFilterOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)

  const closeFilter = useCallback(() => setFilterOpen(false), [])
  const closeCreate = useCallback(() => setCreateOpen(false), [])

  const activeFilterCount =
    filters.visaCategories.length +
    ['city', 'country', 'csr', 'teamLead', 'travelDate'].filter((key) => filters[key]).length

  const visibleCases = useMemo(() => {
    const term = search.trim().toLowerCase()
    return cases
      .filter((c) => !term || c.name.toLowerCase().includes(term) || c.visa.toLowerCase().includes(term))
      .filter((c) => !filters.visaCategories.length || filters.visaCategories.includes(c.visa))
      .filter((c) => !filters.city || c.city === filters.city)
      .filter((c) => !filters.country || c.country === filters.country)
      .filter((c) => !filters.csr || c.csr === filters.csr)
      .filter((c) => !filters.teamLead || c.teamLead === filters.teamLead)
      .filter((c) => !filters.travelDate || c.travelDate === filters.travelDate)
      .sort(SORTERS[sortBy].fn)
  }, [cases, search, filters, sortBy])

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      <div className="ml-60 flex min-h-screen min-w-0 flex-col">
        <Topbar search={search} onSearchChange={setSearch} userName="SPOC" />

        <main className="flex min-w-0 flex-1 flex-col px-8 pb-12 pt-9">
          {/* Page header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">Operational overview</p>
              <h2 className="mt-1 text-[32px] font-semibold leading-tight text-primary">Dashboard</h2>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => exportCsv(visibleCases)}
                className="flex h-12 w-12 items-center justify-center rounded-[2px] border border-line text-muted transition-colors hover:border-primary hover:text-primary"
                aria-label="Download cases as CSV"
                title="Download cases"
              >
                <Download className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <PrimaryButton type="button" onClick={() => setCreateOpen(true)} className="h-12 px-4">
                <Plus className="h-5 w-5" strokeWidth={1.75} />
                Create new case
              </PrimaryButton>
            </div>
          </div>

          {/* Toolbar */}
          <div className="mt-16 flex items-center justify-between border-b border-line px-[18px] pb-4">
            <button
              type="button"
              onClick={() => setFilterOpen(true)}
              className="flex h-10 items-center gap-2.5 rounded-[2px] border border-ink/70 px-4 text-[15px] text-ink transition-colors hover:border-primary hover:bg-primary/5"
            >
              <SlidersHorizontal className="h-[18px] w-[18px] text-muted" strokeWidth={1.5} />
              Apply filters
              {activeFilterCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <label className="flex items-center gap-2.5 text-[15px] text-muted">
              Sort by:
              <span className="relative">
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="h-10 cursor-pointer appearance-none rounded-[2px] border border-ink/70 bg-white pl-4 pr-11 text-[15px] text-ink outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  {Object.entries(SORTERS).map(([key, { label }]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink" />
              </span>
            </label>
          </div>

          {/* Kanban board */}
          <div className="scrollbar-board mt-8 flex flex-1 gap-[18px] overflow-x-auto pb-10">
            {STAGES.map((stage) => (
              <StageColumn
                key={stage.id}
                stage={stage}
                cases={visibleCases.filter((c) => c.stage === stage.id)}
              />
            ))}
          </div>
        </main>
      </div>

      <FilterDrawer open={filterOpen} onClose={closeFilter} filters={filters} onApply={setFilters} />
      <CreateCaseDrawer
        open={createOpen}
        onClose={closeCreate}
        onCreate={(newCase) => setCases((prev) => [newCase, ...prev])}
      />
    </div>
  )
}

export default Dashboard
