const prisma = require("../config/utils");

// ========================================
// CREATE EMPLOYEE
// ========================================
const createEmployee = async (req, res) => {
    try {
        const {
            employeeCode,
            name,
            email,
            phone,
            address,
            position,
            joinDate,
            departmentId,
            workScheduleId
        } = req.body;

        // Validasi
        if (!employeeCode || !name || !departmentId) {
            return res.status(400).json({
                message: "Employee code, nama, dan department wajib diisi"
            });
        }

        // Cek employee code
        const existingEmployee = await prisma.employee.findUnique({
            where: {
                employeeCode: employeeCode
            }
        });

        if (existingEmployee) {
            return res.status(400).json({
                message: "Employee code sudah digunakan"
            });
        }

        // Buat employee
        const employee = await prisma.employee.create({
            data: {
                employeeCode: employeeCode,
                name: name,
                email: email,
                phone: phone,
                address: address,
                position: position,

                joinDate: joinDate
                    ? new Date(joinDate)
                    : null,

                departmentId: parseInt(departmentId),

                workScheduleId: workScheduleId
                    ? parseInt(workScheduleId)
                    : null
            },

            include: {
                department: true,
                workSchedule: true
            }
        });

        return res.status(201).json({
            message: "Employee berhasil dibuat",
            data: employee
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Gagal membuat employee"
        });
    }
};


// ========================================
// GET ALL EMPLOYEES
// ========================================
const getAllEmployees = async (req, res) => {
    try {

        const employees = await prisma.employee.findMany({
            include: {
                department: true,
                workSchedule: true
            },

            orderBy: {
                id: "desc"
            }
        });

        return res.status(200).json({
            message: "Data employee berhasil diambil",
            data: employees
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Gagal mengambil data employee"
        });
    }
};


// ========================================
// GET EMPLOYEE BY ID
// ========================================
const getEmployeeById = async (req, res) => {
    try {

        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "ID employee tidak valid"
            });
        }

        const employee = await prisma.employee.findUnique({
            where: {
                id: id
            },

            include: {
                department: true,
                workSchedule: true
            }
        });

        if (!employee) {
            return res.status(404).json({
                message: "Employee tidak ditemukan"
            });
        }

        return res.status(200).json({
            message: "Data employee ditemukan",
            data: employee
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Gagal mengambil employee"
        });
    }
};


// ========================================
// GET EMPLOYEE BY CODE
// Untuk QR Code
// ========================================
const getEmployeeByCode = async (req, res) => {
    try {

        const { employeeCode } = req.params;

        if (!employeeCode) {
            return res.status(400).json({
                message: "Employee code wajib diisi"
            });
        }

        const employee = await prisma.employee.findUnique({
            where: {
                employeeCode: employeeCode
            },

            include: {
                department: true
            }
        });

        if (!employee) {
            return res.status(404).json({
                message: "Employee dengan code tersebut tidak ditemukan"
            });
        }

        return res.status(200).json({
            message: "Employee ditemukan",
            data: employee
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Gagal mencari employee"
        });
    }
};


// ========================================
// UPDATE EMPLOYEE
// ========================================
const updateEmployee = async (req, res) => {
    try {

        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "ID employee tidak valid"
            });
        }

        const {
            employeeCode,
            name,
            email,
            phone,
            address,
            position,
            joinDate,
            status,
            departmentId,
            workScheduleId
        } = req.body;

        // Cek employee
        const existingEmployee = await prisma.employee.findUnique({
            where: {
                id: id
            }
        });

        if (!existingEmployee) {
            return res.status(404).json({
                message: "Employee tidak ditemukan"
            });
        }

        // Cek employee code jika diubah
        if (
            employeeCode &&
            employeeCode !== existingEmployee.employeeCode
        ) {

            const duplicateCode = await prisma.employee.findUnique({
                where: {
                    employeeCode: employeeCode
                }
            });

            if (duplicateCode) {
                return res.status(400).json({
                    message: "Employee code sudah digunakan"
                });
            }
        }

        // Update
        const employee = await prisma.employee.update({
            where: {
                id: id
            },

            data: {
                employeeCode: employeeCode,
                name: name,
                email: email,
                phone: phone,
                address: address,
                position: position,

                joinDate: joinDate
                    ? new Date(joinDate)
                    : undefined,

                status: status,

                departmentId: departmentId
                    ? parseInt(departmentId)
                    : undefined,

                workScheduleId: workScheduleId
                    ? parseInt(workScheduleId)
                    : null
            },

            include: {
                department: true,
                workSchedule: true
            }
        });

        return res.status(200).json({
            message: "Employee berhasil diperbarui",
            data: employee
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Gagal memperbarui employee"
        });
    }
};


// ========================================
// DELETE EMPLOYEE
// ========================================
const deleteEmployee = async (req, res) => {
    try {

        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: "ID employee tidak valid"
            });
        }

        // Cek employee
        const employee = await prisma.employee.findUnique({
            where: {
                id: id
            }
        });

        if (!employee) {
            return res.status(404).json({
                message: "Employee tidak ditemukan"
            });
        }

        // Hapus employee
        await prisma.employee.delete({
            where: {
                id: id
            }
        });

        return res.status(200).json({
            message: "Employee berhasil dihapus"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Gagal menghapus employee"
        });
    }
};


// ========================================
// EXPORT
// ========================================
module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    getEmployeeByCode,
    updateEmployee,
    deleteEmployee
};