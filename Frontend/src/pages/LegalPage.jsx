import { ArrowLeft, CheckCircle2, FileText, LockKeyhole, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const pageContent = {
  privacy: {
    eyebrow: 'Privacy Policy',
    title: 'Your health information deserves careful handling.',
    intro: 'This policy explains the information Panchawati Medical collects, why we use it, and the choices available to you when you use our pharmacy services.',
    icon: LockKeyhole,
    sections: [
      ['Information we collect', 'We may collect your name, phone number, email address, delivery details, order history, and prescription information when you create an account or place an order. We also receive basic technical information needed to keep the website secure and reliable.'],
      ['How we use information', 'We use information to verify prescriptions, process and deliver orders, provide pharmacist support, communicate service updates, and improve the experience. We do not sell personal health information.'],
      ['How we protect it', 'Access to account and prescription information is limited to people and service providers who need it to operate the pharmacy service. We use reasonable technical and organizational safeguards, but no online service can promise absolute security.'],
      ['Your choices', 'You can ask us to review, update, or correct your account details. You may also contact our support team with questions about how your information is used or retained.'],
    ],
  },
  terms: {
    eyebrow: 'Terms of Service',
    title: 'Clear expectations for a safer pharmacy experience.',
    intro: 'These terms describe the rules for using Panchawati Medical online services, placing orders, and receiving support from our pharmacy team.',
    icon: FileText,
    sections: [
      ['Using the service', 'You agree to provide accurate account and delivery information, keep your login details private, and use the service only for lawful healthcare and ordering needs.'],
      ['Orders and prescriptions', 'Prescription medicines require a valid prescription and may be reviewed by a pharmacist before fulfillment. An order is accepted only when we confirm availability, eligibility, and delivery details.'],
      ['Payments and delivery', 'Prices, delivery timing, and availability may change before an order is confirmed. You should inspect the package and contact us promptly if it is damaged, incomplete, or does not match your order.'],
      ['Medical advice', 'Panchawati Medical helps with medicine access and pharmacist support. Our service does not replace diagnosis, treatment, or advice from your licensed healthcare professional.'],
    ],
  },
  safety: {
    eyebrow: 'Safety Guidelines',
    title: 'Small checks that help protect every order.',
    intro: 'Use these practical guidelines when ordering, receiving, and taking medicines. When in doubt, pause and speak with a doctor or pharmacist.',
    icon: ShieldCheck,
    sections: [
      ['Before ordering', 'Keep your prescription current and share complete medicine details. Tell the pharmacist about allergies, existing conditions, pregnancy, and other medicines when relevant.'],
      ['When your order arrives', 'Check the seal, label, medicine name, strength, quantity, expiry date, and storage instructions. Do not use a package that appears opened, damaged, or unexpectedly warm.'],
      ['Taking medicines', 'Follow the directions on your prescription or label. Do not share prescription medicines, change a dose without medical advice, or use medicine past its expiry date.'],
      ['Get help quickly', 'For a serious reaction, breathing difficulty, severe swelling, or suspected overdose, seek emergency medical help immediately. For order concerns, contact our pharmacist support team.'],
    ],
  },
}

const LegalPage = ({ type }) => {
  const content = pageContent[type]
  const Icon = content.icon

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fbfefe_0%,#f4faf8_48%,#eef4fb_100%)]">
      <Navbar />
      <main className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-brand">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <header className="mt-10 max-w-3xl animate-rise">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand-strong shadow-sm"><Icon size={25} /></div>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-brand">{content.eyebrow}</p>
          <h1 className="serif mt-3 text-4xl font-bold leading-tight text-slate-900 sm:text-6xl">{content.title}</h1>
          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">{content.intro}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Last updated September 2026</p>
        </header>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {content.sections.map(([heading, text], index) => (
            <article key={heading} className="animate-lift rounded-3xl border border-white/80 bg-white/85 p-7 shadow-[0_18px_45px_rgba(15,23,42,0.07)] sm:p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand-strong">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{heading}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-brand/10 bg-brand-soft/60 p-5 text-sm leading-6 text-brand-strong">
          <CheckCircle2 className="mt-0.5 shrink-0" size={18} />
          Need help with a specific order or question? Contact the Panchawati Medical pharmacist support team before proceeding.
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default LegalPage