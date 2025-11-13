/* eslint-disable */
import React from "react";
import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import routes from "routes.js";

// Import your logo
import sidebarLogo from "assets/img/auth/logo.png";

const Sidebar = ({ open, onClose }) => {
  return (
    <div
      className={`
        dark:bg-slate-900 fixed left-0 top-0 !z-50 flex min-h-screen w-72 
        flex-col bg-white shadow-2xl transition-all duration-300
        ease-in-out dark:text-gray-200
        xl:!z-0 xl:w-80 xl:translate-x-0
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Close Button - Mobile Only */}
      <span
        className="absolute right-4 top-4 z-10 block cursor-pointer text-2xl text-gray-700 transition-colors hover:text-red-500 dark:text-gray-300 xl:hidden"
        onClick={onClose}
        aria-label="Close sidebar"
      >
        <HiX />
      </span>

      {/* Logo Section */}
      <div className="mx-6 mt-8 flex items-center">
        <div className="flex items-center">
          {/* Logo Image */}
          <img
            src={sidebarLogo}
            alt="Admin Dashboard Logo"
            className="mr-3 h-10 w-10 rounded-md object-contain"
          />
          {/* App Name */}
          <div className="text-slate-800 font-poppins text-2xl font-extrabold dark:text-white">
            Ind
            <span className="font-medium text-blue-500 dark:text-blue-400">
              Fashions
            </span>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="dark:bg-slate-700 mx-6 mb-4 mt-6 h-px bg-gray-200" />

      {/* Navigation Links - Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-4">
        <ul className="space-y-0.5">
          <Links routes={routes} />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

// // /* eslint-disable */

// // import { HiX } from "react-icons/hi";
// // import Links from "./components/Links";

// // // import SidebarCard from "components/sidebar/componentsrtl/SidebarCard";
// // import routes from "routes.js";

// // const Sidebar = ({ open, onClose }) => {
// //   return (
// //     <div
// //       className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
// //         open ? "translate-x-0" : "-translate-x-96"
// //       }`}
// //     >
// //       <span
// //         className="absolute right-4 top-4 block cursor-pointer xl:hidden"
// //         onClick={onClose}
// //       >
// //         <HiX />
// //       </span>

// //       <div className={`mx-[56px] mt-[50px] flex items-center`}>
// //         <div className="ml-1 mt-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
// //           Horizon <span class="font-medium">FREE</span>
// //         </div>
// //       </div>
// //       <div class="mb-7 mt-[58px] h-px bg-gray-300 dark:bg-white/30" />
// //       {/* Nav item */}

// //       <ul className="mb-auto pt-1">
// //         <Links routes={routes} />
// //       </ul>

// //       {/* Free Horizon Card */}
// //       {/* <div className="flex justify-center">
// //         <SidebarCard />
// //       </div> */}

// //       {/* Nav item end */}
// //     </div>
// //   );
// // };

// // export default Sidebar;
