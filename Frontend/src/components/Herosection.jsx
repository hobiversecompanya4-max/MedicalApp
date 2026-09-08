import React from "react";
import { useNavigate } from "react-router-dom";

const Herosection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#F8FAFC] px-5 py-8 font-[Inter] sm:px-[5%] sm:py-12">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-14">

        {/* LEFT CONTENT */}
        <div>

          {/* Badge */}
          <div className="mb-5 inline-flex items-center rounded-full bg-[#E6FFFD] px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-[#007A78]">
            ⚡ Express Digital Pharmacy Network
            <span className="mx-2 text-[#94A3B8]">|</span>
            <span className="text-[#475569]">
              2-Hour Rapid Delivery Available
            </span>
          </div>

          {/* Heading */}
          <h1 className="mb-4 font-[Plus_Jakarta_Sans] text-[clamp(34px,4.2vw,58px)] font-bold leading-[1.08] tracking-[-1.5px] text-[#0F172A]">
            Genuine Medicines Delivered
            <br />
            to Your{" "}
            <span className="text-[#007A78]">
              Doorstep in 2 Hours
            </span>
          </h1>

          {/* Description */}
          <p className="mb-7 max-w-[600px] text-[15px] leading-7 text-[#475569]">
            Easily order 100% certified prescription drugs and OTC healthcare
            supplies with your doctor's prescription. Every order is
            meticulously checked by board-certified, state-regulated
            pharmacists.
          </p>

          {/* Trust Cards */}
          <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-4">

            <div className="rounded-xl border border-[#E2E8F0] bg-white p-3 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
              <div className="mb-2 text-xl text-[#007A78]">✓</div>
              <strong className="mb-1 block text-[11px] font-semibold text-[#0F172A]">
                100% Genuine
              </strong>
              <small className="text-[9px] leading-4 text-[#64748B]">
                FDA-Certified Sourcing
              </small>
            </div>

            <div className="rounded-xl border border-[#E2E8F0] bg-white p-3 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
              <div className="mb-2 text-xl text-[#007A78]">✓</div>
              <strong className="mb-1 block text-[11px] font-semibold text-[#0F172A]">
                Rx Verified
              </strong>
              <small className="text-[9px] leading-4 text-[#64748B]">
                Dual-Pharmacist Check
              </small>
            </div>

            <div className="rounded-xl border border-[#E2E8F0] bg-white p-3 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
              <div className="mb-2 text-xl text-[#007A78]">❄</div>
              <strong className="mb-1 block text-[11px] font-semibold text-[#0F172A]">
                Cold-Chain
              </strong>
              <small className="text-[9px] leading-4 text-[#64748B]">
                Monitored 2°C - 8°C
              </small>
            </div>

            <div className="rounded-xl border border-[#E2E8F0] bg-white p-3 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
              <div className="mb-2 text-xl text-[#007A78]">✓</div>
              <strong className="mb-1 block text-[11px] font-semibold text-[#0F172A]">
                Free Delivery
              </strong>
              <small className="text-[9px] leading-4 text-[#64748B]">
                On orders over $25
              </small>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">

            <button
              onClick={() => navigate("/order")}
              className="flex-1 cursor-pointer rounded-lg border-0 bg-[#006f70] px-5 py-3.5 text-xs font-bold text-white"
            >
              📄
              <span>Order with Doctor's Prescription</span>
              <span> ↓</span>
            </button>

            <button
              onClick={() => window.open("tel:+911800123456")}
              className="flex-[.72] cursor-pointer rounded-lg border border-[#e7e8f0] bg-white px-5 py-3.5 text-xs font-bold text-[#006f70]"
            >
              ☎
              <span>Speak to Pharmacist</span>
            </button>

          </div>

          {/* Security Text */}
          <div className="mt-5 flex items-center gap-2 text-[10px] text-[#64748B]">
            <span className="text-[#007A78]">🔒</span>
            <span>
              256-bit encrypted healthcare portal · HIPAA compliant
              prescription vault
            </span>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">

          {/* Verification Badge */}
          <div className="absolute -left-3 -top-3 z-10 rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-[9px] text-[#64748B] shadow-[0_10px_20px_rgba(15,23,42,0.08)]">
            <span>✓ &nbsp; SAFETY PROTOCOL</span>

            <b className="mt-1 block text-[11px] text-[#007A78]">
              Pharmacist Verified
            </b>
          </div>

          {/* Hero Image */}
          <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
            <img
              className="block w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
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