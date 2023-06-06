import React, { useEffect, useRef } from "react";
import styles from "../styles/Dropdown.module.css";
import Link from "next/link";
import { DotSpinner } from "@uiball/loaders";

const NotificationDropDown = ({
  data,
  setToggleNotification,
  notificationLoading,
}) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setToggleNotification(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return document.addEventListener("mousedown", handleClick);
  }, [setToggleNotification]);
  const logout = async () => {
    try {
      const res = await instance.get("users/logout");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    console.log(data);
  };
  if (notificationLoading) {
    return (
      <div ref={ref} className={`${styles.drop_down} ${styles.width_change}`}>
        <div className={styles.spinner}>
          <DotSpinner color="blue" size={25} />
        </div>
      </div>
    );
  }
  if (data?.length === 0) {
    return (
      <div ref={ref} className={`${styles.drop_down} ${styles.width_change}`}>
        <div className={styles.drop_down_user_info}>
          <h6 className={styles.heading}>No Notifications</h6>
        </div>
      </div>
    );
  }
  return (
    <div ref={ref} className={`${styles.drop_down} ${styles.width_change}`}>
      {data.map((s) => {
        return (
          <Link
            key={s._id}
            href={
              s.context === "Review Reply"
                ? "/myreviews"
                : s.context === "Ask Reply"
                ? "/myquestions"
                : ""
            }
          >
            <div
              className={styles.drop_down_user_info}
              onClick={() => {
                setToggleNotification(false);
              }}
            >
              <h6 className={styles.heading}>{s.context}</h6>
              <p className={styles.reply}>Reply : {s.message}</p>
            </div>
            <p className={styles.date}>
              on{" "}
              {new Date(s.CreatedAt).toLocaleDateString("en-us", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </Link>
        );
      })}
      {/* <Link href={"/myorders"}>
        <h6 className={styles.drop_down_user_info_heading}></h6>
      </Link>
      <Link href={"/myquestions"}>
        <h6 className={styles.drop_down_user_info_heading}>My Questions</h6>
      </Link>
      <Link href={"/myreviews"}>
        <h6 className={styles.drop_down_user_info_heading}>My Reviews</h6>
      </Link>
      <h6 className={styles.drop_down_user_info_heading} onClick={logout}>
        Log Out
      </h6> */}
    </div>
  );
};

export default NotificationDropDown;
