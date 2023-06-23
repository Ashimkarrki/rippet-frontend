import React, { useState } from "react";
import Image from "next/image";
import Star from "../Star";
import Link from "next/link";
import styles from "../../styles/ReviewsAndQnaComponent.module.css";
import axios from "axios";
import Button from "../../components/SubComponent/Button";
const AdminSpecificReviewAndQnaComponent = ({
  content,
  data,
  who,
  current,
  mutate,
  user,
  seller,
}) => {
  const [deleteId, setDeleteId] = useState("");
  const deletePosts = async ({ reviewId, productId, sellerId, userId }) => {
    setDeleteId(reviewId);
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    try {
      let res;
      if (content === "reviews") {
        res = await instance.delete(
          "/admin/" +
            (who === "users" ? "user" : "seller") +
            "/" +
            content +
            "/" +
            "delete" +
            "/" +
            reviewId +
            "/" +
            (who === "users" ? userId : sellerId) +
            "/" +
            productId +
            "/" +
            current
        );
      } else {
        res = await instance.delete(
          "/admin/" +
            (who === "users" ? "user" : "seller") +
            "/" +
            content +
            "/" +
            "delete" +
            "/" +
            reviewId +
            "/" +
            (who === "users" ? userId : sellerId) +
            "/" +
            current
        );
      }
      console.log(res.data, "=> delete");
      mutate(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(data);
  return (
    <div className={styles.container}>
      <p>
        {who} : {user || seller}
      </p>
      <div className={styles.box}>
        <div className={styles.bg_color}>
          {data?.map((s) => {
            return (
              <Link
                href={"/product/" + s.product.id + "#" + s.id}
                className={`${styles.after} 
              ${deleteId === s.id && styles.deleting}
                `}
                key={s.id}
              >
                <div className={styles.item}>
                  <div className={styles.image_container}>
                    <Image
                      className={styles.img}
                      src={s.product.MainImage}
                      fill
                      alt={s.product.Name}
                    />
                  </div>
                  <div className={styles.main_info}>
                    <h4 className={styles.name}>{s.product.Name}</h4>
                    <p className={styles.date}>
                      on {s?.createdAt?.slice(0, 10)}
                    </p>
                    {content === "reviews" && (
                      <Star
                        className={`${styles.tara} ${styles.no_tara}`}
                        num={s.rating}
                      />
                    )}

                    <p>- {content === "reviews" ? s.review : s.Question}</p>
                  </div>
                </div>
                <div className={styles.answer_wrapper}>
                  <p className={`${!s.Answer ? styles.red : styles.blue}`}>
                    {!s.Answer
                      ? "No Reply From The Seller "
                      : content === "reviews"
                      ? "Reply From The Seller"
                      : "Answer From The Seller"}
                  </p>
                  <p className={styles.reply}>
                    {s.Answer && "- "}
                    {s.Answer}
                  </p>
                </div>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    deletePosts({
                      reviewId: s.id,
                      productId: s.product.id,
                      sellerId: s?.sellerId,
                      userId: s?.user?.id,
                    });
                  }}
                  content="Delete"
                  marginLeft="1rem"
                  marginTop="1rem"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminSpecificReviewAndQnaComponent;
