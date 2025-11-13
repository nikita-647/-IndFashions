import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import RoleManagement from "views/admin/roleMangement";
import UserManagement from "views/admin/userManagement";
import ReviewManagement from "views/admin/reviewManagement";
import ProductManagement from "views/admin/productManagement";
import OrderManagement from "views/admin/orderManagement";
import FaqsManagement from "views/admin/faqsManagement";
import TermsAndConditions from "views/admin/termsAndConditions";
import PrivacyAndPolicy from "views/admin/privacyAndpolicy";
import ChatSupportManagement from "views/admin/chatSupportManagement";



import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
// import RTLDefault from "views/rtl/default";

// Auth Imports
import SignIn from "views/auth/SignIn";
import UpdateForgotPassword from "views/auth/updateForgotpassword";
import ForgotPasswordAdmin from "views/auth/ForgotPassword";
import VerifyOTP from "views/auth/verifyOtp";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdGroup,
  MdRateReview,
  MdQuestionAnswer,
  MdPrivacyTip,
  MdDescription,
  MdStorefront,
  MdChat,
  MdInventory
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Role Management",
    layout: "/admin",
    path: "role-management",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <RoleManagement/>,
    
  },
  {
    name: "User Management",
    layout: "/admin",
    path: "user-management",
    icon: <MdGroup className="h-6 w-6" />,
    component: <UserManagement/>,
  
  },
  {
    name: "Review Management",
    layout: "/admin",
    path: "review-management",
    icon: <MdRateReview className="h-6 w-6" />,
    component: <ReviewManagement/>,
  
  },
  {
    name: "Product Management",
    layout: "/admin",
    path: "product-management",
    icon: <MdStorefront className="h-6 w-6" />,
    component: <ProductManagement/>,
  
  },
  {
    name: "Order Management",
    layout: "/admin",
    path: "order-management",
    icon: <MdInventory className="h-6 w-6" />,
    component: <OrderManagement/>,
  
  },
  {
    name: "FAQs Management",
    layout: "/admin",
    icon: <MdQuestionAnswer className="h-6 w-6" />,
    path: "faqs-management",
    component: <FaqsManagement/>

  },
  {
    name: "Terms And Conditions ",
    layout: "/admin",
    icon: <MdDescription className="h-6 w-6" />,
    path:"termsAndConditions",
    component: <TermsAndConditions/>

  },
  {
    name: "Privacy And Policy ",
    layout: "/admin",
    icon: <MdPrivacyTip className="h-6 w-6" />,
    path: "privacyAndpolicy",
    component: <PrivacyAndPolicy/>

  },
  {
    name: "Chat Support Management",
    layout: "/admin",
    icon: <MdChat className="h-6 w-6" />,
    path: "chat-support-management",
    component: <ChatSupportManagement/>

  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
   {
    name: "Forgot Password",
    layout: "/auth",
    path: "forgot-password",
    icon: <MdLock className="h-6 w-6" />,
    component: <ForgotPasswordAdmin/>,
  },
  {
    name: "Verify Otp",
    layout: "/auth",
    path: "verify-otp",
    icon: <MdLock className="h-6 w-6" />,
    component: <VerifyOTP/>,
  },
 {
    name: "Update Forgot Password",
    layout: "/auth",
    path: "update-password",
    icon: <MdLock className="h-6 w-6" />,
    component: <UpdateForgotPassword/>,
  },

  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "rtl",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <RTLDefault />,
  // },
];
export default routes;
