import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { userContext } from "../context/userContext";
import Image from "next/image";
import Link from "next/link";
import { BsSearch, BsBag, BsCartDash } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { AiOutlineMenu, AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { RiAccountCircleLine } from "react-icons/ri";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import styles from "../styles/Navbar.module.css";
import rippet_logo from "../public/rippet_logo.png";
// {{URL}}api/v1/products/search/ashim/1
const Navbar = () => {
  const router = useRouter();
  const [isMenuOn, setIsMenuOn] = useState(false);
  const [isSearchBarOn, setIsSearchBarOn] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [categories, setCategories] = useState([]);
  const fetchingCategories = async () => {
    const res = await fetch(
      "https://adorable-leather-jacket-foal.cyclic.app/api/v1/products/categories/category"
    );
    const result = await res.json();
    const data = result.data;
    setCategories(data);
  };
  useEffect(() => {
    fetchingCategories();
  }, []);
  const categorieshandler = (e) => {
    console.log(e.value);
    router.push(`/categories/${e.value}/1`);
  };

  const { cartInfo } = useContext(userContext);
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search/${searchValue}`);
  };
  return (
    <nav className={styles.nav}>
      <div className={styles.upper_nav}>
        <Link href={"/"} className={styles.rippet_logo_parent}>
          <Image src={rippet_logo} alt="logo" className={styles.rippet_logo} />
        </Link>
        <form className={styles.icon_wrapper} onSubmit={submitHandler}>
          <input
            value={searchValue}
            className={styles.input}
            type="text"
            required
            placeholder="Search..."
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className={styles.search_button} type="submit">
            <Link href={`/search/${searchValue}`}>
              <BsSearch className={styles.search_icon} />
            </Link>
          </button>
        </form>

        <div className={styles.navigate_icons}>
          {/* <button
            className={styles.search_button_separate}
            onClick={() => {
              setIsSearchBarOn((prev) => !prev);
            }}
          >
            <BsSearch className={styles.search_icon} />
          </button> */}
          <button className={styles.icons}>
            <Link href="/signup">
              <RiAccountCircleLine className={styles.navbar_icons} />
            </Link>
          </button>
          <button className={`${styles.icons} ${styles.relative}`}>
            <Link href="/Cart">
              <h5 className={styles.cart_no}>{cartInfo.results}</h5>
              <BsCartDash className={styles.navbar_icons} />
            </Link>
          </button>
          <button
            className={`${styles.menu_button} ${styles.icons}`}
            onClick={() => {
              setIsMenuOn(true);
            }}
          >
            <AiOutlineMenu className={styles.icon} />
          </button>
        </div>
      </div>

      <div className={styles.lower_nav}>
        <div className={styles.first_element}>
          {!!categories.length && (
            <Dropdown
              className={styles.myClassName}
              controlClassName={styles.myControlClassName}
              menuClassName={styles.myMenuClassName}
              arrowClassName={styles.myArrowClassName}
              arrowClosed={
                <span className={styles.arrow}>
                  <AiOutlineDown />
                </span>
              }
              arrowOpen={
                <span className={styles.arrow}>
                  <AiOutlineUp />
                </span>
              }
              options={categories}
              onChange={(e) => categorieshandler(e)}
              placeholder="Categories"
            />
          )}
        </div>

        <div className={styles.Linktext}>
          <h3 className={styles.textStlingLink}>Home</h3>
          <h3 className={styles.textStlingLink}>Shop</h3>
          <h3 className={styles.textStlingLink}>Digital Study Material</h3>
          <h3 className={styles.textStlingLink}>Available Roooms</h3>
          <h3 className={styles.textStlingLink}>Sell Here</h3>
        </div>
      </div>
      {isMenuOn && (
        <>
          <div className={styles.hidden_menu}>
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
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
