import React, { useState } from "react";
import styles from "../styles/SellerReviewComponent.module.css";
import { FaQuoteLeft } from "react-icons/fa";
const SellerReviewComponent = ({ data }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <div className={styles.item}>
      <h3 className={styles.name}>
        Reviews For {data.Name} ({data.reviews.length})
      </h3>
      <div className={styles.reviews}>
        {data.reviews.map((s, index) => {
          if (!readMore) {
            if (index < 5) {
              return (
                <div className={styles.review} key={index}>
                  <FaQuoteLeft className={styles.quote} />
                  <p className={styles.actual_review}>{s}</p>
                  <p className={styles.grey}> - By Someguy</p>{" "}
                </div>
              );
            }
          }
          if (readMore) {
            return (
              <div className={styles.review} key={index}>
                <FaQuoteLeft className={styles.quote} />
                <p className={styles.actual_review}>{s}</p>
                <p className={styles.grey}> - By Someguy</p>{" "}
              </div>
            );
          }
        })}
      </div>
      {data.reviews.length > 5 && !readMore && (
        <button className={styles.read_more} onClick={() => setReadMore(true)}>
          Expand ....
        </button>
      )}
      {data.reviews.length > 5 && readMore && (
        <button className={styles.read_more} onClick={() => setReadMore(false)}>
          Collapse ....
        </button>
      )}
    </div>
  );
};

export default SellerReviewComponent;
