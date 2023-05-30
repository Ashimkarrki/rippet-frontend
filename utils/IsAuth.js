import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { userContext } from "../context/userContext";
import BarLoader from "react-spinners/BarLoader";
import axios from "axios";
function X(props, Children) {
  const {
    addDetails,
    addSeller,
    dataFetched,
    userInfo,
    sellerInfo,
    isDataFetched,
  } = useContext(userContext);
  console.log(isDataFetched);
  const [isUserAuthorised, setIsUserAuthorised] = useState(
    userInfo.id ? true : false
  );
  const [isSellerAuthorised, setIsSellerAuthorised] = useState(
    sellerInfo.id ? true : false
  );

  const [isLoading, setIsloading] = useState(isDataFetched ? false : true);
  // const [isLoading, setIsloading] = useState(false);
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
          dataFetched(true);
          addDetails(res.data.user);
        }
        if (res?.data?.user?.Role === "seller") {
          setIsloading(false);
          dataFetched(true);

          setIsSellerAuthorised(true);
          addSeller(res.data.user);
        }
      } catch (err) {
        setIsloading(false);
        dataFetched(true);
      }
    };
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
    console.log("loading");
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <BarLoader color="#2457aa" height={7} />
      </div>
    );
  }
  // if not authorised then no problem with login sign page
  else if (
    !isUserAuthorised &&
    (router.pathname === "/login" || router.pathname === "/signup")
  ) {
    console.log("second");

    return <Children {...props} />;
  }
  // if not authorised the redirect to /login
  else if (!isUserAuthorised && userSpecificRoute.includes(router.pathname)) {
    console.log("is not user and redirecting to login");
    router.replace("/login");
  }
  // if authorised then prevent from going to /login , /signup
  else if (
    isUserAuthorised &&
    (router.pathname === "/signup" || router.pathname === "/login")
  ) {
    router.replace("/");
  }
  // if authorised then give all other pages
  else if (isUserAuthorised && userSpecificRoute.includes(router.pathname)) {
    console.log("up");
    return <Children {...props} />;
  }
  // is seller but requesting user route
  else if (isSellerAuthorised && userSpecificRoute.includes(router.pathname)) {
    router.replace("/login");
  }
  // is not seller but accessing seller routes
  else if (
    !isSellerAuthorised &&
    router.pathname.split("/")[1] === "sellerDashboard"
  ) {
    router.replace("/seller/login");
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
    router.replace("/sellerDashboard");
  }
  // is seller authorised but want to go user specific route
  else if (
    isSellerAuthorised &&
    (router.pathname === "seller/login" || router.pathname === "seller/signup")
  ) {
    router.replace("/sellerDashboard");
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <BarLoader color="#2457aa" height={7} />
      </div>
    );
  }
}

const IsAuth = (Children) => {
  return (props) => {
    return X(props, Children);
  };
};

export default IsAuth;
