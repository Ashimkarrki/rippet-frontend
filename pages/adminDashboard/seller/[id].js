import React, { useContext, useState } from "react";
import styles from "../../../styles/Alluser.module.css";
import useSWR from "swr";
import Loading from "../../../components/Loading";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import IsAuth from "../../../utils/IsAuth";
import PageNumber from "../../../components/SubComponent/PageNumber";
const User = () => {
  const router = useRouter();

  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const { data, error, isLoading } = useSWR(
    router?.query?.id ? "admin/sellers/" + router.query.id : null,
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

  if (isLoading || !data) {
    return <Loading />;
  }
  return (
    <div className={styles.alluserContainer}>
      <PageNumber
        current={data.currentPage}
        total={data.totalpages}
        url={"/adminDashboard/seller/"}
      />
      <div className={styles.headingContainer}>
        <table className={styles.table} border="1">
          <caption>All Sellers</caption>
          <thead className={styles.head}>
            <tr>
              <th className={styles.data}>User Name</th>
              <th className={styles.data}>Shop Name</th>
              <th className={styles.data}>Email</th>
              <th className={styles.data}>Phone Number</th>
              <th className={styles.data}>Verified</th>
              <th className={styles.data}>Reviews </th>
              <th className={styles.data}>Questions </th>
              <th className={styles.data}>Orders </th>
            </tr>
          </thead>
          <tbody className={styles.body}>
            {data?.sellers?.map((s) => {
              return (
                <tr key={s.id}>
                  <td className={styles.data}>{s.Username}</td>
                  <td className={styles.data}>{s.Shopname}</td>
                  <td className={styles.data}>{s.Email}</td>
                  <td className={styles.data}>{s.PhoneNumber}</td>
                  <td className={styles.data}>{s.IsVerified}</td>
                  <td className={styles.data}>
                    <Link
                      href={"/adminDashboard/seller/reviews/" + s.id + "/1"}
                    >
                      View
                    </Link>
                  </td>
                  <td className={styles.data}>
                    <Link
                      href={"/adminDashboard/seller/questions/" + s.id + "/1"}
                    >
                      View
                    </Link>
                  </td>
                  <td className={styles.data}>
                    <Link href={"/adminDashboard/seller/orders/" + s.id + "/1"}>
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IsAuth(User);
