import React from "react";
import {
  ArrowRight,
  BadgePercent,
  CheckCircle2,
  Clock3,
  ChevronRight,
  HeartPulse,
  PackageCheck,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Pharmacist verified",
    copy: "Every prescription is reviewed before dispatch.",
    tone: "bg-brand-soft",
    textTone: "text-brand-strong",
    shadow: "shadow-[0_10px_26px_rgba(18,166,127,0.18)]",
  },
  {
    icon: Truck,
    title: "Free delivery",
    copy: "Available within a 5 km local delivery zone.",
    tone: "bg-sky-soft",
    textTone: "text-sky",
    shadow: "shadow-[0_10px_26px_rgba(77,166,255,0.18)]",
  },
  {
    icon: Clock3,
    title: "Fast turnaround",
    copy: "Built for same-day local order handling.",
    tone: "bg-amber-soft",
    textTone: "text-amber",
    shadow: "shadow-[0_10px_26px_rgba(232,147,12,0.16)]",
  },
  {
    icon: PackageCheck,
    title: "Secure packaging",
    copy: "Tamper-evident, carefully packed medicines.",
    tone: "bg-violet-soft",
    textTone: "text-violet",
    shadow: "shadow-[0_10px_26px_rgba(109,94,240,0.16)]",
  },
];

const floatingPills = [
  { emoji: "💊", className: "left-[4%] top-[16%] text-3xl sm:text-4xl", style: { "--fd": "0s", "--fr": "-8deg" } },
  { emoji: "🧪", className: "right-[6%] top-[24%] text-3xl sm:text-4xl", style: { "--fd": "1.2s", "--fr": "10deg" } },
  { emoji: "🩺", className: "left-[10%] bottom-[20%] text-3xl sm:text-4xl", style: { "--fd": "0.6s", "--fr": "6deg" } },
  { emoji: "💉", className: "right-[12%] bottom-[15%] text-3xl sm:text-4xl", style: { "--fd": "1.8s", "--fr": "-6deg" } },
];

const careMoments = [
  {
    label: "Personal support",
    title: "A pharmacist who listens",
    copy: "Get patient, practical guidance from a real pharmacy team whenever you need help.",
    icon: HeartPulse,
    status: "Human support included",
  },
  {
    label: "Smarter value",
    title: "Save without guesswork",
    copy: "We can point you toward suitable lower-cost options and special savings for regular customers.",
    icon: BadgePercent,
    status: "Value-focused guidance",
  },
  {
    label: "Safe packaging",
    title: "Prepared with care",
    copy: "Medicines are checked, sealed, and packed thoughtfully before they leave our store.",
    icon: PackageCheck,
    status: "Carefully prepared",
  },
];

const Herosection = () => {
  const navigate = useNavigate();
  const [activeCare, setActiveCare] = React.useState(1);
  const activeMoment = careMoments[activeCare];
  const ActiveIcon = activeMoment.icon;

  return (
    <section className="relative overflow-hidden px-5 pb-12 pt-10 sm:px-[5%] sm:pb-16 sm:pt-14 lg:min-h-[calc(100svh-88px)] lg:py-12">
      <div
        aria-hidden="true"
        className="blob-drift pointer-events-none absolute -left-24 -top-24 hidden h-72 w-72 rounded-full bg-brand-soft blur-3xl sm:block"
      />
      <div
        aria-hidden="true"
        className="blob-drift pointer-events-none absolute -right-20 top-10 hidden h-80 w-80 rounded-full bg-violet-soft blur-3xl sm:block"
        style={{ animationDelay: "2s" }}
      />
      <div
        aria-hidden="true"
        className="glow-pulse pointer-events-none absolute inset-x-0 top-0 hidden h-72 bg-[linear-gradient(135deg,rgba(18,166,127,0.16),rgba(109,94,240,0.1),rgba(255,255,255,0))] sm:block"
      />
      <div className="relative mx-auto grid max-w-[1540px] grid-cols-1 items-center gap-10 lg:min-h-[calc(100svh-176px)] lg:grid-cols-[1.02fr_.98fr] lg:items-stretch lg:gap-16 xl:gap-20">
        {/* LEFT CONTENT */}
        <div className="relative z-10 lg:flex lg:flex-col lg:justify-center lg:py-6 xl:py-10">
          <div className="animate-rise animate-lift mb-5 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/85 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-strong shadow-md backdrop-blur">
            <Sparkles size={14} className="glow-pulse text-brand" />
            Trusted digital pharmacy
            <span className="mx-1 text-[#9fbbb3]">|</span>
            <span className="text-[var(--text)]">Free delivery within 5 km</span>
          </div>

          <h1
            className="animate-rise max-w-[12ch] font-[Plus_Jakarta_Sans] text-[clamp(36px,4.3vw,62px)] font-extrabold leading-[1.03] tracking-[-1.8px] text-[#0B2B26]"
            style={{ animationDelay: "90ms" }}
          >
            Genuine medicines
            <br />
            delivered with <span className="text-gradient">care</span>
          </h1>

          <p
            className="animate-rise mt-5 max-w-[620px] text-[15px] leading-7 text-[var(--text)] sm:text-[16px]"
            style={{ animationDelay: "150ms" }}
          >
            Upload your prescription, let our pharmacists verify it, and get
            clean, reliable medicine delivery in a calm, professional
            experience designed around trust.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="animate-rise tile-glow glass-card rounded-2xl p-4"
                  style={{ animationDelay: `${index * 90 + 220}ms` }}
                >
                  <div
                    className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl ${item.tone} ${item.textTone} ${item.shadow}`}
                  >
                    <Icon size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-[#0B2B26]">{item.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-[var(--text)]">{item.copy}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-8 animate-rise flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4" style={{ animationDelay: "300ms" }}>
            <button
              onClick={() => navigate("/order")}
              className="group relative z-20 inline-flex min-h-[52px] items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-brand-strong px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(18,166,127,0.32)] transition-all duration-300 hover:bg-brand hover:shadow-[0_12px_30px_rgba(18,166,127,0.42)] sm:px-8 sm:py-4"
            >
              <span className="relative z-20 inline-flex items-center text-white">
                Order now
                <ArrowRight size={16} className="ml-1.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
              <span className="absolute inset-0 z-0 rounded-full bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
            <a
              href="tel:6392323282"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-7 py-3.5 text-sm font-semibold text-[var(--text)] shadow-sm backdrop-blur transition-all duration-300 hover:bg-white hover:border-brand/40 hover:shadow-md"
            >
              <PhoneCall size={15} className="text-brand" />
              Contact us
            </a>
          </div>

          {/* FLOATING PILL DECORATION */}
          <div aria-hidden="true" className="pointer-events-none relative ml-0 mt-12 hidden h-28 w-80 sm:ml-12 sm:mt-14 sm:block sm:w-96 lg:mr-4 lg:w-auto lg:absolute lg:inset-y-0 lg:right-0 lg:max-w-none">
            {floatingPills.map((pill) => (
              <div
                key={pill.emoji}
                className={`absolute pill-float text-5xl sm:text-6xl`}
                style={pill.style}
              >
                {pill.emoji}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT ART — interactive prescription journey */}
        <div className="relative flex min-h-[420px] items-center overflow-hidden rounded-3xl bg-[#0B2B26] shadow-xl ring-1 ring-white/50 sm:min-h-[480px] lg:min-h-[560px] lg:shadow-[0_30px_70px_-20px_rgba(18,166,127,0.28)]">
          <img
            src="/ai/hero-medicine.svg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-75"
            loading="lazy"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(145deg,rgba(5,38,34,0.2),rgba(5,38,34,0.76))]" />

          <div className="relative z-10 mx-auto w-full max-w-[520px] p-4 sm:p-8 lg:p-10">
            <div className="mb-5 flex items-center justify-between text-white">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-200">The Panchawati difference</p>
                <h2 className="mt-1 text-xl font-bold sm:text-2xl">Care that stays personal</h2>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-emerald-200 backdrop-blur-sm">
                <CheckCircle2 size={20} />
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/20 bg-white/95 p-5 shadow-2xl shadow-black/20 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand-strong">
                  <ActiveIcon size={23} />
                </div>
                <span className="rounded-full bg-brand-soft px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-strong">{activeMoment.status}</span>
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-brand">A better pharmacy experience</p>
              <h3 className="mt-2 text-2xl font-bold text-[#0B2B26]">{activeMoment.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{activeMoment.copy}</p>

              <div className="mt-6 grid gap-2 sm:grid-cols-3">
                {careMoments.map((moment, index) => {
                  const MomentIcon = moment.icon;
                  const isActive = activeCare === index;
                  return (
                    <button
                      key={moment.label}
                      type="button"
                      onClick={() => setActiveCare(index)}
                      aria-label={`Show ${moment.label}`}
                      className={`flex min-h-[68px] items-center gap-2 rounded-2xl border px-3 py-2 text-left transition ${isActive ? "border-brand bg-brand-soft text-brand-strong shadow-sm" : "border-slate-200 bg-white text-slate-500 hover:border-brand/30 hover:bg-brand-soft/50"}`}
                    >
                      <MomentIcon size={16} className="shrink-0" />
                      <span className="text-[11px] font-bold leading-4">{moment.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/order")}
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-emerald-200"
            >
              Start your order <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Herosection;