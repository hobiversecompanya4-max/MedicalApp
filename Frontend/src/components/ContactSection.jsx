import React from "react";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  ExternalLink,
} from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

const ContactSection = () => {
  const storePhone = "+919876543210";
  const storeEmail = "info@yourmedicalstore.com";

  const mapUrl = "https://maps.app.goo.gl/iHdoo14SYty1eU426";

  return (
    <section
      id="contact"
      className="bg-white px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            Contact Us
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            We're Here to Help You
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Have a question about medicines, prescriptions, or your order?
            Get in touch with us and our team will be happy to help.
          </p>
        </div>

        {/* ================= MAIN CONTACT GRID ================= */}
        <div className="grid gap-8 lg:grid-cols-2">

          {/* ================= CONTACT INFORMATION ================= */}
          <div className="rounded-3xl bg-gray-50 p-6 sm:p-8">

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
                className="group flex items-start gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-all duration-200 group-hover:bg-blue-600 group-hover:text-white">
                  <Phone size={21} />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Call Us
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    +91 98765 43210
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
                className="group flex items-start gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600 transition-all duration-200 group-hover:bg-green-600 group-hover:text-white">
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
                className="group flex items-start gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 transition-all duration-200 group-hover:bg-purple-600 group-hover:text-white">
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
                className="group flex items-start gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 transition-all duration-200 group-hover:bg-red-600 group-hover:text-white">
                  <MapPin size={21} />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Store Address
                  </p>

                  <p className="mt-1 font-semibold leading-6 text-gray-900">
                    Your Medical Store
                    <br />
                    Lucknow, Uttar Pradesh, India
                  </p>

                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                    Get Directions
                    <ExternalLink size={14} />
                  </span>
                </div>
              </a>

              {/* OPENING HOURS */}
              <div className="flex items-start gap-4">
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
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm font-medium text-green-600">
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
            <div className="rounded-3xl bg-blue-600 p-8 text-white">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                <Send size={24} />
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Need Assistance?
              </h3>

              <p className="mt-3 leading-7 text-blue-100">
                Our team is ready to help you with medicine availability,
                prescription orders, delivery information, and general
                queries.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">

                {/* CALL BUTTON */}
                <a
                  href={`tel:${storePhone}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-50"
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
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">

              <h3 className="text-xl font-bold text-gray-900">
                Follow Us
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Stay connected with us for updates, offers, health tips,
                and the latest information.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">

                {/* INSTAGRAM */}
                <a
                  href="https://instagram.com/yourmedicalstore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-gray-100 p-4 transition-all duration-200 hover:border-pink-200 hover:bg-pink-50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-50 text-pink-500 group-hover:bg-white">
                    <FaInstagram size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Instagram
                    </p>

                    <p className="text-sm font-semibold text-gray-900">
                      @yourmedicalstore
                    </p>
                  </div>
                </a>

                {/* FACEBOOK */}
                <a
                  href="https://facebook.com/yourmedicalstore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-gray-100 p-4 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-white">
                    <FaFacebookF size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Facebook
                    </p>

                    <p className="text-sm font-semibold text-gray-900">
                      Your Medical Store
                    </p>
                  </div>
                </a>

                {/* TWITTER / X */}
                <a
                  href="https://x.com/yourmedicalstore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-gray-100 p-4 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-900 group-hover:bg-white">
                    <FaTwitter size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      X / Twitter
                    </p>

                    <p className="text-sm font-semibold text-gray-900">
                      @yourmedicalstore
                    </p>
                  </div>
                </a>

                {/* YOUTUBE */}
                <a
                  href="https://youtube.com/@yourmedicalstore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-gray-100 p-4 transition-all duration-200 hover:border-red-200 hover:bg-red-50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600 group-hover:bg-white">
                    <FaYoutube size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      YouTube
                    </p>

                    <p className="text-sm font-semibold text-gray-900">
                      Your Medical Store
                    </p>
                  </div>
                </a>

              </div>
            </div>
          </div>
        </div>

        {/* ================= GOOGLE MAP ================= */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">

          {/* Map Header */}
          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Visit Our Store
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                Find us easily and get directions through Google Maps.
              </p>
            </div>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-gray-800"
            >
              <MapPin size={18} />
              Open in Google Maps
              <ExternalLink size={15} />
            </a>

          </div>

          {/* Map */}
          <div className="h-72 bg-gray-100 sm:h-96">
            <iframe
              title="Medical Store Location"
              src="https://www.google.com/maps?q=Lucknow%2C%20Uttar%20Pradesh&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

        {/* ================= BOTTOM CONTACT STRIP ================= */}
        <div className="mt-8 rounded-2xl bg-gray-900 px-6 py-5">

          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

            <div>
              <p className="font-semibold text-white">
                Have a question?
              </p>

              <p className="mt-1 text-sm text-gray-400">
                Our team is just a call or message away.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">

              <a
                href={`tel:${storePhone}`}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
              >
                <Phone size={16} />
                Call Us
              </a>

              <a
                href={`mailto:${storeEmail}`}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                <Mail size={16} />
                Email Us
              </a>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
