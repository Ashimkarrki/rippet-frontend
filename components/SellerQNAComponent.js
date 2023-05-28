import React, { useState } from "react";
import { DotSpinner } from "@uiball/loaders";
import { FaPencilAlt } from "react-icons/fa";
import styles from "../styles/SellerQNAComponent.module.css";
import axios from "axios";
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
      <img className={styles.img} src={data.MainImage} alt={data.productName} />
      <div className={styles.user_review}>
        <div className={styles.wrapper}>
          <h4 className={styles.heading}>- By {data.reviewer}</h4>
        </div>

        <p>{data.Question}</p>
        {data.Answer && !reply && (
          <div className={styles.seller_reply}>
            - {data.Answer}{" "}
            <FaPencilAlt className={styles.pencil_icon} onClick={editHandler} />
          </div>
        )}
        {!reply ? (
          !data.Answer && <button onClick={() => setReply(true)}> Reply</button>
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
      </div>
    </div>
  );
};

export default SellerQNAComponent;
