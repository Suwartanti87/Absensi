const prisma = require('../config/utils');


// GET semua visitor
const getAllVisitors = async (req, res) => {
  try {
    const visitors = await prisma.visitor.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    res.status(200).json({
      success: true,
      message: 'Visitors berhasil diambil',
      data: visitors,
    });
  } catch (error) {
    console.error('Get Visitors Error:', error);

    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data visitors',
      error: error.message,
    });
  }
};


// GET visitor berdasarkan ID
const getVisitorById = async (req, res) => {
  try {
    const { id } = req.params;

    const visitor = await prisma.visitor.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: 'Visitor tidak ditemukan',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Visitor berhasil diambil',
      data: visitor,
    });
  } catch (error) {
    console.error('Get Visitor By ID Error:', error);

    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data visitor',
      error: error.message,
    });
  }
};


// CREATE visitor
const createVisitor = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      company,
    } = req.body;

    // Validasi nama
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Nama visitor wajib diisi',
      });
    }

    const visitor = await prisma.visitor.create({
      data: {
        name,
        phone: phone || null,
        email: email || null,
        company: company || null,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Visitor berhasil ditambahkan',
      data: visitor,
    });
  } catch (error) {
    console.error('Create Visitor Error:', error);

    res.status(500).json({
      success: false,
      message: 'Gagal menambahkan visitor',
      error: error.message,
    });
  }
};


// UPDATE visitor
const updateVisitor = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      phone,
      email,
      company,
    } = req.body;

    const visitorId = Number(id);

    // Cek visitor
    const existingVisitor = await prisma.visitor.findUnique({
      where: {
        id: visitorId,
      },
    });

    if (!existingVisitor) {
      return res.status(404).json({
        success: false,
        message: 'Visitor tidak ditemukan',
      });
    }

    const visitor = await prisma.visitor.update({
      where: {
        id: visitorId,
      },
      data: {
        ...(name !== undefined && { name }),
        ...(phone !== undefined && { phone }),
        ...(email !== undefined && { email }),
        ...(company !== undefined && { company }),
      },
    });

    res.status(200).json({
      success: true,
      message: 'Visitor berhasil diperbarui',
      data: visitor,
    });
  } catch (error) {
    console.error('Update Visitor Error:', error);

    res.status(500).json({
      success: false,
      message: 'Gagal memperbarui visitor',
      error: error.message,
    });
  }
};


// DELETE visitor
const deleteVisitor = async (req, res) => {
  try {
    const { id } = req.params;

    const visitorId = Number(id);

    // Cek visitor
    const existingVisitor = await prisma.visitor.findUnique({
      where: {
        id: visitorId,
      },
    });

    if (!existingVisitor) {
      return res.status(404).json({
        success: false,
        message: 'Visitor tidak ditemukan',
      });
    }

    await prisma.visitor.delete({
      where: {
        id: visitorId,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Visitor berhasil dihapus',
    });
  } catch (error) {
    console.error('Delete Visitor Error:', error);

    res.status(500).json({
      success: false,
      message: 'Gagal menghapus visitor',
      error: error.message,
    });
  }
};


module.exports = {
  getAllVisitors,
  getVisitorById,
  createVisitor,
  updateVisitor,
  deleteVisitor,
};