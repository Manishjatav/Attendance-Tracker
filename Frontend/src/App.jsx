import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashbaord from "./Pages/Dashbaord";
import TodayAttendance from "./Pages/TodayAttendace";
import Cgpa from "./Pages/Cgpa"

function App() {
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f2f0ff] to-white font-normal tracking-tight">
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" replace /> : <Home />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashbaord />} />
        <Route
          path="/dashboard/today-attendance"
          element={<TodayAttendance />}
        />
        <Route path="/dashboard/cgpa" element={<Cgpa />} />
        
      </Routes>
    </div>
  );
}

export default App; 