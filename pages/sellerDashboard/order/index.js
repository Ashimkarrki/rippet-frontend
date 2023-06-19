import React from "react";
import useSWR from "swr";
import axios from "axios";
// orders//seller/Sellerorder

const Orders = () => {
  const { data, isLoading, mutate } = useSWR(
    "/orders/seller/Sellerorder/",
    async (url) => {
      const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });
      try {
        const res = await instance.get(url);
        console.log(res);
        // let temp = res.data.orders.map((s) => {
        //   return {
        //     ...s,
        //     OrderedItems: s.OrderedItems.filter((k) => {
        //       return router.query.id[0] === k.sellerId;
        //     }),
        //   };
        // });
        // const obj = {
        //   orders: temp,
        //   current: res.data.currentPage,
        //   total: res.data.totalpages,
        // };
        // return obj;
      } catch (err) {
        console.log(err);
      }
    }
  );
  return <div>Orders</div>;
};

export default Orders;
