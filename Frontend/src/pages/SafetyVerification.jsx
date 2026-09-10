import { CheckCircle2, ClipboardCheck, PackageCheck, ShieldCheck, Thermometer } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const safeguards = [
  {
    icon: ShieldCheck,
    title: 'Verified sourcing',
    text: 'Medicines are sourced through trusted, licensed channels and checked before they reach our shelves.',
    color: 'text-brand',
    background: 'bg-brand-soft',
  },
  {
    icon: ClipboardCheck,
    title: 'Prescription review',
    text: 'Our pharmacy team reviews prescription orders so the right medicine, strength, and directions are prepared.',
    color: 'text-sky',
    background: 'bg-sky-soft',
  },
  {
    icon: PackageCheck,
    title: 'Secure packaging',
    text: 'Orders are packed with tamper-evident protection and clear labels to help preserve their integrity in transit.',
    color: 'text-amber',
    background: 'bg-amber-soft',
  },
  {
    icon: Thermometer,
    title: 'Temperature care',
    text: 'Products that need special handling are stored and delivered with appropriate temperature precautions.',
    color: 'text-violet',
    background: 'bg-violet-soft',
  },
]

const SafetyVerification = () => {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fbfefe_0%,#f4faf8_48%,#eef4fb_100%)]">
      <Navbar />
      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <section className="max-w-3xl animate-rise">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Safety & Verification</p>
          <h1 className="serif mt-4 text-4xl font-bold leading-tight text-slate-900 sm:text-6xl">Care you can check at every step.</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">From the source to your doorstep, Panchawati Medical builds simple checks into every order so your medicines arrive genuine, protected, and ready to use.</p>
        </section>

        <section className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" aria-label="Our safety safeguards">
          {safeguards.map(({ icon: Icon, title, text, color, background }) => (
            <article key={title} className="animate-lift rounded-3xl border border-white/80 bg-white/85 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.07)]">
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${background} ${color}`}><Icon size={23} /></div>
              <h2 className="mt-5 text-lg font-bold text-slate-900">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-8 rounded-[2rem] border border-brand/10 bg-white/75 p-7 shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-bold text-brand">A pharmacist is part of the process</p>
            <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">Questions about a medicine or prescription?</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">Our team can help you understand the order process, required prescription details, and special delivery needs. We never replace advice from your doctor.</p>
          </div>
          <div className="rounded-2xl bg-slate-900 p-6 text-white">
            <div className="flex items-center gap-3"><CheckCircle2 className="text-emerald-300" size={21} /><span className="text-sm font-semibold">Before you accept delivery</span></div>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              <li>Check the package seal and label.</li>
              <li>Confirm the medicine name and quantity.</li>
              <li>Contact us if anything looks damaged or unexpected.</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default SafetyVerification