import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import SlotList from "./pages/SlotList";
import MyBookings from "./pages/MyBookings";

import AdminSlots from "./pages/AdminSlots";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBookings from "./pages/AdminBookings"; // ✅ ADD THIS

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* ===== PUBLIC ROUTES ===== */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ===== USER ROUTES ===== */}
        <Route
          path="/"
          element={
            <ProtectedRoute role="user">
              <SlotList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute role="user">
              <MyBookings />
            </ProtectedRoute>
          }
        />

        {/* ===== ADMIN ROUTES ===== */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminSlots />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-bookings"
          element={
            <ProtectedRoute role="admin">
              <AdminBookings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
