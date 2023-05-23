import React from "react";
import styles from "../styles/PopupMessenger.module.css";
const PopUpMessgenger = () => {
  return (
    <form className={styles.PopUpMessgenger}>
      <div className={styles.messages}></div>
      <div className={styles.input_msg}>
        <input type="text" className={styles.input} />
        <input type="Submit" value="Send" />
      </div>
    </form>
  );
};

export default PopUpMessgenger;
