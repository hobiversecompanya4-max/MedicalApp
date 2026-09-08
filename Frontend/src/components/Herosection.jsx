import React from "react";
import { useNavigate } from "react-router-dom";

const Herosection = () => {
  const navigate = useNavigate();

  return (
    <section className="overflow-hidden bg-surface px-5 py-8 font-[Inter] sm:px-[5%] sm:py-12">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-14">

        {/* LEFT CONTENT */}
        <div>

          {/* Badge */}
          <div className="animate-rise animate-lift mb-5 inline-flex items-center rounded-full bg-brand-soft px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-brand">
            ⚡ Express Digital Pharmacy Network
            <span className="mx-2 text-[#94A3B8]">|</span>
            <span className="text-[var(--text)]">
              2-Hour Rapid Delivery Available
            </span>
          </div>

          {/* Heading */}
          <h1 className="animate-rise mb-4 font-[Plus_Jakarta_Sans] text-[clamp(34px,4.2vw,58px)] font-bold leading-[1.08] tracking-[-1.5px] text-[#0F172A]" style={{ animationDelay: "90ms" }}>
            Genuine Medicines Delivered
            <br />
            to Your{" "}
            <span className="text-brand">
              Doorstep in 2 Hours
            </span>
          </h1>

          {/* Description */}
          <p className="animate-rise mb-7 max-w-[600px] text-[15px] leading-7 text-[var(--text)]" style={{ animationDelay: "150ms" }}>
            Easily order 100% certified prescription drugs and OTC healthcare
            supplies with your doctor's prescription.
          </p>

          {/* Trust Cards */}
          <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-4">

            <div className="animate-rise animate-lift rounded-xl border border-[#E2E8F0] bg-white p-3 shadow-[0_1px_3px_rgba(15,23,42,0.04)]" style={{ animationDelay: "220ms" }}>
              <div className="mb-2 text-xl text-brand">✓</div>
              <strong className="mb-1 block text-[11px] font-semibold text-[#0F172A]">
                100% Genuine
              </strong>
              <small className="text-[9px] leading-4 text-[var(--text)]">
                FDA-Certified Sourcing
              </small>
            </div>

            <div className="animate-rise animate-lift rounded-xl border border-[#E2E8F0] bg-white p-3 shadow-[0_1px_3px_rgba(15,23,42,0.04)]" style={{ animationDelay: "300ms" }}>
              <div className="mb-2 text-xl text-brand">✓</div>
              <strong className="mb-1 block text-[11px] font-semibold text-[#0F172A]">
                Rx Verified
              </strong>
              <small className="text-[9px] leading-4 text-[var(--text)]">
                Dual-Pharmacist Check
              </small>
            </div>

            <div className="animate-rise animate-lift rounded-xl border border-[#E2E8F0] bg-white p-3 shadow-[0_1px_3px_rgba(15,23,42,0.04)]" style={{ animationDelay: "380ms" }}>
              <div className="mb-2 text-xl text-brand">❄</div>
              <strong className="mb-1 block text-[11px] font-semibold text-[#0F172A]">
                Cold-Chain
              </strong>
              <small className="text-[9px] leading-4 text-[var(--text)]">
                Monitored 2°C - 8°C
              </small>
            </div>

            <div className="animate-rise animate-lift rounded-xl border border-[#E2E8F0] bg-white p-3 shadow-[0_1px_3px_rgba(15,23,42,0.04)]" style={{ animationDelay: "460ms" }}>
              <div className="mb-2 text-xl text-brand">✓</div>
              <strong className="mb-1 block text-[11px] font-semibold text-[#0F172A]">
                Free Delivery
              </strong>
              <small className="text-[9px] leading-4 text-[var(--text)]">
                Within 5 km radius
              </small>
            </div>

          </div>

          {/* Buttons */}
          <div className="animate-rise mt-1 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "520ms" }}>

            <button
              onClick={() => navigate("/order")}
              className="animate-lift flex-1 cursor-pointer rounded-lg border-0 bg-brand px-5 py-3.5 text-xs font-bold text-white shadow-[0_10px_22px_rgba(15,118,110,0.18)] hover:bg-brand-strong hover:shadow-[0_14px_26px_rgba(15,118,110,0.22)]"
            >
              📄
              <span>Order with Doctor's Prescription</span>
              <span> ↓</span>
            </button>

            <button
              onClick={() => window.open("tel:6392323282")}
              className="animate-lift flex-[.72] cursor-pointer rounded-lg border border-[#dce8e5] bg-white px-5 py-3.5 text-xs font-bold text-brand"
            >
              ☎
              <span>Speak to Pharmacist</span>
            </button>

          </div>

          {/* Security Text */}
          <div className="animate-rise mt-5 flex items-center gap-2 text-[10px] text-[#64748B]" style={{ animationDelay: "600ms" }}>
            <span className="text-brand">🔒</span>
            <span>
              256-bit encrypted healthcare portal
            </span>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">

          {/* Verification Badge */}
          <div className="animate-float absolute -left-3 -top-3 z-10 rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[9px] text-[#64748B] shadow-[0_10px_20px_rgba(15,23,42,0.08)]">
            <span>✓ &nbsp; SAFETY PROTOCOL</span>

            <b className="mt-1 block text-[11px] text-brand">
              Pharmacist Verified
            </b>
          </div>

          {/* Hero Image */}
          <div className="animate-rise animate-lift overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]" style={{ animationDelay: "220ms" }}>
            <img
              className="animate-float-slow block w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              src="/hero.png"
              alt="Pharmacist preparing a medicine order"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default Herosection;
