import { LogOut, Menu, PhoneCall, UserRound, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { isLoggedIn, logout } from '../services/auth'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Order', to: '/order' },
    { label: 'Contact', to: '/contact' },
  ]

  const loggedIn = isLoggedIn()
  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/90 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl animate-rise">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <a
          href="/"
          className="group flex items-center gap-3 text-xl font-bold text-brand transition-transform duration-300 hover:translate-y-[-1px]"
        >
          <img
            src="/logo.png"
            alt="Panchawati Meds logo"
            className="h-11 w-11 rounded-2xl object-contain transition-transform duration-300 group-hover:scale-105"
          />

          <span className="leading-none">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748B]">
              Digital Pharmacy
            </span>
            <span className="block text-[17px] text-brand-strong sm:text-xl">
              Panchawati Meds
            </span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center rounded-full border border-slate-200/80 bg-white/80 px-2 py-2 shadow-sm lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-brand-soft text-brand-strong shadow-sm'
                    : 'text-slate-600 hover:bg-brand-soft/70 hover:text-brand-strong'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <a
            href="tel:6392323282"
            className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-soft px-4 py-2 text-sm font-semibold text-brand-strong transition hover:-translate-y-[1px] hover:border-brand/25 hover:bg-brand-soft/80"
          >
            <PhoneCall size={16} />
            Call Pharmacist
          </a>

          {loggedIn ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false)
                  navigate('/profile')
                }}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-[1px] hover:border-brand/20 hover:text-brand-strong"
              >
                <UserRound size={16} />
                Profile
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-[1px] hover:bg-brand-strong"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false)
                  navigate('/login')
                }}
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-[1px] hover:text-brand-strong"
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false)
                  navigate('/register')
                }}
                className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-brand transition hover:-translate-y-[1px] hover:bg-brand-strong"
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-brand/20 hover:text-brand-strong focus:outline-none focus:ring-2 focus:ring-brand sm:hidden"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Navigation */}
        <div
          className={`${
            isMenuOpen ? 'flex animate-rise' : 'hidden'
          } absolute left-0 top-full w-full flex-col gap-4 border-b border-white/70 bg-white/95 px-5 py-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:hidden`}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `rounded-2xl px-4 py-3 text-base font-semibold transition ${
                  isActive
                    ? 'bg-brand-soft text-brand-strong'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-brand-strong'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <a
            href="tel:6392323282"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-soft px-4 py-3 text-base font-semibold text-brand-strong"
            onClick={() => setIsMenuOpen(false)}
          >
            <PhoneCall size={17} />
            Call Pharmacist
          </a>

          {loggedIn ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false)
                  navigate('/profile')
                }}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-base font-semibold text-slate-700"
              >
                <UserRound size={17} />
                Profile
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-base font-semibold text-white"
              >
                <LogOut size={17} />
                Logout
              </button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false)
                  navigate('/login')
                }}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-base font-semibold text-slate-700"
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false)
                  navigate('/register')
                }}
                className="rounded-2xl bg-brand px-4 py-3 text-base font-semibold text-white shadow-brand"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
