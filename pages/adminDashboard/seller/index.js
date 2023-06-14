import React, { useContext, useState } from "react";
import styles from "../../../styles/Alluser.module.css";
import useSWR from "swr";
import Loading from "../../../components/Loading";
import axios from "axios";
import Link from "next/link";
import IsAuth from "../../../utils/IsAuth";
const User = () => {
  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const { data, error, isLoading } = useSWR("admin/sellers/1", async (url) => {
    try {
      const res = await instance.get(url);
      return res.data.sellers;
    } catch (err) {
      console.log(err);
    }
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={styles.alluserContainer}>
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
            </tr>
          </thead>
          <tbody className={styles.body}>
            {data?.map((s) => {
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
