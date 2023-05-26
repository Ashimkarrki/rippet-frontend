import React, { useContext, useState } from "react";
import styles from "../../../styles/SellerReviews.module.css";
import useSWR from "swr";

import axios from "axios";
import SellerReviewComponent from "../../../components/SellerReviewComponent";
const SellerReviews = () => {
  const [productReviewInfo, setProductReviewInfo] = useState();

  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const { data, isLoading, error } = useSWR(
    `https://adorable-leather-jacket-foal.cyclic.app/api/v1/reviews/seller/allreviews`,
    async (url) => {
      try {
        const res = await instance.get(url);
        console.log(res.data.data);
        setProductReviewInfo(
          res.data.data.map((s) => {
            return {
              id: s.id,
              rating: s.rating,
              review: s.review,
              reply: s.Answer,
              reviewer: s.user.Username,
              userId: s.user.id,
              date: s.createdAt,
              MainImage: s.product.MainImage,
              sellerId: s.sellerId,
              productId: s.id,
              productName: s.product.Name,
              productPrice: s.product.Price,
              productAvgRating: s.product.AverageRating,
            };
          })
        );
        return res.data.data;
      } catch (err) {
        console.log(err);
      }
    }
  );
  return (
    <div className={styles.review}>
      {productReviewInfo?.map((s) => {
        return (
          <SellerReviewComponent
            key={s.id}
            data={s}
            setProductReviewInfo={setProductReviewInfo}
          />
        );
      })}
    </div>
  );
};

export default SellerReviews;
