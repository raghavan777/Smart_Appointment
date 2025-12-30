import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SlotList from "./pages/SlotList";

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ ONLY HERE */}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<SlotList />} />
      </Routes>
    </Router>
  );
}

export default App;
