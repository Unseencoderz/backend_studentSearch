
require("dotenv").config(); 

const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/students");
const verifyRoutes = require("./routes/verify");
const resetRoutes = require("./routes/reset");
const forgotRoutes = require("./routes/forgot");



connection();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/verify-email", verifyRoutes);
app.use("/api/reset-password", resetRoutes);
app.use("/api/forgot-password",forgotRoutes);



const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
