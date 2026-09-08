import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await loginUser({
        phone,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3fbf8] via-white to-[#e8f6f1] flex items-center justify-center px-4 py-10">

      {/* Main Card */}
      <div className="animate-rise w-full max-w-md">

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="animate-float mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand shadow-lg shadow-brand/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              className="h-9 w-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21s-7-4.35-9.33-8.67C.67 8.64 3.13 4 7.5 4c2.06 0 3.65 1.16 4.5 2.67C12.85 5.16 14.44 4 16.5 4c4.37 0 6.83 4.64 4.83 8.33C19 16.65 12 21 12 21Z"
              />
              <path
                strokeLinecap="round"
                d="M12 8v6M9 11h6"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Panchawati <span className="text-brand">Meds</span>
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Your trusted partner for medicines & healthcare
          </p>
        </div>

        {/* Login Card */}
        <div className="animate-lift rounded-3xl bg-white p-7 shadow-xl shadow-gray-200/60 sm:p-9">

          <div className="mb-7">
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome back
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Login to manage your orders and prescriptions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Phone Number
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0-1.24 1.01-2.25 2.25-2.25h2.1c.96 0 1.8.61 2.11 1.52l.7 2.1a2.25 2.25 0 0 1-.52 2.29l-1.2 1.2a16.5 16.5 0 0 0 5.4 5.4l1.2-1.2a2.25 2.25 0 0 1 2.29-.52l2.1.7a2.25 2.25 0 0 1 1.52 2.11V20c0 1.24-1.01 2.25-2.25 2.25h-.75C9.6 22.25 2.25 14.9 2.25 5.25v1.5Z"
                    />
                  </svg>
                </div>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Enter 10-digit phone number"
                  maxLength={10}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10"
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
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-3.5">
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

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:bg-brand-strong hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
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

                  Logging in...
                </>
              ) : (
                <>
                  Login
                  <span className="text-lg">→</span>
                </>
              )}
            </button>
          </form>

          {/* Register */}
          <div className="mt-7 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="font-semibold text-brand hover:underline"
              >
                Create account
              </button>
            </p>
          </div>
        </div>

        {/* Security Message */}
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

          Your information is securely protected
        </div>

      </div>
    </div>
  );
}

export default Login;
