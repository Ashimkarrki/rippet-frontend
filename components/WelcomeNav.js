import React from "react";
import styles from "../styles/WelcomeNav.module.css";
import { userContext } from "../context/userContext";
import otherStyle from "../styles/Navbar.module.css";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import UserInfoDropDown from "./UserInfoDropDown";
const WelcomeNav = () => {
  const { userInfo } = React.useContext(userContext);

  const [isUserInfoToggle, setIsUserInfoToggle] = React.useState(false);

  return (
    <div className={styles.nav_container}>
      <div className={styles.nav}>
        <p className={styles.center}>
          Welcome to Rappit, The Next World of Students!{" "}
        </p>
        <div className={styles.wrapper}>
          <div className={otherStyle.relative}>
            {isUserInfoToggle && (
              <div className={otherStyle.dropDown_wrapper}>
                <UserInfoDropDown setIsUserInfoToggle={setIsUserInfoToggle} />
              </div>
            )}
            <div
              className={`${otherStyle.user_info}  `}
              onClick={() => {
                setIsUserInfoToggle(!isUserInfoToggle);
              }}
            >
              <div className={`${styles.iconwrapper}`}>
                {isUserInfoToggle ? (
                  <BsChevronUp className={styles.arrow} />
                ) : (
                  <BsChevronDown className={styles.arrow} />
                )}
                <h5 className={styles.name}>Ashim</h5>
              </div>
            </div>
          </div>
          <div className={styles.flex}>
            <a
              href="https://www.facebook.com/people/Rappit-Online-Stationery/100087181194814/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className={styles.icons} />
            </a>
            <a
              href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.linkedin.com%2Fin%2Frappit-online-stationery-0a904725a%3Ffbclid%3DIwAR3fc8o7sL0PASLQ6n6q_X4KXWmtDunmRNvEfbwqib0nGvBM1w_Edve-iSI&h=AT1F6uloFr0lzTENf0Bu524JyOqRNZm7lL6KcZQOJ-mkfRIsaiTHMNgsaYT0mwOBYP2NTi6dlxLoJK8zB-ezCDuDbbKmzReXum9LseHk0H4clHr_bil6bK2zpK2kdU2bz7sPsQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className={styles.icons} />
            </a>
            <a
              href="
          https://twitter.com/RappitNepal?t=1KVOnhL42L47x0RcgdqxuA&s=07&fbclid=IwAR1ZjOKRGJRTEF-w2rx9Tm3379cOmBz-DS5kF2D5gOZSLHZv8YVGH1tkxdU"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineTwitter
                className={`${styles.icons} ${styles.twitter}`}
              />
            </a>
            <a
              href="
          https://www.instagram.com/rappitnepal_books/?igshid=YmMyMTA2M2Y%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillInstagram className={`${styles.icons} ${styles.insta}`} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeNav;
