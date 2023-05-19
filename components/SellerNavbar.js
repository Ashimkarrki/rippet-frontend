import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/SellerNavbar.module.css";
import { RiMenu2Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/router";
const SellerNavbar = () => {
  const [nav, setNav] = useState(false);
  const { pathname } = useRouter();
  console.log(pathname.slice(17, pathname.length));
  return (
    <>
      <button
        className={`${styles.menu} ${nav ? styles.close : ""}`}
        onClick={() => {
          setNav((prev) => !prev);
        }}
      >
        {!nav ? (
          <RiMenu2Fill className={styles.icons} />
        ) : (
          <IoMdClose className={styles.icons} />
        )}
      </button>
      <nav className={`${styles.navbar} ${!nav ? styles.onOff : ""}`}>
        <ul className={styles.ul}>
          <li
            className={
              pathname.slice(17, pathname.length) === "" ? styles.white : ""
            }
          >
            <Link href={"/sellerDashboard"}>All Product</Link>
          </li>
          <li
            className={
              pathname.slice(17, pathname.length) === "addProduct"
                ? styles.white
                : ""
            }
          >
            <Link href={"/sellerDashboard/addProduct"}> Add Product</Link>
          </li>
          <li
            className={
              pathname.slice(17, pathname.length) === "order"
                ? styles.white
                : ""
            }
          >
            Order
          </li>
          <li
            className={
              pathname.slice(17, pathname.length) === "reviews"
                ? styles.white
                : ""
            }
          >
            <Link href={"/sellerDashboard/reviews"}>Reviews</Link>
          </li>
          <li
            className={
              pathname.slice(17, pathname.length) === "qna" ? styles.white : ""
            }
          >
            <Link href={"/sellerDashboard/qna"}>QNA</Link>
          </li>
          <li
            className={
              pathname.slice(17, pathname.length) === "reports"
                ? styles.white
                : ""
            }
          >
            Reports
          </li>
        </ul>
      </nav>
    </>
  );
};

export default SellerNavbar;
