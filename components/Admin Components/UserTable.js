import React from "react";
import Link from "next/link";
import styles from "../../styles/substyle/Table.module.css";
const UserTable = ({ data }) => {
  return (
    <table className={styles.table} border="1">
      <caption>All users</caption>
      <thead className={styles.head}>
        <tr>
          <th className={styles.data}>S.N</th>
          <th className={styles.data}>User Name</th>
          <th className={styles.data}>Email</th>
          <th className={styles.data}>Verified</th>
          <th className={styles.data}>Reviews </th>
          <th className={styles.data}>Questions </th>
          <th className={styles.data}>Orders </th>
        </tr>
      </thead>
      <tbody className={styles.body}>
        {data?.map((s, index) => {
          return (
            <tr key={s.id}>
              <td className={styles.data}>{index + 1}</td>
              <td className={styles.data}>{s.Username}</td>
              <td className={styles.data}>{s.Email}</td>
              <td className={styles.data}>{s.IsVerified ? "Yes" : "No"}</td>
              <td className={styles.data}>
                <Link href={"/adminDashboard/user/reviews/" + s.id + "/1"}>
                  View
                </Link>
              </td>
              <td className={styles.data}>
                <Link href={"/adminDashboard/user/questions/" + s.id + "/1"}>
                  View
                </Link>
              </td>
              <td className={styles.data}>
                <Link href={"/adminDashboard/user/orders/" + s.id + "/1"}>
                  View
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserTable;
