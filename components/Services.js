import React from "react";
import { ImAirplane, ImCheckmark } from "react-icons/im";
import { IoIosMan } from "react-icons/io";
import { FaDollarSign } from "react-icons/fa";
import styles from "../styles/Services.module.css";
const Services = () => {
  return (
    <div className={styles.services}>
      <div className={styles.card}>
        {<ImCheckmark className={styles.logo} />}

        <div className={styles.desc}>
          <h3>Free Shipping</h3>
          <p className={styles.para}>
            Free delivery for all products inside Dharan,Bazar
          </p>
        </div>
      </div>
      <div className={styles.card}>
        {<IoIosMan className={styles.logo} />}
        <div className={styles.desc}>
          <h3>No Contact Delivery</h3>
          <p className={styles.para}>We always value your safety</p>
        </div>
      </div>
      <div className={styles.card}>
        {<ImAirplane className={styles.logo} />}
        <div className={styles.desc}>
          <h3>Fast Delivery</h3>
          <p className={styles.para}>We deliver faster then anything</p>
        </div>
      </div>
      <div className={styles.card}>
        {<FaDollarSign className={styles.logo} />}
        <div className={styles.desc}>
          <h3>10 Days Refund</h3>
          <p className={styles.para}>Easy return policy for all products</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
