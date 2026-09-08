import React from 'react'
import Navbar from '../components/Navbar'
import AdminSection from '../components/AdminSection'
import { Navigate } from 'react-router-dom';

const Admin = () => {
  const adminToken = localStorage.getItem("adminToken");

  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }
  return (
    <div>
      <Navbar/>
      <AdminSection/>
    </div>
  )
}

export default Admin