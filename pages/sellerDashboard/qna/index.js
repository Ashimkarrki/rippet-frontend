import React, { useContext, useState } from "react";
import useSWR from "swr";
import styles from "../../../styles/QNA.module.css";
import { userContext } from "../../../context/userContext";
import useFetchUser from "../../../features/fetchUser";
import axios from "axios";
import Cart from "../../Cart";
import SellerQNAComponent from "../../../components/SellerQNAComponent";
import useFetchSeller from "../../../features/fetchSeller";
// {{URL}}api/v1/ask/63d4c3fd6812d1d08802841c/seller
// {{URL}}api/v1/ask/update/63baf05f75a40a49333f2a2f/63bba72e6a8f7cdd85c336d8
// /update/:productId/:askId

const QNA = () => {
  const [QNAInfo, setQNAInfo] = useState();
  useFetchSeller();
  const { sellerInfo } = useContext(userContext);
  // const { data, isLoading, error } = useSWR(
  //   `https://adorable-leather-jacket-foal.cyclic.app/api/v1/ask/${sellerInfo.id}/seller`,
  //   async (url) => {
  //     if (userInfo.id) {
  //       const instance = axios.create({
  //         withCredentials: true,
  //         headers: { authorization: "Bearer" },
  //       });
  //       try {
  //         const res = await instance.get(url);
  //         console.log(res.data.data);
  //         setQNAInfo(
  //           res.data.data.map((s) => {
  //             return {
  //               id: s.id,
  //               rating: s.rating,
  //               review: s.review,
  //               reply: s.Answer,
  //               reviewer: s.user.Username,
  //               userId: s.user.id,
  //               date: s.createdAt,
  //               MainImage: s.product.MainImage,
  //               sellerId: s.sellerId,
  //               productId: s.id,
  //               productName: s.product.Name,
  //               productPrice: s.product.Price,
  //               productAvgRating: s.product.AverageRating,
  //             };
  //           })
  //         );
  //         return res.data.data;
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     } else {
  //       return;
  //     }
  //   }
  // );
  return (
    <div className={styles.review}>
      {/* {QNAInfo?.map((s) => {
        return (
          <SellerQNAComponent key={s.id} data={s} setQNAInfo={setQNAInfo} />
        );
      })} */}
    </div>
  );
};

export default QNA;
