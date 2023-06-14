import React from "react";

import styles from "../styles/Footer.module.css";
const Footer = () => {
  return (
    <footer id="footer" className={styles.footer}>
      <div>
        <h3 className={styles.heading}>Connect With Us</h3>
        <ul className={styles.list}>
          <li>
            <a href="https://facebook.com">Facebook</a>
          </li>
          <li>
            <a href="https://instagram.com">Instagram</a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className={styles.heading}>More About Store</h3>
        <ul className={styles.list}>
          <li>
            <a href="#">Rappit Store</a>
          </li>
          <li>
            <a href="#">Langhali Chowk, Dharan</a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className={styles.heading}>Contact Details</h3>
        <ul className={styles.list}>
          <li>Address : Main Store - Dharan,Nepal</li>
          <li>Langhali Chowk, Dharan & Kathmandu</li>
          <li>Nepal</li>
          <li>56700</li>
          <li>Contact : 9812423773</li>
          <li>E-mail : rappit777@gmail.com</li>
          <li>Site Name : rappitnepal.com</li>
        </ul>
      </div>
      <div>
        <h3 className={styles.heading}>Useful Links</h3>
        <div>
          <ul className={styles.list}>
            <li>
              <a href="#"> Refund Policy</a>
            </li>
            <li>
              <a href="#">Order Details</a>
            </li>
            <li>
              <a href="#"> Track Order</a>
            </li>
            <li>
              <a href="#">Shopping History</a>
            </li>
            <li>
              <a href="#"> Update Profile</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
