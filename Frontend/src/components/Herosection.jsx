import React from "react";
import {
  ArrowRight,
  Clock3,
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
  },
  {
    icon: Truck,
    title: "Free delivery",
    copy: "Available within a 5 km local delivery zone.",
    tone: "bg-sky-soft",
    textTone: "text-sky",
  },
  {
    icon: Clock3,
    title: "Fast turnaround",
    copy: "Built for same-day local order handling.",
    tone: "bg-amber-soft",
    textTone: "text-amber",
  },
  {
    icon: PackageCheck,
    title: "Secure packaging",
    copy: "Tamper-evident, carefully packed medicines.",
    tone: "bg-violet-soft",
    textTone: "text-violet",
  },
];

const Herosection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(251,254,254,0.92)_0%,rgba(245,251,249,0.82)_58%,rgba(238,244,251,0.88)_100%)] px-5 py-10 sm:px-[5%] sm:py-14 backdrop-blur-sm lg:min-h-[calc(100svh-88px)] lg:py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[linear-gradient(135deg,rgba(15,118,110,0.12),rgba(59,130,246,0.07),rgba(255,255,255,0))]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[repeating-linear-gradient(135deg,rgba(15,118,110,0.03)_0_1px,transparent_1px_34px)] opacity-70 animate-sheen"
      />

      <div className="relative mx-auto grid max-w-[1540px] grid-cols-1 items-center gap-10 lg:min-h-[calc(100svh-176px)] lg:grid-cols-[1.02fr_.98fr] lg:items-stretch lg:gap-16 xl:gap-20">
        {/* LEFT CONTENT */}
        <div className="relative z-10 lg:flex lg:flex-col lg:justify-center lg:py-6 xl:py-10">
          <div className="animate-rise animate-lift mb-5 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-[linear-gradient(135deg,rgba(230,255,251,0.92),rgba(232,241,255,0.92),rgba(255,246,232,0.92))] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-strong shadow-sm backdrop-blur">
            <Sparkles size={14} className="text-brand" />
            Trusted digital pharmacy
            <span className="mx-1 text-[#94A3B8]">|</span>
            <span className="text-[var(--text)]">Free delivery within 5 km</span>
          </div>

          <h1
            className="animate-rise max-w-[12ch] font-[Plus_Jakarta_Sans] text-[clamp(36px,4.3vw,62px)] font-extrabold leading-[1.03] tracking-[-1.8px] text-[#0F172A]"
            style={{ animationDelay: "90ms" }}
          >
            Genuine medicines
            <br />
            delivered with{" "}
            <span className="text-brand">care</span>
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
              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className="animate-rise animate-lift rounded-2xl border border-white/80 bg-white/92 p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)] backdrop-blur"
                  style={{ animationDelay: `${index * 90 + 220}ms` }}
                >
                  <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl ${item.tone} ${item.textTone}`}>
                    <Icon size={18} />
                  </div>

                  <div className={`mb-3 h-1.5 w-14 rounded-full ${item.tone}`} />

                  <h3 className="text-sm font-bold text-[#0F172A]">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[var(--text)]">
                    {item.copy}
                  </p>
                </div>
              )
            })}
          </div>

          <div
            className="animate-rise mt-7 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "560ms" }}
          >
            <button
              type="button"
              onClick={() => navigate("/order")}
              className="animate-lift inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-brand px-6 py-3.5 text-sm font-bold text-white shadow-brand transition hover:bg-brand-strong"
            >
              Order with prescription
              <ArrowRight size={17} />
            </button>

            <a
              href="tel:6392323282"
              className="animate-lift inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-brand-strong transition hover:border-brand/20 hover:bg-brand-soft"
            >
              <PhoneCall size={17} />
              Call Pharmacist
            </a>
          </div>

          <div
            className="animate-rise mt-5 flex flex-wrap items-center gap-2 text-[11px] text-[#64748B]"
            style={{ animationDelay: "640ms" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/80 px-3 py-2 font-semibold text-brand-strong shadow-sm">
              <ShieldCheck size={14} />
              Secure healthcare portal
            </span>
            <span>•</span>
            <span>Pharmacist-guided service with clear communication</span>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative z-10 lg:flex lg:flex-col lg:justify-center lg:py-6">
          <div className="absolute inset-4 rounded-[2.35rem] border border-white/70 bg-white/70 shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:inset-8" />

          <div className="relative isolate animate-rise animate-lift overflow-hidden rounded-[2.35rem] border border-[#dbe7e4] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)] lg:min-h-[680px] xl:min-h-[740px]">
            <div className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-strong shadow-sm backdrop-blur">
              <ShieldCheck size={14} className="text-brand" />
              Pharmacist verified
            </div>

            <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_38%,rgba(15,23,42,0.06)_100%)]" />

            <img
              className="absolute inset-0 z-0 h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
              src="/hero.png"
              alt="Pharmacist preparing a medicine order"
            />

            <div className="absolute bottom-5 left-5 right-5 z-20 hidden gap-3 lg:grid lg:grid-cols-3">
              <div className="rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-strong">
                  Delivery
                </p>
                <p className="mt-1 text-sm font-semibold text-[#0F172A]">
                  Free within 5 km
                </p>
              </div>

              <div className="rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-sky">
                  Review
                </p>
                <p className="mt-1 text-sm font-semibold text-[#0F172A]">
                  Pharmacist checked
                </p>
              </div>

              <div className="rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-sm backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-amber">
                  Packaging
                </p>
                <p className="mt-1 text-sm font-semibold text-[#0F172A]">
                  Secure and careful
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Herosection
