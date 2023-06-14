import React, { useState, useContext } from "react";
import styles from "../styles/SellerReviewComponent.module.css";
import { FaPencilAlt } from "react-icons/fa";
import { userContext } from "../context/userContext";
import { DotSpinner } from "@uiball/loaders";
import Button from "./SubComponent/Button";
import axios from "axios";
import Star from "./Star";
const SellerReviewComponent = ({ data, mutate }) => {
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
        `reviews/update/${data.id}/${data.id}/${data.sellerId}`,
        {
          Answer: replyValue,
        }
      );
      mutate(res.data.data.remainingReview);
      setReplyLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const editHandler = () => {
    console.log("onedit");
    setReplyValue(data.Answer);
    setReply(true);
  };
  return (
    <div className={styles.item}>
      <div className={styles.image_name_wrapper}>
        <img
          className={styles.img}
          src={data.product.MainImage}
          alt={data.product.name}
        />
        <div className={styles.product_desc}>
          <h4 className={styles.heading}>{data.product.name}</h4>
        </div>
      </div>
      <div className={styles.user_review}>
        <div className={styles.wrapper}>
          <h4 className={styles.heading}>- By {data.user.Username}</h4>
          <p className={styles.grey}>({data.createdAt.slice(0, 10)})</p>
        </div>
        <div className={styles.star}>
          <Star className={styles.tara} num={data.rating} />
        </div>
        <p className={styles.user_send_review}>
          {data.user.Username} - {data.review}
        </p>
        {data.Answer && !reply && (
          <div className={styles.seller_reply}>
            From you - {data.Answer}{" "}
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
          !data.Answer &&
          !replyLoading && (
            <Button
              marginTop=".5rem"
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
