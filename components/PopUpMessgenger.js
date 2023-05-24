import React, { useEffect, useState } from "react";
import styles from "../styles/PopupMessenger.module.css";
import axios from "axios"
const PopUpMessgenger = ({sellerId}) => {
  const URL = "https://adorable-leather-jacket-foal.cyclic.app/";
  const [loading, setLoading] = useState(false);
  const [chatid, setChatId] = useState("");
  const [allmessages, setAllmessages] = useState([]);
  const [message, setMessage] = useState("")
    const fetchingData = async()=>{
      console.log(sellerId)
      const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });
      const sendingData = {id:sellerId, Role: "seller"}
      console.log(sendingData)
      instance
      .post(`https://adorable-leather-jacket-foal.cyclic.app/api/v1/chats`, sendingData)
      .then((data) => {
        console.log(data.data.message._id, "hello message")
        if(data?.data?.message?._id){
          setChatId(data.data.message._id)
            instance.get(`https://adorable-leather-jacket-foal.cyclic.app/api/v1/messages/${data.data.message._id}`).then((data)=>{
              console.log(data.data.message)
              const message = data.data.message

              setAllmessages((prevMessages) => {
                const messageIds = new Set(prevMessages.map((msg) => msg._id));
                const newMessages = message.filter((msg) => !messageIds.has(msg._id));
                return [...prevMessages, ...newMessages];
              });

              setLoading(true)
            }).catch((err)=>{
              console.log(err)
              setLoading(true)
            })
        }
      }).catch((data)=>{
          console.log(data, "hello message")
          setLoading(true)
      })
    }
    useEffect(()=>{

      fetchingData()
      console.log("hello fetching")

    },[])
const changeHandler =(e)=>{
  setMessage(e.target.value)
}
const submitHandler =(e)=>{
      e.preventDefault();
      const passingdatainabovestate = {
        chat : "",
        content: "",
        sender: "",
      }
      setAllmessages((data)=>{
       return [...data] 
      })
      const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });
      const passingdata ={
        chatId: chatid,
        content: message
      }
      instance.post(`https://adorable-leather-jacket-foal.cyclic.app/api/v1/messages`, passingdata).then((data)=>{
        console.log(data)
      }).catch((err)=>{
        console.log(err)
      })
      
}
  return (
    <form className={styles.PopUpMessgenger}>

        <h1>Messages with seller name</h1>

      {  loading? <div>
      {
                   allmessages.length &&      
                    <div className={styles.messages}>
                    {
                      allmessages.map((data, i)=>{
                        return(<div key={i} className={ (data.sender == sellerId)?styles.singlemessagesender:styles.singlemessageuser} >
                                  <h1  >{data.content}</h1>
                              </div>)

                      })

                    }
                   </div>

              }
      </div>:<h1>loading...</h1> 
      }
      { loading &&
 
      <div className={styles.input_msg}>
        <input type="text" className={styles.input} />
       <button className={styles.button} onClick={submitHandler}>Submit</button>
      </div>
      }
    </form>
  );
};

export default PopUpMessgenger;
