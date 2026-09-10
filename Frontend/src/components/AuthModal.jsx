import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2, LockKeyhole, Mail, Phone, UserRound, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '../services/api'

const AuthModal = ({ mode = 'login', onClose }) => {
  const navigate = useNavigate()
  const isRegister = mode === 'register'
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: name === 'phone' ? value.replace(/\D/g, '') : value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = isRegister
        ? await registerUser(form)
        : await loginUser({ phone: form.phone, password: form.password })

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      onClose()
      navigate('/')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  const switchMode = () => navigate(isRegister ? '/login' : '/register')

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-slate-950/45 px-4 py-6 sm:py-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="animate-rise relative my-auto grid max-h-[calc(100vh-3rem)] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/80 bg-white p-6 shadow-2xl shadow-slate-950/20 sm:grid-cols-[0.85fr_1.15fr] sm:p-0">
        <button type="button" onClick={onClose} aria-label="Close authentication dialog" className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-brand/30 hover:bg-brand-soft hover:text-brand-strong">
          <X size={19} />
        </button>

        <div className="relative mb-7 flex min-h-[300px] items-start overflow-hidden rounded-[1.5rem] p-5 sm:row-span-3 sm:mb-0 sm:min-h-[560px] sm:rounded-none sm:p-10">
          <img src="/hero.png" alt="Panchawati Medical care" className="absolute inset-0 h-full w-full object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#06211d]/80 via-[#0b5f59]/45 to-[#06211d]/55" />
          <div className="relative z-10 pt-5 text-white sm:pt-2">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Panchawati Medical</p>
            <h2 id="auth-modal-title" className="mt-3 text-2xl font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.85)] sm:text-3xl">{isRegister ? 'Create your account' : 'Welcome back'}</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">{isRegister ? 'Join us for simpler medicine ordering and prescription support.' : 'Sign in to manage orders, prescriptions, and delivery updates.'}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:p-10 sm:pb-0">
          {isRegister && (
            <label className="block text-sm font-semibold text-slate-700">Full name
              <span className="relative mt-2 block"><UserRound className="pointer-events-none absolute left-4 top-3.5 text-slate-400" size={18} /><input name="name" value={form.name} onChange={handleChange} required placeholder="Enter your full name" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 font-normal text-slate-900 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10" /></span>
            </label>
          )}

          <label className="block text-sm font-semibold text-slate-700">Phone number
            <span className="relative mt-2 block"><Phone className="pointer-events-none absolute left-4 top-3.5 text-slate-400" size={18} /><input name="phone" type="tel" value={form.phone} onChange={handleChange} required maxLength={10} placeholder="10-digit phone number" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 font-normal text-slate-900 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10" /></span>
          </label>

          {isRegister && (
            <label className="block text-sm font-semibold text-slate-700">Email address <span className="font-normal text-slate-400">(optional)</span>
              <span className="relative mt-2 block"><Mail className="pointer-events-none absolute left-4 top-3.5 text-slate-400" size={18} /><input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 font-normal text-slate-900 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10" /></span>
            </label>
          )}

          <label className="block text-sm font-semibold text-slate-700">Password
            <span className="relative mt-2 block"><LockKeyhole className="pointer-events-none absolute left-4 top-3.5 text-slate-400" size={18} /><input name="password" type="password" value={form.password} onChange={handleChange} required placeholder={isRegister ? 'Create a password' : 'Enter your password'} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 font-normal text-slate-900 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10" /></span>
          </label>

          {error && <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-bold text-white shadow-brand transition hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Please wait...' : isRegister ? 'Create account' : 'Login'}{!loading && <ArrowRight size={17} />}</button>
        </form>

        <div className="mt-6 flex items-center gap-2 rounded-xl bg-brand-soft/60 px-4 py-3 text-xs text-brand-strong sm:mx-10"><CheckCircle2 size={16} /> Your information is encrypted and kept private.</div>
        <p className="mt-6 text-center text-sm text-slate-500 sm:mb-10">{isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}<button type="button" onClick={switchMode} className="font-bold text-brand hover:text-brand-strong hover:underline">{isRegister ? 'Login' : 'Create account'}</button></p>
      </div>
    </div>
  )
}

export default AuthModal