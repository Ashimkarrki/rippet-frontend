import React, { useContext, useState } from "react";
import styles from "../../../styles/Alluser.module.css"
import useSWR from "swr";
import axios from "axios";
const User = () => {
  const [ allseller, setAllseller] = useState([]);
  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const { data, error, isLoading } = useSWR(
    `users/seller`,
    async (url) => {
      try {
        const res = await instance.get(url);
        console.log(res)
        setAllseller(res.data.data.sellers);
      } catch (err) {
        console.log(err);
      }
    }
  );
  return (
    <div className={styles.alluserContainer}>
    <div className={styles.headingContainer}>
          <h1 className={styles.heading}>All users</h1>
          </div>
      <div className={styles.allusersubContainer}>
        {
            !!allseller.length && allseller.map((data)=>{
            return(<div className={styles.user}>
                    <h3>Username: {data.Username}</h3>
                    <p>Email: {data.Email}</p>
                    <p>Verified: {data.IsVerified? "yes" : "no"}</p>
                    <p>Approved by admin: {data.ApprovedByAdmin ? "yes": "no"}</p>
                  </div>
            )
          })

        }
        </div>

    </div>
  )
}

export default User