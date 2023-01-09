import React, { useState } from "react";
import styles from "../styles/LatestProductsHome.module.css";
import "react-multi-carousel/lib/styles.css";
import CarouselComponent from "./CarouselComponent";
const LatestProductsHome = () => {
  return (
    <div className={styles.latest_products}>
      <CarouselComponent title={"Latest Products"} list1={data1} />
    </div>
  );
};

export default LatestProductsHome;
