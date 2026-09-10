import React from "react";

const celebrationTags = [
  { label: "Weddings", tone: "bg-brand-soft text-brand-strong" },
  { label: "Receptions", tone: "bg-sky-soft text-sky" },
  { label: "Birthday celebrations", tone: "bg-brand-soft text-brand-strong" },
  { label: "Family gatherings", tone: "bg-sky-soft text-sky" },
];

const strengths = [
  {
    title: "Spacious",
    description:
      "A comfortable venue backdrop for larger gatherings, dining layouts, and smooth guest flow.",
    accent: "rgba(15, 118, 110, 0.34)",
    chip: "bg-brand-soft text-brand-strong",
  },
  {
    title: "Flexible",
    description:
      "Suitable for ceremonial moments, festive programs, and thoughtful event arrangements.",
    accent: "rgba(59, 130, 246, 0.32)",
    chip: "bg-sky-soft text-sky",
  },
  {
    title: "Memorable",
    description:
      "Built for celebrations that feel calm, polished, and easy to enjoy from start to finish.",
    accent: "rgba(15, 118, 110, 0.34)",
    chip: "bg-brand-soft text-brand-strong",
  },
];

// const occasions = [
//   {
//     title: "Marriages and ceremonies",
//     description:
//       "A refined setting for family milestones that deserve elegance and room to breathe.",
//     tone: "bg-brand-soft",
//     text: "text-brand-strong",
//     accent: "rgba(15, 118, 110, 0.34)",
//   },
//   {
//     title: "Parties and receptions",
//     description:
//       "A dependable option for joyful gatherings that need space, flow, and a welcoming atmosphere.",
//     tone: "bg-sky-soft",
//     text: "text-sky",
//     accent: "rgba(59, 130, 246, 0.32)",
//   },
//   {
//     title: "Festive occasions",
//     description:
//       "Ideal for cultural events, seasonal functions, and special get-togethers with a polished feel.",
//     tone: "bg-brand-soft",
//     text: "text-brand-strong",
//     accent: "rgba(15, 118, 110, 0.34)",
//   },
// ];

const OtherPartners = () => {
  return (
    <section className="relative bg-[linear-gradient(180deg,rgba(251,254,254,0.88),rgba(244,249,255,0.9))] px-5 py-16 sm:px-6 sm:py-20 animate-rise backdrop-blur-sm overflow-hidden">
      {/* AI-generated celebration balloons artwork */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-0 h-[260px] w-[260px] sm:-right-14 sm:h-[340px] sm:w-[340px] lg:-right-20 lg:h-[420px] lg:w-[420px] opacity-70"
        style={{ animation: "blob-drift 18s ease-in-out infinite alternate" }}
      >
        <img
          src="/ai/partners-art.svg"
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="mx-auto max-w-[1120px]">
        <div className="animate-rise mb-5 flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-strong">
            OTHER PARTNERS
          </span>
          <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(15,118,110,0.18),rgba(59,130,246,0.18))]" />
          <span className="text-[10px] text-[#64748B]">
            Community collaborations we value
          </span>
        </div>

        <div
          className="animate-rise animate-lift overflow-hidden rounded-[28px] border border-[#dbe7e4] bg-white/90 shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur-sm"
          style={{ animationDelay: "100ms" }}
        >
          <div className="grid gap-0 md:grid-cols-[1.08fr_.92fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="inline-flex rounded-full bg-[linear-gradient(135deg,rgba(230,255,251,0.95),rgba(232,241,255,0.95))] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-strong">
                Celebration venue partner
              </p>

              <h2 className="mt-3 font-[Plus_Jakarta_Sans] text-[30px] font-semibold leading-tight tracking-[-0.5px] text-[#0F172A] sm:text-[36px]">
                Panchwati Lawn
              </h2>

              <p className="mt-4 max-w-[700px] text-sm leading-7 text-[#475569] sm:text-[15px]">
                For parties, marriages, and any celebration, Panchwati Lawn
                offers a generous setting with a soft, welcoming feel. It suits
                occasions that need comfort, movement, and a polished backdrop
                without visual clutter.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {celebrationTags.map((item) => (
                  <span
                    key={item.label}
                    className={`animate-lift rounded-full border border-[#dbe7e4] px-3 py-1.5 text-xs font-semibold ${item.tone}`}
                  >
                    {item.label}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {strengths.map((item) => (
                  <div
                    key={item.title}
                    className="animate-lift rounded-2xl border border-[#dbe7e4] bg-white/95 p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)]"
                    style={{ borderLeft: `4px solid ${item.accent}` }}
                  >
                    <div
                      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${item.chip}`}
                    >
                      {item.title}
                    </div>

                    <p className="mt-3 text-sm leading-6 text-[#475569]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[linear-gradient(180deg,rgba(230,255,251,0.92),rgba(232,241,255,0.92))] p-6 text-[#0F172A] sm:p-8 lg:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-strong">
                Best for
              </p>

              {/* <div className="mt-5 space-y-4">
                {occasions.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/80 bg-white/85 p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)] backdrop-blur-sm"
                    style={{ borderLeft: `4px solid ${item.accent}` }}
                  >
                    <h3 className={`text-sm font-semibold ${item.text}`}>
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[#475569]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div> */}

              <div className="mt-6 rounded-2xl border border-white/80 bg-[linear-gradient(135deg,rgba(230,255,251,0.95),rgba(232,241,255,0.95))] p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-strong">
                  In one line
                </p>
                <p className="mt-2 text-sm leading-6 text-[#475569]">
                  A dependable venue partner for celebrations that deserve a
                  little more space, softness, and ease.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OtherPartners;
