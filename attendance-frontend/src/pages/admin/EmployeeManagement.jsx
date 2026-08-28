import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import DataTable from '../../components/common/DataTable.jsx'
import Modal from '../../components/common/Modal.jsx'
import * as employeeService from '../../services/employeeServise.js'

const DUMMY = [
  { id: 1, employeeCode: 'EMP-0001', name: 'Andi Pratama', position: 'Staff IT', department: 'IT', status: 'Aktif' },
  { id: 2, employeeCode: 'EMP-0002', name: 'Sinta Wulandari', position: 'HR Staff', department: 'HR', status: 'Aktif' },
]

const emptyForm = { name: '', employeeCode: '', position: '', email: '', phone: '' }

export default function EmployeeManagement() {
  const [rows, setRows] = useState(DUMMY)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    employeeService.getEmployees().then((data) => data?.length && setRows(data)).catch(() => {})
  }, [])

  function openCreate() {
    setForm(emptyForm)
    setEditingId(null)
    setOpen(true)
  }

  function openEdit(row) {
    setForm(row)
    setEditingId(row.id)
    setOpen(true)
  }

  async function handleSave() {
    try {
      if (editingId) {
        const updated = await employeeService.updateEmployee(editingId, form)
        setRows((rs) => rs.map((r) => (r.id === editingId ? updated : r)))
      } else {
        const created = await employeeService.createEmployee(form)
        setRows((rs) => [...rs, created])
      }
    } catch {
      // Backend belum tersambung: tetap update tampilan lokal biar bisa dicoba-coba dulu.
      setRows((rs) =>
        editingId ? rs.map((r) => (r.id === editingId ? { ...r, ...form } : r)) : [...rs, { ...form, id: Date.now() }]
      )
    } finally {
      setOpen(false)
    }
  }

  async function handleDelete(row) {
    try {
      await employeeService.deleteEmployee(row.id)
    } catch {
      // ignore kalau backend belum aktif
    } finally {
      setRows((rs) => rs.filter((r) => r.id !== row.id))
    }
  }

  return (
    <div>
      <PageHeader
        title="Manajemen Karyawan"
        subtitle="Kelola data karyawan (tabel: employee)"
        action={<button onClick={openCreate} className="btn-primary"><Plus size={16} /> Tambah Karyawan</button>}
      />

      <DataTable
        columns={[
          { key: 'employeeCode', label: 'Kode' },
          { key: 'name', label: 'Nama' },
          { key: 'position', label: 'Jabatan' },
          { key: 'department', label: 'Departemen' },
          { key: 'status', label: 'Status' },
        ]}
        rows={rows}
        actions={(row) => (
          <div className="flex justify-end gap-2">
            <button onClick={() => openEdit(row)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-600"><Pencil size={16} /></button>
            <button onClick={() => handleDelete(row)} className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"><Trash2 size={16} /></button>
          </div>
        )}
      />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editingId ? 'Edit Karyawan' : 'Tambah Karyawan'}
        footer={<>
          <button onClick={() => setOpen(false)} className="btn-secondary">Batal</button>
          <button onClick={handleSave} className="btn-primary">Simpan</button>
        </>}
      >
        <div className="space-y-3">
          <div><label className="label">Kode Karyawan</label><input className="input" value={form.employeeCode || ''} onChange={(e) => setForm({ ...form, employeeCode: e.target.value })} /></div>
          <div><label className="label">Nama</label><input className="input" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div><label className="label">Jabatan</label><input className="input" value={form.position || ''} onChange={(e) => setForm({ ...form, position: e.target.value })} /></div>
          <div><label className="label">Email</label><input className="input" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
        </div>
      </Modal>
    </div>
  )
}
