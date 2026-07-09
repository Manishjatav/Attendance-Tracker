// jai shree ram
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// adding routes
app.post("/api/login", validateLogin, loginUser);
app.post("/api/register", validateRegister, createAccount);

app.get("/api/dashboard", valid, getDashboardData);

app.post("/api/dashboard/add-subject", valid, addSubject);
app.get("/api/dashboard/subjects", valid, getSubjects);

app.post("/api/dashboard/attendance", valid, markAttendance);


app.use(express.static(path.join(__dirname, "../Frontend/dist")));

app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Your API is running',
    timestamp: new Date().toISOString()
  });
});


app.listen(PORT, () => {
  console.log(`Server Srm app listening on port ${PORT}`)
})
