import React from "react";
import ReviewsAndQnaComponent from "../components/ReviewsAndQnaComponent";
import useSWR from "swr";
import axios from "axios";
import BarLoader from "react-spinners/BarLoader";
import IsAuth from "../utils/IsAuth";
import Loading from "../components/Loading";
const Qna = () => {
  const { isLoading, data, isError } = useSWR(
    "ask/user/allask",
    async (url) => {
      const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });
      try {
        const res = await instance.get(url);
        return res.data.ask;
      } catch (err) {
        return err;
      }
    }
  );
  if (isLoading) {
    return <Loading />;
  }
  return <ReviewsAndQnaComponent data={data} content="qna" />;
};

export default IsAuth(Qna);
