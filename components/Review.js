import React from "react";
import styles from "../styles/Review.module.css";
import Star from "./Star";
const Review = ({ reviews }) => {
  console.log(reviews);
  return (
    <div className={styles.review}>
      {reviews.map(({ _id, review, rating, user }) => {
        return (
          <div className={styles.review_item} key={_id}>
            <h5 className={styles.name}>{user.Username}</h5>
            <Star num={rating} />
            <p>{review}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Review;
