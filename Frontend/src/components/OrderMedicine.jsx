import React, { useState } from "react";
import api from "../services/api";
import { getToken } from "../services/auth";

const OrderMedicine = () => {
  const [prescription, setPrescription] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    confirmMobile: "",
    alternatePhone: "",
    address: "",
    medicine: "",
  });

  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone !== formData.confirmMobile) {
      alert("Mobile numbers do not match.");
      return;
    }

    if (!prescription) {
      alert("Please upload your prescription.");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("phone", formData.phone);
      data.append("alternatePhone", formData.alternatePhone);

      data.append(
        "deliveryAddress",
        JSON.stringify({
          addressLine: formData.address,
          city: "Lucknow",
          state: "Uttar Pradesh",
          pincode: "226001",
          landmark: "",
        })
      );

      data.append("medicines", JSON.stringify(medicines));

      data.append("prescriptionRequired", "true");
      data.append("paymentMethod", "COD");
      data.append("notes", "");

      data.append("prescription", prescription);

      const token = getToken();

      if (!token) {
        alert("Authentication required. Please login again.");
        return;
      }

      const response = await api.post("/orders", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(
        `Order submitted successfully!\nOrder ID: ${response.data.orderId}`
      );

      setFormData({
        name: "",
        phone: "",
        confirmMobile: "",
        alternatePhone: "",
        address: "",
        medicine: "",
      });

      setMedicines([]);
      setPrescription(null);
    } catch (error) {
      console.error("Order submission failed:", error);

      alert(error.message || "Failed to submit order.");
    } finally {
      setLoading(false);
    }
  };

  const addMedicine = () => {
    if (!formData.medicine.trim()) {
      return;
    }

    setMedicines([
      ...medicines,
      {
        name: formData.medicine.trim(),
        quantity: 1,
        price: 0,
      },
    ]);

    setFormData({
      ...formData,
      medicine: "",
    });
  };

  const removeMedicine = (index) => {
    setMedicines(
      medicines.filter((_, i) => i !== index)
    );
  };

  return (
    <section id="order" className="bg-[#F8FAFC] py-16 md:py-20 animate-rise">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">

        {/* Section Heading */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center rounded-full bg-brand-soft px-4 py-2 text-xs font-semibold text-brand">
            ORDER MEDICINE
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[#0F172A]">
            Order Medicines with a Doctor's Prescription
          </h2>

          <p className="mt-3 max-w-2xl mx-auto text-sm md:text-base text-[#64748B]">
            Upload your prescription, provide your delivery details, and our
            pharmacist will verify your medicines before delivery.
          </p>
        </div>

        {/* Form Card */}
        <div className="animate-rise animate-lift bg-white border border-[#E2E8F0] rounded-2xl shadow-sm p-6 md:p-8">

          <form onSubmit={handleSubmit} className="space-y-7">

            {/* Prescription Upload */}
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                Doctor's Prescription
                <span className="text-red-500 ml-1">*</span>
              </label>

              <label
                htmlFor="prescription"
                className="flex flex-col items-center justify-center w-full min-h-[170px] border-2 border-dashed border-[#CBD5E1] rounded-xl bg-surface hover:bg-brand-soft hover:border-brand transition cursor-pointer"
              >
                <div className="text-3xl mb-3">
                  📄
                </div>

                {prescription ? (
                  <>
                    <p className="text-sm font-semibold text-brand">
                      {prescription.name}
                    </p>

                    <p className="text-xs text-[#64748B] mt-1">
                      Prescription selected
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-[#0F172A]">
                      Upload Doctor's Prescription
                    </p>

                    <p className="text-xs text-[#64748B] mt-1">
                      JPG, PNG or PDF
                    </p>

                    <span className="mt-4 px-4 py-2 rounded-lg border border-brand text-brand text-sm font-semibold">
                      Choose File
                    </span>
                  </>
                )}

                <input
                  id="prescription"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                  required
                  onChange={(e) => {
                    setPrescription(e.target.files[0]);
                  }}
                />
              </label>
            </div>

            {/* Customer Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-[#0F172A] mb-2"
              >
                Full Name
                <span className="text-red-500 ml-1">
                  *
                </span>
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-lg border border-[#CBD5E1] bg-white text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
              />
            </div>

            {/* Mobile Numbers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Mobile Number */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-[#0F172A] mb-2"
                >
                  Mobile Number
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter mobile number"
                  maxLength="10"
                  pattern="[0-9]{10}"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border border-[#CBD5E1] bg-white text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
                />
              </div>

              {/* Confirm Mobile Number */}
              <div>
                <label
                  htmlFor="confirmMobile"
                  className="block text-sm font-semibold text-[#0F172A] mb-2"
                >
                  Confirm Mobile Number
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <input
                  id="confirmMobile"
                  type="tel"
                  placeholder="Re-enter mobile number"
                  maxLength="10"
                  pattern="[0-9]{10}"
                  required
                  value={formData.confirmMobile}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border border-[#CBD5E1] bg-white text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
                />
              </div>

            </div>

            {/* Alternate Mobile */}
            <div>
              <label
                htmlFor="alternatePhone"
                className="block text-sm font-semibold text-[#0F172A] mb-2"
              >
                Alternate Mobile Number

                <span className="text-xs font-normal text-[#94A3B8] ml-2">
                  (Optional)
                </span>
              </label>

              <input
                id="alternatePhone"
                type="tel"
                placeholder="Enter alternate mobile number"
                maxLength="10"
                pattern="[0-9]{10}"
                value={formData.alternatePhone}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-lg border border-[#CBD5E1] bg-white text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
              />
            </div>

            {/* Delivery Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-semibold text-[#0F172A] mb-2"
              >
                Delivery Address
                <span className="text-red-500 ml-1">
                  *
                </span>
              </label>

              <textarea
                id="address"
                rows="4"
                placeholder="Enter your complete delivery address"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-[#CBD5E1] bg-white text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none resize-none focus:border-brand focus:ring-2 focus:ring-brand/10"
              />
            </div>

            {/* Optional Medicine */}
            <div className="border-t border-[#E2E8F0] pt-7">

              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-[#0F172A]">
                    Add Medicine
                  </h3>

                  <p className="text-xs text-[#64748B] mt-1">
                    If you already know the medicine name, you can add it here.
                  </p>
                </div>

                <span className="text-xs font-medium text-[#94A3B8]">
                  Optional
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">

                <input
                  id="medicine"
                  type="text"
                  placeholder="Enter medicine name"
                  value={formData.medicine}
                  onChange={handleChange}
                  className="flex-1 h-12 px-4 rounded-lg border border-[#CBD5E1] bg-white text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
                />

                <button
                  type="button"
                  onClick={addMedicine}
                  className="h-12 px-6 rounded-lg border border-brand text-brand font-semibold text-sm hover:bg-brand-soft transition"
                >
                  + Add Medicine
                </button>

              </div>

              {/* Added Medicines */}
              {medicines.length > 0 && (
                <div className="mt-4 space-y-2">

                  {medicines.map((medicine, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-3"
                    >
                      <span className="text-sm text-[#0F172A]">
                        {medicine.name}
                      </span>

                      <button
                        type="button"
                        onClick={() => removeMedicine(index)}
                        className="text-xs font-semibold text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                </div>
              )}

            </div>

            {/* Verification Note */}
            <div className="flex gap-3 rounded-xl bg-brand-soft border border-[#cfe9e1] p-4">

              <div className="text-lg">
                ✓
              </div>

              <div>
                <p className="text-sm font-semibold text-[#0F172A]">
                  Pharmacist Verification
                </p>

                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  Your prescription will be reviewed by our pharmacist before
                  the order is confirmed.
                </p>
              </div>

            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-lg bg-brand text-white font-semibold text-sm hover:bg-brand-strong transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? "Submitting Order..."
                : "Submit Order Request"}
            </button>

            <p className="text-center text-xs text-[#94A3B8]">
              Your information is used only to process your medicine order.
            </p>

          </form>
        </div>
      </div>
    </section>
  );
};

export default OrderMedicine;
