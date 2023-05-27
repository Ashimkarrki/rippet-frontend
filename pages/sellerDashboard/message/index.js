import React, { useState, useEffect } from "react";
import styles from "../../../styles/sellerMessage.module.css";
import axios from "axios";
import SendGetcomponentMessage from "../../../components/SendGetcomponentMessage";
import useSWR from "swr";
const Message = () => {
  const [allchat, setallchat] = useState([]);
  const [currentchat, setcurrentchat] = useState(allchat[0]);
  const URL = "https://adorable-leather-jacket-foal.cyclic.app/";

  const { data, error, isLoading } = useSWR(
    `${URL}api/v1/chats`,
    async (url) => {
      const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });
      try {
        const res = await instance.get(`${URL}api/v1/chats`);
        console.log("Hello Before");
        console.log(res.data.message);
        let AllChat = res.data.message;
        setallchat((prev) => {
          return [...AllChat];
        });
        console.log("Hello After");
      } catch (err) {
        console.log(err);
        return err;
      }
    }
  );

  const colorchangeHandler = (data) => {
    console.log(data);
    setcurrentchat(data);
  };

  return (
    <div className={styles.messageContainer}>
      <div className={styles.allchat}>
        {!!allchat.length && (
          <>
            {allchat.map((data) => {
              return (
                <div
                  className={
                    data._id == currentchat?._id
                      ? styles.activeImage
                      : styles.notactiveImage
                  }
                  key={data._id}
                  onClick={() => colorchangeHandler(data)}
                >
                  <div className={styles.productdetailcontainer}>
                    <img
                      src={data.productId.MainImage}
                      alt={data.productId.id}
                      className={styles.img}
                    />
                    <div>
                      <h6>{data.productId.Name}</h6>
                      <h6>{data.productId.Price}</h6>
                    </div>
                  </div>
                  <div className={styles.userdetail}>
                    <h6>Message from :-{data.people.user.Username}</h6>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
      { (currentchat?._id) &&
        <SendGetcomponentMessage chatId ={currentchat?._id} userId={currentchat?.people?.user?._id} sellerId={currentchat?.people?.seller?._id} />
      }
    </div>
  );
};

export default Message;
