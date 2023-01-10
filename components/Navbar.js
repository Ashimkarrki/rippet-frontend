import React from "react";
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
const Navbar = () => {
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
            <RiAccountCircleLine />
          </button>
          <button className={styles.icons}>
            <AiOutlineHeart />
          </button>
          <button className={styles.icons}>
            <Link href="/Cart">
              <BsBag />
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
        <h3>Home</h3>
        <h3>Shop</h3>
        <h3>Books For Rent</h3>
        <h3>Digital Study Material</h3>
        <h3>Available Roooms</h3>
        <h3>Contact Us</h3>
      </div>
    </nav>
  );
};

export default Navbar;
