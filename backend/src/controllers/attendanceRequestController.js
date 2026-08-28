const prisma = require("../config/utils");


// =====================================================
// GET ALL ATTENDANCE REQUEST
// =====================================================
const getAllAttendanceRequests = async (req, res) => {
  try {
    const requests = await prisma.attendanceRequest.findMany({
      include: {
        employee: true,
        approvedBy: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json({
      success: true,
      message: 'Attendance requests berhasil diambil',
      data: requests,
    });
  } catch (error) {
    console.error('Get Attendance Requests Error:', error);

    res.status(500).json({
      success: false,
      message: 'Gagal mengambil attendance requests',
      error: error.message,
    });
  }
};


// =====================================================
// GET ATTENDANCE REQUEST BY ID
// =====================================================
const getAttendanceRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await prisma.attendanceRequest.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        employee: true,
        approvedBy: true,
      },
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Attendance request tidak ditemukan',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Attendance request berhasil diambil',
      data: request,
    });
  } catch (error) {
    console.error('Get Attendance Request By ID Error:', error);

    res.status(500).json({
      success: false,
      message: 'Gagal mengambil attendance request',
      error: error.message,
    });
  }
};


// =====================================================
// GET ATTENDANCE REQUEST BY EMPLOYEE ID
// =====================================================
const getAttendanceRequestsByEmployeeId = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await prisma.employee.findUnique({
      where: {
        id: Number(employeeId),
      },
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee tidak ditemukan',
      });
    }

    const requests = await prisma.attendanceRequest.findMany({
      where: {
        employeeId: Number(employeeId),
      },
      include: {
        employee: true,
        approvedBy: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json({
      success: true,
      message: 'Attendance requests employee berhasil diambil',
      data: requests,
    });
  } catch (error) {
    console.error(
      'Get Attendance Requests By Employee ID Error:',
      error
    );

    res.status(500).json({
      success: false,
      message: 'Gagal mengambil attendance requests employee',
      error: error.message,
    });
  }
};


// =====================================================
// CREATE ATTENDANCE REQUEST
// =====================================================
const createAttendanceRequest = async (req, res) => {
  try {
    const {
      employeeId,
      type,
      startDate,
      endDate,
      reason,
      attachment,
    } = req.body;

    // Validasi field wajib
    if (!employeeId || !type || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message:
          'employeeId, type, startDate, dan endDate wajib diisi',
      });
    }

    // Validasi type
    const allowedTypes = [
      'SICK',
      'PERMISSION',
      'LEAVE',
    ];

    if (!allowedTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message:
          'Type harus SICK, PERMISSION, atau LEAVE',
      });
    }

    // Validasi tanggal
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Format tanggal tidak valid',
      });
    }

    if (end < start) {
      return res.status(400).json({
        success: false,
        message: 'endDate tidak boleh sebelum startDate',
      });
    }

    // Cek employee
    const employee = await prisma.employee.findUnique({
      where: {
        id: Number(employeeId),
      },
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee tidak ditemukan',
      });
    }

    // Buat request
    const request = await prisma.attendanceRequest.create({
      data: {
        employeeId: Number(employeeId),
        type,
        startDate: start,
        endDate: end,
        reason: reason || null,
        attachment: attachment || null,
        status: 'PENDING',
      },
      include: {
        employee: true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Attendance request berhasil diajukan',
      data: request,
    });
  } catch (error) {
    console.error('Create Attendance Request Error:', error);

    res.status(500).json({
      success: false,
      message: 'Gagal membuat attendance request',
      error: error.message,
    });
  }
};


// =====================================================
// UPDATE ATTENDANCE REQUEST
// =====================================================
const updateAttendanceRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      type,
      startDate,
      endDate,
      reason,
      attachment,
    } = req.body;

    const requestId = Number(id);

    // Cek request
    const existingRequest =
      await prisma.attendanceRequest.findUnique({
        where: {
          id: requestId,
        },
      });

    if (!existingRequest) {
      return res.status(404).json({
        success: false,
        message: 'Attendance request tidak ditemukan',
      });
    }

    // Request yang sudah diproses tidak boleh diedit
    if (existingRequest.status !== 'PENDING') {
      return res.status(400).json({
        success: false,
        message:
          'Attendance request yang sudah APPROVED atau REJECTED tidak dapat diubah',
      });
    }

    // Validasi type jika dikirim
    if (type) {
      const allowedTypes = [
        'SICK',
        'PERMISSION',
        'LEAVE',
      ];

      if (!allowedTypes.includes(type)) {
        return res.status(400).json({
          success: false,
          message:
            'Type harus SICK, PERMISSION, atau LEAVE',
        });
      }
    }

    // Validasi tanggal
    const start = startDate
      ? new Date(startDate)
      : existingRequest.startDate;

    const end = endDate
      ? new Date(endDate)
      : existingRequest.endDate;

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Format tanggal tidak valid',
      });
    }

    if (end < start) {
      return res.status(400).json({
        success: false,
        message: 'endDate tidak boleh sebelum startDate',
      });
    }

    const request =
      await prisma.attendanceRequest.update({
        where: {
          id: requestId,
        },
        data: {
          ...(type !== undefined && { type }),
          ...(startDate !== undefined && {
            startDate: start,
          }),
          ...(endDate !== undefined && {
            endDate: end,
          }),
          ...(reason !== undefined && { reason }),
          ...(attachment !== undefined && {
            attachment,
          }),
        },
        include: {
          employee: true,
        },
      });

    res.status(200).json({
      success: true,
      message: 'Attendance request berhasil diperbarui',
      data: request,
    });
  } catch (error) {
    console.error('Update Attendance Request Error:', error);

    res.status(500).json({
      success: false,
      message: 'Gagal memperbarui attendance request',
      error: error.message,
    });
  }
};


// =====================================================
// APPROVE ATTENDANCE REQUEST
// =====================================================
const approveAttendanceRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // ID admin/HR yang melakukan approval
    const approvedById = req.body.approvedById;

    if (!approvedById) {
      return res.status(400).json({
        success: false,
        message: 'approvedById wajib diisi',
      });
    }

    const requestId = Number(id);

    // Cek request
    const existingRequest =
      await prisma.attendanceRequest.findUnique({
        where: {
          id: requestId,
        },
      });

    if (!existingRequest) {
      return res.status(404).json({
        success: false,
        message: 'Attendance request tidak ditemukan',
      });
    }

    // Hanya request PENDING yang bisa di-approve
    if (existingRequest.status !== 'PENDING') {
      return res.status(400).json({
        success: false,
        message:
          'Attendance request sudah diproses',
      });
    }

    // Cek user yang melakukan approval
    const approver = await prisma.user.findUnique({
      where: {
        id: Number(approvedById),
      },
    });

    if (!approver) {
      return res.status(404).json({
        success: false,
        message: 'User yang menyetujui tidak ditemukan',
      });
    }

    const request =
      await prisma.attendanceRequest.update({
        where: {
          id: requestId,
        },
        data: {
          status: 'APPROVED',
          approvedById: Number(approvedById),
          approvedAt: new Date(),
        },
        include: {
          employee: true,
          approvedBy: true,
        },
      });

    res.status(200).json({
      success: true,
      message: 'Attendance request berhasil disetujui',
      data: request,
    });
  } catch (error) {
    console.error('Approve Attendance Request Error:', error);

    res.status(500).json({
      success: false,
      message: 'Gagal menyetujui attendance request',
      error: error.message,
    });
  }
};


// =====================================================
// REJECT ATTENDANCE REQUEST
// =====================================================
const rejectAttendanceRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // ID admin/HR yang melakukan rejection
    const approvedById = req.body.approvedById;

    if (!approvedById) {
      return res.status(400).json({
        success: false,
        message: 'approvedById wajib diisi',
      });
    }

    const requestId = Number(id);

    // Cek request
    const existingRequest =
      await prisma.attendanceRequest.findUnique({
        where: {
          id: requestId,
        },
      });

    if (!existingRequest) {
      return res.status(404).json({
        success: false,
        message: 'Attendance request tidak ditemukan',
      });
    }

    // Hanya request PENDING yang bisa ditolak
    if (existingRequest.status !== 'PENDING') {
      return res.status(400).json({
        success: false,
        message:
          'Attendance request sudah diproses',
      });
    }

    // Cek user
    const approver = await prisma.user.findUnique({
      where: {
        id: Number(approvedById),
      },
    });

    if (!approver) {
      return res.status(404).json({
        success: false,
        message: 'User yang memproses request tidak ditemukan',
      });
    }

    const request =
      await prisma.attendanceRequest.update({
        where: {
          id: requestId,
        },
        data: {
          status: 'REJECTED',
          approvedById: Number(approvedById),
          approvedAt: new Date(),
        },
        include: {
          employee: true,
          approvedBy: true,
        },
      });

    res.status(200).json({
      success: true,
      message: 'Attendance request berhasil ditolak',
      data: request,
    });
  } catch (error) {
    console.error('Reject Attendance Request Error:', error);

    res.status(500).json({
      success: false,
      message: 'Gagal menolak attendance request',
      error: error.message,
    });
  }
};


// =====================================================
// DELETE ATTENDANCE REQUEST
// =====================================================
const deleteAttendanceRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const requestId = Number(id);

    const existingRequest =
      await prisma.attendanceRequest.findUnique({
        where: {
          id: requestId,
        },
      });

    if (!existingRequest) {
      return res.status(404).json({
        success: false,
        message: 'Attendance request tidak ditemukan',
      });
    }

    // Hanya PENDING yang boleh dihapus
    if (existingRequest.status !== 'PENDING') {
      return res.status(400).json({
        success: false,
        message:
          'Attendance request yang sudah diproses tidak dapat dihapus',
      });
    }

    await prisma.attendanceRequest.delete({
      where: {
        id: requestId,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Attendance request berhasil dihapus',
    });
  } catch (error) {
    console.error('Delete Attendance Request Error:', error);

    res.status(500).json({
      success: false,
      message: 'Gagal menghapus attendance request',
      error: error.message,
    });
  }
};


module.exports = {
  getAllAttendanceRequests,
  getAttendanceRequestById,
  getAttendanceRequestsByEmployeeId,
  createAttendanceRequest,
  updateAttendanceRequest,
  approveAttendanceRequest,
  rejectAttendanceRequest,
  deleteAttendanceRequest,
};