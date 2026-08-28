const express = require('express');
const router = express.Router();

const visitorController = require('../controllers/visitorController.js');


// GET semua visitor
router.get("/", visitorController.getAllVisitors);

// GET visitor berdasarkan ID
router.get("/:id",visitorController. getVisitorById);

// CREATE visitor
router.post("/", visitorController.createVisitor);

// UPDATE visitor
router.put("/:id", visitorController.updateVisitor);

// DELETE visitor
router.delete("/:id", visitorController.deleteVisitor);

module.exports = router;