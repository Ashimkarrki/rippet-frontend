import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
import styles from "../styles/Loading.module.css";
const Loading = () => {
  return (
    <div className={styles.loading}>
      <MoonLoader color="#1565c0" size={50} />
    </div>
  );
};

export default Loading;
