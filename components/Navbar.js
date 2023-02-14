import React, { useContext } from "react";
import { userContext } from "../context/userContext";
import Image from "next/image";
import Link from "next/link";
import { BsSearch, BsBag, BsFillBagFill } from "react-icons/bs";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineMenu,
  AiOutlineDown,
} from "react-icons/ai";
import { RiAccountCircleLine, RiAccountCircleFill } from "react-icons/ri";
import styles from "../styles/Navbar.module.css";
import rippet_logo from "../public/rippet_logo.png";
import useFetchUser from "../features/fetchUser";
const Navbar = () => {
  const { cartInfo } = useContext(userContext);
  return (
    <nav className={styles.nav}>
      <div className={styles.upper_nav}>
        <Link href={"/"}>
          <Image src={rippet_logo} alt="logo" className={styles.rippet_logo} />
        </Link>
        <div className={styles.icon_wrapper}>
          <input className={styles.input} type="text" placeholder="Search..." />
          <button className={styles.search_button}>
            <BsSearch className={styles.search_icon} />
          </button>
        </div>

        <div className={styles.navigate_icons}>
          <button className={styles.icons}>
            <Link href="/signup">
              <RiAccountCircleLine className={styles.navbar_icons} />
            </Link>
          </button>
          <button className={styles.icons}>
            <AiOutlineHeart className={styles.navbar_icons} />
          </button>
          <button className={`${styles.icons} ${styles.relative}`}>
            <Link href="/Cart">
              <h5 className={styles.cart_no}>{cartInfo.results}</h5>
              <BsBag className={styles.navbar_icons} />
            </Link>
          </button>
        </div>
      </div>
      <div className={styles.lower_nav}>
        <div className={styles.first_element}>
          <AiOutlineMenu className={styles.icon} />
          <h3>Category</h3>
          <AiOutlineDown className={styles.icon} />
        </div>
        <div className={styles.Linktext}>
          <h3 className={styles.textStlingLink}>Home</h3>
          <h3 className={styles.textStlingLink}>Shop</h3>
          <h3 className={styles.textStlingLink}>Books For Rent</h3>
          <h3 className={styles.textStlingLink}>Digital Study Material</h3>
          <h3 className={styles.textStlingLink}>Available Roooms</h3>
          <h3 className={styles.textStlingLink}>Contact Us</h3>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
