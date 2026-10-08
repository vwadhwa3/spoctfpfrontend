/** Builds a CSV from `headers` + `rows` (arrays of cell values) and downloads it. */
export function downloadCsv(filename, headers, rows) {
  const lines = [headers, ...rows].map((row) =>
    row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','),
  )
  const blob = new Blob([lines.join('\n')], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = Object.assign(document.createElement('a'), { href: url, download: filename })
  link.click()
  URL.revokeObjectURL(url)
}
