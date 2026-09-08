import React from 'react'
import { Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import OrderMedicine from '../components/OrderMedicine'
import { isLoggedIn } from '../services/auth'

const Order = () => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />
  }

  return (
    <div>
      <Navbar />
      <OrderMedicine />
      <Footer />
    </div>
  )
}

export default Order