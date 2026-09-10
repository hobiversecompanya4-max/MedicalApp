import { BadgePercent, Gift, Headphones, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react'

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Genuine medicines, every time',
    description: 'We source through trusted channels and keep verification at the center of every order.',
    tone: 'bg-brand-soft',
    textTone: 'text-brand-strong',
  },
  {
    icon: HeartHandshake,
    title: 'Pharmacist-led care',
    description: 'Get a real person to review prescriptions and answer medicine-related questions with care.',
    tone: 'bg-sky-soft',
    textTone: 'text-sky',
  },
  {
    icon: Gift,
    title: 'Rewards for regular customers',
    description: 'Returning customers can unlock special discounts and thoughtful savings on eligible orders.',
    tone: 'bg-amber-soft',
    textTone: 'text-amber',
  },
  {
    icon: Headphones,
    title: 'Support beyond checkout',
    description: 'From order updates to delivery questions, our support stays close when you need it.',
    tone: 'bg-violet-soft',
    textTone: 'text-violet',
  },
]

const WhyDifferent = () => {
  return (
    <section
      id="why-different"
      className="animate-rise bg-[linear-gradient(180deg,rgba(244,250,248,0.76),rgba(255,248,237,0.7))] px-5 py-14 sm:px-8 sm:py-16"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 overflow-hidden rounded-[28px] border border-[#d8e4e1] bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:p-10">
          <div className="relative">
            <div className="absolute -left-10 -top-12 h-36 w-36 rounded-full bg-brand-soft/80 blur-2xl" aria-hidden="true" />
            <div className="relative">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-soft px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-strong">
                <Sparkles size={14} />
                More than a medicine delivery
              </p>
              <h2 className="font-[Plus_Jakarta_Sans] text-[clamp(28px,3vw,40px)] font-semibold leading-tight tracking-[-0.8px] text-[#0F172A]">
                Why are we different from others?
              </h2>
              <p className="mt-4 max-w-[440px] text-sm leading-7 text-[var(--text)] sm:text-[15px]">
                We combine the convenience of digital ordering with the reassurance of a neighborhood pharmacy that remembers you.
              </p>

              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-amber/20 bg-amber-soft px-4 py-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-amber shadow-sm">
                  <BadgePercent size={21} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0F172A]">Regular customers get special savings</p>
                  <p className="mt-0.5 text-xs leading-5 text-[var(--text)]">Because loyalty should feel appreciated.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, description, tone, textTone }, index) => (
              <article
                key={title}
                className="animate-rise animate-lift rounded-2xl border border-[#dbe7e4] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition hover:border-brand/25 hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)]"
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