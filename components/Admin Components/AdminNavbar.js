import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/SellerNavbar.module.css";
import {BsFillHouseDashFill} from "react-icons/bs"
import {IoIosCreate } from "react-icons/io";
import {BiBorderAll} from "react-icons/bi";
import {BsQuestionSquareFill} from "react-icons/bs"
import {MdReviews, MdMessage} from "react-icons/md";
import { useRouter } from "next/router";
import {AiFillHome} from "react-icons/ai"
import {FaUser} from "react-icons/fa"
import {FaUserTie} from "react-icons/fa"
const AdminNavbar = () =>{
  const [nav, setNav] = useState(false);
  const { pathname } = useRouter();
return(
    <>
        <nav className={`${styles.navbar} ${!nav ? styles.onOff : ""}`}>
        <ul className={styles.ul}>
        <li
            className={
              pathname.slice(16, pathname.length) === "" ? styles.white : ""
            }
          >
            <Link href={"/adminDashboard"}><AiFillHome className={styles.icons_nav}/>Home</Link>
          </li>
          <li
            className={
              pathname.slice(16, pathname.length) === "" ? styles.white : ""
            }
          >
            <Link href={"/adminDashboard/user"}>
            
            <FaUser className={styles.icons_nav}/>User</Link>
          </
          li>
          <li
            className={
              pathname.slice(16, pathname.length) === "" ? styles.white : ""
            }
          >
            <Link href={"/adminDashboard/seller"}><FaUserTie className={styles.icons_nav}/>Seller</Link>
          </li>
          <li
            className={
              pathname.slice(16, pathname.length) === "" ? styles.white : "products"
            }
          >
            <Link href={"/adminDashboard/products"}><BsFillHouseDashFill className={styles.icons_nav}/> Product</Link>
          </li>
          <li
            className={
              pathname.slice(16, pathname.length) === "addProduct"
                ? styles.white
                : ""
            }
          >
            <Link href={"/sellerDashboard/addProduct"}>
            <IoIosCreate className={styles.icons_nav}/>
             Add Product</Link>
          </li>

          <li
            className={
              pathname.slice(16, pathname.length) === "order"
                ? styles.white
                : ""
            }
          >
          <BiBorderAll className={styles.icons_nav}/>
            Order
          </li>
          <li
            className={
              pathname.slice(16, pathname.length) === "reviews"
                ? styles.white
                : ""
            }
          >
            <Link href={"/sellerDashboard/reviews"}>
            <MdReviews className={styles.icons_nav}/>
            Reviews</Link>
          </li>
          <li
            className={
              pathname.slice(16, pathname.length) === "qna" ? styles.white : ""
            }
          >
            <Link href={"/sellerDashboard/qna"}>
            <BsQuestionSquareFill className={styles.icons_nav}/>
            QNA</Link>
          </li>
          <li
            className={
              pathname.slice(16, pathname.length) === "message"
                ? styles.white
                : ""
            }
          >
        <Link href={"/sellerDashboard/message"}>
        <MdMessage className={styles.icons_nav} />
        Message</Link>
          </li>
        </ul>
        </nav>
    </>
        )
}

export default AdminNavbar;