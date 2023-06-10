import React from "react";
import ReviewsAndQnaComponent from "../components/ReviewsAndQnaComponent";
import useSWR from "swr";
import axios from "axios";
import BarLoader from "react-spinners/BarLoader";
import IsAuth from "../utils/IsAuth";
import Loading from "../components/Loading";
const Reviews = () => {
  const { isLoading, data, isError } = useSWR(
    "reviews/user/allreviews",
    async (url) => {
      const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });
      try {
        const res = await instance.get(url);
        return res.data.data;
      } catch (err) {
        console.log(err);
        return err;
      }
    }
  );
  if (isLoading) {
    return <Loading />;
  }
  return <ReviewsAndQnaComponent data={data} content="reviews" />;
};

export default IsAuth(Reviews);
