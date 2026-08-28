import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Konfigurasi Vite. Kalau backend jalan di port lain, ubah target di bawah.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Semua request ke /api/... dari frontend akan diteruskan ke backend.
      // Ganti target sesuai alamat backend kamu.
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
