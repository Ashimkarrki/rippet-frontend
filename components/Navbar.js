import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { userContext } from "../context/userContext";
import Image from "next/image";
import Link from "next/link";
import {
  BsSearch,
  BsBag,
  BsCartDash,
  BsChevronUp,
  BsChevronDown,
  BsDot,
} from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import useSWR from "swr";
import { RxCross1 } from "react-icons/rx";
import { MdClose } from "react-icons/md";
import { AiOutlineMenu, AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { RiAccountCircleLine, RiNotificationLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import "react-dropdown/style.css";
import styles from "../styles/Navbar.module.css";
import rippet_logo from "../public/rippet_logo.png";
import NotificationDropDown from "./NotificationDropDown";
import UserInfoDropDown from "./UserInfoDropDown";
import Collapse from "../pages/collapse";
import Collapsible from "./Collapsible";
import { DotSpinner } from "@uiball/loaders";
const Navbar = () => {
  // {{URL}}api/v1/products/search/categories/civil-secondsem-handwritten/no/no/1
  const [notifications, setNotifications] = useState([]);
  const [toggleNotification, setToggleNotification] = useState(false);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [temp, setTemp] = useState([
    {
      _id: 12,
      title: "1st sem",
      children: [
        {
          _id: 10,
          title: "Hand Written",
          children: [],
        },
        {
          _id: 101,
          title: "Hard Copy",
          children: [],
        },
      ],
    },
    {
      _id: 2,
      title: "2nd sem",
      children: [
        {
          _id: 102,
          title: "Hand Written",
          children: [],
        },
        {
          _id: 103,
          title: "Hard Copy",
          children: [],
        },
      ],
    },
  ]);
  const { userInfo } = useContext(userContext);
  const [isUserInfoToggle, setIsUserInfoToggle] = useState(false);
  const [isCatDrop, setIsCatDrop] = useState(false);
  const router = useRouter();
  const [category, setCategory] = useState([]);

  const [isMenuOn, setIsMenuOn] = useState(false);
  const {
    isLoading: isLoad,
    // data: category,
    error: iserror,
  } = useSWR(
    "/categories",
    async (url) => {
      try {
        const res = await axios.get(url);
        setCategory(res.data);
        console.log(res);
        setParentClicked(
          res.data.map((s) => {
            return {
              id: s._id,
              state: false,
            };
          })
        );
        return res.data;
      } catch (err) {
        console.log("err");
        console.log(err);
        return err;
      }
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );
  const {
    isLoading,
    data,
    error: error,
  } = useSWR(userInfo.id ? "/notifications/seen" : null, async (url) => {
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    try {
      const res = await instance.get(url);

      return res.data.unseennotification;
    } catch (err) {
      return err;
    }
  });

  const [parentClicked, setParentClicked] = useState([]);
  const getNotifications = async () => {
    setNotificationLoading(true);
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    try {
      const res = await instance.get("notifications");
      setNotifications(res.data.notification);
      setNotificationLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const [searchValue, setSearchValue] = useState(
    router.asPath.split("/")[1] === "search"
      ? router.asPath.split("/")[2].replace("%20", " ")
      : ""
  );
  const [categories, setCategories] = useState([]);
  const categorieshandler = (e) => {
    router.push(`/categories/${e.value}/1`);
  };
  const { cartInfo } = useContext(userContext);
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search/${searchValue}/no/no/1`);
  };

  const subDropDown = (children, title, categoriesName) => {
    if (children.length === 0) {
      return (
        <DropdownMenu.Item className={styles.DropdownMenuItem}>
          {categoriesName ? (
            <Link href={"categories/" + categoriesName + "/no/no/1"}>
              <h6 className={styles.drop_down_user_info_heading}>{title}</h6>
            </Link>
          ) : (
            <h6 className={styles.drop_down_user_info_heading}>{title}</h6>
          )}
        </DropdownMenu.Item>
      );
    } else {
      return (
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger className={styles.DropdownMenuSubTrigger}>
            {categoriesName ? (
              <Link href={"categories/" + categoriesName + "/no/no/1"}>
                <h6 className={styles.drop_down_user_info_heading}>{title}</h6>
              </Link>
            ) : (
              <h6 className={styles.drop_down_user_info_heading}>{title}</h6>
            )}
            {/* <h5 className={styles.drop_down_user_info_heading}>{title}</h5> */}
          </DropdownMenu.SubTrigger>
          <DropdownMenu.Portal>
            <DropdownMenu.SubContent
              className={styles.drop_down}
              // alignOffset={-10}
              avoidCollisions={false}
              sideOffset={5}
            >
              {children.map((s) => {
                return (
                  <div key={s._id}>
                    {subDropDown(s.children, s.title, s?.categoriesName)}
                  </div>
                );
              })}
            </DropdownMenu.SubContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Sub>
      );
    }
  };
  return (
    <nav className={styles.nav}>
      <div className={styles.upper_nav}>
        <Link href={"/"} className={styles.rippet_logo_parent}>
          <Image
            src={rippet_logo}
            alt="logo"
            className={styles.rippet_logo}
            fill
          />
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
            <div className={styles.relative}>
              {isUserInfoToggle && (
                <div className={styles.dropDown_wrapper}>
                  <UserInfoDropDown setIsUserInfoToggle={setIsUserInfoToggle} />
                </div>
              )}
              <div
                className={styles.user_info}
                onClick={() => {
                  setIsUserInfoToggle(!isUserInfoToggle);
                }}
              >
                <h5
                  className={`${styles.user_info_heading} ${styles.dropDown_heading}`}
                >
                  {userInfo.userName.split(" ")[0]}
                </h5>
              </div>
            </div>
          ) : (
            <button className={styles.icons}>
              <Link href="/signup">
                <RiAccountCircleLine className={styles.navbar_icons} />
              </Link>
            </button>
          )}

          {userInfo.id && (
            <div className={` ${styles.relative} ${styles.asd}`}>
              {data !== 0 && !isLoading && !error && (
                <h5 className={styles.notification_no}>{data}</h5>
              )}
              {toggleNotification && (
                <div
                  className={styles.notification_dropdown_wrapper}
                  onClick={() => setToggleNotification(true)}
                >
                  <NotificationDropDown
                    data={notifications}
                    notificationLoading={notificationLoading}
                    setToggleNotification={setToggleNotification}
                  />
                </div>
              )}
              <div
                className={styles.user_info}
                onClick={() => {
                  getNotifications();
                  setToggleNotification(!toggleNotification);
                }}
              >
                <RiNotificationLine className={styles.navbar_icons} />
              </div>
            </div>
          )}
          {userInfo.id && (
            <button className={`${styles.icons} ${styles.relative}`}>
              <Link href="/Cart">
                {cartInfo.results !== 0 && (
                  <h5 className={styles.cart_no}>{cartInfo.results}</h5>
                )}
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
          <div className={styles.drop_menu}>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <h3 className={styles.user_info_heading}>Categories</h3>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className={styles.drop_down}
                  alignOffset={-5}
                >
                  {console.log(isLoad)}
                  {console.log(category)}
                  {isLoad ? (
                    <div className={styles.spinner}>
                      <DotSpinner color="blue" size={25} />
                    </div>
                  ) : (
                    category &&
                    category?.map((s) => {
                      return (
                        <div key={s._id}>
                          {subDropDown(s.children, s.title, s?.categoriesName)}
                        </div>
                      );
                    })
                  )}

                  <DropdownMenu.Arrow className={styles.DropdownMenuArrow} />
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>

        <div className={styles.Linktext}>
          <Link href={"/"}>
            <h3 className={styles.textStlingLink}>Home</h3>
          </Link>
          <Link href={"/seller/login"}>
            <h3 className={styles.textStlingLink}>Sell Here</h3>
          </Link>
        </div>
      </div>
      {console.log("naya")}
      {console.log(category)}
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
              <Link
                href={"/"}
                onClick={() => {
                  setIsMenuOn(false);
                }}
              >
                <h3 className={styles.textStlingLink}>Home</h3>
              </Link>
              <Link
                href={"/seller/login"}
                onClick={() => {
                  setIsMenuOn(false);
                }}
              >
                <h3 className={styles.textStlingLink}>Sell Here</h3>
              </Link>
              <h3
                onClick={() => {
                  setIsCatDrop(!isCatDrop);
                }}
                className={styles.textStlingLink}
              >
                Category
              </h3>
              <Collapsible child={category} clicked={isCatDrop} />

              {/* <ul className={styles.ul}>
                {category.map((s) => {
                  return (
                    <li key={s._id}>
                      <h3
                        className={styles.textStlingLink}
                        onClick={() =>
                          setParentClicked((prev) => {
                            return prev.map((k) => {
                              if (k.id === s._id) {
                                return { ...k, state: !k.state };
                              }
                              return {
                                ...k,
                                state: false,
                              };
                            });
                          })
                        }
                      >
                        {parentClicked.find((k) => k.id === s._id).state ? (
                          <BsChevronDown className={styles.icon_cat} />
                        ) : (
                          <BsDot className={styles.icon_cat} />
                        )}
                        {s.title}
                      </h3>
                      <Collapsible
                        key={s._id}
                        clicked={
                          parentClicked.find((k) => k.id === s._id).state
                        }
                        child={s.children}
                        title={s.title}
                      />
                    </li>
                  );
                })}
              </ul> */}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
