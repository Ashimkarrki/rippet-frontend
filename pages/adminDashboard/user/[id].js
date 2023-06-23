import React, { useContext, useState } from "react";
import styles from "../../../styles/Alluser.module.css";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import Loading from "../../../components/Loading";
import IsAuth from "../../../utils/IsAuth";
import UserTable from "../../../components/Admin Components/UserTable";
import SearchBar from "../../../components/Admin Components/SearchBar";
import positionStyles from "../../../styles/substyle/DashboardContainer.module.css";

const User = () => {
  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const { data, error, isLoading } = useSWR(`users`, async (url) => {
    try {
      const res = await instance.get(url);
      console.log(res);
      return res.data.data.users;
    } catch (err) {
      console.log(err);
    }
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={positionStyles.container}>
      <SearchBar who={"user"} />
      <div className={styles.headingContainer}>
        <UserTable data={data} />
      </div>
    </div>
  );
};

export default IsAuth(User);
