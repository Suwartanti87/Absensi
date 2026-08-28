const express = require('express');
const router = express.Router();

const workScheduleController= require('../controllers/workScheduleController.js');



// GET semua work schedule
router.get("/", workScheduleController.getAllWorkSchedules);

// GET work schedule berdasarkan ID
router.get("/:id", workScheduleController.getWorkScheduleById);

// CREATE work schedule
router.post("/", workScheduleController.createWorkSchedule);

// UPDATE work schedule
router.put("/:id", workScheduleController.updateWorkSchedule);

// DELETE work schedule
router.delete("/:id", workScheduleController.deleteWorkSchedule);

module.exports = router;