import React, { useState } from "react";
import { ChevronDown, HelpCircle, PhoneCall } from "lucide-react";

const faqs = [
  {
    question: "Can I order medicines without an official prescription?",
    answer:
      "Over-the-counter products such as vitamins, antacids, first-aid items, and monitoring tools do not require a prescription. Prescription medicines still need a valid prescription from a licensed healthcare professional.",
  },
  {
    question: "How will I know when my prescription has been verified?",
    answer:
      "Once our pharmacy team reviews your prescription, your order status is updated so you can track the verification progress without guesswork.",
  },
  {
    question: "What happens if my doctor prescribed a high-cost brand medicine?",
    answer:
      "Our pharmacists can check available alternatives and let you know whether an approved generic or lower-cost option is suitable for your prescription.",
  },
  {
    question: "How are cold-storage items like insulin transported?",
    answer:
      "Temperature-sensitive medicines are packed using appropriate insulated packaging and monitored during delivery to help maintain the required cold-chain conditions.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section
      id="faq"
      className="relative bg-[linear-gradient(180deg,rgba(247,251,250,0.78),rgba(244,238,255,0.72))] px-5 py-16 sm:px-6 sm:py-20 animate-rise backdrop-blur-sm overflow-hidden"
    >
      {/* AI-generated medical shield artwork */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-0 h-[280px] w-[280px] sm:-right-16 sm:h-[380px] sm:w-[380px] lg:-right-20 lg:h-[460px] lg:w-[460px] opacity-60"
        style={{ animation: "blob-drift 18s ease-in-out infinite alternate" }}
      >
        <img
          src="/ai/cross-art.svg"
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Floating medical icons */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-8 top-20 h-20 w-20 sm:left-12 sm:top-28 sm:h-24 sm:w-24 lg:left-16 lg:top-36 lg:h-28 lg:w-28 animate-lift"
        style={{ animationDelay: "0.4s" }}
      >
        <span
          className="absolute left-2 top-2 text-3xl sm:text-4xl"
          style={{ animation: "pill-float 9s ease-in-out infinite" }}
        >
          🏥
        </span>
        <span
          className="absolute right-1 top-5 text-2xl sm:text-3xl"
          style={{ animation: "pill-float 7s ease-in-out infinite 1s" }}
        >
          💊
        </span>
      </div>

      <div className="mx-auto max-w-[1000px]">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="animate-rise mb-2 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-[linear-gradient(135deg,rgba(230,255,251,0.95),rgba(232,241,255,0.95),rgba(255,246,232,0.92))] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-strong shadow-sm">
            <HelpCircle size={14} />
            Clarifications & guidance
          </p>

          <h2
            className="animate-rise font-[Plus_Jakarta_Sans] text-[clamp(30px,3.1vw,40px)] font-semibold leading-tight tracking-[-0.5px] text-[#0F172A]"
            style={{ animationDelay: "90ms" }}
          >
            Frequently asked questions
          </h2>

          <p
            className="animate-rise mt-3 text-sm leading-6 text-[var(--text)] sm:text-[15px]"
            style={{ animationDelay: "150ms" }}
          >
            A quick guide to ordering, verification, and delivery so the
            experience feels clear from the start.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="group relative overflow-hidden rounded-3xl border border-[#dbe7e4] bg-white/90 shadow-[0_1px_3px_rgba(15,23,42,0.04)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/20 hover:shadow-[0_12px_28px_rgba(15,23,42,0.08)]"
                style={{ animation: "rise-up 0.6s cubic-bezier(0.16,1,0.3,1) both", animationDelay: `${index * 110 + 200}ms` }}
              >
                {/* Hover glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-4 -left-4 h-8 w-8 rounded-full bg-gradient-to-br from-brand-soft/60 to-sky-soft/60 blur-2xl opacity-0 transition-all duration-500 group-hover:opacity-100"
                />

                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex min-h-[58px] w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-[#0F172A] transition hover:bg-brand-soft/40 sm:px-6 sm:text-[15px]"
                >
                  <span>{faq.question}</span>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand/10 bg-brand-soft text-brand-strong transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown size={18} className="transition-transform duration-300 group-hover:scale-110" />
                  </span>
                </button>

                {isOpen && (
                  <div
                    className="border-t border-[#eef2f1] px-5 pb-5 pt-1 sm:px-6"
                    style={{ animation: "lift-in 0.4s cubic-bezier(0.16,1,0.3,1) both", animationDelay: "50ms" }}
                  >
                    <p className="max-w-[900px] text-sm leading-6 text-[var(--text)]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          className="relative z-10 animate-rise animate-lift mt-7 flex flex-col gap-4 rounded-3xl border border-brand/15 bg-[linear-gradient(135deg,rgba(230,255,251,0.92),rgba(232,241,255,0.92),rgba(255,246,232,0.9))] px-5 py-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] sm:flex-row sm:items-center sm:justify-between sm:px-6 transition-all duration-300 hover:shadow-md"
          style={{ animationDelay: "540ms" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-brand shadow-sm transition-transform duration-300 hover:scale-110">
              <PhoneCall size={18} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#0F172A] sm:text-[14px]">
                Still have a question about your medication?
              </h3>

              <p className="mt-1 text-sm text-[var(--text)] sm:text-[12px]">
                Our pharmacist support line is ready to help with orders and
                guidance.
              </p>
            </div>
          </div>

          <a
            href="tel:6392323282"
            className="relative z-20 inline-flex min-h-[46px] min-w-[170px] items-center justify-center whitespace-nowrap rounded-2xl bg-brand px-5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(15,118,110,0.25)] transition-all duration-300 hover:bg-brand-strong hover:shadow-lg hover:shadow-brand/30 active:scale-95"
          >
            Call Pharmacist
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
