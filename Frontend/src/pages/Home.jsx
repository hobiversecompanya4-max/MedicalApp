import Navbar from '../components/Navbar'
import Herosection from '../components/Herosection'
import Footer from '../components/Footer'
import FAQ from '../components/FAQ'
import OtherPartners from '../components/OtherPartners'
import HowToOrder from '../components/HowToOrder'
import WhyDifferent from '../components/WhyDifferent'
import CustomerExperiences from '../components/CustomerExperiences'
import StoreLocation from '../components/StoreLocation'
import AuthModal from '../components/AuthModal'
import { useNavigate } from 'react-router-dom'

const Home = ({ authMode }) => {
  const navigate = useNavigate()
  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#fbfefe_0%,#f5faf8_48%,#f4f7ff_100%)]">
      <div aria-hidden="true" className="site-ambient pointer-events-none absolute inset-0 z-0" />
      <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 z-[1]" />

      <div className="relative z-10">
        <Navbar/>
        <Herosection/>
        <HowToOrder/>
        <WhyDifferent/>
        <FAQ/>
        <CustomerExperiences/>
        <OtherPartners/>
        <StoreLocation/>
        <Footer/>
      </div>
      {authMode && <AuthModal mode={authMode} onClose={() => navigate('/')} />}
    </div>
  )
}

export default Home
