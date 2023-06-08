import React, { useEffect, useRef } from "react";
import styles from "../styles/Dropdown.module.css";
import Link from "next/link";
import axios from "axios";
const UserInfoDropDown = ({ setIsUserInfoToggle }) => {
  const ref = useRef();
  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsUserInfoToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return document.addEventListener("mousedown", handleClick);
  }, [setIsUserInfoToggle]);
  const logout = async () => {
    try {
      const res = await instance.get("users/logout");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div ref={ref} className={styles.drop_down}>
      <Link href={"/myorders"}>
        <h6
          className={`${styles.drop_down_user_info} ${styles.heading}`}
          onClick={() => {
            setIsUserInfoToggle(false);
          }}
        >
          My Orders
        </h6>
      </Link>
      <Link href={"/myquestions"}>
        <h6
          className={`${styles.drop_down_user_info} ${styles.heading}`}
          onClick={() => {
            setIsUserInfoToggle(false);
          }}
        >
          My Questions
        </h6>
      </Link>
      <Link href={"/myreviews"}>
        <h6
          className={`${styles.drop_down_user_info} ${styles.heading}`}
          onClick={() => {
            setIsUserInfoToggle(false);
          }}
        >
          My Reviews
        </h6>
      </Link>
      <h6
        className={`${styles.drop_down_user_info} ${styles.heading}`}
        onClick={logout}
      >
        Log Out
      </h6>
    </div>
  );
};

export default UserInfoDropDown;
