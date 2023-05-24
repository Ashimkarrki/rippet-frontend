import React from 'react'
import styles from "../../../styles/sellerMessage.module.css"
const Message = () => {
  return (
    <div className={styles.messageContainer}>
      <div className={styles.allchat}>

      </div>
      <div className={styles.messagessendget}>
          <div className={styles.getmessage}>

          </div>
          <div className={styles.sendmessage}>
            <input type='text' placeholder='message...' />
            <button>submit</button>
          </div>

      </div>
    
    </div>
  )
}

export default Message