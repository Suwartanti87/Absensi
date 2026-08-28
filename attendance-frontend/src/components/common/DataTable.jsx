import EmptyState from './EmptyState.jsx'

/**
 * Tabel generik dipakai di semua halaman admin.
 * columns: [{ key, label, render? }]
 */
export default function DataTable({ columns, rows, actions, emptyTitle = 'Belum ada data' }) {
  if (!rows || rows.length === 0) {
    return <div className="card p-6"><EmptyState title={emptyTitle} /></div>
  }
  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-400">
          <tr>
            {columns.map((c) => <th key={c.key} className="whitespace-nowrap px-5 py-3">{c.label}</th>)}
            {actions && <th className="px-5 py-3 text-right">Aksi</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, i) => (
            <tr key={row.id ?? i} className="hover:bg-slate-50/60">
              {columns.map((c) => (
                <td key={c.key} className="whitespace-nowrap px-5 py-3 text-slate-600">
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
              {actions && <td className="px-5 py-3 text-right">{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
