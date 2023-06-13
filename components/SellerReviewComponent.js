import React, { useState, useContext } from "react";
import styles from "../styles/SellerReviewComponent.module.css";
import { FaPencilAlt } from "react-icons/fa";
import { userContext } from "../context/userContext";
import { DotSpinner } from "@uiball/loaders";
import Button from "./SubComponent/Button";
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
        `reviews/update/${data.id}/${data.productId}/${data.sellerId}`,
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
      <div className={styles.image_name_wrapper}>
        <img
          className={styles.img}
          src={data.MainImage}
          alt={data.productName}
        />
        <div className={styles.product_desc}>
          <h4 className={styles.heading}>{data.productName}</h4>
        </div>
      </div>
      <div className={styles.user_review}>
        <div className={styles.wrapper}>
          <h4 className={styles.heading}>- By {data.reviewer}</h4>
          <p className={styles.grey}>({data.date.slice(0, 10)})</p>
        </div>
        <div className={styles.star}>
          <Star className={styles.tara} num={data.rating} />
        </div>
        <p className={styles.user_send_review}>
          {data.reviewer} - {data.review}
        </p>
        {data.reply && !reply && (
          <div className={styles.seller_reply}>
            From you - {data.reply}{" "}
            {!replyLoading && (
              <div>
                <Button
                  content={"Edit"}
                  onClick={editHandler}
                  marginTop=".5rem"
                />
              </div>
            )}
          </div>
        )}
        {!reply ? (
          !data.reply &&
          !replyLoading && (
            <Button
              marginTop=".5rem"
              // className={styles.replyButton}
              onClick={() => setReply(true)}
              content="Reply"
            />
          )
        ) : (
          <form onSubmit={submitHandeler}>
            <textarea
              className={styles.text_area}
              value={replyValue || ""}
              onChange={(e) => setReplyValue(e.target.value)}
              rows={5}
              maxLength={100}
              required
            />
            <Button
              onClick={() => {
                setReply(false);
                setReplyValue("");
              }}
              marginTop=".5rem"
              marginRight=".5rem"
              content="Cancel"
            />
            {!replyLoading && (
              <Button
                // className={styles.submitButton}
                marginTop=".5rem"
                type="submit"
                content={"Submit"}
              />
            )}
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
    </div>
  );
};

export default SellerReviewComponent;
