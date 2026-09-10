import api from "./services/api";
import { useEffect } from "react";

import Home from "./pages/Home.jsx"
import Order from "./pages/Order.jsx"
import Admin from "./pages/Admin.jsx"
import Profile from "./pages/Profile.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Contact from "./pages/Contact.jsx";
import SafetyVerification from "./pages/SafetyVerification.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import SafetyGuidelines from "./pages/SafetyGuidelines.jsx";
import ScrollProgress from "./components/ScrollProgress";

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
      <ScrollProgress />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/safety" element={<SafetyVerification />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/safety-guidelines" element={<SafetyGuidelines />} />
        <Route path="/login" element={<Home authMode="login" />} />
        <Route path="/register" element={<Home authMode="register" />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
