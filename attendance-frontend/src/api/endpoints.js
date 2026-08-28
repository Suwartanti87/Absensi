/**
 * Daftar path endpoint backend, dikelompokkan sesuai tabel di ERD kamu.
 * Ini cuma "peta jalan" supaya semua service pakai path yang konsisten.
 *
 * Kalau path di backend kamu beda (misal /api/v1/... atau nama lain),
 * cukup ubah nilainya di sini saja — tidak perlu ubah di service manapun.
 */
export const ENDPOINTS = {
  // ---- auth & user (tabel: user) ----
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  USER: {
    BASE: '/users',
  },

  // ---- employee (tabel: employee) ----
  EMPLOYEE: {
    BASE: '/employee',
    BY_ID: (id) => `/employee/${id}`,
  },

  // ---- department (tabel: department) ----
  DEPARTMENT: {
    BASE: '/department',
    BY_ID: (id) => `/department/${id}`,
  },

  // ---- workschedule (tabel: workschedule) ----
  SCHEDULE: {
    BASE: '/work-schedule',
    BY_ID: (id) => `/work-schedule/${id}`,
    BY_EMPLOYEE: (employeeId) => `/work-schedule/employee/${employeeId}`,
  },

  // ---- attendance (tabel: attendance, dipakai untuk Check In/Out & Riwayat) ----
  ATTENDANCE: {
    TODAY: '/attendance/today',
    CHECK_IN: '/attendance/check-in',
    CHECK_OUT: '/attendance/check-out',
    HISTORY: '/attendance/history', // ?month=&year=&employeeId=
    ALL: '/attendance', // untuk admin
  },

  // ---- attendancerequest (tabel: attendancerequest -> Pengajuan Cuti/Izin/Sakit) ----
  REQUEST: {
    BASE: '/attendance-requests',
    BY_ID: (id) => `/attendance-request/${id}`,
    APPROVE: (id) => `/attendance-request/${id}/approve`,
    REJECT: (id) => `/attendance-request/${id}/reject`,
  },

  // ---- visitor (tabel: visitor, form tamu publik) ----
  VISITOR: {
    BASE: '/visitor',
  },

  // ---- visitorlog (tabel: visitorlog, kunjungan/janji temu) ----
  VISITOR_LOG: {
    BASE: '/visitor-log',
    CHECK_IN: (id) => `/visitor-log/${id}/check-in`,
    CHECK_OUT: (id) => `/visitor-log/${id}/check-out`,
  },
}
