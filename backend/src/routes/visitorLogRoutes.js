const express = require('express');
const router = express.Router();

const visitorLogController = require('../controllers/visitorLogController');

// GET semua visitor log
router.get('/', visitorLogController.getAllVisitorLogs);

// GET visitor log berdasarkan ID
router.get('/:id', visitorLogController.getVisitorLogById);

// CREATE visitor log
router.post('/', visitorLogController.createVisitorLog);

// UPDATE visitor log
router.put('/:id', visitorLogController.updateVisitorLog);

// DELETE visitor log
router.delete('/:id', visitorLogController.deleteVisitorLog);

// CHECK IN
router.patch('/:id/check-in', visitorLogController.checkIn);

// CHECK OUT
router.patch('/:id/check-out', visitorLogController.checkOut);

module.exports = router;