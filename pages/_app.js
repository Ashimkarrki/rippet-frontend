import "../styles/globals.css";
import { useState } from "react";
import NavbarFooterWrapper from "../components/NavbarFooterWrapper";
import cartContext from "../context/context";
function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({
    totalItem: 0,
    value: {},
  });
  return (
    <cartContext.Provider value={{ cart, setCart }}>
      <NavbarFooterWrapper>
        <Component {...pageProps} />
      </NavbarFooterWrapper>
    </cartContext.Provider>
  );
}

export default MyApp;
