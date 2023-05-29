import React from "react";
import LoginComponent from "../../components/LoginComponent";
import IsAuth from "../../utils/IsAuth";
const login = () => {
  return <LoginComponent role={"seller"} />;
};

export default IsAuth(login);
