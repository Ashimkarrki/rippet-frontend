import React from "react";
import ReviewsAndQnaComponent from "../components/ReviewsAndQnaComponent";
import useSWR from "swr";
import axios from "axios";
import BarLoader from "react-spinners/BarLoader";
import IsAuth from "../utils/IsAuth";
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
  return <ReviewsAndQnaComponent data={data} content="reviews" />;
};

export default IsAuth(Reviews);
