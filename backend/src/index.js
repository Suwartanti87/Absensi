const express = require("express");

const app = express();

app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoute");
const employeeRoute = require('./routes/employeeRoute');
const departmentRoutes = require("./routes/departmentRoute");


app.use("/api/auth", authRoutes);
app.use('/api/employee', employeeRoute);
app.use('/api/department', departmentRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});