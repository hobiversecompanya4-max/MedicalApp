import { Activity } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser, isLoggedIn, logout } from '../services/auth'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Order', href: '/order' },
    { label: 'Contact', href: '/contact' },
    { label: 'Admin', href: '/admin' },
  ]

  const loggedIn = isLoggedIn()
  const user = getUser()

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
    navigate('/login')
  }

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('admin')
    setIsMenuOpen(false)
    navigate('/admin/login')
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Brand Logo */}
        <a
          href="/"
          className="flex items-center gap-2.5 text-xl font-bold text-[#126b5b]"
        >
          <img
            src="/logo.png"
            alt="Quick Meds logo"
            className="h-10 w-10 object-contain"
          />
          <span>Quick Meds</span>
        </a>

        {/* Hamburger */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="rounded p-1 text-2xl text-[#126b5b] transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#126b5b] sm:hidden"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Navigation */}
        <div
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } absolute left-0 top-full w-full flex-col gap-4 border-t border-gray-100 bg-white px-6 py-5 shadow-lg sm:static sm:flex sm:w-auto sm:flex-row sm:items-center sm:gap-6 sm:border-0 sm:p-0 sm:shadow-none`}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-[15px] font-medium text-gray-700 transition hover:text-[#126b5b]"
            >
              {link.label}
            </a>
          ))}

          {/* Admin Auth */}
          {localStorage.getItem('adminToken') ? (
            <button
              type="button"
              onClick={handleAdminLogout}
              className="inline-flex w-fit items-center justify-center rounded-lg bg-red-500 px-5 py-2 text-[15px] font-medium text-white transition hover:bg-red-600"
            >
              Admin Logout
            </button>
          ) : null}

          {/* User / Auth */}
          {loggedIn ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false)
                  navigate('/profile')
                }}
                className="text-[15px] font-medium text-gray-700 transition hover:text-[#126b5b]"
              >
                My Profile
              </button>
              <span className="text-sm font-medium text-gray-600">
                Hi, {user?.name || 'User'}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex w-fit items-center justify-center rounded-lg bg-red-500 px-5 py-2 text-[15px] font-medium text-white transition hover:bg-red-600"
              >
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
                className="text-[15px] font-medium text-gray-700 transition hover:text-[#126b5b]"
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false)
                  navigate('/register')
                }}
                className="inline-flex w-fit items-center justify-center rounded-lg bg-[#126b5b] px-5 py-2 text-[15px] font-medium text-white transition hover:bg-[#0e5447]"
              >
                Register
              </button>
            </>
          )}

          {/* Existing Activity Button */}
          <a
            onClick={() => setIsMenuOpen(false)}
            className="inline-flex w-fit cursor-pointer items-center justify-center rounded-lg bg-[#126b5b] px-5 py-2 text-[15px] font-medium text-white transition hover:bg-[#0e5447] focus:ring-2 focus:ring-[#126b5b] focus:ring-offset-1"
          >
            <Activity />
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
