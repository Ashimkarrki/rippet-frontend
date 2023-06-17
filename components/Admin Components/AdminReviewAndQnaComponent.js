import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import ReviewsAndQnaComponent from "../ReviewsAndQnaComponent";
import Link from "next/link";
import Loading from "../Loading";
import styles from "../../styles/AdminReviewAndQnaComponent.module.css";
import PageNumber from "../SubComponent/PageNumber";
import AdminSpecificReviewAndQnaComponent from "../Admin Components/AdminSpecificReviewAndQnaComponent";
const AdminReviewAndQnaComponent = ({ who, what }) => {
  const router = useRouter();
  const { data, isLoading, error, mutate } = useSWR(
    router.query?.id?.at(0)
      ? "/admin/" +
          who +
          "/" +
          what +
          "/" +
          router.query.id[0] +
          "/" +
          router.query.id[1]
      : null,
    async (url) => {
      const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });
      try {
        const res = await instance.get(url);
        console.log(res.data, "=>original");
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
    <div className={styles.container}>
      <PageNumber
        current={data.currentPage}
        total={data.totalpages}
        url={
          "/adminDashboard/" +
          (who === "users" ? "user" : "seller") +
          "/" +
          (what === "asks" ? "questions" : what) +
          "/" +
          router.query.id[0] +
          "/"
        }
      />
      <AdminSpecificReviewAndQnaComponent
        content={what}
        data={data[what]}
        who={who}
        mutate={mutate}
        current={data.currentPage}
      />
      ;
    </div>
  );
};

export default AdminReviewAndQnaComponent;
