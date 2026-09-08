import React from "react";

const steps = [
  {
    number: "01",
    icon: "☁",
    title: "Upload Doctor's Prescription",
    description:
      "Snap a clear photo or attach a digital PDF/image of your doctor's official prescription. Enter delivery location and phone number.",
    note: "Accepts JPG, PNG, HEIC, PDF",
  },
  {
    number: "02",
    icon: "▣",
    title: "Pharmacist Review & Validation",
    description:
      "Our state-licensed pharmacists review dosage instructions, potential drug interactions, and check for bioequivalent generic savings options.",
    note: "SMS approval within 15 mins",
  },
  {
    number: "03",
    icon: "◇",
    title: "Cold-Chain Express Delivery",
    description:
      "Your medicines are sealed in tamper-evident clinical packaging with temperature monitors and dispatched with live GPS doorstep tracking.",
    note: "Live GPS delivery link",
  },
];

const HowToOrder = () => {
  return (
    <section
      id="how-it-works"
      className="bg-surface px-5 py-14 sm:px-8 sm:py-16 animate-rise"
    >
      <div className="mx-auto max-w-[1200px]">

        {/* Section Heading */}
        <div className="mb-8 text-center">
          <p className="animate-rise mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-brand">
            ⚙ STREAMLINED DISPENSING WORKFLOW
          </p>

          <h2 className="animate-rise font-[Plus_Jakarta_Sans] text-[28px] font-semibold leading-tight tracking-[-0.8px] text-[#0F172A] sm:text-[34px]" style={{ animationDelay: "90ms" }}>
            How Ordering via Prescription Works
          </h2>

          <p className="animate-rise mx-auto mt-2 max-w-[700px] text-xs leading-5 text-[var(--text)] sm:text-[13px]" style={{ animationDelay: "150ms" }}>
            Simple, legally compliant, and contact-free. Receive your genuine
            prescription medications in three straightforward milestones.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="animate-rise animate-lift rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)] hover:border-[#0D9488] hover:shadow-[0_10px_20px_-5px_rgba(0,122,120,0.08)]"
              style={{ animationDelay: `${index * 120 + 180}ms` }}
            >

              {/* Number + Icon */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-brand-soft-2 text-[11px] font-bold text-brand">
                  {step.number}
                </div>

                <span className="text-[22px] text-[#A7B7B7]">
                  {step.icon}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-[Plus_Jakarta_Sans] text-[16px] font-semibold leading-6 text-[#0F172A] sm:text-[17px]">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-xs leading-5 text-[var(--text)] sm:text-[13px]">
                {step.description}
              </p>

              {/* Note */}
              <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-brand">
                <span>▣</span>
                <span>{step.note}</span>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default HowToOrder;
