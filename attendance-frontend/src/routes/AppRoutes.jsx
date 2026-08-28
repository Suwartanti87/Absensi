import { Routes, Route } from 'react-router-dom'

import LandingPage from '../pages/LandingPage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import VisitorFormPage from '../pages/visitor/VisitorFormPage.jsx'
import VisitorSuccessPage from '../pages/visitor/VisitorSuccessPage.jsx'

import ProtectedRoute from './ProtectedRoute.jsx'
import AdminRoute from './AdminRoute.jsx'
import EmployeeLayout from '../layouts/EmployeeLayout.jsx'
import AdminLayout from '../layouts/AdminLayout.jsx'

import EmployeeDashboard from '../pages/employee/Dashboard.jsx'
import Attendance from '../pages/employee/Attendance.jsx'
import Schedule from '../pages/employee/Schedule.jsx'
import AttendanceHistory from '../pages/employee/AttendanceHistory.jsx'
import AttendanceRequest from '../pages/employee/AttendanceRequest.jsx'
import IdCardPage from '../pages/employee/IdCardPage.jsx'

import AdminDashboard from '../pages/admin/Dashboard.jsx'
import EmployeeManagement from '../pages/admin/EmployeeManagement.jsx'
import DepartementManagement from '../pages/admin/DepartementManagement.jsx'
import ScheduleManagement from '../pages/admin/ScheduleManagement.jsx'
import UserManagement from '../pages/admin/UserManagement.jsx'
import VisitorManagement from '../pages/admin/VisitorManagement.jsx'
import AttendanceManagement from '../pages/admin/AttendanceManagement.jsx'
import AttendanceRequestManagement from '../pages/admin/AttendanceRequestManagement.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      {/* ---- Publik ---- */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/visitor" element={<VisitorFormPage />} />
      <Route path="/visitor/sukses" element={<VisitorSuccessPage />} />

      {/* ---- Area Karyawan (butuh login) ---- */}
      <Route element={<ProtectedRoute />}>
        <Route path="/employee" element={<EmployeeLayout />}>
          <Route index element={<Attendance />} />
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="jadwal" element={<Schedule />} />
          <Route path="riwayat" element={<AttendanceHistory />} />
          <Route path="pengajuan" element={<AttendanceRequest />} />
          <Route path="profil" element={<IdCardPage />} />
        </Route>
      </Route>

      {/* ---- Area Admin / HR (butuh login + role admin) ---- */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="karyawan" element={<EmployeeManagement />} />
          <Route path="departemen" element={<DepartementManagement />} />
          <Route path="jadwal" element={<ScheduleManagement />} />
          <Route path="absensi" element={<AttendanceManagement />} />
          <Route path="pengajuan" element={<AttendanceRequestManagement />} />
          <Route path="tamu" element={<VisitorManagement />} />
          <Route path="user" element={<UserManagement />} />
        </Route>
      </Route>
    </Routes>
  )
}
