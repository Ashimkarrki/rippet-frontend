import styles from "../styles/Review.module.css";
import Star from "./Star";
import StarRatingComponent from "react-rating-stars-component";
import { useState } from "react";
import axios from "axios";
const Review = ({
  reviews,
  dataInfo,
  setDataInfo,
  averagerating,
  noofrating,
  id,
}) => {
  const [createReviewData, setCreateReviewData] = useState({
    review: "",
    rating: 5,
  });
  console.log(dataInfo);
  const reviewChangeHandler = (rating) => {
    setCreateReviewData((data) => {
      return { ...data, rating };
    });
  };
  return (
    <div className={styles.review}>
      <h3 className={styles.reviewprimaryheading}>Review</h3>
      <div className={styles.reviewPrimaryContainer}>
        <div className={styles.reviewsummary}>
          <h4 className={styles.averageratingwriitem}>
            <span className={styles.averageRating}>{averagerating}</span>
            <span className={styles.totalrating}>/5</span>
          </h4>
          <Star num={averagerating} />
          <p>{noofrating ? noofrating : 0} rating</p>
        </div>
        <div className={styles.reviewInputContainer}>
          <input
            className={styles.reviewinput}
            type="text"
            value={createReviewData.review ? createReviewData.review : ""}
            onChange={(e) => {
              setCreateReviewData((data) => {
                return { ...data, review: e.target.value };
              });
            }}
            placeholder="Submit Your Review"
          />
          <StarRatingComponent
            name="rating"
            value={createReviewData.rating}
            starColor={"#faca51"}
            className={styles.createreviewicon}
            onChange={reviewChangeHandler}
          />
          <button
            className={styles.reviewbutton}
            onClick={async () => {
              const instance = axios.create({
                withCredentials: true,
                headers: { authorization: "Bearer" },
              });

              try {
                const res = await instance.post("products/" + id + "/reviews", {
                  ...createReviewData,
                });
                let temp = { ...dataInfo };
                temp.reviews = res.data.data.newReview;
                console.log(res.data.data);
                setDataInfo(temp);
                setCreateReviewData({ review: "", rating: 5 });
              } catch (err) {
                console.log(err);
              }
            }}
          >
            Submit
          </button>
        </div>
        <div></div>
      </div>
      <div className={styles.allreviewcontainer}>
        {reviews?.length ? (
          <>
            {reviews.map(({ _id, review, rating, user }) => {
              return (
                <div className={styles.review_item} key={_id}>
                  <h5 className={styles.name}>{user?.Username}</h5>
                  <Star num={rating} />
                  <p>{review}</p>
                </div>
              );
            })}
          </>
        ) : (
          <div className={styles.noreview}>
            <p className={styles.noreviewtext}>No Review</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
