import React,{useState, useEffect} from 'react'
import styles from "../styles/sellerMessage.module.css"
import axios from "axios"
const SendGetcomponentMessage = ({chatId, userId, sellerId}) => {
  const URL = "https://adorable-leather-jacket-foal.cyclic.app/";
    const [isLoading, setIsloading] = useState(false)
    const [allMessages, setAllMessages] = useState([]);
    const fetchingMessage = async()=>{
    const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });
        if(chatId){
   await instance
        .get(`${URL}api/v1/messages/${chatId}`)
        .then((data) => {
          let Allmessages = data.data.message;
          console.log("messages", data.data.message)
          setAllMessages((prev)=>{
            return [...prev, ...Allmessages]
          })
          setIsloading(true)
        }) 
        .catch((err) =>  {
          console.log(err);
          setIsloading(true)

        });
      }
    }
    useEffect(()=>{
            fetchingMessage();
    },[])

  return (
    <div className={styles.messagessendget}>

   
    { allMessages.length && <div className={styles.getmessage}>
    {
      allMessages?.map((data)=>{
        return(
        <div className={(data?.sender == sellerId )?(styles.sellerstyle):(styles.userstyle)}>
          <h3 className={styles.text}>{data.content}</h3>
        </div>
        )
      })
    }
      </div>
    }
    
    <div className={styles.sendmessage}>
      <input type='text' placeholder='message...' />
      <button>submit</button>
    </div>

</div>
  )
}

export default SendGetcomponentMessage