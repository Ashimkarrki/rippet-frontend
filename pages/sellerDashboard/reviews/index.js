import React, { useContext, useState } from "react";
import styles from "../../../styles/SellerReviews.module.css";
import useSWR from "swr";

import axios from "axios";
import SellerReviewComponent from "../../../components/SellerReviewComponent";
import IsAuth from "../../../utils/IsAuth";
import Loading from "../../../components/Loading";
const SellerReviews = () => {
  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const { data, isLoading, error, mutate } = useSWR(
    `reviews/seller/allreviews`,
    async (url) => {
      try {
        const res = await instance.get(url);
        return res.data.data;
      } catch (err) {
        console.log(err);
      }
    }
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={styles.review}>
      {data?.map((s) => {
        return <SellerReviewComponent key={s.id} data={s} mutate={mutate} />;
      })}
    </div>
  );
};

export default IsAuth(SellerReviews);
