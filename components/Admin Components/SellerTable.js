import Link from "next/link";
import React, { useState } from "react";
import styles from "../../styles/substyle/Table.module.css";
import Button from "../SubComponent/Button";
import axios from "axios";
const SellerTable = ({ data, mutate, all }) => {
  const [deleteId, setDeleteId] = useState("");

  return (
    <table className={styles.table} border="1">
      <caption>All Sellers</caption>
      <thead className={styles.head}>
        <tr>
          <th className={styles.data}>User Name</th>
          <th className={styles.data}>Shop Name</th>
          <th className={styles.data}>Email</th>
          <th className={styles.data}>Phone Number</th>
          <th className={styles.data}>Email Verified</th>
          <th className={styles.data}>Reviews </th>
          <th className={styles.data}>Questions </th>
          <th className={styles.data}>Orders </th>
          <th className={styles.data}>Approved </th>
        </tr>
      </thead>
      <tbody className={styles.body}>
        {data?.map((s) => {
          return (
            <tr key={s.id} className={deleteId === s.id && styles.being_delete}>
              <td className={styles.data}>{s.Username}</td>
              <td className={styles.data}>{s.Shopname}</td>
              <td className={styles.data}>{s.Email}</td>
              <td className={styles.data}>{s.PhoneNumber}</td>
              <td className={styles.data}>{s.IsVerified ? "Yes" : "No"}</td>
              <td className={styles.data}>
                <Link href={"/adminDashboard/seller/reviews/" + s.id + "/1"}>
                  View
                </Link>
              </td>
              <td className={styles.data}>
                <Link href={"/adminDashboard/seller/questions/" + s.id + "/1"}>
                  View
                </Link>
              </td>
              <td className={styles.data}>
                <Link href={"/adminDashboard/seller/orders/" + s.id + "/1"}>
                  View
                </Link>
              </td>
              <td className={styles.data}>
                {/* router.route('/approved/:sellerId').post(adminController.ApprovedSeller); */}
                {s.ApprovedByAdmin ? "Yes" : "No"}
                <Button
                  content={s.ApprovedByAdmin ? "Disapprove" : "Approve"}
                  onClick={async () => {
                    setDeleteId(s.id);
                    const instance = axios.create({
                      withCredentials: true,
                      headers: { authorization: "Bearer" },
                    });
                    try {
                      const res = await instance.post(
                        "/admin/approved/" + s.id
                      );
                      let temp = data.map((k) => {
                        if (s.id === k.id) {
                          return res.data.seller;
                        } else {
                          return k;
                        }
                      });
                      mutate({
                        ...all,
                        sellers: temp,
                      });
                      setDeleteId("");
                    } catch (err) {}
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SellerTable;
