import React from "react";
import ReviewsAndQnaComponent from "../components/ReviewsAndQnaComponent";
import useSWR from "swr";
import axios from "axios";
import BarLoader from "react-spinners/BarLoader";
import IsAuth from "../utils/IsAuth";
import Loading from "../components/Loading";
const Qna = () => {
  console.log("helo");
  const { isLoading, data, isError } = useSWR(
    "ask/user/allask",
    async (url) => {
      console.log("before");
      const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });
      try {
        const res = await instance.get(url);
        console.log(res);
        return res.data.ask;
      } catch (err) {
        console.log(err);
        return err;
      }
    }
  );
  console.log(isLoading);
  if (isLoading) {
    return <Loading />;
  }
  return <ReviewsAndQnaComponent data={data} content="qna" />;
};

export default IsAuth(Qna);
