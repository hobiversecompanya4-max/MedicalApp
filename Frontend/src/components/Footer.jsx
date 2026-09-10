const Footer = () => {
  return (
    <footer className="animate-rise border-t border-brand/15 bg-[linear-gradient(180deg,rgba(251,254,254,0.86),rgba(238,245,244,0.9))] px-6 py-10 text-[#0F172A] sm:px-10 backdrop-blur-sm">
      <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">

        {/* Brand */}
        <section>
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Panchawati Medical"
              className="h-9 w-auto"
            />
            <h2 className="font-[Plus_Jakarta_Sans] text-base font-bold">
              <span className="text-[#0F172A]">Panchawati</span>{" "}
              <span className="text-brand">Medical</span>
            </h2>
          </div>

          <p className="mt-4 max-w-xs text-xs leading-5 text-[#475569]">
            Your trusted digital pharmacy for genuine medicines, prescription
            verification, pharmacist oversight, and reliable healthcare
            delivery.
          </p>

          <span className="mt-4 inline-flex rounded-full border border-brand/15 bg-[linear-gradient(135deg,rgba(230,255,251,0.95),rgba(232,241,255,0.95),rgba(255,246,232,0.92))] px-3 py-1.5 text-[10px] font-semibold text-brand-strong shadow-sm">
            ✓ Verified Pharmacy
          </span>
        </section>

        {/* Quick Links */}
        <section>
          <h2 className="font-[Plus_Jakarta_Sans] text-sm font-semibold text-[#0F172A]">
            Quick Links
          </h2>

          <nav className="mt-4 flex flex-col gap-2.5 text-xs text-[#475569]">
            <a href="/" className="transition hover:text-brand">
              Home
            </a>
            <a
              href="/#how-it-works"
              className="transition hover:text-brand"
            >
              How It Works
            </a>
            <a href="/order" className="transition hover:text-brand">
              Order Medicine
            </a>
            <a
              href="/safety"
              className="transition hover:text-brand"
            >
              Safety & Verification
            </a>
            <a
              href="/contact"
              className="transition hover:text-brand"
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
            licensed healthcare professional. Panchawati Medical is not a substitute
            for professional medical advice.
          </p>

          <a
            href="tel:6392323282"
            className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-brand hover:text-brand-strong"
          >
            ☎ Pharmacist Support
          </a>
        </section>
      </div>

      {/* Bottom Bar */}
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-[#d8e4e1] pt-5 text-[11px] text-[#64748B] sm:flex-row sm:items-center sm:justify-between">

        <div className="space-y-1">
          <p>
            © {new Date().getFullYear()} Panchawati Medical. All rights reserved.
          </p>

          <p>
            Maintained by hobiverse.companyA4
          </p>

          <p>
            Designed, Developed and hosted by hobiverse.companyA4
          </p>
        </div>

        <nav
          className="flex flex-wrap gap-x-5 gap-y-2"
          aria-label="Footer navigation"
        >
          <a href="/privacy" className="transition hover:text-brand">
            Privacy Policy
          </a>

          <a href="/terms" className="transition hover:text-brand">
            Terms of Service
          </a>

          <a href="/safety-guidelines" className="transition hover:text-brand">
            Safety Guidelines
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
