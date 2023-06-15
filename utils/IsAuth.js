import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { userContext } from "../context/userContext";
import BarLoader from "react-spinners/BarLoader";
import axios from "axios";
import Loading from "../components/Loading";
function X(props, Children) {
  const {
    addDetails,
    addSeller,
    dataFetched,
    userInfo,
    sellerInfo,
    isDataFetched,
    isAdmin,
    setAdmin,
  } = useContext(userContext);
  const [isUserAuthorised, setIsUserAuthorised] = useState(
    userInfo.id ? true : false
  );
  const [isSellerAuthorised, setIsSellerAuthorised] = useState(
    sellerInfo.id ? true : false
  );

  const [isLoading, setIsloading] = useState(isDataFetched ? false : true);
  const freeRoute = [
    "/",
    "/search/[...id]",
    "/categories/[...id]",
    "/product/[id]",
    "/seller/signup",
    "/seller/login",
    "/popular/[...id]",
    "/latest/[...id]",
  ];
  const userSpecificRoute = [
    "/Cart",
    "/Order",
    "/myquestions",
    "/myreviews",
    "/myorders",
  ];
  const router = useRouter();
  useEffect(() => {
    const fetchIsMe = async () => {
      const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });
      console.log("vitra");
      try {
        const res = await instance.get("users/isme");
        console.log(res.data);
        console.log(res.data.user.Role);
        if (res?.data?.Role === "user") {
          setIsloading(false);
          setIsUserAuthorised(true);
          dataFetched(true);
          addDetails(res.data.user);
        }
        if (res?.data?.Role === "seller") {
          setIsloading(false);
          dataFetched(true);
          setIsSellerAuthorised(true);
          addSeller(res.data.user);
        }
        if (res?.data?.Role === "admin") {
          setIsloading(false);
          dataFetched(true);
          setAdmin(true);
        }
      } catch (err) {
        setIsloading(false);
        dataFetched(true);
      }
    };
    console.log(isDataFetched, "=>", "data fetched");
    if (!isDataFetched) {
      fetchIsMe();
    }
  }, []);

  // for home page /search /product dont show loading

  if (freeRoute.includes(router.pathname)) {
    return <Children {...props} />;
  }

  // show loading screen
  else if (isLoading) {
    return <Loading />;
  }
  // if not authorised then no problem with login sign page
  else if (
    !isUserAuthorised &&
    (router.pathname === "/login" || router.pathname === "/signup")
  ) {
    return <Children {...props} />;
  }
  // if not authorised the redirect to /login
  else if (!isUserAuthorised && userSpecificRoute.includes(router.pathname)) {
    router.replace("/login");
    return <Loading />;
  }
  // if authorised then prevent from going to /login , /signup
  else if (
    isUserAuthorised &&
    (router.pathname === "/signup" || router.pathname === "/login")
  ) {
    router.replace("/");
    return <Loading />;
  }
  // if authorised then give all other pages
  else if (isUserAuthorised && userSpecificRoute.includes(router.pathname)) {
    return <Children {...props} />;
  }
  // is seller but requesting user route
  else if (isSellerAuthorised && userSpecificRoute.includes(router.pathname)) {
    router.replace("/login");
    return <Loading />;
  }
  // is not seller but accessing seller routes
  else if (
    !isSellerAuthorised &&
    router.pathname.split("/")[1] === "sellerDashboard"
  ) {
    router.replace("/seller/login");
    return <Loading />;
  }
  //is seller authorised then give any route related to sellerDashboard
  else if (
    isSellerAuthorised &&
    router.pathname.split("/")[1] === "sellerDashboard"
  ) {
    return <Children {...props} />;
  }
  // is authorised but want to go seller login or sign up
  else if (
    isSellerAuthorised &&
    (router.pathname === "seller/login" || router.pathname === "seller/signup")
  ) {
    router.replace("/sellerDashboard");
    return <Loading />;
  }
  // is seller authorised but want to go user specific route
  else if (
    isSellerAuthorised &&
    (router.pathname === "seller/login" || router.pathname === "seller/signup")
  ) {
    router.replace("/sellerDashboard");
    return <Loading />;
  } else if (
    (isSellerAuthorised || isUserAuthorised) &&
    (router.pathname === "/forgot-password" ||
      router.pathname === "/resetPassword/[...id]" ||
      router.pathname === "/verify-email/[...id]")
  ) {
    router.replace("/");
    return <Loading />;
  } else if (
    !isSellerAuthorised &&
    !isUserAuthorised &&
    (router.pathname === "/forgot-password" ||
      router.pathname === "/resetPassword/[...id]" ||
      router.pathname === "/verify-email/[...id]")
  ) {
    return <Children {...props} />;
  }
  // if admin then give pass
  else if (isAdmin && router.pathname.split("/")[1] === "adminDashboard") {
    return <Children {...props} />;
  }
  //if not admin then dont
  else if (!isAdmin && router.pathname.split("/")[1] === "adminDashboard") {
    router.replace("/");
    return <Loading />;
  } else {
    return <Loading />;
  }
}

const IsAuth = (Children) => {
  return (props) => {
    return X(props, Children);
  };
};

export default IsAuth;
