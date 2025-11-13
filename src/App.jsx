import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SignIn from "views/auth/SignIn";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route path="admin/*" element={<AdminLayout />} />
        {/* <Route path="rtl/*" element={<RtlLayout />} /> */}
        <Route path="/" element={<Navigate to="./auth/sign-in" replace />} />
      </Routes>
    </>
  );
};

export default App;
