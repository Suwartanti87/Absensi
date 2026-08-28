const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoute");  // ini adalah tabel user
const employeeRoute = require('./routes/employeeRoute');
const departmentRoutes = require("./routes/departmentRoute");
const workScheduleRoute = require('./routes/workScheduleRoute');
const attendanceRoute = require('./routes/attendanceRoute');
const attendanceRequestRoute = require('./routes/attendanceRequestRoute');
const visitorRoute = require('./routes/visitorRoute');
const visitorLogRoutes = require('./routes/visitorLogRoutes');


app.use("/api/auth", authRoutes); // ini adalah user
app.use('/api/employee', employeeRoute);
app.use('/api/department', departmentRoutes);
app.use('/api/work-schedule', workScheduleRoute);
app.use('/api/attendance', attendanceRoute);
app.use('/api/attendance-request', attendanceRequestRoute);
app.use('/api/visitor', visitorRoute);
app.use('/api/visitor-log', visitorLogRoutes);


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});