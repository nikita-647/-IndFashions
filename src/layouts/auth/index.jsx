// import Footer from "components/footer/FooterAuthDefault";
// import authImg from "assets/img/auth/auth.png";
// import { Link, Routes, Route, Navigate } from "react-router-dom";
// import routes from "routes.js";
// import FixedPlugin from "components/fixedPlugin/FixedPlugin";

// export default function Auth() {
//   const getRoutes = (routes) => {
//     return routes.map((prop, key) => {
//       if (prop.layout === "/auth") {
//         return (
//           <Route path={`/${prop.path}`} element={prop.component} key={key} />
//         );
//       } else {
//         return null;
//       }
//     });
//   };
//   document.documentElement.dir = "ltr";
//   return (
//     <div>
//       <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
//         <FixedPlugin />
//         <main className={`mx-auto min-h-screen`}>
//           <div className="relative flex">
//             <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%]  lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:min-h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
//               <div className="mb-auto flex flex-col pl-5 pr-5 md:pl-12 md:pr-0 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
//                 <Link to="/admin" className="mt-0 w-max lg:pt-10">
//                   <div className="mx-auto flex h-fit w-fit items-center hover:cursor-pointer">
//                     <img src="src\assets\img\auth\logo.png"></img>
//                     <p className="ml-3 text-sm text-gray-600">
//                       Back to Dashboard
//                     </p>
//                   </div>
//                 </Link>
//                 <Routes>
//                   {getRoutes(routes)}
//                   <Route
//                     path="/"
//                     element={<Navigate to="/auth/sign-in" replace />}
//                   />
//                 </Routes>
//                 <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[49vw] 2xl:w-[44vw]">
//                   <div
//                     className="absolute flex h-full w-full items-end justify-center bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]"
//                     style={{ backgroundImage: `url(${authImg})` }}
//                   />
//                 </div>
//               </div>
//               <Footer />
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
// import { Routes, Route, Navigate } from "react-router-dom";
// import routes from "routes.js";

// export default function Auth() {
//   const getRoutes = (routes) => {
//     return routes.map((prop, key) => {
//       if (prop.layout === "/auth") {
//         return (
//           <Route path={`/${prop.path}`} element={prop.component} key={key} />
//         );
//       }
//       return null;
//     });
//   };

//   document.documentElement.dir = "ltr";

//   return (
//     // Rich, dark blue gradient from bottom-left to top-right
//     <div className="**bg-gradient-to-tr to-[#93C5FD]** flex min-h-screen items-center justify-center from-[#1E3A8A] via-[#1D4ED8] p-4">
//       <div className="w-full max-w-md">
//         <Routes>
//           {getRoutes(routes)}
//           <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
//         </Routes>
//       </div>
//     </div>
//   );
// }
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "routes.js";

export default function Auth() {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      }
      return null;
    });
  };

  document.documentElement.dir = "ltr";

  return (
    <div className="from-slate-900 relative min-h-screen w-full overflow-hidden bg-gradient-to-br via-blue-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute -right-40 -top-40 h-80 w-80 animate-pulse rounded-full bg-blue-500/30 blur-3xl"></div>
        <div
          className="absolute -left-40 top-1/2 h-96 w-96 animate-pulse rounded-full bg-indigo-500/20 blur-3xl"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute -bottom-32 right-1/4 h-72 w-72 animate-pulse rounded-full bg-purple-500/20 blur-3xl"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          {/* Decorative Elements */}
          <div className="absolute left-10 top-20 h-2 w-2 animate-ping rounded-full bg-blue-400 opacity-75"></div>
          <div
            className="absolute right-20 top-40 h-1.5 w-1.5 animate-ping rounded-full bg-indigo-400 opacity-75"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-40 left-20 h-2 w-2 animate-ping rounded-full bg-purple-400 opacity-75"
            style={{ animationDelay: "1s" }}
          ></div>

          {/* Routes Container */}
          <Routes>
            {getRoutes(routes)}
            <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />
          </Routes>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="from-slate-900/50 to-transparent pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t"></div>
    </div>
  );
}
