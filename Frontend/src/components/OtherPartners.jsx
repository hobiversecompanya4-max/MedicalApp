import React from "react";

const OtherPartners = () => {
  return (
    <section className="bg-white px-5 py-16 sm:px-6 sm:py-20 animate-rise">
      <div className="mx-auto max-w-[1120px]">
        <div className="animate-rise mb-5 flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
            OTHER PARTNERS
          </span>
          <span className="h-px flex-1 bg-[#E2E8F0]" />
          <span className="text-[10px] text-[#94A3B8]">
            Community collaborations we value
          </span>
        </div>

        <div className="animate-rise animate-lift overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] shadow-[0_12px_30px_rgba(15,23,42,0.05)]" style={{ animationDelay: "100ms" }}>
          <div className="grid gap-0 md:grid-cols-[1.15fr_.85fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                Celebration Venue Partner
              </p>

              <h2 className="mt-3 font-[Plus_Jakarta_Sans] text-[30px] font-semibold leading-tight tracking-[-0.5px] text-[#0F172A] sm:text-[36px]">
                Panchwati Lawn
              </h2>

              <p className="mt-4 max-w-[700px] text-sm leading-7 text-[#475569] sm:text-[15px]">
                For parties, marriages, and any celebration, Panchwati Lawn
                brings a spacious and welcoming setting for the moments that
                matter most. It is a fitting choice when you want an event
                space that feels comfortable, memorable, and ready for guests.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Weddings",
                  "Receptions",
                  "Birthday celebrations",
                  "Family gatherings",
                ].map((item) => (
                  <span
                    key={item}
                    className="animate-lift rounded-full border border-[#D7E3E0] bg-white px-3 py-1.5 text-xs font-semibold text-[#0F172A]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="animate-lift rounded-xl border border-[#E2E8F0] bg-white p-4">
                  <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand">
                    Spacious
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#475569]">
                    A comfortable venue backdrop for larger gatherings and
                    lively celebrations.
                  </p>
                </div>

                <div className="animate-lift rounded-xl border border-[#E2E8F0] bg-white p-4">
                  <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand">
                    Flexible
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#475569]">
                    Suitable for ceremonial moments, dining setups, and festive
                    arrangements.
                  </p>
                </div>

                <div className="animate-lift rounded-xl border border-[#E2E8F0] bg-white p-4">
                  <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand">
                    Memorable
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#475569]">
                    Designed for celebrations that feel warm, polished, and
                    easy to enjoy.
                  </p>
                </div>
              </div>
            </div>

            <div className="animate-rise-delay bg-[#0F172A] p-6 text-white sm:p-8 lg:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7DD3FC]">
                Best for
              </p>

              <div className="mt-5 space-y-4">
                {[
                  {
                    title: "Marriages and ceremonies",
                    description:
                      "A refined setting for the most important family milestones.",
                  },
                  {
                    title: "Parties and receptions",
                    description:
                      "A good fit for joyful gatherings that need room to celebrate comfortably.",
                  },
                  {
                    title: "Festive occasions",
                    description:
                      "Ideal for cultural events, seasonal functions, and special get-togethers.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <h3 className="text-sm font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-[#0EA5E9]/25 bg-[#0B1220] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7DD3FC]">
                  In one line
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  A dependable venue partner for celebrations that deserve a
                  little more space, style, and ease.
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
