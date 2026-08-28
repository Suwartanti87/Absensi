const prisma = require('../config/utils');

// GET semua work schedule
const getAllWorkSchedules = async (req, res) => {
  try {
    const schedules = await prisma.workSchedule.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    res.status(200).json({
      success: true,
      message: 'Work schedules berhasil diambil',
      data: schedules,
    });
  } catch (error) {
    console.error('Get Work Schedules Error:', error);

    res.status(500).json({
      success: false,
      message: 'Gagal mengambil work schedules',
      error: error.message,
    });
  }
};

// GET work schedule berdasarkan ID
const getWorkScheduleById = async (req, res) => {
  try {
    const { id } = req.params;

    const schedule = await prisma.workSchedule.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: 'Work schedule tidak ditemukan',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Work schedule berhasil diambil',
      data: schedule,
    });
  } catch (error) {
    console.error('Get Work Schedule By ID Error:', error);

    res.status(500).json({
      success: false,
      message: 'Gagal mengambil work schedule',
      error: error.message,
    });
  }
};

// CREATE work schedule
const createWorkSchedule = async (req, res) => {
  try {
    const {
      name,
      startTime,
      endTime,
      lateTolerance,
    } = req.body;

    // Validasi
    if (!name || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: 'name, startTime, dan endTime wajib diisi',
      });
    }

    // Cek nama schedule
    const existingSchedule = await prisma.workSchedule.findFirst({
      where: {
        name: name,
      },
    });

    if (existingSchedule) {
      return res.status(400).json({
        success: false,
        message: 'Work schedule dengan nama tersebut sudah ada',
      });
    }

    const schedule = await prisma.workSchedule.create({
      data: {
        name,
        startTime,
        endTime,
        lateTolerance:
          lateTolerance !== undefined
            ? Number(lateTolerance)
            : 15,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Work schedule berhasil dibuat',
      data: schedule,
    });
  } catch (error) {
    console.error('Create Work Schedule Error:', error);

    res.status(500).json({
      success: false,
      message: 'Gagal membuat work schedule',
      error: error.message,
    });
  }
};

// UPDATE work schedule
const updateWorkSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      startTime,
      endTime,
      lateTolerance,
    } = req.body;

    const scheduleId = Number(id);

    // Cek apakah schedule ada
    const existingSchedule = await prisma.workSchedule.findUnique({
      where: {
        id: scheduleId,
      },
    });

    if (!existingSchedule) {
      return res.status(404).json({
        success: false,
        message: 'Work schedule tidak ditemukan',
      });
    }

    // Jika nama diubah, cek apakah sudah digunakan
    if (name && name !== existingSchedule.name) {
      const duplicateName = await prisma.workSchedule.findFirst({
        where: {
          name,
          NOT: {
            id: scheduleId,
          },
        },
      });

      if (duplicateName) {
        return res.status(400).json({
          success: false,
          message: 'Work schedule dengan nama tersebut sudah ada',
        });
      }
    }

    const schedule = await prisma.workSchedule.update({
      where: {
        id: scheduleId,
      },
      data: {
        ...(name !== undefined && { name }),
        ...(startTime !== undefined && { startTime }),
        ...(endTime !== undefined && { endTime }),
        ...(lateTolerance !== undefined && {
          lateTolerance: Number(lateTolerance),
        }),
      },
    });

    res.status(200).json({
      success: true,
      message: 'Work schedule berhasil diperbarui',
      data: schedule,
    });
  } catch (error) {
    console.error('Update Work Schedule Error:', error);

    res.status(500).json({
      success: false,
      message: 'Gagal memperbarui work schedule',
      error: error.message,
    });
  }
};

// DELETE work schedule
const deleteWorkSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const scheduleId = Number(id);

    // Cek apakah schedule ada
    const existingSchedule = await prisma.workSchedule.findUnique({
      where: {
        id: scheduleId,
      },
    });

    if (!existingSchedule) {
      return res.status(404).json({
        success: false,
        message: 'Work schedule tidak ditemukan',
      });
    }

    await prisma.workSchedule.delete({
      where: {
        id: scheduleId,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Work schedule berhasil dihapus',
    });
  } catch (error) {
    console.error('Delete Work Schedule Error:', error);

    res.status(500).json({
      success: false,
      message: 'Gagal menghapus work schedule',
      error: error.message,
    });
  }
};

module.exports = {
  getAllWorkSchedules,
  getWorkScheduleById,
  createWorkSchedule,
  updateWorkSchedule,
  deleteWorkSchedule,
};