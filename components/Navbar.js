import React, { useContext, useState } from "react";
import { userContext } from "../context/userContext";
import Image from "next/image";
import Link from "next/link";
import { BsSearch, BsBag, BsCartDash } from "react-icons/bs";
import { MdClose } from "react-icons/md";
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
  const [isMenuOn, setIsMenuOn] = useState(false);
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
              <BsCartDash className={styles.navbar_icons} />
            </Link>
          </button>
        </div>
      </div>
      <div className={styles.lower_nav}>
        <div className={styles.first_element}>
          <h3>Category</h3>
          <AiOutlineDown className={styles.icon} />
        </div>
        <div className={styles.Linktext}>
          <h3 className={styles.textStlingLink}>Home</h3>
          <h3 className={styles.textStlingLink}>Shop</h3>
          <h3 className={styles.textStlingLink}>Digital Study Material</h3>
          <h3 className={styles.textStlingLink}>Available Roooms</h3>
          <h3 className={styles.textStlingLink}>Sell Here</h3>
        </div>
        <button
          className={styles.menu_button}
          onClick={() => {
            setIsMenuOn(true);
          }}
        >
          <AiOutlineMenu className={styles.icon} />
        </button>
      </div>
      {isMenuOn && (
        <>
          <div className={styles.hidden_menu}>
            {/* <div className={styles.Linktext}> */}
            <button
              className={styles.menu_button_close}
              onClick={() => {
                setIsMenuOn(false);
              }}
            >
              <MdClose />
            </button>
            <div className={styles.hidden_flex}>
              <h3 className={styles.textStlingLink}>Home</h3>
              <h3 className={styles.textStlingLink}>Shop</h3>
              <h3 className={styles.textStlingLink}>Digital Study Material</h3>
              <h3 className={styles.textStlingLink}>Available Roooms</h3>
              <h3 className={styles.textStlingLink}>Sell Here</h3>
            </div>
            {/* </div> */}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
