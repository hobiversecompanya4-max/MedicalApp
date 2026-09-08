import React from "react";

const STORE_MAP_URL = "https://maps.app.goo.gl/iHdoo14SYty1eU426";

const StoreLocation = () => {
  return (
    <section
      id="location"
      className="bg-[#F8FAFC] px-5 py-14 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">

          {/* Store Information */}
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#007A78]">
              📍 VISIT OUR STORE
            </p>

            <h2 className="font-[Plus_Jakarta_Sans] text-[28px] font-semibold leading-tight tracking-[-0.5px] text-[#0F172A] sm:text-[34px]">
              Find QuickMeds Near You
            </h2>

            <p className="mt-4 max-w-[520px] text-sm leading-6 text-[#475569]">
              Prefer to visit us in person? Our medical store is available
              for customers who want to purchase medicines, ask questions,
              or speak directly with our pharmacy team.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-white p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F0FDF4] text-lg text-[#007A78]">
                  📍
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#0F172A]">
                    QuickMeds Medical Store
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#64748B]">
                    Visit our store using the location provided on Google
                    Maps.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-white p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EFF6FF] text-lg text-[#0284C7]">
                  🕐
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#0F172A]">
                    In-Person Assistance
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#64748B]">
                    Our team can help you with medicine availability,
                    prescriptions, and general pharmacy guidance.
                  </p>
                </div>
              </div>
            </div>

            <a
              href={STORE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="qm-btn-primary mt-6 inline-flex"
            >
              📍 Get Directions
              <span>↗</span>
            </a>
          </div>

          {/* Map Card */}
          <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-2 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-xl bg-[#E8F0EC]">

              {/* Decorative map background */}
              <div className="absolute inset-0 opacity-60">
                <div className="absolute left-[10%] top-[18%] h-24 w-24 rounded-full border-[18px] border-white/70" />
                <div className="absolute right-[8%] top-[35%] h-32 w-32 rounded-full border-[22px] border-white/60" />
                <div className="absolute bottom-[12%] left-[28%] h-20 w-36 rotate-12 rounded-full border-[16px] border-white/60" />

                <div className="absolute left-0 top-[48%] h-[3px] w-full rotate-6 bg-white/80" />
                <div className="absolute left-[18%] top-0 h-full w-[3px] rotate-[20deg] bg-white/70" />
              </div>

              {/* Location pin */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-[#007A78] text-2xl text-white shadow-lg">
                  📍
                </div>

                <div className="mt-3 rounded-lg border border-[#E2E8F0] bg-white px-4 py-2 text-center shadow-md">
                  <p className="text-xs font-bold text-[#0F172A]">
                    QuickMeds Medical Store
                  </p>
                  <p className="mt-0.5 text-[10px] text-[#64748B]">
                    Open location in Google Maps
                  </p>
                </div>
              </div>

              <a
                href={STORE_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 z-10 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-[#007A78] shadow-md transition hover:bg-[#F0FDF4]"
              >
                Open Map ↗
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StoreLocation;
