import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader.jsx'
import IdCard from '../../components/common/IdCard.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import * as employeeService from '../../services/employeeServise.js'

export default function IdCardPage() {
  const { user } = useAuth()
  const [employee, setEmployee] = useState(null)

  useEffect(() => {
    if (!user?.employeeId) return
    employeeService.getEmployeeById(user.employeeId).then(setEmployee).catch(() => {
      setEmployee({ name: user.name || user.username, position: 'Karyawan', employeeCode: 'EMP-0001' })
    })
  }, [user])

  return (
    <div>
      <PageHeader title="Profil Saya" subtitle="Kartu identitas & QR untuk absensi." />
      <IdCard employee={employee} />
      
    </div>
  )
}
