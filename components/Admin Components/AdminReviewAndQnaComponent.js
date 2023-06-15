import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import ReviewsAndQnaComponent from "../ReviewsAndQnaComponent";
import Link from "next/link";
import Loading from "../Loading";
import styles from "../../styles/AdminReviewAndQnaComponent.module.css";
const AdminReviewAndQnaComponent = ({ who, what }) => {
  const repeat = (time) => {
    let array = [];
    for (let i = 1; i <= time; i++) {
      array.push(
        <button
          className={`${styles.button} ${
            Number(data.currentPage) === i && styles.active
          } ${i === 1 && styles.button_start} ${
            i === time && styles.button_end
          }`}
        >
          {i}
        </button>
      );
    }
    return array;
  };
  const router = useRouter();
  console.log(router.query.id);
  const { data, isLoading, error } = useSWR(
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
    <div className={styles.container}>
      {data.totalpages !== 1 && (
        <div className={styles.button_grp}>
          {repeat(data.totalpages).map((s, index) => {
            return (
              <Link
                href={
                  "/adminDashboard/" +
                  (who === "users" ? "user" : "seller") +
                  "/" +
                  (what === "asks" ? "questions" : what) +
                  "/" +
                  router.query.id[0] +
                  "/" +
                  Number(index + 1)
                }
                key={index}
              >
                {s}
              </Link>
            );
          })}
        </div>
      )}
      <ReviewsAndQnaComponent content={what} data={data[what]} />;
    </div>
  );
};

export default AdminReviewAndQnaComponent;
