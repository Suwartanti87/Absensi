import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import DataTable from '../../components/common/DataTable.jsx'
import Modal from '../../components/common/Modal.jsx'
import * as scheduleService from '../../services/scheduleService.js'

const DUMMY = [
  { id: 1, name: 'Shift Reguler', startTime: '08:00', endTime: '17:00', lateTolerance: 15 },
  { id: 2, name: 'Shift Pagi', startTime: '06:00', endTime: '14:00', lateTolerance: 10 },
]

export default function ScheduleManagement() {
  const [rows, setRows] = useState(DUMMY)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', startTime: '', endTime: '', lateTolerance: 15 })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    scheduleService.getSchedules().then((data) => data?.length && setRows(data)).catch(() => {})
  }, [])

  async function handleSave() {
    try {
      if (editingId) {
        const updated = await scheduleService.updateSchedule(editingId, form)
        setRows((rs) => rs.map((r) => (r.id === editingId ? updated : r)))
      } else {
        const created = await scheduleService.createSchedule(form)
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
        title="Manajemen Jadwal Kerja"
        subtitle="Kelola shift kerja (tabel: workschedule)"
        action={<button onClick={() => { setForm({ name: '', startTime: '', endTime: '', lateTolerance: 15 }); setEditingId(null); setOpen(true) }} className="btn-primary"><Plus size={16} /> Tambah Jadwal</button>}
      />
      <DataTable
        columns={[
          { key: 'name', label: 'Nama Shift' },
          { key: 'startTime', label: 'Jam Masuk' },
          { key: 'endTime', label: 'Jam Pulang' },
          { key: 'lateTolerance', label: 'Toleransi (menit)' },
        ]}
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
        title={editingId ? 'Edit Jadwal' : 'Tambah Jadwal'}
        footer={<><button onClick={() => setOpen(false)} className="btn-secondary">Batal</button><button onClick={handleSave} className="btn-primary">Simpan</button></>}
      >
        <div className="space-y-3">
          <div><label className="label">Nama Shift</label><input className="input" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="label">Jam Masuk</label><input type="time" className="input" value={form.startTime || ''} onChange={(e) => setForm({ ...form, startTime: e.target.value })} /></div>
            <div><label className="label">Jam Pulang</label><input type="time" className="input" value={form.endTime || ''} onChange={(e) => setForm({ ...form, endTime: e.target.value })} /></div>
          </div>
          <div><label className="label">Toleransi Terlambat (menit)</label><input type="number" className="input" value={form.lateTolerance || 0} onChange={(e) => setForm({ ...form, lateTolerance: Number(e.target.value) })} /></div>
        </div>
      </Modal>
    </div>
  )
}
