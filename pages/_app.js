import "../styles/globals.css";
import { useState } from "react";
import NavbarFooterWrapper from "../components/NavbarFooterWrapper";
import CartProvider from "../context/CartContext";
function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <NavbarFooterWrapper>
        <Component {...pageProps} />
      </NavbarFooterWrapper>
    </CartProvider>
  );
}

export default MyApp;
