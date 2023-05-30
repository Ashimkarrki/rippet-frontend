import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SellerNavbar from "./SellerNavbar";
import { useRouter } from "next/router";

const NavbarFooterWrapper = ({ children }) => {
  const route = useRouter();
  if (route.pathname.slice(0, 16) === "/sellerDashboard") {
    return (
      <>
        <SellerNavbar />
        {children}
      </>
    );
  }
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default NavbarFooterWrapper;
