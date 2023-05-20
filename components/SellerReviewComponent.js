import React, { useState, useContext } from "react";
import styles from "../styles/SellerReviewComponent.module.css";
import { FaPencilAlt } from "react-icons/fa";
import { userContext } from "../context/userContext";
import { DotSpinner } from "@uiball/loaders";

import axios from "axios";
import Star from "./Star";
const SellerReviewComponent = ({ data, setProductReviewInfo }) => {
  const { userInfo } = useContext(userContext);
  const [replyLoading, setReplyLoading] = useState(false);
  const [reply, setReply] = useState(false);
  const [replyValue, setReplyValue] = useState();
  const submitHandeler = async (e) => {
    e.preventDefault();
    setReplyLoading(true);
    setReply(false);
    console.log(replyValue);
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    try {
      const res = await instance.patch(
        `https://adorable-leather-jacket-foal.cyclic.app/api/v1/reviews/update/${data.id}/${data.productId}/${data.sellerId}`,
        {
          Answer: replyValue,
        }
      );
      // console.log(res.data.data.remainingReview);
      setProductReviewInfo(
        res.data.data.remainingReview.map((s) => {
          return {
            id: s.id,
            rating: s.rating,
            review: s.review,
            reply: s.Answer,
            reviewer: s.user.Username,
            userId: s.user.id,
            date: s.createdAt,
            MainImage: s.product.MainImage,
            sellerId: s.sellerId,
            productId: s.id,
            productName: s.product.Name,
            productPrice: s.product.Price,
            productAvgRating: s.product.AverageRating,
          };
        })
      );
      setReplyLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const editHandler = () => {
    console.log("onedit");
    setReplyValue(data.reply);
    setReply(true);
  };
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
        {data.reply && !reply && (
          <div className={styles.seller_reply}>
            - {data.reply}{" "}
            <FaPencilAlt className={styles.pencil_icon} onClick={editHandler} />
          </div>
        )}
        {!reply ? (
          !data.reply && <button onClick={() => setReply(true)}> Reply</button>
        ) : (
          <form onSubmit={submitHandeler}>
            <textarea
              className={styles.text_area}
              value={replyValue || ""}
              onChange={(e) => setReplyValue(e.target.value)}
              required
            />
            <button
              onClick={() => {
                setReply(false);
                setReplyValue("");
              }}
            >
              Cancel
            </button>
            <input type="submit" value={"submit"} />
          </form>
        )}
        {replyLoading ? (
          <div className={styles.reply}>
            <DotSpinner />
          </div>
        ) : (
          ""
        )}
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
