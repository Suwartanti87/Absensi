import { useState } from 'react'
import { QrCode, KeyRound } from 'lucide-react'

/**
 * UI scan QR untuk absensi. Karena scan kamera butuh library tambahan
 * (mis. html5-qrcode) yang perlu di-install sendiri, komponen ini
 * menyediakan area scan (siap kamu sambungkan ke library kamera) +
 * fallback "Masukkan Kode Manual" yang sudah jalan lewat props onSubmit.
 */
export default function QRScanner({ onSubmit, loading }) {
  const [manualMode, setManualMode] = useState(false)
  const [code, setCode] = useState('')

  function handleManualSubmit(e) {
    e.preventDefault()
    if (code.trim()) onSubmit?.(code.trim())
  }

  return (
    <div className="card p-6">
      <p className="mb-1 text-sm font-semibold text-slate-700">Scan QR Code</p>
      <p className="mb-4 text-xs text-slate-400">Arahkan kamera ke QR Code di perangkat absensi</p>

      {!manualMode ? (
        <>
          <div className="mx-auto flex aspect-square w-56 items-center justify-center rounded-2xl border-2 border-dashed border-brand-300 bg-brand-50/60">
            {/* TODO: ganti div ini dengan komponen kamera dari library QR scanner pilihanmu */}
            <QrCode size={64} className="text-brand-400" />
          </div>
          <button
            onClick={() => onSubmit?.('DEMO-QR-CODE')}
            disabled={loading}
            className="btn-primary mt-4 w-full"
          >
            {loading ? 'Memproses...' : 'Simulasikan Scan (demo)'}
          </button>
          <button
            type="button"
            onClick={() => setManualMode(true)}
            className="btn-secondary mt-2 w-full"
          >
            <KeyRound size={16} /> Masukkan Kode Manual
          </button>
        </>
      ) : (
        <form onSubmit={handleManualSubmit} className="space-y-3">
          <div>
            <label className="label">Kode Absensi</label>
            <input
              className="input"
              placeholder="Masukkan kode dari admin"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              autoFocus
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Memproses...' : 'Kirim'}
          </button>
          <button type="button" onClick={() => setManualMode(false)} className="btn-secondary w-full">
            Kembali ke Scan QR
          </button>
        </form>
      )}
    </div>
  )
}
