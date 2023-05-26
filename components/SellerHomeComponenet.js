import React from "react";
import styles from "../styles/SellerHome.module.css";
import { useRouter } from "next/router";

const SellerHomecomponenet = () => {
  const router = useRouter();
  const buttonhandler = (e) => {
    router.push("/seller/login");
  };
  return (
    <div className={styles.sellerhomecontainer}>
      <div>
        <h1>Are you selling your Books/Manuals/Notes?</h1>
        <button onClick={buttonhandler}>SELL NOW</button>
      </div>
    </div>
  );
};
export default SellerHomecomponenet;
