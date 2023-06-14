import React, { useContext, useState } from "react";
import styles from "../../../styles/Alluser.module.css";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import Loading from "../../../components/Loading";
import IsAuth from "../../../utils/IsAuth";
const User = () => {
  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const { data, error, isLoading } = useSWR(`users`, async (url) => {
    try {
      const res = await instance.get(url);
      return res.data.data.users;
    } catch (err) {
      console.log(err);
    }
  });
  if (isLoading) {
    return <loading />;
  }
  return (
    <div className={styles.alluserContainer}>
      <div className={styles.headingContainer}>
        <table className={styles.table} border="1">
          <caption>All users</caption>
          <thead className={styles.head}>
            <tr>
              <th className={styles.data}>S.N</th>
              <th className={styles.data}>User Name</th>
              <th className={styles.data}>Email</th>
              {/* <th className={styles.data}>Phone Number</th> */}
              <th className={styles.data}>Verified</th>
              <th className={styles.data}>Reviews </th>
              <th className={styles.data}>Questions </th>
            </tr>
          </thead>
          <tbody className={styles.body}>
            {data?.map((s, index) => {
              return (
                <tr key={s.id}>
                  <td className={styles.data}>{index + 1}</td>
                  <td className={styles.data}>{s.Username}</td>
                  <td className={styles.data}>{s.Email}</td>
                  {/* <td className={styles.data}>{s.PhoneNumber}</td> */}
                  <td className={styles.data}>{s.IsVerified}</td>
                  <td className={styles.data}>
                    <Link href={"/adminDashboard/user/reviews/" + s.id + "/1"}>
                      View
                    </Link>
                  </td>
                  <td className={styles.data}>
                    <Link
                      href={"/adminDashboard/user/questions/" + s.id + "/1"}
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
