const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// =====================================================
// GET ALL ATTENDANCE
// =====================================================
const getAllAttendance = async (req, res, next) => {
    try {
        const attendances = await prisma.attendance.findMany({
            include: {
                employee: true
            },
            orderBy: {
                date: "desc"
            }
        });

        if (attendances.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data attendance belum tersedia"
            });
        }

        res.status(200).json({
            success: true,
            message: "Berhasil mengambil semua data attendance",
            data: attendances
        });
    } catch (error) {
        next(error);
    }
};


// =====================================================
// GET ATTENDANCE BY ID
// =====================================================
const getAttendanceById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "ID attendance harus berupa angka"
            });
        }

        const attendance = await prisma.attendance.findUnique({
            where: {
                id: id
            },
            include: {
                employee: true
            }
        });

        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: "Data attendance tidak ditemukan"
            });
        }

        res.status(200).json({
            success: true,
            message: "Berhasil mengambil data attendance",
            data: attendance
        });
    } catch (error) {
        next(error);
    }
};


// =====================================================
// GET ATTENDANCE BY EMPLOYEE
// =====================================================
const getAttendanceByEmployee = async (req, res, next) => {
    try {
        const employee_id = parseInt(req.params.employee_id);

        if (isNaN(employee_id)) {
            return res.status(400).json({
                success: false,
                message: "Employee ID harus berupa angka"
            });
        }

        // Cek employee
        const employee = await prisma.employee.findUnique({
            where: {
                id: employee_id
            }
        });

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee tidak ditemukan"
            });
        }

        const attendances = await prisma.attendance.findMany({
            where: {
                employee_id: employee_id
            },
            orderBy: {
                date: "desc"
            }
        });

        if (attendances.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Employee belum memiliki data attendance"
            });
        }

        res.status(200).json({
            success: true,
            message: "Berhasil mengambil attendance employee",
            data: attendances
        });
    } catch (error) {
        next(error);
    }
};


// =====================================================
// CHECK IN
// =====================================================
const checkIn = async (req, res, next) => {
    try {
        const { employee_id } = req.body;

        // Validasi employee_id
        if (!employee_id) {
            return res.status(400).json({
                success: false,
                message: "Employee ID wajib diisi"
            });
        }

        const employeeId = parseInt(employee_id);

        if (isNaN(employeeId)) {
            return res.status(400).json({
                success: false,
                message: "Employee ID harus berupa angka"
            });
        }

        // Cek employee
        const employee = await prisma.employee.findUnique({
            where: {
                id: employeeId
            }
        });

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee tidak ditemukan"
            });
        }

        // Tanggal hari ini
        const today = new Date();

        const startOfDay = new Date(today);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        // Cek apakah hari ini sudah check-in
        const existingAttendance = await prisma.attendance.findFirst({
            where: {
                employee_id: employeeId,
                date: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            }
        });

        if (existingAttendance) {
            return res.status(400).json({
                success: false,
                message: "Employee sudah melakukan check-in hari ini",
                data: existingAttendance
            });
        }

        // Waktu check-in
        const checkInTime = new Date();

        const attendance = await prisma.attendance.create({
            data: {
                employee_id: employeeId,
                date: today,
                check_in: checkInTime,
                status: "PRESENT"
            },
            include: {
                employee: true
            }
        });

        res.status(201).json({
            success: true,
            message: "Check-in berhasil",
            data: attendance
        });
    } catch (error) {
        next(error);
    }
};


// =====================================================
// CHECK OUT
// =====================================================
const checkOut = async (req, res, next) => {
    try {
        const { employee_id } = req.body;

        // Validasi employee_id
        if (!employee_id) {
            return res.status(400).json({
                success: false,
                message: "Employee ID wajib diisi"
            });
        }

        const employeeId = parseInt(employee_id);

        if (isNaN(employeeId)) {
            return res.status(400).json({
                success: false,
                message: "Employee ID harus berupa angka"
            });
        }

        // Cek employee
        const employee = await prisma.employee.findUnique({
            where: {
                id: employeeId
            }
        });

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee tidak ditemukan"
            });
        }

        // Tanggal hari ini
        const today = new Date();

        const startOfDay = new Date(today);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        // Cari attendance hari ini
        const attendance = await prisma.attendance.findFirst({
            where: {
                employee_id: employeeId,
                date: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            }
        });

        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: "Employee belum melakukan check-in hari ini"
            });
        }

        // Cek apakah sudah check-out
        if (attendance.check_out) {
            return res.status(400).json({
                success: false,
                message: "Employee sudah melakukan check-out hari ini"
            });
        }

        // Waktu check-out
        const checkOutTime = new Date();

        const updatedAttendance = await prisma.attendance.update({
            where: {
                id: attendance.id
            },
            data: {
                check_out: checkOutTime
            },
            include: {
                employee: true
            }
        });

        res.status(200).json({
            success: true,
            message: "Check-out berhasil",
            data: updatedAttendance
        });
    } catch (error) {
        next(error);
    }
};


// =====================================================
// UPDATE ATTENDANCE
// =====================================================
const updateAttendance = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "ID attendance harus berupa angka"
            });
        }

        const {
            check_in,
            check_out,
            status
        } = req.body;

        // Cek attendance
        const attendance = await prisma.attendance.findUnique({
            where: {
                id: id
            }
        });

        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: "Data attendance tidak ditemukan"
            });
        }

        // Validasi status
        const allowedStatus = [
            "PRESENT",
            "LATE",
            "ABSENT",
            "LEAVE"
        ];

        if (status && !allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status attendance tidak valid"
            });
        }

        const updatedAttendance = await prisma.attendance.update({
            where: {
                id: id
            },
            data: {
                check_in: check_in
                    ? new Date(check_in)
                    : undefined,

                check_out: check_out
                    ? new Date(check_out)
                    : undefined,

                status: status || undefined
            },
            include: {
                employee: true
            }
        });

        res.status(200).json({
            success: true,
            message: "Attendance berhasil diperbarui",
            data: updatedAttendance
        });
    } catch (error) {
        next(error);
    }
};


// =====================================================
// DELETE ATTENDANCE
// =====================================================
const deleteAttendance = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "ID attendance harus berupa angka"
            });
        }

        // Cek attendance
        const attendance = await prisma.attendance.findUnique({
            where: {
                id: id
            }
        });

        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: "Data attendance tidak ditemukan"
            });
        }

        await prisma.attendance.delete({
            where: {
                id: id
            }
        });

        res.status(200).json({
            success: true,
            message: "Attendance berhasil dihapus"
        });
    } catch (error) {
        next(error);
    }
};


// =====================================================
// EXPORT
// =====================================================
module.exports = {
    getAllAttendance,
    getAttendanceById,
    getAttendanceByEmployee,
    checkIn,
    checkOut,
    updateAttendance,
    deleteAttendance
};