const express = require("express");
const router = express.Router();

// Impor controller menggunakan CommonJS
const {
  checkInVisitor,
  checkOutVisitor,
  getVisitorLogs
} = require("../controllers/visitorLogController");

// Definisi endpoint
router.get("/visitor-logs", getVisitorLogs);
router.post("/visitor-logs/check-in", checkInVisitor);
router.put("/visitor-logs/check-out/:id", checkOutVisitor);

// Ekspor router menggunakan CommonJS
module.exports = router;
