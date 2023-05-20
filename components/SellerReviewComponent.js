import React, { useState } from "react";
import styles from "../styles/SellerReviewComponent.module.css";
import { FaQuoteLeft } from "react-icons/fa";
import Star from "./Star";
const SellerReviewComponent = ({ data }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <div className={styles.item}>
      <img className={styles.img} src={data.MainImage} alt={data.productName} />
      <div className={styles.user_review}>
        <div className={styles.wrapper}>
          <h4 className={styles.heading}>- By {data.reviewer}</h4>
          <p className={styles.grey}>({data.date.slice(0, 10)})</p>
        </div>
        <div className={styles.star}>
          <Star className={styles.tara} num={data.rating} />
        </div>
        <p>{data.review}</p>
      </div>
      <div className={styles.product_desc}>
        <h4 className={styles.heading}>{data.productName}</h4>
        <div className={styles.star}>
          <Star className={styles.tara} num={data.rating} />
        </div>
      </div>
    </div>
  );
};

export default SellerReviewComponent;
