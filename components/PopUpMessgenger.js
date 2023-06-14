import React, { useEffect, useState } from "react";
import styles from "../styles/PopupMessenger.module.css";
import axios from "axios";
import io from "socket.io-client";
import { GrClose } from "react-icons/gr";
import {RiSendPlane2Fill} from "react-icons/ri"
// const URLlocal ="https://adorable-leather-jacket-foal.cyclic.app";
const URLlocal = "http://localhost:4000";
var socket = io(URLlocal, {
  withCredentials: true,
});
const PopUpMessgenger = ({ sellerId, productId, setIsPopUpMessenger }) => {
  const [loading, setLoading] = useState(false);
  const [chatid, setChatId] = useState("");
  const [allmessages, setAllmessages] = useState([]);
  const [message, setMessage] = useState("");
  const fetchingData = async () => {
    console.log(sellerId);
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    const sendingData = { id: sellerId, Role: "seller", productId: productId };
    console.log(sendingData);
    instance
      .post("chats", sendingData)
      .then((data) => {
        console.log(data.data.message._id, "hello message");
        if (data?.data?.message?._id) {
          setChatId(data.data.message._id);
          const room = data.data.message._id;
          console.log("I am Chat Id", room);
          instance
            .get(`messages/${data.data.message._id}`)
            .then((data) => {
              console.log(data.data.message);
              const message = data.data.message;
              socket.emit("join chat", room, "I am User");

              setAllmessages((prevMessages) => {
                const messageIds = new Set(prevMessages.map((msg) => msg._id));
                const newMessages = message.filter(
                  (msg) => !messageIds.has(msg._id)
                );
                return [...prevMessages, ...newMessages];
              });

              setLoading(true);
            })
            .catch((err) => {
              console.log(err);
              setLoading(true);
            });
        }
      })
      .catch((data) => {
        console.log(data, "hello message");
        setLoading(true);
      });
  };
  useEffect(() => {
    fetchingData();
    console.log("hello fetching");
  }, []);

  const changeHandler = (e) => {
    setMessage(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // setAllmessages((data) => {
    //   return [...data];
    // });
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    const passingdata = {
      chatId: chatid,
      content: message,
    };
    console.log(passingdata);
    instance
      .post(`messages`, passingdata)
      .then((data) => {
        console.log(data);
        const objectdata = data.data.message;
        const tempdata = {
          _id: objectdata._id,
          chat: objectdata.chat._id,
          content: objectdata.content,
          sender: objectdata.sender,
          createdAt: objectdata.createdAt,
          updatedAt: objectdata.updatedAt,
        };
        socket.emit("new message", data.data.message, chatid);
        setAllmessages((prev) => {
          return [...prev, tempdata];
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("message received");
    socket.on("message recieved", (data) => {
      console.log("Message Received!", data);
      setAllmessages((prev) => {
        const messageIds = new Set(prev.map((msg) => msg._id));
        if (!messageIds.has(data._id)) {
          return [...prev, data];
        } else {
          return prev;
        }
      });
    });
  });
  return (
    <form className={styles.PopUpMessgenger}>
    <div className={styles.topcontainer}>
    <div className={styles.sellerDetail}>
    <div className={styles.imagewrapper}>
      <img className={styles.img} src="https://www.pngmart.com/files/22/User-Avatar-Profile-Transparent-Background.png" />
    </div>
        <div>
      <h4 className={styles.heading}>John similge</h4>
      <p className={styles.subheading}>Seller</p>
      </div>
      </div>

      <button
        className={`${styles.heading} ${styles.abs}`}
        onClick={() => {
          setIsPopUpMessenger(false);
        }}
      >
        <GrClose className={styles.icon} />
      </button>
    </div>

        <div>
      {loading ? (
        <div>
          {/* {allmessages.length !== 0 && ( */}
          <div className={styles.messages}>
            {allmessages.map((data, i) => {
              return (
                <div
                  key={i}
                  className={
                    data.sender === sellerId
                      ? styles.singlemessagesender
                      : styles.singlemessageuser
                  }
                >
                  <h1 className={data.sender === sellerId
                      ? styles.textseller
                      : styles.textuser}>{data.content}</h1>
                </div>
              );
            })}
          </div>
          {/* // )} */}
        </div>
      ) : (
        <div className={styles.messages}></div>
      )}
      {loading &&
        <div className={styles.input_msg}>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter Message...."
            onChange={(e) => changeHandler(e)}
          />
          <RiSendPlane2Fill className={styles.button} onClick={submitHandler} />
        </div>
      }
      </div>
    </form>
  );
};

export default PopUpMessgenger;
