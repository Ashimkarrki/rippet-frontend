import React, { useEffect, useState } from "react";
import styles from "../styles/PopupMessenger.module.css";
import axios from "axios";
// import io from "socket.io-client";
// const URLlocal ="https://adorable-leather-jacket-foal.cyclic.app";
const URLlocal = "http://localhost:4000";
// var socket = io(URLlocal, {
//   withCredentials: true,
// });
const PopUpMessgenger = ({ sellerId, productId }) => {
  // const [loading, setLoading] = useState(false);
  // const [chatid, setChatId] = useState("");
  // const [allmessages, setAllmessages] = useState([]);
  // const [message, setMessage] = useState("");
  // const fetchingData = async () => {
  //   console.log(sellerId);
  //   const instance = axios.create({
  //     withCredentials: true,
  //     headers: { authorization: "Bearer" },
  //   });
  //   const sendingData = { id: sellerId, Role: "seller" , productId:productId};
  //   console.log(sendingData);
  //   instance
  //     .post(
  //       `chats`,
  //       sendingData
  //     )
  //     .then((data) => {
  //       console.log(data.data.message._id, "hello message");
  //       if (data?.data?.message?._id) {
  //         setChatId(data.data.message._id);
  //         const room = data.data.message._id;
  //         console.log("I am Chat Id", room)
  //         instance
  //           .get(
  //             `messages/${data.data.message._id}`
  //           )
  //           .then((data) => {
  //             console.log(data.data.message);
  //             const message = data.data.message;
  //             socket.emit('join chat',room, "I am User");
  //             setAllmessages((prevMessages) => {
  //               const messageIds = new Set(prevMessages.map((msg) => msg._id));
  //               const newMessages = message.filter(
  //                 (msg) => !messageIds.has(msg._id)
  //               );
  //               return [...prevMessages, ...newMessages];
  //             });
  //             setLoading(true);
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //             setLoading(true);
  //           });
  //       }
  //     })
  //     .catch((data) => {
  //       console.log(data, "hello message");
  //       setLoading(true);
  //     });
  // };
  // useEffect(() => {
  //   fetchingData();
  //   console.log("hello fetching");
  // }, []);
  // useEffect(()=>{
  //         socket.on("message recieved", (data)=>{
  //           setAllmessages((prev)=>{
  //             return[...prev, data ]
  //           })
  //         })
  // });
  // const changeHandler = (e) => {
  //   setMessage(e.target.value);
  // };
  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   // setAllmessages((data) => {
  //   //   return [...data];
  //   // });
  //   const instance = axios.create({
  //     withCredentials: true,
  //     headers: { authorization: "Bearer" },
  //   });
  //   const passingdata = {
  //     chatId: chatid,
  //     content: message,
  //   };
  //   console.log(passingdata)
  //   instance
  //     .post(`messages`, passingdata)
  //     .then((data) => {
  //       console.log(data);
  //       const objectdata = data.data.message
  //       const tempdata ={
  //         _id:objectdata._id,
  //         chat: objectdata.chat._id,
  //         content:objectdata.content,
  //         sender:objectdata.sender,
  //         createdAt:objectdata.createdAt,
  //         updatedAt:objectdata.updatedAt
  //       }
  //       socket.emit("new message", data.data.message, chatid )
  //       setAllmessages((prev)=>{
  //         return[...prev, tempdata ]
  //       })
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // useEffect(()=>{
  //   console.log("message received")
  //         socket.on("message recieved", (data)=>{
  //           console.log("Message Received!" , data)
  //           setAllmessages((prev)=>{
  //             return[...prev, data ]
  //           })
  //         })
  // });
  // return (
  //   <form className={styles.PopUpMessgenger}>
  //     <h4 className={styles.heading}>Message with seller</h4>
  //     <h1>Messages with seller name</h1>
  //     {loading ? (
  //       <div>
  //         {allmessages.length && (
  //           <div className={styles.messages}>
  //             {allmessages.map((data, i) => {
  //               return (
  //                 <div
  //                   key={i}
  //                   className={
  //                     data.sender == sellerId
  //                       ? styles.singlemessagesender
  //                       : styles.singlemessageuser
  //                   }
  //                 >
  //                   <h1>{data.content}</h1>
  //                 </div>
  //               );
  //             })}
  //           </div>
  //         )}
  //       </div>
  //     ) : (
  //       <h1>loading...</h1>
  //     )}
  //     {loading && (
  //       <div className={styles.input_msg}>
  //         <input type="text" className={styles.input} onChange={(e)=> changeHandler(e)} />
  //         <button className={styles.button} onClick={submitHandler}>
  //           Submit
  //         </button>
  //       </div>
  //     )}
  //   </form>
  // );
};

export default PopUpMessgenger;
