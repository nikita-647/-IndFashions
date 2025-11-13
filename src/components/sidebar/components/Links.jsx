/* eslint-disable */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";

export function SidebarLinks(props) {
  let location = useLocation();
  const { routes } = props;

  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes) => {
    return routes
      .filter((route) => route.layout === "/admin") // Filter only admin routes
      .map((route, index) => {
        const isActive = activeRoute(route.path);

        return (
          <Link key={route.path || index} to={route.layout + "/" + route.path}>
            <div className="group relative mb-1 flex hover:cursor-pointer">
              <li
                className={`
                  mx-2 my-0.5 flex w-full cursor-pointer
                  items-center rounded-lg px-3 py-2.5
                  transition-all duration-200 ease-in-out
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 shadow-md shadow-blue-500/30 dark:from-blue-600 dark:to-blue-700"
                      : "hover:bg-blue-50 dark:hover:bg-gray-800/50"
                  }
                  sm:px-4 lg:px-5
                `}
              >
                <span
                  className={`
                    flex items-center justify-center
                    text-lg transition-all
                    duration-200 sm:text-xl
                    ${
                      isActive
                        ? "scale-105 text-white"
                        : "text-gray-500 group-hover:scale-105 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400"
                    }
                  `}
                >
                  {route.icon ? route.icon : <DashIcon />}
                </span>
                <p
                  className={`
                    leading-1 ml-3 flex flex-1 truncate
                    text-sm font-medium transition-all
                    duration-200 sm:ml-3.5
                    ${
                      isActive
                        ? "font-semibold text-white"
                        : "text-gray-700 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-blue-400"
                    }
                  `}
                >
                  {route.name}
                </p>

                {/* Active indicator dot - desktop only */}
                {isActive && (
                  <div className="hidden h-1.5 w-1.5 animate-pulse items-center justify-center rounded-full bg-white sm:flex" />
                )}
              </li>

              {/* Active bar indicator - right side */}
              {isActive && (
                <div className="absolute right-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-l-lg bg-blue-600 shadow-md dark:bg-blue-400" />
              )}
            </div>
          </Link>
        );
      });
  };

  return (
    <div className="flex w-full flex-col overflow-y-auto">
      {createLinks(routes)}
    </div>
  );
}

export default SidebarLinks;

// /* eslint-disable */
// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import DashIcon from "components/icons/DashIcon";
// // chakra imports

// export function SidebarLinks(props) {
//   // Chakra color mode
//   let location = useLocation();

//   const { routes } = props;

//   // verifies if routeName is the one active (in browser input)
//   const activeRoute = (routeName) => {
//     return location.pathname.includes(routeName);
//   };

//   const createLinks = (routes) => {
//     return routes.map((route, index) => {
//       if (route.layout === "/admin") {
//         return (
//           <Link key={index} to={route.layout + "/" + route.path}>
//             <div className="relative mb-3 flex hover:cursor-pointer">
//               <li
//                 className="my-[3px] flex cursor-pointer items-center px-8"
//                 key={index}
//               >
//                 <span
//                   className={`${
//                     activeRoute(route.path) === true
//                       ? "font-bold text-brand-500 dark:text-white"
//                       : "font-medium text-gray-600"
//                   }`}
//                 >
//                   {route.icon ? route.icon : <DashIcon />}{" "}
//                 </span>
//                 <p
//                   className={`leading-1 ml-4 flex ${
//                     activeRoute(route.path) === true
//                       ? "font-bold text-navy-700 dark:text-white"
//                       : "font-medium text-gray-600"
//                   }`}
//                 >
//                   {route.name}
//                 </p>
//               </li>
//               {activeRoute(route.path) ? (
//                 <div class="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
//               ) : null}
//             </div>
//           </Link>
//         );
//       }
//     });
//   };
//   // BRAND
//   return createLinks(routes);
// }

// export default SidebarLinks;
