import React from "react";
import useSWR from "swr";
import axios from "axios";
import { useRouter } from "next/router";
import tableStyle from "../../../../styles/Alluser.module.css";
import styles from "../../../../styles/AdminSellerOrder.module.css";
import Loading from "../../../../components/Loading";
import PageNumber from "../../../../components/SubComponent/PageNumber";
const Orders = () => {
  const router = useRouter();

  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const { data, error, isLoading } = useSWR(
    router?.query?.id?.at(0)
      ? `/admin/sellers/orders/${router?.query?.id?.at(
          0
        )}/${router?.query?.id?.at(1)}`
      : null,
    async (url) => {
      try {
        const res = await instance.get(url);
        let temp = res.data.orders.map((s) => {
          return {
            ...s,
            OrderedItems: s.OrderedItems.filter((k) => {
              return router.query.id[0] === k.sellerId;
            }),
          };
        });
        console.log(res.data, "+=>res");
        return {
          orders: temp,
          current: res.data.currentPage,
          total: res.data.totalpages,
        };
      } catch (err) {
        console.log(err);
      }
    }
  );
  if (isLoading || !data) {
    return <Loading />;
  }
  console.log(data, "=>made");
  return (
    <div className={styles.container}>
      <PageNumber
        current={data.current}
        total={data.total}
        url={"/adminDashboard/seller/orders/" + router?.query?.id?.at(0) + "/"}
      />
      <table className={tableStyle.table} border="1">
        <thead className={tableStyle.head}>
          <tr>
            <th className={tableStyle.data}>Product</th>
            <th className={tableStyle.data}>Price</th>
            <th className={tableStyle.data}>Quantity</th>
            <th className={tableStyle.data}>Status</th>
            <th className={tableStyle.data}>Seen </th>
            <th className={tableStyle.data}>User</th>
            <th className={tableStyle.data}>User Phone Number</th>
            <th className={tableStyle.data}>Date Placed</th>
            <th className={tableStyle.data}>Order Number</th>
          </tr>
        </thead>
        <tbody className={tableStyle.body}>
          {data.orders?.map((s) => {
            return s.OrderedItems.map((k) => {
              return (
                <tr key={k._id}>
                  <td className={tableStyle.data}>{k.productId.Name}</td>
                  <td className={tableStyle.data}>{k.productId.Price}</td>
                  <td className={tableStyle.data}>{k.quantity}</td>
                  <td className={tableStyle.data}>
                    {s.received
                      ? "Recived"
                      : s.approved
                      ? "Approved"
                      : "Not Approved"}
                  </td>
                  <td className={tableStyle.data}>
                    {k.SeenByseller ? "Yes" : "No"}
                  </td>
                  <td className={tableStyle.data}>{s.User}</td>
                  <td className={tableStyle.data}>{s.PhoneNumber}</td>
                  <td className={tableStyle.data}>{s.CreatedAt}</td>
                  <td className={tableStyle.data}>{s.id}</td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
