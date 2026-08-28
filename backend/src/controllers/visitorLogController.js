const prisma = require("../config/utils");

// 1. Catat kunjungan baru (Check-In)
const checkInVisitor = async (req, res) => {
  const { visitorId, employeeId, purpose, visitDate } = req.body;
  try {
    const log = await prisma.visitorLog.create({
      data: {
        visitorId: parseInt(visitorId),
        employeeId: parseInt(employeeId),
        purpose,
        visitDate: new Date(visitDate),
        checkIn: new Date(),
        status: "CHECKED_IN",
        updatedAt: new Date()
      },
    });
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Update status kunjungan (Check-Out)
const checkOutVisitor = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedLog = await prisma.visitorLog.update({
      where: { id: parseInt(id) },
      data: {
        checkOut: new Date(),
        status: "CHECKED_OUT",
        updatedAt: new Date()
      },
    });
    res.status(200).json(updatedLog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Ambil semua riwayat log kunjungan
const getVisitorLogs = async (req, res) => {
  try {
    const logs = await prisma.visitorLog.findMany({
      include: {
        visitor: true, // Mengambil info detail visitor (pastikan relasi sudah ada di schema.prisma)
      },
      orderBy: {
        visitDate: 'desc'
      }
    });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ekspor menggunakan CommonJS
module.exports = {
  checkInVisitor,
  checkOutVisitor,
  getVisitorLogs
};
