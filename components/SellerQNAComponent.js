import React, { useState } from "react";
import { DotSpinner } from "@uiball/loaders";
import styles from "../styles/SellerQNAComponent.module.css";
import axios from "axios";
import Button from "./SubComponent/Button";
const SellerQNAComponent = ({ data, setQNAInfo }) => {
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
        `ask/update/${data.productId}/${data.id}`,
        {
          Answer: replyValue,
        }
      );
      console.log(res);
      setQNAInfo(
        res.data.data.remainingAsk.map((s) => {
          return {
            id: s.id,
            Question: s.Question,
            Answer: s.Answer,
            questioner: s?.user?.Username,
            userId: s?.user?.id,
            date: s.createdAt,
            MainImage: s.product.MainImage,
            sellerId: s.sellerId,
            productId: s.product.id,
            productName: s.product.Name,
            productPrice: s.product.Price,
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
    setReplyValue(data.Answer);
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
        </div>

        <p className={styles.user_send_review}>From user - {data.Question}</p>
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
              // className={styles.cancelButton}
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

export default SellerQNAComponent;
