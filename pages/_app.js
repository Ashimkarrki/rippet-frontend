import "../styles/globals.css";
import { useState } from "react";
import axios from "axios";
import NavbarFooterWrapper from "../components/NavbarFooterWrapper";
import CartProvider from "../context/CartContext";
function MyApp({ Component, pageProps }) {
  axios.defaults.baseURL =
    "https://adorable-leather-jacket-foal.cyclic.app/api/v1/";

  return (
    <CartProvider>
      <NavbarFooterWrapper>
        <Component {...pageProps} />
      </NavbarFooterWrapper>
    </CartProvider>
  );
}

export default MyApp;
