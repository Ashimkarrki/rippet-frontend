import React from "react";
import useSWR from "swr";
import axios from "axios";
import UserComponent from "../components/UserComponent";
import Loading from "../components/Loading";
import IsAuth from "../utils/IsAuth";
const MyOrders = () => {
  const { isLoading, data, isError, mutate } = useSWR("orders", async (url) => {
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    try {
      const res = await instance.get(url);
      console.log(res.data.data.AllOrder);
      return res.data.data.AllOrder;
    } catch (err) {
      console.log(err);
      return err;
    }
  });
  if (isLoading) {
    return <Loading />;
  }
  return <UserComponent data={data} mutate={mutate} />;
};

export default IsAuth(MyOrders);
