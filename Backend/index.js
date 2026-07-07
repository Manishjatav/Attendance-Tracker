// jai shree ram
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

import { createAccount, loginUser, validateLogin, validateRegister} from "./controler/user.controler.js";
import { valid, getDashboardData, addSubject, getSubjects , markAttendance} from "./controler/dashboard.controler.js"

import dotenv from "dotenv";
dotenv.config();

// database file for connection 
import connectDB from "./model/db.js";
connectDB();


//port
const PORT = process.env.PORT || 4001;


// adding routes
app.post("/login",validateLogin,loginUser);
app.post("/register",validateRegister, createAccount);

app.get("/dashboard", valid, getDashboardData);

app.post("/dashboard/add-subject", valid, addSubject);
app.get("/dashboard/subjects", valid, getSubjects);

app.post("/dashboard/attendance", valid, markAttendance);


app.listen(PORT, () => {
  console.log(`Server Srm app listening on port ${PORT}`)
})