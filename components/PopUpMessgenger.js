import React, { useEffect, useState } from "react";
import styles from "../styles/PopupMessenger.module.css";
import axios from "axios";
import io from "socket.io-client";
import { GrClose } from "react-icons/gr";
import { RiSendPlane2Fill } from "react-icons/ri";
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
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    const sendingData = { id: sellerId, Role: "seller", productId: productId };
    instance
      .post("chats", sendingData)
      .then((data) => {
        if (data?.data?.message?._id) {
          setChatId(data.data.message._id);
          const room = data.data.message._id;
          instance
            .get(`messages/${data.data.message._id}`)
            .then((data) => {
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
              setLoading(true);
            });
        }
      })
      .catch((data) => {
        setLoading(true);
      });
  };
  useEffect(() => {
    fetchingData();
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
    instance
      .post(`messages`, passingdata)
      .then((data) => {
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
      .catch((err) => {});
  };

  useEffect(() => {
    socket.on("message recieved", (data) => {
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
            <img
              className={styles.img}
              src="https://www.pngmart.com/files/22/User-Avatar-Profile-Transparent-Background.png"
            />
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
                    <h1
                      className={
                        data.sender === sellerId
                          ? styles.textseller
                          : styles.textuser
                      }
                    >
                      {data.content}
                    </h1>
                  </div>
                );
              })}
            </div>
            {/* // )} */}
          </div>
        ) : (
          <div className={styles.messages}></div>
        )}
        {loading && (
          <div className={styles.input_msg}>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter Message...."
              onChange={(e) => changeHandler(e)}
            />
            <RiSendPlane2Fill
              className={styles.button}
              onClick={submitHandler}
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default PopUpMessgenger;
