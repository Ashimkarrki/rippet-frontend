import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { userContext } from "../context/userContext";

import axios from "axios";
import { AiFillMessage } from "react-icons/ai";
function X(props, Children) {
  const [isUserAuthorised, setIsUserAuthorised] = useState(false);
  const [isSellerAuthorised, setIsSellerAuthorised] = useState(false);

  const [isLoading, setIsloading] = useState(true);
  const freeRoute = [
    "/",
    "/search/[...id]",
    "/category",
    "/product/[id]",
    "/seller/signup",
    "/seller/login",
  ];
  const userSpecificRoute = ["/Cart", "/Order"];
  const router = useRouter();
  const { addDetails, addSeller, userInfo, sellerInfo } =
    useContext(userContext);
  useEffect(() => {
    const fetchIsMe = async () => {
      const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });
      try {
        const res = await instance.get("users/isme");
        if (res?.data?.user?.Role === "user") {
          setIsloading(false);
          setIsUserAuthorised(true);
          addDetails(res.data.user);
        }
        if (res?.data?.user?.Role === "seller") {
          setIsloading(false);
          setIsSellerAuthorised(true);
          addSeller(res.data.user);
        }
      } catch (err) {
        setIsloading(false);
      }
    };
    fetchIsMe();
  }, []);

  // for home page /search /product dont show loading
  if (freeRoute.includes(router.pathname)) {
    return <Children {...props} />;
  }
  // show loading screen
  else if (isLoading) {
    return <h1>is Loading</h1>;
  }
  // if not authorised then no problem with login sign page
  else if (
    !isUserAuthorised &&
    (router.pathname === "/login" || router.pathname === "signup")
  ) {
    return <Children {...props} />;
  }
  // if not authorised the redirect to /login
  else if (!isUserAuthorised && userSpecificRoute.includes(router.pathname)) {
    router.push("/login");
  }
  // if authorised then prevent from going to /login , /signup
  else if (
    isUserAuthorised &&
    (router.pathname === "/signup" || router.pathname === "/login")
  ) {
    router.push("/");
  }
  // if authorised then give all other pages
  else if (isUserAuthorised && userSpecificRoute.includes(router.pathname)) {
    console.log("up");
    return <Children {...props} />;
  }
  // is seller but requesting user route
  else if (isSellerAuthorised && userSpecificRoute.includes(router.pathname)) {
    router.push("/login");
  }
  // is not seller but accessing seller routes
  else if (
    !isSellerAuthorised &&
    router.pathname.split("/")[1] === "sellerDashboard"
  ) {
    router.push("/seller/login");
  }
  //is seller authorised then give any route related to sellerDashboard
  else if (
    isSellerAuthorised &&
    router.pathname.split("/")[1] === "sellerDashboard"
  ) {
    console.log("down");

    return <Children {...props} />;
  }
  // is authorised but want to go seller login or sign up
  else if (
    isSellerAuthorised &&
    (router.pathname === "seller/login" || router.pathname === "seller/signup")
  ) {
    router.push("/sellerDashboard");
  }
  // is seller authorised but want to go user specific route
  else if (
    isSellerAuthorised &&
    (router.pathname === "seller/login" || router.pathname === "seller/signup")
  ) {
    router.push("/sellerDashboard");
  }
}

const IsAuth = (Children) => {
  return (props) => {
    return X(props, Children);
  };
};

export default IsAuth;
