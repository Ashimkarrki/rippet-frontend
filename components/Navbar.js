import React from "react";
import Image from "next/image";
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
import Link from "next/link";
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
            <BsBag />
          </button>
        </div>
      </div>
      <div className={styles.lower_nav}>
        <div className={styles.first_element}>
          <AiOutlineMenu />
          <h5>Category</h5>
          <AiOutlineDown />
        </div>
        <h5>Home</h5>
        <h5>Shop</h5>
        <h5>Books For Rent</h5>
        <h5>Digital Study Material</h5>
        <h5>Available Roooms</h5>
        <h5>Contact Us</h5>
      </div>
    </nav>
  );
};

export default Navbar;
