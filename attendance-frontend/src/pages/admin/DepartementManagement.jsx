import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import DataTable from '../../components/common/DataTable.jsx'
import Modal from '../../components/common/Modal.jsx'
import * as departmentService from '../../services/departementServise.js'

const DUMMY = [
  { id: 1, name: 'Information Technology', description: 'Divisi pengembangan sistem & infrastruktur' },
  { id: 2, name: 'Human Resources', description: 'Divisi pengelolaan SDM & rekrutmen' },
]

export default function DepartementManagement() {
  const [rows, setRows] = useState(DUMMY)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', description: '' })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    departmentService.getDepartments().then((data) => data?.length && setRows(data)).catch(() => {})
  }, [])

  async function handleSave() {
    try {
      if (editingId) {
        const updated = await departmentService.updateDepartment(editingId, form)
        setRows((rs) => rs.map((r) => (r.id === editingId ? updated : r)))
      } else {
        const created = await departmentService.createDepartment(form)
        setRows((rs) => [...rs, created])
      }
    } catch {
      setRows((rs) => editingId ? rs.map((r) => (r.id === editingId ? { ...r, ...form } : r)) : [...rs, { ...form, id: Date.now() }])
    } finally {
      setOpen(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Manajemen Departemen"
        subtitle="Kelola data departemen (tabel: department)"
        action={<button onClick={() => { setForm({ name: '', description: '' }); setEditingId(null); setOpen(true) }} className="btn-primary"><Plus size={16} /> Tambah Departemen</button>}
      />
      <DataTable
        columns={[{ key: 'name', label: 'Nama Departemen' }, { key: 'description', label: 'Deskripsi' }]}
        rows={rows}
        actions={(row) => (
          <div className="flex justify-end gap-2">
            <button onClick={() => { setForm(row); setEditingId(row.id); setOpen(true) }} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-600"><Pencil size={16} /></button>
            <button onClick={() => setRows((rs) => rs.filter((r) => r.id !== row.id))} className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={16} /></button>
          </div>
        )}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editingId ? 'Edit Departemen' : 'Tambah Departemen'}
        footer={<><button onClick={() => setOpen(false)} className="btn-secondary">Batal</button><button onClick={handleSave} className="btn-primary">Simpan</button></>}
      >
        <div className="space-y-3">
          <div><label className="label">Nama</label><input className="input" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div><label className="label">Deskripsi</label><textarea className="input" rows={3} value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
        </div>
      </Modal>
    </div>
  )
}
