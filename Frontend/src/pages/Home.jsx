import React from 'react'
import Navbar from '../components/Navbar'
import Herosection from '../components/Herosection'
import Footer from '../components/Footer'
import FAQ from '../components/FAQ'
import OtherPartners from '../components/OtherPartners'
import HowToOrder from '../components/HowToOrder'
import StoreLocation from '../components/StoreLocation'

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Navbar/>
      <Herosection/>
      <HowToOrder/>
      <FAQ/>
      <OtherPartners/>
      <StoreLocation/>
      <Footer/>
    </div>
  )
}

export default Home
