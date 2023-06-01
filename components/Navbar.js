import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { userContext } from "../context/userContext";
import Image from "next/image";
import Link from "next/link";
import { BsSearch, BsBag, BsCartDash } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { MdClose } from "react-icons/md";
import { AiOutlineMenu, AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { RiAccountCircleLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import "react-dropdown/style.css";
import styles from "../styles/Navbar.module.css";
import rippet_logo from "../public/rippet_logo.png";
const Navbar = () => {
  const { userInfo } = useContext(userContext);
  const [isDropDown, setIsDropDown] = useState(false);
  const router = useRouter();
  const [isMenuOn, setIsMenuOn] = useState(false);
  const [searchValue, setSearchValue] = useState(
    router.asPath.split("/")[1] === "search"
      ? router.asPath.split("/")[2].replace("%20", " ")
      : ""
  );
  const [categories, setCategories] = useState([]);
  // const fetchingCategories = async () => {
  //   const res = await fetch(
  //     "https://adorable-leather-jacket-foal.cyclic.app/api/v1/products/categories/category"
  //   );
  //   const result = await res.json();
  //   const data = result.data;
  //   setCategories(data);
  // };
  // useEffect(() => {
  //   fetchingCategories();
  // }, []);
  const categorieshandler = (e) => {
    router.push(`/categories/${e.value}/1`);
  };
  const { cartInfo } = useContext(userContext);
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search/${searchValue}/no/no/1`);
  };
  const logout = async () => {
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    try {
      const res = await instance.get("users/logout");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
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
            <Link
              href={
                searchValue
                  ? `/search/${searchValue}/no/no/1`
                  : `/search/no/no/1`
              }
            >
              <BsSearch className={styles.search_icon} />
            </Link>
          </button>
        </form>

        <div className={styles.navigate_icons}>
          {userInfo.id ? (
            <div className={styles.user_info}>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <h5 className={styles.user_info_heading}>
                    {userInfo.userName}
                  </h5>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className={styles.drop_down}
                    sideOffset={5}
                  >
                    <DropdownMenu.Item className={styles.DropdownMenuItem}>
                      <h6 className={styles.drop_down_user_info_heading}>
                        My Orders
                      </h6>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className={styles.DropdownMenuItem}>
                      <h6 className={styles.drop_down_user_info_heading}>
                        My Questions
                      </h6>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className={styles.DropdownMenuItem}>
                      <h6 className={styles.drop_down_user_info_heading}>
                        My Reviews
                      </h6>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className={styles.DropdownMenuItem}>
                      <h6
                        className={styles.drop_down_user_info_heading}
                        onClick={logout}
                      >
                        Log Out
                      </h6>
                    </DropdownMenu.Item>
                    <DropdownMenu.Arrow className={styles.DropdownMenuArrow} />
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          ) : (
            <button className={styles.icons}>
              <Link href="/signup">
                <RiAccountCircleLine className={styles.navbar_icons} />
              </Link>
            </button>
          )}
          {userInfo.id && (
            <button className={`${styles.icons} ${styles.relative}`}>
              <Link href="/Cart">
                <h5 className={styles.cart_no}>{cartInfo.results}</h5>
                <FiShoppingCart className={styles.navbar_icons} />
              </Link>
            </button>
          )}
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
          {/* {!!categories.length && (
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
          )} */}
          <div className={styles.drop_menu}>
            <h3 onClick={() => setIsDropDown(!isDropDown)}>
              {isDropDown ? (
                <RxCross1 className={styles.ham_icon} />
              ) : (
                <GiHamburgerMenu className={styles.ham_icon} />
              )}
              Categories
            </h3>
            {/* <div
              className={`${
                isDropDown ? styles.dropdown_enable : styles.dropdown_disable
              } ${styles.dropdown_same}`}
            >
              {categories.map((s, index) => {
                return (
                  <Link
                    key={index}
                    href={"/categories/" + s + "/1"}
                    onClick={() => {
                      setIsDropDown(false);
                    }}
                  >
                    <h4 className={styles.dropdown_item}>{s}</h4>
                  </Link>
                );
              })}
            </div> */}
          </div>
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
