import React, { useContext, useState } from "react";
import useSWR from "swr";
import styles from "../../../styles/QNA.module.css";
import { userContext } from "../../../context/userContext";
import useFetchUser from "../../../features/fetchUser";
import axios from "axios";
import SellerQNAComponent from "../../../components/SellerQNAComponent";
import IsAuth from "../../../utils/IsAuth";
import Loading from "../../../components/Loading";
const QNA = () => {
  const { data, isLoading, error, mutate } = useSWR(
    `ask/seller/allasks`,
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
      }
    }
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={styles.qna}>
      {data?.map((s) => {
        return <SellerQNAComponent key={s.id} data={s} mutate={mutate} />;
      })}
    </div>
  );
};

export default IsAuth(QNA);
