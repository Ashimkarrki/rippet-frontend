import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/SellerNavbar.module.css";
import { BsFillHouseDashFill } from "react-icons/bs";
import { IoIosCreate } from "react-icons/io";
import { BiBorderAll } from "react-icons/bi";
import { RiMenu2Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

import { BsQuestionSquareFill } from "react-icons/bs";
import { MdReviews, MdMessage } from "react-icons/md";
import { useRouter } from "next/router";
import { AiFillHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
const AdminNavbar = () => {
  const [nav, setNav] = useState(false);
  const { pathname } = useRouter();
  return (
    <>
      <nav className={`${styles.navbar} ${!nav ? styles.onOff : ""}`}>
        <ul className={styles.ul}>
          <li
            className={
              pathname.slice(16, pathname.length) === "" ? styles.white : ""
            }
          >
            <Link href={"/adminDashboard"}>
              <AiFillHome className={styles.icons_nav} />
              <span className={styles.heading}>Home</span>
            </Link>
          </li>
          <li
            className={
              pathname.slice(16, pathname.length) === "" ? styles.white : ""
            }
          >
            <Link href={"/adminDashboard/user"}>
              <FaUser className={styles.icons_nav} />
              <span className={styles.heading}>User</span>
            </Link>
          </li>
          <li
            className={
              pathname.slice(16, pathname.length) === "" ? styles.white : ""
            }
          >
            <Link href={"/adminDashboard/seller"}>
              <FaUserTie className={styles.icons_nav} />
              <span className={styles.heading}>Seller</span>
            </Link>
          </li>
          <li
            className={
              pathname.slice(16, pathname.length) === ""
                ? styles.white
                : "products"
            }
          >
            <Link href={"/adminDashboard/products"}>
              <BsFillHouseDashFill className={styles.icons_nav} />
              <span className={styles.heading}>Product</span>
            </Link>
          </li>
          <li
            className={
              pathname.slice(16, pathname.length) === "addProduct"
                ? styles.white
                : ""
            }
          >
            <Link href={"/adminDashboard/addProduct"}>
              <IoIosCreate className={styles.icons_nav} />
              <span className={styles.heading}>Add Product</span>
            </Link>
          </li>

          <li
            className={
              pathname.slice(16, pathname.length) === "order"
                ? styles.white
                : ""
            }
          >
            <BiBorderAll className={styles.icons_nav} />
            <span className={styles.heading}>Order</span>
          </li>
          <li
            className={
              pathname.slice(16, pathname.length) === "reviews"
                ? styles.white
                : ""
            }
          >
            <Link href={"/adminDashboard/reviews"}>
              <MdReviews className={styles.icons_nav} />
              <span className={styles.heading}>Reviews</span>
            </Link>
          </li>
          <li
            className={
              pathname.slice(16, pathname.length) === "qna" ? styles.white : ""
            }
          >
            <Link href={"/adminDashboard/qna"}>
              <BsQuestionSquareFill className={styles.icons_nav} />
              <span className={styles.heading}>QNA</span>
            </Link>
          </li>
          <li
            className={
              pathname.slice(16, pathname.length) === "message"
                ? styles.white
                : ""
            }
          >
            <Link href={"/adminDashboard/message"}>
              <MdMessage className={styles.icons_nav} />
              <span className={styles.heading}>Message</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AdminNavbar;
