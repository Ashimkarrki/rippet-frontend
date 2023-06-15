import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/SellerNavbar.module.css";
import { RiMenu2Fill } from "react-icons/ri";
import { BsFillHouseDashFill } from "react-icons/bs";
import { IoMdClose, IoIosCreate } from "react-icons/io";
import { BiBorderAll } from "react-icons/bi";
import { BsQuestionSquareFill } from "react-icons/bs";
import { MdReviews, MdMessage } from "react-icons/md";
import { RiMessage2Line } from "react-icons/ri";
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
            <Link href={"/sellerDashboard"}>
              <BsFillHouseDashFill className={styles.icons_nav} />
              <span className={styles.heading}>Product</span>
            </Link>
          </li>
          <li
            className={
              pathname.slice(17, pathname.length) === "addProduct"
                ? styles.white
                : ""
            }
          >
            <Link href={"/sellerDashboard/addProduct"}>
              <IoIosCreate className={styles.icons_nav} />
              <span className={styles.heading}>Add Product</span>
            </Link>
          </li>
          <li
            className={
              pathname.slice(17, pathname.length) === "order"
                ? styles.white
                : ""
            }
          >
            <BiBorderAll className={styles.icons_nav} />
            <span className={styles.heading}>Order</span>
          </li>
          <li
            className={
              pathname.slice(17, pathname.length) === "reviews"
                ? styles.white
                : ""
            }
          >
            <Link href={"/sellerDashboard/reviews"}>
              <MdReviews className={styles.icons_nav} />
              <span className={styles.heading}>Reviews</span>
            </Link>
          </li>
          <li
            className={
              pathname.slice(17, pathname.length) === "qna" ? styles.white : ""
            }
          >
            <Link href={"/sellerDashboard/qna"}>
              <BsQuestionSquareFill className={styles.icons_nav} />
              <span className={styles.heading}>QNA</span>
            </Link>
          </li>
          <li
            className={
              pathname.slice(17, pathname.length) === "message"
                ? styles.white
                : ""
            }
          >
            <Link href={"/sellerDashboard/message"}>
              <MdMessage className={styles.icons_nav} />
              <span className={styles.heading}>Message</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default SellerNavbar;
