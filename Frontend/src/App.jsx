import { Routes, Route, Navigate } from "react-router-dom";

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
      </Routes>
    </div>
  );
}

export default App;