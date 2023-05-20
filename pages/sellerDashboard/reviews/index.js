import React, { useContext, useState } from "react";
import styles from "../../../styles/SellerReviews.module.css";
import useSWR from "swr";
import useFetchUser from "../../../features/fetchUser";
import { userContext } from "../../../context/userContext";
import axios from "axios";
import SellerReviewComponent from "../../../components/SellerReviewComponent";
const SellerReviews = () => {
  const [productReviewInfo, setProductReviewInfo] = useState();

  useFetchUser();
  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const { userInfo } = useContext(userContext);
  const { data, isLoading, error } = useSWR(
    `https://adorable-leather-jacket-foal.cyclic.app/api/v1/reviews/${userInfo.id}/seller`,
    async (url) => {
      if (userInfo.id) {
        try {
          const res = await instance.get(url);
          console.log(res.data.data);
          setProductReviewInfo(
            res.data.data.map((s) => {
              return {
                id: s.id,
                rating: s.rating,
                review: s.review,
                reviewer: s.user.Username,
                userId: s.user.id,
                date: s.createdAt,
                MainImage: s.product.MainImage,
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
      } else {
        return;
      }
    }
  );
  return (
    <div className={styles.review}>
      {productReviewInfo?.map((s) => {
        return <SellerReviewComponent key={s.id} data={s} />;
      })}
    </div>
  );
};

export default SellerReviews;
