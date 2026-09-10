import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ExternalLink,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

const ContactSection = () => {
  const storePhone = "6392323282";
  const storeEmail = "info@yourmedicalstore.com";

  const mapUrl = "https://maps.app.goo.gl/iHdoo14SYty1eU426";

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f4fbf7_0%,#ffffff_48%,#eef7ff_100%)] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 animate-rise"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-8 h-72 w-72 rounded-full bg-brand-soft/70 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-20 h-80 w-80 rounded-full bg-sky-soft/70 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="animate-rise mb-4 inline-flex rounded-full border border-brand/15 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-brand shadow-sm">
            Contact Us
          </span>

          <h2 className="animate-rise font-[Plus_Jakarta_Sans] text-3xl font-bold tracking-tight text-[#0B2B26] sm:text-5xl" style={{ animationDelay: "90ms" }}>
            We're Here to Help You
          </h2>

          <p className="animate-rise mt-4 leading-7 text-[var(--text)]" style={{ animationDelay: "150ms" }}>
            Have a question about medicines, prescriptions, or your order?
            Get in touch with us and our team will be happy to help.
          </p>
        </div>

        {/* ================= MAIN CONTACT GRID ================= */}
        <div className="grid gap-8 lg:grid-cols-2">

          {/* ================= CONTACT INFORMATION ================= */}
          <div className="animate-rise animate-lift rounded-[2rem] border border-white/80 bg-white/85 p-6 shadow-[0_18px_50px_rgba(11,59,52,0.08)] backdrop-blur-sm sm:p-8">

            <h3 className="text-2xl font-bold text-gray-900">
              Get in Touch
            </h3>

            <p className="mt-2 text-gray-600">
              Reach us through phone, WhatsApp, email, or visit our store.
            </p>

            <div className="mt-8 space-y-6">

              {/* PHONE */}
              <a
                href={`tel:${storePhone}`}
                className="group flex items-start gap-4 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand transition-all duration-200 group-hover:bg-brand group-hover:text-white">
                  <Phone size={21} />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Call Us
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    6392323282
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Available during store hours
                  </p>
                </div>
              </a>

              {/* WHATSAPP */}
              <a
                href={`https://wa.me/${storePhone.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft-2 text-brand transition-all duration-200 group-hover:bg-brand group-hover:text-white">
                  <FaWhatsapp size={21} />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    WhatsApp
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    Chat with us on WhatsApp
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Quick assistance & order enquiries
                  </p>
                </div>
              </a>

              {/* EMAIL */}
              <a
                href={`mailto:${storeEmail}`}
                className="group flex items-start gap-4 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand transition-all duration-200 group-hover:bg-brand group-hover:text-white">
                  <Mail size={21} />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Email
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {storeEmail}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    We'll get back to you as soon as possible
                  </p>
                </div>
              </a>

              {/* ADDRESS */}
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand transition-all duration-200 group-hover:bg-brand group-hover:text-white">
                  <MapPin size={21} />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Store Address
                  </p>

                  <p className="mt-1 font-semibold leading-6 text-gray-900">
                    Panchwati Medical
                    <br />
                    Azamgarh, Uttar Pradesh
                  </p>

                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                    Get Directions
                    <ExternalLink size={14} />
                  </span>
                </div>
              </a>

              {/* OPENING HOURS */}
              <div className="animate-lift flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <Clock size={21} />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Opening Hours
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    Monday – Sunday
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    8:00 AM – 10:00 PM
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand" />
                    <span className="text-sm font-medium text-brand">
                      Open Daily
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="flex flex-col gap-6">

            {/* ASSISTANCE CARD */}
            <div className="animate-rise animate-lift rounded-[2rem] bg-[linear-gradient(145deg,#0fa67f_0%,#0b7e60_58%,#0b3b34_100%)] p-8 text-white shadow-[0_18px_50px_rgba(11,126,96,0.24)]">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                <Send size={24} />
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Need Assistance?
              </h3>

              <p className="mt-3 leading-7 text-brand-soft-2">
                Our team is ready to help you with medicine availability,
                prescription orders, delivery information, and general
                queries.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">

                {/* CALL BUTTON */}
                <a
                  href={`tel:${storePhone}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-brand transition-all duration-200 hover:bg-brand-soft"
                >
                  <Phone size={18} />
                  Call Now
                </a>

                {/* WHATSAPP BUTTON */}
                <a
                  href={`https://wa.me/${storePhone.replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white transition-all duration-200 hover:bg-white/20"
                >
                  <FaWhatsapp size={18} />
                  WhatsApp
                </a>

              </div>
            </div>

            {/* ================= SOCIAL MEDIA ================= */}
            <div className="animate-rise animate-lift rounded-[2rem] border border-white/80 bg-white/85 p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-sm" style={{ animationDelay: "120ms" }}>

              <h3 className="text-xl font-bold text-gray-900">
                Follow Us
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Our social media channels are being prepared. Follow us here
                for updates, offers, and health tips soon.
              </p>

              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-brand/10 bg-brand-soft/70 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-amber shadow-[0_0_0_5px_rgba(232,147,12,0.12)]" />
                <p className="text-sm font-bold text-brand-strong">Coming soon</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
