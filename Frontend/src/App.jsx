import { useState } from "react";
import api from "./services/api";
import { useEffect } from "react";

import Home from "./pages/Home.jsx"
import Order from "./pages/Order.jsx"
import Admin from "./pages/Admin.jsx"
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import {
  ArrowRight,
  Check,
  ClipboardList,
  FileImage,
  HeartPulse,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Upload,
  Users,
} from "lucide-react";
import "./App.css";
import Contact from "./pages/Contact.jsx";

const sampleOrders = [
  {
    id: "RX-1048",
    name: "Aarav Mehta",
    medicine: "Amoxicillin 500mg",
    date: "Today, 10:42 AM",
    status: "Reviewing",
    initials: "AM",
  },
  {
    id: "RX-1047",
    name: "Meera Shah",
    medicine: "Vitamin D3 · 60 capsules",
    date: "Today, 09:18 AM",
    status: "Ready",
    initials: "MS",
  },
  {
    id: "RX-1046",
    name: "Kabir Rao",
    medicine: "Amlodipine 5mg",
    date: "Yesterday, 04:32 PM",
    status: "Delivered",
    initials: "KR",
  },
];
function App() {
  useEffect(() => {
  api.get("/health")
    .then((data) => {
      console.log("Backend connected:", data);
    })
    .catch((error) => {
      console.error("Backend connection failed:", error);
    });
}, []);
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
    </BrowserRouter>
  );
}
export default App;
