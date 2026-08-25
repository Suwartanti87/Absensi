const express = require("express");

const router = express.Router();

const {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    getEmployeeByCode,
    updateEmployee,
    deleteEmployee
} = require("../controllers/employeeController");

//midlleware atau untuk validasi
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// GET semua employee
router.get("/", 
    authMiddleware, 
    roleMiddleware("EMPLOYEE", "HR_ADMIN"),
    getAllEmployees);

// GET employee berdasarkan employeeCode
// Ini nanti berguna untuk QR
router.get("/code/:employeeCode",
    authMiddleware, 
    roleMiddleware("EMPLOYEE", "HR_ADMIN"), 
    getEmployeeByCode);

// GET employee berdasarkan ID
router.get("/:id",
    authMiddleware, 
    roleMiddleware("EMPLOYEE", "HR_ADMIN"), 
    getEmployeeById);

// CREATE employee
router.post("/", 
    authMiddleware, 
    roleMiddleware("EMPLOYEE", "HR_ADMIN"),
    createEmployee);

// UPDATE employee
router.put("/:id",
    authMiddleware, 
    roleMiddleware("EMPLOYEE", "HR_ADMIN"),
    updateEmployee);

// DELETE employee
router.delete("/:id",
    authMiddleware, 
    roleMiddleware("EMPLOYEE", "HR_ADMIN"),
    deleteEmployee);


module.exports = router;