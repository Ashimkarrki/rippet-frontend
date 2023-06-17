import React from "react";
import useSWR from "swr";
import axios from "axios";
import Loading from "../../../../components/Loading";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../../../styles/AdminUserOrder.module.css";

import tableStyle from "../../../../styles/Alluser.module.css";

import PageNumber from "../../../../components/SubComponent/PageNumber";
const Orders = () => {
  const router = useRouter();

  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const { data, error, isLoading } = useSWR(
    router?.query?.id?.at(0)
      ? `/admin/users/orders/${router?.query?.id?.at(
          0
        )}/${router?.query?.id?.at(1)}`
      : null,
    async (url) => {
      try {
        const res = await instance.get(url);
        console.log(res.data);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    }
  );
  if (isLoading && !data) {
    return <Loading />;
  }
  return (
    <div className={styles.container}>
      <PageNumber
        current={data.currentPage}
        total={data.totalpages}
        url={"/adminDashboard/user/orders/" + router?.query?.id?.at(0) + "/"}
      />
      <div>
        {data.orders.map((s) => {
          return (
            <div key={s.id} className={styles.oneOrder}>
              <div className={styles.intro}>
                <h5 className={styles.heading}>
                  Date placed : {new Date(s.CreatedAt).toDateString()}
                </h5>
                <h5 className={styles.heading}>Total : {s.Amount}</h5>
                <h5 className={styles.heading}>Location : {s.Location}</h5>
                <h5 className={styles.heading}>
                  Phone Number : {s.PhoneNumber}
                </h5>
                <h5 className={styles.heading}>Ordere Id : {s.id}</h5>
              </div>
              <table className={tableStyle.table} border="1">
                <thead className={tableStyle.head}>
                  <tr>
                    <th className={tableStyle.data}>Product</th>
                    <th className={tableStyle.data}>Price</th>
                    <th className={tableStyle.data}>Quantity</th>
                    <th className={tableStyle.data}>Status</th>
                    <th className={tableStyle.data}>Seen By Seller</th>
                    <th className={tableStyle.data}>Shop Name</th>
                  </tr>
                </thead>
                <tbody className={tableStyle.body}>
                  {s?.OrderedItems?.map((k) => {
                    return (
                      <tr key={k.id}>
                        <td className={tableStyle.data}>{k.productId.Name}</td>
                        <td className={tableStyle.data}>{k.productId.Price}</td>
                        <td className={tableStyle.data}>{k.quantity}</td>
                        <td className={tableStyle.data}>
                          {k.received
                            ? "Recieved"
                            : k.approved
                            ? "Approved"
                            : "Not Approved"}
                        </td>
                        <td className={tableStyle.data}>
                          {k.seenBySeller ? "Yes" : "No"}
                        </td>
                        <td className={tableStyle.data}>{k?.shopName}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
