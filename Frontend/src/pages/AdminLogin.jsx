import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/api";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await loginAdmin({
        email,
        password,
      });

      localStorage.setItem("adminToken", response.data.token);
      localStorage.setItem(
        "admin",
        JSON.stringify(response.data.admin)
      );

      navigate("/admin");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#edf8f5] via-white to-[#e6f4f0] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md">

        {/* Admin Brand */}
        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#126b5b] shadow-lg shadow-[#126b5b]/20">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3 5 6v5c0 4.5 3 7.8 7 10 4-2.2 7-5.5 7-10V6l-7-3Z"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.5 12 11.2 14 15 10"
              />
            </svg>

          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Quick <span className="text-[#126b5b]">Meds</span>
          </h1>

          <div className="mt-2 inline-flex items-center rounded-full bg-[#126b5b]/10 px-3 py-1">
            <span className="text-xs font-semibold text-[#126b5b]">
              ADMIN PORTAL
            </span>
          </div>

        </div>

        {/* Login Card */}
        <div className="rounded-3xl bg-white p-7 shadow-xl shadow-gray-200/60 sm:p-9">

          <div className="mb-7">
            <h2 className="text-2xl font-bold text-gray-900">
              Admin Sign In
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Sign in to manage orders, prescriptions and medicines.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-3.5">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mt-0.5 h-5 w-5 shrink-0 text-red-500"
              >
                <circle cx="12" cy="12" r="9" />

                <path
                  strokeLinecap="round"
                  d="M12 8v4M12 16h.01"
                />
              </svg>

              <p className="text-sm text-red-600">
                {error}
              </p>

            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Admin Email
              </label>

              <div className="relative">

                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                    />

                    <path
                      strokeLinecap="round"
                      d="m3 7 9 6 9-6"
                    />
                  </svg>

                </div>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="admin@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#126b5b] focus:bg-white focus:ring-4 focus:ring-[#126b5b]/10"
                />

              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Password
              </label>

              <div className="relative">

                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                  >
                    <rect
                      x="4"
                      y="10"
                      width="16"
                      height="10"
                      rx="2"
                    />

                    <path
                      strokeLinecap="round"
                      d="M8 10V7a4 4 0 0 1 8 0v3"
                    />
                  </svg>

                </div>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Enter admin password"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#126b5b] focus:bg-white focus:ring-4 focus:ring-[#126b5b]/10"
                />

              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#126b5b] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#126b5b]/20 transition hover:bg-[#0e5447] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-30"
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="3"
                    />

                    <path
                      className="opacity-90"
                      fill="currentColor"
                      d="M21 12a9 9 0 0 0-9-9v3a6 6 0 0 1 6 6h3Z"
                    />
                  </svg>

                  Signing in...
                </>
              ) : (
                <>
                  Login as Admin
                  <span className="text-lg">→</span>
                </>
              )}

            </button>

          </form>

          {/* Back to Customer Login */}
          <div className="mt-7 text-center">

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-sm font-medium text-gray-500 transition hover:text-[#126b5b]"
            >
              ← Back to customer login
            </button>

          </div>

        </div>

        {/* Security */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3 5 6v5c0 4.5 3 7.8 7 10 4-2.2 7-5.5 7-10V6l-7-3Z"
            />

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.5 12 1.7 1.7 3.5-3.5"
            />
          </svg>

          Secure administrator access

        </div>

      </div>
    </div>
  );
};

export default AdminLogin;