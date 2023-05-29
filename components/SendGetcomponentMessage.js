import React, { useState, useEffect } from "react";
import styles from "../styles/sellerMessage.module.css";
import axios from "axios";
import io from "socket.io-client"
var socket;
const SendGetcomponentMessage = ({ chatId, userId, sellerId }) => {
  console.log(chatId);
  const URLlocal ="https://adorable-leather-jacket-foal.cyclic.app";
  const [isLoading, setIsloading] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [sendingmessage, setSendingmessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false)
  useEffect(()=>{
      socket = io(URLlocal);
      socket.emit("setup", sellerId);
      socket.on("connected", (data)=>{
        console.log(data)
        setSocketConnected(true)
      })
  },[])
  useEffect(() => {
    const fetchingMessage = async () => {
      const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });
      if (chatId) {
        await instance
          .get(`messages/${chatId}`)
          .then((data) => {
            let Allmessages = data.data.message;
            console.log("messages", data.data.message);
            setAllMessages((prev) => {
              return [...Allmessages];
            });
            setIsloading(true);
            socket.emit('join chat', chatId)
          })
          .catch((err) => {
            console.log(err);
            setIsloading(true);
          });
        }
    };
    fetchingMessage();
  }, [chatId]  
  );
  const changeHandler =(e)=>{
    setSendingmessage(e.target.value)
  }

  const submithandler = (e)=>{
    e.preventDefault();
          const instance = axios.create({
            withCredentials: true,
            headers: { authorization: "Bearer" },
          })
          const sendingDatatodB = {
            chatId: chatId,
            content: sendingmessage
        }
        console.log(sendingDatatodB, "hello world")
        let gettingData ;
           instance.post(`/messages`,sendingDatatodB).then((data)=>{
            const objectdata = data.data.message
            const tempdata ={
              _id:objectdata._id,
              chat: objectdata.chat._id,
              content:objectdata.content,
              sender:objectdata.sender,
              createdAt:objectdata.createdAt,
              updatedAt:objectdata.updatedAt
            }
            socket.emit("new message", data.data.message, chatId )
            setAllMessages((prev)=>{
              return[...prev, tempdata ]
            })
          }).catch((err)=>{
            console.log(err)
          })  
  }
  useEffect(()=>{
    console.log("message received")
          socket.on("message recieved", (data)=>{
            console.log("Message Received!" , data)
            setAllMessages((prev)=>{
              return[...prev, data ]
            })
          })
          // socket.on("testing", (data)=>{
          //   console.log(data)
          // })
  });


  return (
    <div className={styles.messagessendget}>
      {allMessages.length && (
        <div className={styles.getmessage}>
          {allMessages?.map((data) => {
            return (
              <div
                key={data._id}
                className={
                  data?.sender == sellerId
                    ? styles.sellerstyle
                    : styles.userstyle
                }
              >
                <h3 className={styles.text}>{data.content}</h3>
              </div>
            );
          })}
        </div>
      )}

      <div className={styles.sendmessage}>
        <input onChange={(e)=> changeHandler(e)} type="text" placeholder="message..." />
        <button onClick={submithandler}>submit</button>
      </div>
    </div>
  );
};

export default SendGetcomponentMessage;
