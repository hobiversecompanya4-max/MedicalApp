import React from "react";

const STORE_MAP_URL = "https://maps.app.goo.gl/iHdoo14SYty1eU426";

const StoreLocation = () => {
  return (
    <section
      id="location"
      className="relative bg-[linear-gradient(180deg,rgba(247,251,250,0.82),rgba(238,246,244,0.78))] px-5 py-14 sm:px-6 sm:py-16 animate-rise backdrop-blur-sm overflow-hidden"
    >
      {/* AI-generated stylised map artwork */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 top-0 h-[320px] w-[320px] sm:-right-16 sm:h-[420px] sm:w-[420px] lg:-right-20 lg:h-[520px] lg:w-[520px] opacity-60"
        style={{ animation: "blob-drift 15s ease-in-out infinite alternate" }}
      >
        <img
          src="/ai/map-art.svg"
          alt="Stylised map showing delivery route to Panchawati Medical Store"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="mx-auto max-w-[1200px]">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">

          {/* Store Information */}
          <div className="animate-rise">
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-[linear-gradient(135deg,rgba(230,255,251,0.95),rgba(232,241,255,0.95),rgba(255,246,232,0.92))] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-strong shadow-sm">
              📍 Visit our store
            </p>

            <h2 className="font-[Plus_Jakarta_Sans] text-[28px] font-semibold leading-tight tracking-[-0.5px] text-[#0F172A] sm:text-[34px]">
              Find Panchawati Medical Near You
            </h2>

            <p className="mt-4 max-w-[520px] text-sm leading-6 text-[var(--text)]">
              Prefer to visit us in person? Our medical store is available
              for customers who want to purchase medicines, ask questions,
              or speak directly with our pharmacy team.
            </p>

            <div className="mt-6 space-y-3">
              <div className="animate-lift flex items-start gap-3 rounded-2xl border border-[#dbe7e4] bg-white/90 p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)] backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-lg text-brand-strong">
                  📍
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#0F172A]">
                    Panchawati Medical Store
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[var(--text)]">
                    Visit our store using the location provided on Google
                    Maps.
                  </p>
                </div>
              </div>

              <div className="animate-lift flex items-start gap-3 rounded-2xl border border-[#dbe7e4] bg-white/90 p-4 shadow-[0_1px_3px_rgba(15,23,42,0.04)] backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-soft text-lg text-sky">
                  🕐
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#0F172A]">
                    In-Person Assistance
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[var(--text)]">
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
              className="qm-btn-primary animate-lift mt-6 inline-flex"
            >
              📍 Get Directions
              <span>↗</span>
            </a>
          </div>

          {/* Map Card */}
          <div className="animate-rise-delay animate-lift overflow-hidden rounded-[28px] border border-[#dbe7e4] bg-white/90 p-2 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-sm">
            <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,rgba(233,242,239,0.98),rgba(238,246,255,0.92),rgba(255,246,232,0.9))]">

              {/* Store map background */}
              <img
                src="/hero.png"
                alt="Map view near Panchawati Medical Store"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-white/25" />

              {/* Location pin */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="animate-float flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-brand text-2xl text-white shadow-lg">
                  📍
                </div>

                <div className="animate-lift mt-3 rounded-2xl border border-[#dbe7e4] bg-white/95 px-4 py-3 text-center shadow-md backdrop-blur-sm">
                  <p className="text-xs font-bold text-[#0F172A]">
                    Panchawati Medical Store
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
                className="animate-lift absolute bottom-4 right-4 z-10 rounded-full border border-white/70 bg-white/95 px-4 py-2 text-xs font-semibold text-brand-strong shadow-md transition hover:bg-brand-soft"
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
