import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/auth/forgot-password");
    }
  }, [email, navigate]);

  // Handle OTP submission logic
  const handleOtp = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Verifying OTP...");
    try {
      const res = await axios.post(
        "https://swaramayi-backend.onrender.com/api/admin/verify-Otp",
        {
          email,
          otp,
        }
      );

      if (res.data.statusCode === 200) {
        toast.success("OTP verified successfully! Redirecting...");
        setTimeout(() => {
          navigate("/auth/update-password", {
            state: { securityToken: res.data.result.securityToken, email },
          });
        }, 1500);
      } else {
        toast.error("Wrong OTP. Please check and try again.");
      }
    } catch (error) {
      toast.error("An error occurred! Please try again later.");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      {/* Card container */}
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl transition-all duration-300 sm:p-10">
        <h4 className="mb-2 text-3xl font-bold text-gray-800">Verify OTP 🔐</h4>

        <p className="mb-8 text-base text-gray-500">
          We've sent a 5-digit code to **{email || "your email"}.** Please enter
          it below.
        </p>

        <form className="space-y-8" onSubmit={handleOtp}>
          {/* OTP Input Component */}
          <OTPInput
            value={otp}
            onChange={(value) => {
              setOtp(value);
            }}
            numInputs={5}
            renderInput={(props) => (
              <input
                {...props}
                placeholder="0"
                inputMode="numeric"
                maxLength={1}
                pattern="[0-9]*"
                className="
                  focus:border-transparent /* Focus Ring: Blue-500 */ mx-1
                  h-14 w-12 rounded-lg border-2 border-gray-300
                  bg-white text-center text-2xl 
                  font-semibold text-gray-800 transition-all  duration-300 focus:outline-none focus:ring-4 focus:ring-[#3B82F6] sm:w-14
                  "
              />
            )}
            containerStyle={{ justifyContent: "space-between", gap: "2px" }}
          />

          {/* Verify Button */}
          <button
            type="submit"
            disabled={otp.length !== 5}
            className={`
                w-full rounded-lg py-3 text-base font-bold text-white shadow-md transition duration-200 
                ${
                  otp.length === 5
                    ? "cursor-pointer bg-[#1D4ED8] hover:bg-[#3B82F6] active:bg-[#3B82F6]" /* Primary Blue (Blue-700) */
                    : "cursor-not-allowed bg-gray-400"
                }
            `}
          >
            Verify OTP
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link
            to="/auth/forgot-password"
            className="text-sm font-semibold text-[#1D4ED8] transition duration-200 hover:text-[#3B82F6] hover:underline" /* Link Text: Blue-700, Hover: Blue-500 */
          >
            ← Back to Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
}
