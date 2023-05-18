import "../styles/globals.css";
import axios from "axios";
import NavbarFooterWrapper from "../components/NavbarFooterWrapper";
import UserProvider from "../context/userContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function MyApp({ Component, pageProps }) {
  axios.defaults.baseURL =
    "https://adorable-leather-jacket-foal.cyclic.app/api/v1/";

  return (
    <UserProvider>
    <ToastContainer />
      <NavbarFooterWrapper>
        <Component {...pageProps} />
      </NavbarFooterWrapper>
    </UserProvider>
  );
}

export default MyApp;
