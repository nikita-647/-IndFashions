import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPasswordAdmin() {
  const [formData, setFormData] = useState({ email: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("please wait ");
    try {
      const data = new FormData();
      data.append("email", formData.email);

      const response = await axios.post(
        "https://oneto7-hostels.onrender.com/api/admin/admin-forgot-password",
        data
      );
      // console.log("sdfghjk", response);
      if (response.data.statusCode === 200) {
        setTimeout(() => {
          navigate("/auth/verify-otp", { state: { email: formData.email } });
        }, 1500);

        toast.success("otp sent successfully to your mail id");
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-10 shadow-xl">
        {" "}
        <h4 className="mb-2.5 text-center text-3xl font-extrabold text-[#1D4ED8]">
          {" "}
          Forgot Password 🔑
        </h4>
        <p className="mb-8 text-center text-sm text-gray-500">
          {" "}
          Enter your registered email to receive a verification code.
        </p>
        <form onSubmit={handleForgotPassword}>
          <label className="mb-1 block text-sm font-semibold text-[#1D4ED8]">
            {" "}
            Email*
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            className="focus:border-transparent mb-6 h-11 w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:ring-2 focus:ring-[#3B82F6]"
            required
          />

          <button
            type="submit"
            className="w-full transform rounded-lg py-2.5 text-base font-bold text-white shadow-md transition duration-300 ease-in-out hover:scale-[1.01]"
            style={{
              backgroundColor: "#3B82F6",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#1D4ED8")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#3B82F6")}
          >
            Send OTP
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link
            to="/auth/sign-in"
            className="text-sm font-semibold text-[#EF4444] transition duration-200 hover:text-[#B91C1C] hover:underline"
          >
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
