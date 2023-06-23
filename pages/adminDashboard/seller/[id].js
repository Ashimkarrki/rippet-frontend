import React, { useContext, useState } from "react";
import styles from "../../../styles/Alluser.module.css";
import useSWR from "swr";
import Loading from "../../../components/Loading";
import positionStyles from "../../../styles/substyle/DashboardContainer.module.css";

import axios from "axios";
import { useRouter } from "next/router";
import IsAuth from "../../../utils/IsAuth";
import PageNumber from "../../../components/SubComponent/PageNumber";
import SellerTable from "../../../components/Admin Components/SellerTable";
import SearchBar from "../../../components/Admin Components/SearchBar";
const User = () => {
  const router = useRouter();

  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const { data, error, isLoading, mutate } = useSWR(
    router?.query?.id ? "admin/sellers/" + router.query.id : null,
    async (url) => {
      try {
        console.log("ran");
        console.log(data, "->pailako");
        const res = await instance.get(url);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    }
  );
  console.log(data);
  if (isLoading || !data) {
    return <Loading />;
  }
  return (
    <div className={positionStyles.container}>
      <SearchBar who={"seller"} />
      <PageNumber
        current={data.currentPage}
        total={data.totalpages}
        url={"/adminDashboard/seller/"}
      />
      <div className={styles.headingContainer}>
        <SellerTable data={data?.sellers} mutate={mutate} all={data} />
      </div>
    </div>
  );
};

export default IsAuth(User);
