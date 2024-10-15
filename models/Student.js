
// const mongoose = require("mongoose");

// const studentSchema = new mongoose.Schema({
//   "Roll No.": { type: Number, required: true },
//   "Name": { type: String, required: true },
//   "Phone No.": { type: Number, required: true },
//   "DOB": { type: String, required: true },
//   "Library No.": { type: Number, required: true },
//   "Address": { type: String, required: true },
//   "Section": { type: String, required: true },
//   "Father Name": { type: String, required: true }
// });

// const Student = mongoose.model("students", studentSchema);

// module.exports = Student;


import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  "Roll No.": { type: Number, required: true },
  "Name": { type: String, required: true },
  "Phone No.": { type: Number, required: true },
  "DOB": { type: String, required: true },
  "Library No.": { type: Number, required: true },
  "Address": { type: String, required: true },
  "Section": { type: String, required: true },
  "Father Name": { type: String, required: true }
});

const Student = mongoose.model("students", studentSchema);

export default Student;
