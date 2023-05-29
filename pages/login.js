import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import LoginComponent from "../components/LoginComponent";
import IsAuth from "../utils/IsAuth";

const login = () => {
  return <LoginComponent role={"user"} />;
};

export default IsAuth(login);
