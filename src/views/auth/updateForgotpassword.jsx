import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateForgotPassword() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const location = useLocation();
  const securityToken = location.state?.securityToken;
  const navigate = useNavigate();
  const email = location.state?.email;

  useEffect(() => {
    if (!email && !securityToken) {
      navigate("/forgotpassword");
    }
  }, [email, securityToken, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateForgotPassword = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("please wait ");
    try {
      const data = new FormData();
      data.append("email", email);
      data.append("newPassword", formData.newPassword);
      data.append("confirmPassword", formData.confirmPassword);
      data.append("securityToken", securityToken);
      const response = await axios.post(
        "https://swaramayi-backend.onrender.com/api/admin/admin-changeForgot-password",
        data
      );
      if (response.data.statusCode === 200) {
        toast.success("Password Updated Successfully");
        navigate("/auth/");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Invalid Error! Please try again later");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div className="animate-fadeIn w-full px-4 sm:px-0">
      {/* Icon Section */}
      <div className="animate-slideDown mb-6 text-center sm:mb-8">
        <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-md transition-transform duration-300 hover:scale-110 sm:mb-4 sm:h-16 sm:w-16">
          <svg
            className="h-7 w-7 text-white drop-shadow-lg sm:h-8 sm:w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white drop-shadow-lg sm:text-2xl">
          Reset Password
        </h1>
        <p className="mt-1 text-xs text-blue-100/90 drop-shadow sm:text-sm">
          Create a new secure password
        </p>
      </div>

      {/* Reset Password Card */}
      <div className="animate-slideUp rounded-2xl border border-white/20 bg-white/95 p-6 shadow-2xl backdrop-blur-xl sm:rounded-3xl sm:p-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="from-slate-800 to-slate-600 text-transparent mb-1 bg-gradient-to-r bg-clip-text text-2xl font-bold sm:mb-2 sm:text-3xl">
            New Password
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Enter your new password to secure your account
          </p>
        </div>

        <form
          onSubmit={handleUpdateForgotPassword}
          className="space-y-4 sm:space-y-5"
        >
          {/* New Password Field */}
          <div className="group">
            <label className="text-slate-700 mb-2 block text-xs font-semibold transition-colors group-focus-within:text-blue-600 sm:text-sm">
              New Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 transition-colors group-focus-within:text-blue-600 sm:pl-4">
                <svg
                  className="text-slate-400 h-4 w-4 transition-colors group-focus-within:text-blue-500 sm:h-5 sm:w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 hover:border-slate-300 h-11 w-full rounded-xl border-2 pl-10 pr-12 text-xs outline-none transition-all duration-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:h-12 sm:pl-12 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="text-slate-400 hover:text-slate-600 absolute inset-y-0 right-0 flex items-center pr-3 transition-colors sm:pr-4"
              >
                {showNewPassword ? (
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="group">
            <label className="text-slate-700 mb-2 block text-xs font-semibold transition-colors group-focus-within:text-blue-600 sm:text-sm">
              Confirm Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 transition-colors group-focus-within:text-blue-600 sm:pl-4">
                <svg
                  className="text-slate-400 h-4 w-4 transition-colors group-focus-within:text-blue-500 sm:h-5 sm:w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 hover:border-slate-300 h-11 w-full rounded-xl border-2 pl-10 pr-12 text-xs outline-none transition-all duration-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:h-12 sm:pl-12 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-slate-400 hover:text-slate-600 absolute inset-y-0 right-0 flex items-center pr-3 transition-colors sm:pr-4"
              >
                {showConfirmPassword ? (
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-3 sm:p-4">
            <p className="text-slate-700 mb-2 text-xs font-semibold">
              Password must contain:
            </p>
            <ul className="text-slate-600 space-y-1 text-xs">
              <li className="flex items-center gap-2">
                <svg
                  className="h-3 w-3 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                At least 8 characters
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="h-3 w-3 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                One uppercase & lowercase letter
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="h-3 w-3 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                One number or special character
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="h-11 w-full transform rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-sm font-semibold text-white shadow-lg shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02] hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 hover:shadow-xl hover:shadow-blue-500/50 active:scale-[0.98] sm:h-12 sm:text-base"
          >
            <span className="flex items-center justify-center gap-2">
              Update Password
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </button>
        </form>

        {/* Footer */}
        <div className="border-slate-100 mt-5 border-t pt-5 sm:mt-6 sm:pt-6">
          <div className="text-slate-500 flex items-center justify-center gap-2 text-xs">
            <svg
              className="h-4 w-4 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span>Your password will be encrypted and secured</span>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out 0.1s backwards;
        }
      `}</style>
    </div>
  );
}
