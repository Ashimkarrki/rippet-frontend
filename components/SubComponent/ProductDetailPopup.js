import React from "react";
import useSWR from "swr";
import axios from "axios";
import Image from "next/image";
import styles from "../../styles/substyle/ProductDetailPopup.module.css";
import Loading from "../Loading";
const ProductDetailPopup = ({ id, setPopUpProduct }) => {
  const { isLoading, data, error } = useSWR("/products/" + id, async (url) => {
    try {
      const res = await axios.get(url);
      console.log(res.data.data.product);
      return res.data.data.product;
    } catch (err) {
      console.log(err);
    }
  });
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.child}>
          <Loading />;
        </div>
      </div>
    );
  }
  return (
    <div
      className={styles.container}
      onClick={() => {
        setPopUpProduct("");
      }}
    >
      <div
        className={styles.child}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.image_wrapper}>
          <Image
            src={data.MainImage}
            className={styles.img}
            fill
            alt={data.Name}
          />
        </div>
        <div className={styles.info}>
          <h5 className={styles.heading}>
            <span className={styles.label}>Name : </span>
            {data.Name}
          </h5>
          <h5 className={styles.heading}>
            <span className={styles.label}>Price : </span>
            {data.Price}
          </h5>
          <h5 className={styles.heading}>
            {" "}
            <span className={styles.label}>Discount : </span>
            {data.Discount}
          </h5>
          <h5 className={styles.heading}>
            <span className={styles.label}>Stock : </span>
            {data.Stock}
          </h5>
          <h5 className={styles.heading}>
            <span className={styles.label}> Avg Rating : </span>
            {data.AverageRating}
          </h5>
          <h5 className={styles.heading}>
            <span className={styles.label}> Total Ordered : </span>
            {data.orderNumber}
          </h5>
          <div>
            <span className={styles.label}>Category : </span>
            {data.Category.map((s) => {
              return (
                <h5 key={s} className={styles.heading}>
                  {s}
                </h5>
              );
            })}
          </div>
          <p>
            <span className={styles.label}> Description : </span>
            {data.Description}
          </p>
          {/* <h5 className={styles.heading}> : {data.AverageRating}</h5> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPopup;
