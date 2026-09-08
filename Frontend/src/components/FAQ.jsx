import React, { useState } from "react";

const faqs = [
  {
    question: "Can I order medicines without an official prescription?",
    answer:
      "Over-the-counter (OTC) products like vitamins, antacids, first-aid bandages, and monitoring equipment do not require a prescription. However, prescription medications require a valid prescription from a licensed healthcare professional.",
  },
  {
    question: "How will I know when my prescription has been verified?",
    answer:
      "Once your prescription has been reviewed and verified by our pharmacy team, your order status will be updated. You can check your order details to see the latest verification status.",
  },
  {
    question: "What happens if my doctor prescribed a high-cost brand medicine?",
    answer:
      "Our pharmacy team can review available options and let you know if an approved generic or lower-cost alternative is available.",
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
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      id="faq"
      className="bg-surface px-5 py-16 sm:px-6 sm:py-20 animate-rise"
    >
      <div className="mx-auto max-w-[1000px]">

        {/* Heading */}
        <div className="mb-8 text-center">
          <p className="animate-rise mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-brand">
            ✦ CLARIFICATIONS & GUIDANCE
          </p>

          <h2 className="animate-rise font-[Plus_Jakarta_Sans] text-[30px] font-semibold leading-tight tracking-[-0.5px] text-[#0F172A] sm:text-[34px]" style={{ animationDelay: "90ms" }}>
            Frequently Asked Questions
          </h2>

          <p className="animate-rise mt-2 text-xs text-[var(--text)] sm:text-[13px]" style={{ animationDelay: "150ms" }}>
            Have questions regarding your prescription order? Review our
            pharmacist guidance below.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-2">

          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="animate-rise animate-lift overflow-hidden rounded-lg border border-[#E2E8F0] bg-white"
                style={{ animationDelay: `${index * 110 + 180}ms` }}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex min-h-[48px] w-full items-center justify-between gap-4 px-5 py-3.5 text-left text-sm font-semibold text-[#0F172A] transition hover:bg-[#F8FAFC] sm:text-[15px]"
                >
                  <span>{faq.question}</span>

                  <span
                    className={`shrink-0 text-base font-bold text-brand transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ↓
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-[#F1F5F9] px-5 pb-4 pt-3">
                    <p className="max-w-[900px] text-xs leading-5 text-[#64748B] sm:text-[13px] sm:leading-6">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

        </div>

        {/* Pharmacist Help */}
        <div className="animate-rise animate-lift mt-6 flex flex-col gap-4 rounded-xl bg-brand-soft px-5 py-5 sm:flex-row sm:items-center sm:justify-between" style={{ animationDelay: "540ms" }}>

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand text-base font-bold text-brand">
              ?
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#0F172A] sm:text-[14px]">
                Still have a question about your medication?
              </h3>

              <p className="mt-1 text-xs text-[var(--text)] sm:text-[12px]">
                Our certified pharmacist hotline is open 24 hours a day, 7
                days a week.
              </p>
            </div>

          </div>

          <a
            href="tel:6392323282"
            className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-brand px-5 text-sm font-bold text-white transition hover:bg-brand-strong"
          >
            ☎ &nbsp; Call Pharmacist
          </a>

        </div>

      </div>
    </section>
  );
};

export default FAQ;
