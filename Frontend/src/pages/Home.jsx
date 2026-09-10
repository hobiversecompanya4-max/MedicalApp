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
import useScrollReveal from '../hooks/useScrollReveal'
import { CheckCircle2, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useLocation, useNavigate } from 'react-router-dom'

const Home = ({ authMode }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useLanguage()
  const orderSuccess = location.state?.orderSuccess
  useScrollReveal()

  const closeOrderSuccess = () => navigate('/', { replace: true, state: null })

  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#f4fbf7_0%,#eef8f3_48%,#e9f2fd_100%)]">
      <div aria-hidden="true" className="site-ambient pointer-events-none absolute inset-0 z-0" />
      <div aria-hidden="true" className="page-grid pointer-events-none absolute inset-0 z-[1]" />

      <div className="relative z-10">
        <Navbar />
        <Herosection />
        <HowToOrder />
        <WhyDifferent />
        <FAQ />
        <CustomerExperiences />
        <OtherPartners />
        <StoreLocation />
        <Footer />
      </div>
      {authMode && <AuthModal mode={authMode} onClose={() => navigate('/')} />}
      {orderSuccess && !authMode && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-success-title"
          onMouseDown={(event) => event.target === event.currentTarget && closeOrderSuccess()}
        >
          <div className="animate-rise relative w-full max-w-md rounded-3xl border border-white/80 bg-white p-6 text-center shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={closeOrderSuccess}
              aria-label={t('Close order confirmation')}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-brand/30 hover:bg-brand-soft hover:text-brand-strong"
            >
              <X size={18} />
            </button>

            <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
              <CheckCircle2 size={34} />
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-brand">{t('Order confirmed')}</p>
            <h2 id="order-success-title" className="mt-2 text-2xl font-bold text-slate-900">{t('Order successfully placed')}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{t('Your order has been placed successfully. Login to manage and track your order.')}</p>
            <p className="mt-3 rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">{t('Order ID')}: {orderSuccess.orderId}</p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="rounded-xl border border-brand/25 px-4 py-3 text-sm font-bold text-brand-strong transition hover:bg-brand-soft"
              >
                {t('Login')}
              </button>
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="rounded-xl bg-brand px-4 py-3 text-sm font-bold text-white shadow-brand transition hover:bg-brand-strong"
              >
                {t('Track Order')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
