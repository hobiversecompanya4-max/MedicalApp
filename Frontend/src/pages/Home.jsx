import React from 'react'
import Navbar from '../components/Navbar'
import Herosection from '../components/Herosection'
import Footer from '../components/Footer'
import FAQ from '../components/FAQ'
import HowToOrder from '../components/HowToOrder'
import StoreLocation from '../components/StoreLocation'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Herosection/>
      <HowToOrder/>
      <FAQ/>
      <StoreLocation/>
      <Footer/>
    </div>
  )
}

export default Home