const pool = require('../config/db');

// GET semua Visitor Log
exports.getAllVisitorLogs = async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT *
            FROM VisitorLog
            ORDER BY id DESC
        `);

        res.status(200).json({
            message: 'Data visitor log berhasil diambil',
            data: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Gagal mengambil data visitor log',
            error: error.message
        });
    }
};

// GET Visitor Log berdasarkan ID
exports.getVisitorLogById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: 'ID harus berupa angka'
            });
        }

        const [rows] = await pool.execute(
            `SELECT * FROM VisitorLog WHERE id = ?`,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: 'Visitor log tidak ditemukan'
            });
        }

        res.status(200).json({
            message: 'Data visitor log berhasil ditemukan',
            data: rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Gagal mengambil visitor log',
            error: error.message
        });
    }
};

// CREATE Visitor Log
exports.createVisitorLog = async (req, res) => {
    try {
        const {
            visitorId,
            employeeId,
            purpose,
            visitDate,
            checkIn,
            checkOut,
            status
        } = req.body;

        // Validasi field wajib
        if (!visitorId || !employeeId || !purpose || !visitDate) {
            return res.status(400).json({
                message: 'visitorId, employeeId, purpose, dan visitDate wajib diisi'
            });
        }

        const visitorLogStatus = status || 'CHECKED_IN';

        // Validasi status
        if (!['CHECKED_IN', 'CHECKED_OUT'].includes(visitorLogStatus)) {
            return res.status(400).json({
                message: 'Status harus CHECKED_IN atau CHECKED_OUT'
            });
        }

        const [result] = await pool.execute(
            `INSERT INTO VisitorLog
            (visitorId, employeeId, purpose, visitDate, checkIn, checkOut, status, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [
                visitorId,
                employeeId,
                purpose,
                visitDate,
                checkIn || null,
                checkOut || null,
                visitorLogStatus
            ]
        );

        res.status(201).json({
            message: 'Visitor log berhasil ditambahkan',
            data: {
                id: result.insertId,
                visitorId,
                employeeId,
                purpose,
                visitDate,
                checkIn: checkIn || null,
                checkOut: checkOut || null,
                status: visitorLogStatus
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Gagal menambahkan visitor log',
            error: error.message
        });
    }
};

// UPDATE Visitor Log
exports.updateVisitorLog = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: 'ID harus berupa angka'
            });
        }

        const {
            visitorId,
            employeeId,
            purpose,
            visitDate,
            checkIn,
            checkOut,
            status
        } = req.body;

        if (!visitorId || !employeeId || !purpose || !visitDate) {
            return res.status(400).json({
                message: 'visitorId, employeeId, purpose, dan visitDate wajib diisi'
            });
        }

        if (status && !['CHECKED_IN', 'CHECKED_OUT'].includes(status)) {
            return res.status(400).json({
                message: 'Status harus CHECKED_IN atau CHECKED_OUT'
            });
        }

        const [result] = await pool.execute(
            `UPDATE VisitorLog
             SET visitorId = ?,
                 employeeId = ?,
                 purpose = ?,
                 visitDate = ?,
                 checkIn = ?,
                 checkOut = ?,
                 status = ?,
                 updatedAt = NOW()
             WHERE id = ?`,
            [
                visitorId,
                employeeId,
                purpose,
                visitDate,
                checkIn || null,
                checkOut || null,
                status || 'CHECKED_IN',
                id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Visitor log tidak ditemukan'
            });
        }

        res.status(200).json({
            message: 'Visitor log berhasil diperbarui'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Gagal memperbarui visitor log',
            error: error.message
        });
    }
};

// DELETE Visitor Log
exports.deleteVisitorLog = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: 'ID harus berupa angka'
            });
        }

        const [result] = await pool.execute(
            `DELETE FROM VisitorLog WHERE id = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Visitor log tidak ditemukan'
            });
        }

        res.status(200).json({
            message: 'Visitor log berhasil dihapus'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Gagal menghapus visitor log',
            error: error.message
        });
    }
};

// CHECK IN
exports.checkIn = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: 'ID harus berupa angka'
            });
        }

        const [result] = await pool.execute(
            `UPDATE VisitorLog
             SET checkIn = NOW(),
                 status = 'CHECKED_IN',
                 updatedAt = NOW()
             WHERE id = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Visitor log tidak ditemukan'
            });
        }

        res.status(200).json({
            message: 'Visitor berhasil check in'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Gagal melakukan check in',
            error: error.message
        });
    }
};

// CHECK OUT
exports.checkOut = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                message: 'ID harus berupa angka'
            });
        }

        const [result] = await pool.execute(
            `UPDATE VisitorLog
             SET checkOut = NOW(),
                 status = 'CHECKED_OUT',
                 updatedAt = NOW()
             WHERE id = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Visitor log tidak ditemukan'
            });
        }

        res.status(200).json({
            message: 'Visitor berhasil check out'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Gagal melakukan check out',
            error: error.message
        });
    }
};