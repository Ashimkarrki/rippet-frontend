import React, { useContext, useState } from "react";
import useSWR from "swr";
import styles from "../../../styles/QNA.module.css";
import { userContext } from "../../../context/userContext";
import useFetchUser from "../../../features/fetchUser";
import axios from "axios";
import SellerQNAComponent from "../../../components/SellerQNAComponent";
import IsAuth from "../../../utils/IsAuth";
const QNA = () => {
  const [QNAInfo, setQNAInfo] = useState();

  const { data, isLoading, error } = useSWR(
    `ask/seller/allasks`,
    async (url) => {
      const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });
      try {
        const res = await instance.get(url);
        console.log(res.data.data);
        setQNAInfo(
          res.data.data.map((s) => {
            return {
              id: s.id,
              Question: s.Question,
              Answer: s.Answer,
              questioner: s?.user?.Username,
              userId: s?.user?.id,
              date: s.createdAt,
              MainImage: s.product.MainImage,
              sellerId: s.sellerId,
              productId: s.product.id,
              productName: s.product.Name,
              productPrice: s.product.Price,
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
    <div className={styles.qna}>
      {QNAInfo?.map((s) => {
        return (
          <SellerQNAComponent key={s.id} data={s} setQNAInfo={setQNAInfo} />
        );
      })}
    </div>
  );
};

export default IsAuth(QNA);
