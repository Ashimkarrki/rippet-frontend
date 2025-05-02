import "../styles/globals.css";
import axios from "axios";
import NavbarFooterWrapper from "../components/NavbarFooterWrapper";
import UserProvider from "../context/userContext";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  axios.defaults.baseURL = "https://rappit-backend-7wcs.vercel.app/api/v1/";
  axios.defaults.withCredentials = true;
  https: return (
    <UserProvider>
      <Toaster />

      <NavbarFooterWrapper>
        <Component {...pageProps} />
      </NavbarFooterWrapper>
    </UserProvider>
  );
}

export default MyApp;
