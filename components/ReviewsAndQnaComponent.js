import React from "react";
import Image from "next/image";
import Star from "./Star";
import Link from "next/link";
import styles from "../styles/ReviewsAndQnaComponent.module.css";
const ReviewsAndQnaComponent = ({ content, data }) => {
  console.log(data);
  return (
    <div className={styles.container}>
      <div className={styles.box}>
      <div>
        <h1 className={styles.black}>
        {content === "reviews" ? "Reviews" : "Questions"} History ({data.length})
        </h1> 
        <p className={styles.grey}>Check the status of recent {content === "reviews" ? "Reviews" : "Questions"}</p>
        </div>

        
        {data?.map((s) => {
          return (
            <>
            <Link
              href={"/product/" + s.product.id + "#" + s.id}
              className={styles.item}
              key={s.id}
            >
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
                <p className={styles.date}>on {s?.createdAt?.slice(0, 10)}</p>
                {content === "reviews" && (
                  <Star
                    className={`${styles.tara} ${styles.no_tara}`}
                    num={s.rating}
                  />
                )}

                <p>- {content === "reviews" ? s.review : s.Question}</p>
              </div>
            </Link>
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
                </>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewsAndQnaComponent;
