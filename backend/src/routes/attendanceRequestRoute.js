const express = require('express');

const router = express.Router();

const {
  getAllAttendanceRequests,
  getAttendanceRequestById,
  getAttendanceRequestsByEmployeeId,
  createAttendanceRequest,
  updateAttendanceRequest,
  approveAttendanceRequest,
  rejectAttendanceRequest,
  deleteAttendanceRequest,
} = require('../controllers/attendanceRequestController');


// GET semua attendance request
router.get('/', getAllAttendanceRequests);

// GET attendance request berdasarkan ID
router.get('/:id', getAttendanceRequestById);

// GET attendance request berdasarkan employee ID
router.get(
  '/employee/:employeeId',
  getAttendanceRequestsByEmployeeId
);

// CREATE attendance request
router.post('/', createAttendanceRequest);

// UPDATE attendance request
router.put('/:id', updateAttendanceRequest);

// APPROVE attendance request
router.put(
  '/:id/approve',
  approveAttendanceRequest
);

// REJECT attendance request
router.put(
  '/:id/reject',
  rejectAttendanceRequest
);

// DELETE attendance request
router.delete('/:id', deleteAttendanceRequest);


module.exports = router;