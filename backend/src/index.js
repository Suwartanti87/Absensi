const express = require("express");

const app = express();

app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoute");
const employeeRoute = require('./routes/employeeRoute');


app.use("/api/auth", authRoutes);
app.use('/api/employee', employeeRoute);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});