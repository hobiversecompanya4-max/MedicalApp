import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-[#E2E8F0] bg-[#F0FDF4] px-6 py-10 text-[#0F172A] sm:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">

        {/* Brand */}
        <section>
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="QuickMeds"
              className="h-9 w-auto"
            />
            <h2 className="font-[Plus_Jakarta_Sans] text-base font-bold">
              <span className="text-[#0F172A]">Quick</span>
              <span className="text-[#007A78]">Meds</span>
            </h2>
          </div>

          <p className="mt-4 max-w-xs text-xs leading-5 text-[#475569]">
            Your trusted digital pharmacy for genuine medicines, prescription
            verification, pharmacist oversight, and reliable healthcare
            delivery.
          </p>

          <span className="mt-4 inline-flex rounded-full border border-[#86EFAC] bg-white px-3 py-1.5 text-[10px] font-semibold text-[#15803D]">
            ✓ Verified Pharmacy
          </span>
        </section>

        {/* Quick Links */}
        <section>
          <h2 className="font-[Plus_Jakarta_Sans] text-sm font-semibold text-[#0F172A]">
            Quick Links
          </h2>

          <nav className="mt-4 flex flex-col gap-2.5 text-xs text-[#475569]">
            <a href="/" className="transition hover:text-[#007A78]">
              Home
            </a>
            <a
              href="/#how-it-works"
              className="transition hover:text-[#007A78]"
            >
              How It Works
            </a>
            <a href="/order" className="transition hover:text-[#007A78]">
              Order Medicine
            </a>
            <a
              href="/#safety"
              className="transition hover:text-[#007A78]"
            >
              Safety & Verification
            </a>
            <a
              href="/#contact"
              className="transition hover:text-[#007A78]"
            >
              Contact
            </a>
          </nav>
        </section>

        {/* Delivery */}
        <section>
          <h2 className="font-[Plus_Jakarta_Sans] text-sm font-semibold text-[#0F172A]">
            Delivery Assurances
          </h2>

          <p className="mt-4 text-xs leading-6 text-[#475569]">
            ✓ Genuine medicine sourcing
            <br />
            ✓ Prescription verification
            <br />
            ✓ Cold-chain delivery when required
            <br />
            ✓ Tamper-evident packaging
            <br />
            ✓ Delivery tracking
          </p>
        </section>

        {/* Patient Information */}
        <section>
          <h2 className="font-[Plus_Jakarta_Sans] text-sm font-semibold text-[#0F172A]">
            Patient Information
          </h2>

          <p className="mt-4 text-xs leading-5 text-[#475569]">
            Prescription medicines require a valid prescription from a
            licensed healthcare professional. QuickMeds is not a substitute
            for professional medical advice.
          </p>

          <a
            href="tel:+911800123456"
            className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#007A78] hover:text-[#005F5E]"
          >
            ☎ Pharmacist Support
          </a>
        </section>
      </div>

      {/* Bottom Bar */}
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-[#D1FAE5] pt-5 text-[11px] text-[#64748B] sm:flex-row sm:items-center sm:justify-between">

        <p>
          © {new Date().getFullYear()} QuickMeds. All rights reserved.
        </p>

        <nav
          className="flex flex-wrap gap-x-5 gap-y-2"
          aria-label="Footer navigation"
        >
          <a href="#privacy" className="hover:text-[#007A78]">
            Privacy Policy
          </a>

          <a href="#terms" className="hover:text-[#007A78]">
            Terms of Service
          </a>

          <a href="#safety" className="hover:text-[#007A78]">
            Safety Guidelines
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;