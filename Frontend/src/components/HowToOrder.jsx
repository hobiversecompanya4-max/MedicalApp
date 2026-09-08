import React from "react";
import {
  ArrowRight,
  ClipboardCheck,
  PackageCheck,
  Truck,
  UploadCloud,
} from "lucide-react";

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
      className="bg-[linear-gradient(180deg,rgba(248,252,251,0.76),rgba(239,246,255,0.68))] px-5 py-14 backdrop-blur-sm sm:px-8 sm:py-16 animate-rise"
    >
      <div className="mx-auto max-w-[1200px] rounded-[28px] border border-[#d8e4e1] bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(247,251,250,0.86))] px-5 py-8 shadow-[0_18px_50px_rgba(15,23,42,0.05)] sm:px-8 sm:py-10">
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
                  className="animate-rise animate-lift group rounded-3xl border border-[#dbe7e4] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition hover:border-brand/25 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
                  style={{ animationDelay: `${index * 120 + 220}ms` }}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${step.tone} ${step.textTone}`}
                    >
                      <Icon size={18} />
                    </div>

                    <span className={`rounded-full border border-brand/15 px-3 py-1 text-[11px] font-bold tracking-[0.12em] ${step.tone} ${step.textTone}`}>
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-[Plus_Jakarta_Sans] text-[16px] font-semibold leading-6 text-[#0F172A] sm:text-[17px]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[var(--text)]">
                    {step.description}
                  </p>

                  <div className={`mt-5 inline-flex items-center gap-2 rounded-full border border-[#d8e4e1] bg-white/90 px-3 py-2 text-[11px] font-semibold ${step.textTone} transition ${step.noteHover}`}>
                    <ArrowRight size={14} />
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
