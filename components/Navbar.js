import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { userContext } from "../context/userContext";
import Image from "next/image";
import Link from "next/link";
import { BsSearch } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { MdClose } from "react-icons/md";
import { AiOutlineMenu, AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { RiAccountCircleLine, RiNotificationLine } from "react-icons/ri";
import "react-dropdown/style.css";
import styles from "../styles/Navbar.module.css";
import rippet_logo from "../public/rippet_logo.png";
import NotificationDropDown from "./NotificationDropDown";
import Collapsible from "./Collapsible";
import { DotSpinner } from "@uiball/loaders";
import WelcomeNav from "./WelcomeNav";
const Navbar = () => {
  // const [isCatDropDown, setIsCatDropDown] = useState(false);
  const [isMenuOn, setIsMenuOn] = useState(false);
  const { mutate } = useSWRConfig();
  const [notifications, setNotifications] = useState([]);
  const [toggleNotification, setToggleNotification] = useState(false);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const { userInfo } = useContext(userContext);
  const [isCatDrop, setIsCatDrop] = useState(false);
  const router = useRouter();
  // const [data, setData] = useState();

  // const [category, setCategory] = useState([]);
  const {
    isLoading: isLoad,
    data: category,
    error: iserror,
  } = useSWR(
    "/categories",
    async (url) => {
      try {
        const res = await axios.get(url);
        // setCategory(res.data);
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
      // setData(res.data.unseennotification);
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
      mutate("/notifications/seen");
    } catch (err) {
      console.log(err);
    }
  };
  const [searchValue, setSearchValue] = useState(
    router.asPath.split("/")[1] === "search"
      ? router.asPath.split("/")[2].replace("%20", " ")
      : ""
  );

  const { cartInfo } = useContext(userContext);
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search/${searchValue}/no/no/1`);
  };
  const subDropDown = (children, title, categoriesName, position) => {
    if (children.length === 0) {
      return (
        <DropdownMenu.Item asChild className={styles.DropdownMenuItem}>
          {categoriesName ? (
            <Link href={"/categories/" + categoriesName + "/no/no/1"}>
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
              <Link href={"/categories/" + categoriesName + "/no/no/1"}>
                <h6 className={styles.drop_down_user_info_heading}>{title}</h6>
              </Link>
            ) : (
              <h6 className={styles.drop_down_user_info_heading}>{title}</h6>
            )}
          </DropdownMenu.SubTrigger>

          <DropdownMenu.Portal>
            <DropdownMenu.SubContent
              className={styles.drop_down}
              alignOffset={-1 - position * 29}
              sideOffset={0}
            >
              {children.map((s, index) => {
                return (
                  <div key={s._id} className={styles.grey}>
                    {subDropDown(s.children, s.title, s?.categoriesName, index)}
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
      <WelcomeNav />
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
          {!userInfo.id && (
            <button className={styles.icons}>
              <Link href="/signup">
                <RiAccountCircleLine className={styles.navbar_icons} />
              </Link>
            </button>
          )}

          {userInfo.id && (
            <div className={` ${styles.relative} ${styles.asd}`}>
              <div className={styles.cover}>
                <button
                  className={`${styles.icons} ${styles.relative} ${styles.no_padding}`}
                  onClick={() => {
                    getNotifications();
                    setToggleNotification(!toggleNotification);
                  }}
                >
                  <RiNotificationLine className={styles.navbar_icons} />
                </button>
                {data !== 0 &&
                  !isLoading &&
                  data &&
                  typeof data === "number" && (
                    <h5 className={styles.number}>{data}</h5>
                  )}
              </div>

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
            </div>
          )}
          {userInfo.id && (
            <button className={`${styles.icons} ${styles.relative}`}>
              <Link href="/Cart" className={styles.cover}>
                <FiShoppingCart className={styles.navbar_icons} />
                {cartInfo.results !== 0 && (
                  <h5 className={styles.number}>{cartInfo.results}</h5>
                )}
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
                  align="center"
                  sideOffset={8}
                >
                  {isLoad ? (
                    <div className={styles.spinner}>
                      <DotSpinner color="blue" size={25} />
                    </div>
                  ) : !isLoading && category && category?.length !== 0 ? (
                    category?.map((s, index) => {
                      // console.log("entered");
                      return (
                        <div className={styles.grey} key={s._id}>
                          {subDropDown(
                            s.children,
                            s.title,
                            s?.categoriesName,
                            index
                          )}
                        </div>
                      );
                    })
                  ) : (
                    ""
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
              <Collapsible
                setIsMenuOn={setIsMenuOn}
                child={category}
                clicked={isCatDrop}
              />
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
