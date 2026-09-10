import { ArrowRight, Gift, Headphones, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react'

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Confidence in every order',
    description: 'Trusted sourcing and careful checks help you order with peace of mind.',
    tone: 'bg-brand-soft',
    textTone: 'text-brand-strong',
  },
  {
    icon: HeartHandshake,
    title: 'A team that remembers you',
    description: 'Get kind, practical support from people who understand your regular needs.',
    tone: 'bg-sky-soft',
    textTone: 'text-sky',
  },
  {
    icon: Gift,
    title: 'Member-only savings',
    description: 'Regular customers can unlock special discounts and better value on eligible refills.',
    tone: 'bg-amber-soft',
    textTone: 'text-amber',
  },
  {
    icon: Headphones,
    title: 'Help when it matters',
    description: 'From recommendations to delivery updates, support stays close after checkout.',
    tone: 'bg-violet-soft',
    textTone: 'text-violet',
  },
]

const WhyDifferent = () => {
  return (
    <section
      id="care-club"
      className="animate-rise bg-[linear-gradient(180deg,rgba(244,250,248,0.82),rgba(232,246,255,0.78))] px-5 py-14 sm:px-8 sm:py-16"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="overflow-hidden rounded-[28px] border border-brand/15 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-soft px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-strong">
                <Sparkles size={14} />
                Panchawati Care Club
              </p>
              <h2 className="font-[Plus_Jakarta_Sans] text-[clamp(28px,3vw,40px)] font-semibold leading-tight tracking-[-0.8px] text-[#0F172A]">
                Your regular medicines, made a little easier.
              </h2>
              <p className="mt-4 max-w-[620px] text-sm leading-7 text-[var(--text)] sm:text-[15px]">
                Join a pharmacy experience that rewards trust with better value, familiar support, and thoughtful service.
              </p>
            </div>

            <a href="/register" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-white shadow-brand transition hover:-translate-y-0.5 hover:bg-brand-strong">
              Join for free <ArrowRight size={16} />
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, description, tone, textTone }, index) => (
              <article
                key={title}
                className="animate-rise animate-lift group relative overflow-hidden rounded-2xl border border-[#dbe7e4] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-[0_16px_34px_rgba(15,23,42,0.1)]"
                style={{ animationDelay: `${index * 100 + 150}ms` }}
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tone} ${textTone}`}>
                  <Icon size={19} />
                </div>
                <h3 className="mt-4 text-[15px] font-bold leading-6 text-[#0F172A]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--text)]">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyDifferent