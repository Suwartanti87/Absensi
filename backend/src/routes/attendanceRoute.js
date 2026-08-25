const express = require("express");
const router = express.Router();

const Controller = require("../controllers/attendanceController");

router.get('/', Controller.getAllAttendance);
router.get('/:id', Controller.getAttendanceById);
router.get('/employee/:employe_id', Controller.getAttendanceByEmployee);

router.post('/check-in', Controller.checkIn);
router.post('/checck-out', Controller.checkOut);

router.put('/:id', Controller.updateAttendance);
router.delete('/:id', Controller.deleteAttendance);


module.exports = router;