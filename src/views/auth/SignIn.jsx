import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [details, setDetails] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!details.email || !details.password) {
      toast.error("Email and Password is required");
      return;
    }
    const loadingToast = toast.loading("Please wait...");
    try {
      const formData = new FormData();
      formData.append("email", details.email);
      formData.append("password", details.password);

      const response = await axios.post(
        "https://oneto7-hostels.onrender.com/api/admin/admin-login",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(response);
      if (response?.data?.statusCode === 200) {
        const token = response.data.result.token;
        localStorage.setItem("token", token);
        localStorage.setItem("AdminId", response.data.result._id);
        console.log(response.data.result._id);
        toast.success("Login successful");
        navigate("/admin/default");
      } else {
        toast.error(response.data.message || "Invalid Email or Password");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div className="animate-fadeIn w-full px-4 sm:px-0">
      {/* Logo/Brand Section */}
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
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white drop-shadow-lg sm:text-2xl">
          Admin Portal
        </h1>
        <p className="mt-1 text-xs text-blue-300 drop-shadow sm:text-sm">
          IndFashions
        </p>
      </div>

      {/* Sign In Card */}
      <div className="animate-slideUp rounded-2xl border border-white/20 bg-white/95 p-6 shadow-2xl backdrop-blur-xl sm:rounded-3xl sm:p-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="from-slate-800 to-slate-600 text-transparent mb-1 bg-gradient-to-r bg-clip-text text-2xl font-bold sm:mb-2 sm:text-3xl">
            Welcome Back
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
          {/* Email Field */}
          <div className="group">
            <label className="text-slate-700 mb-2 block text-xs font-semibold transition-colors group-focus-within:text-blue-600 sm:text-sm">
              Email Address
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
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
              <input
                type="email"
                name="email"
                value={details.email}
                onChange={handleChange}
                placeholder="admin@fashion.com"
                className="bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 hover:border-slate-300 h-11 w-full rounded-xl border-2 pl-10 pr-3 text-xs outline-none transition-all duration-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:h-12 sm:pl-12 sm:pr-4 sm:text-sm"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="group">
            <label className="text-slate-700 mb-2 block text-xs font-semibold transition-colors group-focus-within:text-blue-600 sm:text-sm">
              Password
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
                type="password"
                name="password"
                value={details.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 hover:border-slate-300 h-11 w-full rounded-xl border-2 pl-10 pr-3 text-xs outline-none transition-all duration-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:h-12 sm:pl-12 sm:pr-4 sm:text-sm"
              />
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              to="/auth/forgot-password"
              className="text-xs font-semibold text-blue-600 underline-offset-2 transition-all duration-200 hover:text-blue-700 hover:underline sm:text-sm"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`h-11 w-full transform rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-sm font-semibold text-white shadow-lg shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02] hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 hover:shadow-xl hover:shadow-blue-500/50 active:scale-[0.98] sm:h-12 sm:text-base ${
              loading ? "cursor-not-allowed opacity-70 hover:scale-100" : ""
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="-ml-1 mr-3 h-4 w-4 animate-spin text-white sm:h-5 sm:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing In...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Sign In
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
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            )}
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
            <span>Protected by enterprise-grade security</span>
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

// import InputField from "components/fields/InputField";
// import { FcGoogle } from "react-icons/fc";
// import Checkbox from "components/checkbox";

// export default function SignIn() {
//   return (
//     <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
//       {/* Sign in section */}
//       <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
//         <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
//           Sign In
//         </h4>
//         <p className="mb-9 ml-1 text-base text-gray-600">
//           Enter your email and password to sign in!
//         </p>
//         <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
//           <div className="rounded-full text-xl">
//             <FcGoogle />
//           </div>
//           <h5 className="text-sm font-medium text-navy-700 dark:text-white">
//             Sign In with Google
//           </h5>
//         </div>
//         <div className="mb-6 flex items-center  gap-3">
//           <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
//           <p className="text-base text-gray-600 dark:text-white"> or </p>
//           <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
//         </div>
//         {/* Email */}
//         <InputField
//           variant="auth"
//           extra="mb-3"
//           label="Email*"
//           placeholder="mail@simmmple.com"
//           id="email"
//           type="text"
//         />

//         {/* Password */}
//         <InputField
//           variant="auth"
//           extra="mb-3"
//           label="Password*"
//           placeholder="Min. 8 characters"
//           id="password"
//           type="password"
//         />
//         {/* Checkbox */}
//         <div className="mb-4 flex items-center justify-between px-2">
//           <div className="flex items-center">
//             <Checkbox />
//             <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
//               Keep me logged In
//             </p>
//           </div>
//           <a
//             className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
//             href=" "
//           >
//             Forgot Password?
//           </a>
//         </div>
//         <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
//           Sign In
//         </button>
//         <div className="mt-4">
//           <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
//             Not registered yet?
//           </span>
//           <a
//             href=" "
//             className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
//           >
//             Create an account
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }
