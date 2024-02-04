
require("dotenv").config(); // Make sure this line is at the top

const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/students");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
