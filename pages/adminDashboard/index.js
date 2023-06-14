import React from "react";
import BannerController from "../../components/Admin Components/BannerController";
import CategoriesController from "../../components/Admin Components/CategoriesController";
import style from "../../styles/admindashboard.module.css";
import IsAuth from "../../utils/IsAuth";
const Home = () => {
  return (
    <div className={style.homecontainer}>
      <BannerController />
      <CategoriesController />
    </div>
  );
};

export default IsAuth(Home);
