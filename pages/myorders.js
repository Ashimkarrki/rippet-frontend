import React from "react";
import useSWR from "swr";
import axios from "axios";
const MyOrders = () => {
  const { isLoading, data, isError } = useSWR("orders", async (url) => {
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    try {
      const res = await instance.get(url);
      console.log(res.data);
      return res.data.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  });
  return <div>myorders</div>;
};

export default MyOrders;
