import React from "react";
import {
  ArrowRight,
  ClipboardCheck,
  PackageCheck,
  Truck,
  UploadCloud,
} from "lucide-react";

const stepsIllustration = [
  {
    step: 1,
    emoji: "📸",
    bg: "bg-brand-soft",
    text: "text-brand-strong",
  },
  {
    step: 2,
    emoji: "🩺",
    bg: "bg-sky-soft",
    text: "text-sky",
  },
  {
    step: 3,
    emoji: "🚚",
    bg: "bg-amber-soft",
    text: "text-amber",
  },
];

const steps = [
  {
    number: "01",
    icon: UploadCloud,
    title: "Upload your prescription",
    description:
      "Share a clear photo or PDF of your prescription and add the delivery details in one quick step.",
    note: "Accepted formats: JPG, PNG, HEIC, PDF",
    tone: "bg-brand-soft",
    textTone: "text-brand-strong",
    noteHover: "hover:bg-brand-soft",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "Pharmacist review",
    description:
      "Our team checks the prescription carefully, confirms dosage details, and prepares the order for dispatch.",
    note: "Review updates are shared by SMS",
    tone: "bg-sky-soft",
    textTone: "text-sky",
    noteHover: "hover:bg-sky-soft",
  },
  {
    number: "03",
    icon: Truck,
    title: "Fast local delivery",
    description:
      "Your medicines are sealed, packed neatly, and dispatched with a simple handoff for local delivery.",
    note: "Free delivery within 5 km",
    tone: "bg-amber-soft",
    textTone: "text-amber",
    noteHover: "hover:bg-amber-soft",
  },
];

const HowToOrder = () => {
  return (
    <section
      id="how-it-works"
      className="relative bg-[linear-gradient(180deg,rgba(248,252,251,0.76),rgba(239,246,255,0.68))] px-5 py-14 backdrop-blur-sm sm:px-8 sm:py-16 animate-rise overflow-hidden"
    >
      {/* Decorative AI-generated capsules artwork */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 top-0 h-[320px] w-[320px] sm:-right-20 sm:h-[420px] sm:w-[420px] lg:-right-28 lg:h-[520px] lg:w-[520px] opacity-70"
        style={{ animation: "blob-drift 14s ease-in-out infinite alternate" }}
      >
        <img
          src="/ai/capsules-art.svg"
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Floating decorative pills */}
      <div aria-hidden="true" className="pointer-events-none absolute left-4 top-20 h-16 w-16 sm:left-6 sm:top-28 sm:h-20 sm:w-20 lg:left-8 lg:top-36 lg:h-24 lg:w-24 animate-lift" style={{ animationDelay: "0.5s" }}>
        <span className="absolute left-2 top-2 text-2xl sm:text-3xl">💊</span>
        <span className="absolute right-1 top-4 text-xl sm:text-2xl" style={{ animation: "pill-float 7s ease-in-out infinite" }}>🧪</span>
      </div>

      <div className="mx-auto max-w-[1200px] relative rounded-[28px] border border-[#d8e4e1] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(247,251,250,0.88))] px-5 py-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:px-8 sm:py-10 backdrop-blur-sm">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="animate-rise mb-2 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-[linear-gradient(135deg,rgba(230,255,251,0.95),rgba(232,241,255,0.95),rgba(255,246,232,0.95))] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-strong">
            <PackageCheck size={14} />
            Streamlined dispensing workflow
          </p>

          <h2
            className="animate-rise font-[Plus_Jakarta_Sans] text-[clamp(28px,3vw,38px)] font-semibold leading-tight tracking-[-0.8px] text-[#0F172A]"
            style={{ animationDelay: "90ms" }}
          >
            How ordering via prescription works
          </h2>

          <p
            className="animate-rise mx-auto mt-3 max-w-[720px] text-sm leading-6 text-[var(--text)] sm:text-[15px]"
            style={{ animationDelay: "150ms" }}
          >
            The process stays simple, compliant, and easy to follow, so your
            medicine order moves from upload to delivery without unnecessary
            friction.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 right-8 top-11 hidden h-px bg-gradient-to-r from-brand/10 via-brand/30 to-brand/10 lg:block" />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon

              return (
                <div
                  key={step.number}
                  className="animate-rise animate-lift group relative overflow-hidden rounded-3xl border border-[#dbe7e4] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)]"
                  style={{ animationDelay: `${index * 120 + 220}ms` }}
                >
                  {/* Hover background glow */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-gradient-to-br ${step.tone} opacity-60 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-90`}
                  />

                  <div className="mb-5 flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${step.tone} ${step.textTone} shadow-[0_6px_16px_rgba(15,23,42,0.08)] transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon size={20} />
                    </div>

                    <span className={`rounded-full border border-brand/20 bg-white/90 px-3 py-1 text-[11px] font-bold tracking-[0.12em] ${step.tone} ${step.textTone} shadow-sm backdrop-blur-sm transition-transform duration-300 group-hover:scale-105`}>
                      Step {step.number}
                    </span>
                  </div>

                  {/* Floating emoji decoration on hover */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-12 text-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:scale-110"
                    style={{ animation: "pill-float 6s ease-in-out infinite", animationDelay: "0.3s" }}
                  >
                    {stepsIllustration[index].emoji}
                  </div>

                  <h3 className="font-[Plus_Jakarta_Sans] text-[17px] font-semibold leading-6 text-[#0F172A] sm:text-[18px]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[var(--text)]">
                    {step.description}
                  </p>

                  <div className={`mt-5 inline-flex items-center gap-2 rounded-full border border-[#d8e4e1] bg-white/90 px-3 py-2 text-[11px] font-semibold ${step.textTone} transition-all duration-300 hover:bg-brand-soft/50 hover:shadow-sm ${step.noteHover}`}>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    {step.note}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToOrder;
