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
          const result = await axios.get(
            `https://adorable-leather-jacket-foal.cyclic.app/api/v1/products/${res.data.data[0].product}`
          );
          // console.log(res.data.data);
          setProductReviewInfo([
            {
              reviews: [
                res.data.data[0].review,
                "nice xa",
                "hasgdf ashkdgfkjhasgdf gaskhdfg agdfhgsdf agdfkhgahdgfkjhasd fhgahdsgfjhasg fjadgfhjagdfhgadhfgjhadgfjhagdfhgashdfghajsdgfjhagdfjhgajdhsgfjhadgfjhagdfjhgahjdfgjadgfjhagdfjhgsdjf",
                "haina horw",
                "hok",
                "tait ",
                "hovanya",
              ],
              rating: res.data.data[0].rating,
              reviewer: res.data.data[0].user.Username,
              productId: res.data.data[0].product,
              MainImage:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQor6LAYPUWKAO7T4VGjvLLIJxv5uB4ii7lbw&usqp=CAU",
              Name: "Hami",
            },
            {
              reviews: [res.data.data[0].review, "nice xa"],
              rating: res.data.data[0].rating,
              reviewer: res.data.data[0].user.Username,
              productId: res.data.data[0].product,
              MainImage:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQor6LAYPUWKAO7T4VGjvLLIJxv5uB4ii7lbw&usqp=CAU",
              Name: "Hami",
            },
            {
              reviews: [res.data.data[0].review, "nice xa"],
              rating: res.data.data[0].rating,
              reviewer: res.data.data[0].user.Username,
              productId: res.data.data[0].product,
              MainImage:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQor6LAYPUWKAO7T4VGjvLLIJxv5uB4ii7lbw&usqp=CAU",
              Name: "Hami",
            },
          ]);
          return { ...res.data.data, ...result.data.data[0] };
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
        return <SellerReviewComponent key={s.productId} data={s} />;
      })}
    </div>
  );
};

export default SellerReviews;
