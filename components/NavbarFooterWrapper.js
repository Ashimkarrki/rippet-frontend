import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
const NavbarFooterWrapper = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default NavbarFooterWrapper;
