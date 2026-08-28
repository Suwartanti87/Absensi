# Absensi Karyawan — Frontend

Frontend React (Vite + Tailwind) untuk sistem Absensi Karyawan, dibuat mengikuti
flow dan desain yang sudah kamu siapkan, dan menyesuaikan struktur tabel di ERD
kamu (`visitor`, `visitorlog`, `employee`, `department`, `workschedule`,
`attendance`, `attendancerequest`, `user`).

## 1. Cara menjalankan

```bash
npm install
cp .env.example .env    # lalu isi VITE_API_BASE_URL dengan alamat backend kamu
npm run dev
```

Buka `http://localhost:5173`.

> Frontend ini **bisa langsung dibuka dan dilihat tampilannya tanpa backend**.
> Setiap halaman yang butuh data akan mencoba memanggil API dulu; kalau gagal
> (backend belum jalan), halaman otomatis menampilkan data contoh (dummy) supaya
> kamu tetap bisa melihat UI-nya. Begitu backend sudah nyala, data asli akan
> otomatis dipakai.

## 2. Struktur folder

```
src/
├── api/
│   ├── client.js       # 🔌 axios instance — SATU tempat untuk set base URL & token
│   └── endpoints.js    # 🔌 daftar path endpoint, dikelompokkan per tabel ERD
├── services/            # 🔌 satu file per tabel/entity, isinya fungsi pemanggil API
│   ├── authServise.js
│   ├── employeeServise.js
│   ├── departementServise.js
│   ├── scheduleService.js
│   ├── attendanceService.js
│   ├── requestService.js
│   ├── visitorService.js
│   └── visitorLogService.js
├── context/
│   └── AuthContext.jsx  # status login (user, token, role) — dipakai di seluruh app
├── routes/
│   ├── AppRoutes.jsx     # semua route didefinisikan di sini
│   ├── ProtectedRoute.jsx # wajib login
│   └── AdminRoute.jsx     # wajib login + role admin
├── layouts/
│   ├── EmployeeLayout.jsx # sidebar + menu untuk karyawan
│   └── AdminLayout.jsx    # sidebar + menu untuk admin/HR
├── components/common/    # komponen dipakai berulang (Sidebar, Modal, DataTable, dll)
└── pages/
    ├── LandingPage.jsx, LoginPage.jsx
    ├── visitor/           # Form Tamu (publik, tanpa login)
    ├── employee/           # Absensi, Jadwal, Riwayat, Pengajuan, Profil
    └── admin/              # Dashboard, Karyawan, Departemen, Jadwal, dst
```

Struktur ini sengaja dibuat mirip dengan file explorer yang kamu tunjukkan
(frontend2), supaya kalau kamu sudah punya kode di sana, tinggal disamakan /
dipindah isinya.

## 3. Alur halaman (mengikuti flowchart kamu)

```
Landing Page
 ├─ Karyawan → Login → (role: EMPLOYEE / HR_ADMIN)
 │              ├─ EMPLOYEE  → Absen (QR/Manual) → Jadwal Kerja → Riwayat → Pengajuan → Profil
 │              └─ HR_ADMIN  → Admin Panel → Karyawan / Departemen / Jadwal /
 │                              Absensi Karyawan / Pengajuan / User / Tamu
 └─ Tamu → Form Tamu → simpan ke tabel `visitor` + `visitorlog` → halaman sukses
```

## 4. DI SINI kamu menyambungkan backend

Kamu **tidak perlu ubah file di dalam `pages/`**. Cukup 3 langkah:

### Langkah 1 — Alamat backend
Edit `.env`:
```
VITE_API_BASE_URL=http://localhost:8000/api
```

### Langkah 2 — Cocokkan path endpoint
Buka `src/api/endpoints.js`. Di situ semua path endpoint sudah dikelompokkan
per tabel, contoh:
```js
EMPLOYEE: {
  BASE: '/employees',
  BY_ID: (id) => `/employees/${id}`,
},
```
Kalau path di backend kamu beda (misal `/api/v1/karyawan`), tinggal ganti
nilainya di file ini saja — semua service otomatis ikut.

### Langkah 3 — Cocokkan bentuk request/response (kalau perlu)
Buka file service yang sesuai di `src/services/`, misalnya
`src/services/attendanceService.js` untuk fitur absen. Tiap fungsi sudah diberi
komentar field apa yang dikirim/diterima, mengacu ke kolom di ERD. Sesuaikan
nama field kalau backend kamu pakai penamaan berbeda (misal `checkInTime`
bukan `checkIn`).

### Ringkasan pemetaan tabel ERD → service

| Tabel ERD           | Service file                         | Dipakai di halaman                     |
|----------------------|---------------------------------------|-----------------------------------------|
| `user`               | `authServise.js`                     | Login, Manajemen User                   |
| `employee`            | `employeeServise.js`                 | Manajemen Karyawan, Profil/IdCard       |
| `department`          | `departementServise.js`              | Manajemen Departemen                    |
| `workschedule`        | `scheduleService.js`                 | Jadwal Kerja (karyawan & admin)         |
| `attendance`          | `attendanceService.js`               | Absen (QR/Manual), Riwayat, Rekap admin |
| `attendancerequest`   | `requestService.js`                  | Pengajuan Cuti/Izin/Sakit + approval    |
| `visitor` + `visitorlog` | `visitorService.js` / `visitorLogService.js` | Form Tamu, Manajemen Tamu    |

### Autentikasi
`src/api/client.js` otomatis menambahkan header `Authorization: Bearer <token>`
ke setiap request, dan token diambil dari `localStorage` setelah login. Kalau
backend kamu memakai cookie/session, hapus bagian interceptor token di
`client.js` dan tambahkan `withCredentials: true` di axios instance-nya.

### Role
Setelah login, backend diharapkan mengembalikan:
```json
{ "token": "...", "user": { "id": 1, "name": "Andi", "role": "EMPLOYEE", "employeeId": 10 } }
```
`role` menentukan redirect ke `/employee` atau `/admin` (lihat `LoginPage.jsx`
dan `AdminRoute.jsx`). Sesuaikan nilai role (`EMPLOYEE` / `HR_ADMIN`) dengan
enum di tabel `user` kamu.

## 5. Yang masih perlu kamu lengkapi sendiri

- **Scan kamera QR** — komponen `src/components/common/QRScanner.jsx` sudah
  punya UI dan tombol "Masukkan Kode Manual" yang berfungsi, tapi kamera asli
  perlu library tambahan (misal `html5-qrcode` atau `react-qr-scanner`) karena
  butuh `npm install` yang tidak bisa dilakukan otomatis di sini. Ada komentar
  `TODO` persis di titik yang perlu diganti.
- **Upload lampiran bukti sakit** — form pengajuan sudah punya input file,
  tinggal sesuaikan `requestService.submitRequest` memakai `FormData` kalau
  backend kamu menerima file upload.

Selamat mengembangkan! Kalau backend sudah jalan, cukup isi `.env` dan
cek satu-satu file di `src/services/` — itu saja titik penyambungannya.
