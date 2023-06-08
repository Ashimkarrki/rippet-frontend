import styles from "../styles/Review.module.css";
import Star from "./Star";
import StarRatingComponent from "react-rating-stars-component";
import { useState, useReducer } from "react";
import axios from "axios";
import { useContext } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { userContext } from "../context/userContext";
import useSWR from "swr";
import { DotSpinner } from "@uiball/loaders";
const Review = ({
  id,
  sellerId,
  averagerating,
  noofrating,
  reviews: propReviews,
}) => {
  const [isSubmitLoading, setisSubmitLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const [deletedId, setDeletedId] = useState("");

  const { userInfo } = useContext(userContext);
  const intialState = {
    total: noofrating,
    averageRating: averagerating,
    data: propReviews.map((s) => {
      return {
        _id: s._id,
        rating: s.rating,
        review: s.review,
        user: s.user,
      };
    }),
  };
  console.log("intial", intialState);
  const reviewReducer = (state, action) => {
    switch (action.type) {
      case "LOAD_REVIEW":
        const temp = action.payload.raw.map((s) => {
          return {
            _id: s._id,
            rating: s.rating,
            review: s.review,
            user: s.user,
          };
        });
        return {
          total: action.payload.total,
          averageRating: Math.ceil(action.payload.averageRating * 10) / 10,
          data: [...temp],
        };
      default:
        return { ...state };
    }
  };
  const [reviews, dispatch] = useReducer(reviewReducer, intialState);

  // const { dat, error, isLoading } = useSWR("reviews/" + id, async (url) => {
  //   const instance = axios.create({
  //     withCredentials: true,
  //     headers: { authorization: "Bearer" },
  //   });
  //   try {
  //     const res = await instance.get(url);
  //     console.log("review", res.data);
  //     dispatch({
  //       type: "LOAD_REVIEW",
  //       payload: {
  //         raw: res.data.data.ReviewAll,
  //         total: res.data.results,
  //         averageRating: res.data.AverageRating,
  //       },
  //     });

  //     return res;
  //   } catch (err) {
  //     console.log(err.message);
  //     return err;
  //   }
  // });

  const [createReviewData, setCreateReviewData] = useState({
    review: "",
    rating: 5,
  });
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
            <span className={styles.averageRating}>
              {reviews.averageRating ? reviews.averageRating : 0}
            </span>
            <span className={styles.totalrating}>/5</span>
          </h4>
          <Star num={reviews.averageRating ? reviews.averageRating : 0} />
          <p>{reviews.total ? reviews.total : 0} Rating</p>
        </div>
        <div className={styles.reviewInputContainer}>
          <input
            required
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
            value={createReviewData.rating * 1}
            starColor={"#faca51"}
            className={styles.createreviewicon}
            onChange={reviewChangeHandler}
          />
          {/* {console.log(typeof createReviewData.rating)} */}
          {isSubmitLoading ? (
            <button
              className={`${styles.reviewbutton} ${styles.loading_spinner}`}
            >
              <DotSpinner size={19} color="white" />
            </button>
          ) : (
            <button
              className={styles.reviewbutton}
              onClick={async () => {
                if (createReviewData.review) {
                  setisSubmitLoading(true);
                  const instance = axios.create({
                    withCredentials: true,
                    headers: { authorization: "Bearer" },
                  });
                  try {
                    const res = await instance.post(
                      "products/" + id + "/reviews",
                      {
                        ...createReviewData,
                        sellerId: sellerId,
                      }
                    );
                    dispatch({
                      type: "LOAD_REVIEW",
                      payload: {
                        raw: res.data.data.newReview,
                        total: res.data.results,
                        averageRating: res.data.AverageRating,
                      },
                    });
                    setCreateReviewData({ review: "", rating: 5 });
                    setisSubmitLoading(false);
                  } catch (err) {
                    console.log(err);
                  }
                }
              }}
            >
              Submit
            </button>
          )}
        </div>
        <div></div>
      </div>
      <div className={styles.allreviewcontainer}>
        {console.log(reviews)}
        {reviews ? (
          <>
            {reviews?.data.map(({ _id, review, rating, user }) => {
              return (
                <div
                  className={`${styles.review_item} ${
                    deletedId === _id && styles.is_deleting
                  }`}
                  id={_id}
                  key={_id}
                >
                  <h5 className={styles.name}>{user?.Username}</h5>
                  <Star num={rating} />
                  <p>{review}</p>
                  {console.log("is", isDeleteLoading)}
                  {user?.id === userInfo.id &&
                    (isDeleteLoading ? (
                      <button className={styles.review_button_delete}>
                        Delete
                      </button>
                    ) : (
                      <button
                        className={styles.review_button_delete}
                        onClick={async () => {
                          setDeletedId(_id);
                          setIsDeleteLoading(true);
                          const instance = axios.create({
                            withCredentials: true,
                            headers: { authorization: "Bearer" },
                          });
                          let res;
                          try {
                            res = await instance.delete(
                              "/reviews/delete/" + _id + "/" + id,
                              { sellerId: sellerId }
                            );
                            dispatch({
                              type: "LOAD_REVIEW",
                              payload: {
                                raw: res.data.data.remainingReview,
                                total: res.data.results,
                                averageRating: res.data.AverageRating,
                              },
                            });
                            setIsDeleteLoading(false);
                            setDeletedId("");
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                      >
                        Delete
                      </button>
                    ))}
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
