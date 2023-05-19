import React, { useContext } from "react";
import useSWR from "swr";
import { userContext } from "../../../context/userContext";
import useFetchUser from "../../../features/fetchUser";
import axios from "axios";
import Cart from "../../Cart";
// {{URL}}api/v1/ask/63d4c3fd6812d1d08802841c/seller
// {{URL}}api/v1/ask/update/63baf05f75a40a49333f2a2f/63bba72e6a8f7cdd85c336d8
// /update/:productId/:askId

const QNA = () => {
  useFetchUser();
  const { userInfo } = useContext(userContext);
  const { data, isLoading, error } = useSWR(
    `https://adorable-leather-jacket-foal.cyclic.app/api/v1/ask/${userInfo.id}/seller`,
    async (url) => {
      if (userInfo.id) {
        const instance = axios.create({
          withCredentials: true,
          headers: { authorization: "Bearer" },
        });
        try {
          const res = await instance.get(url);
          console.log(res.data.data);
        } catch (err) {
          console.log(err);
        }
      }
    }
  );
  return <div>QNA</div>;
};

export default QNA;
