import React from "react";
import styles from "../styles/SellerProductCard.module.css";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
const SellerProductCard = ({ data, deleteItem, setDeleteItem }) => {
  return (
    <div className={styles.card} onClick={() => setDeleteItem(data)}>
      <div className={styles.image_wrapper}>
        <img src={data.MainImage} alt={data.Name} className={styles.img} />
      </div>
      <h5 className={styles.title}>{data.Name}</h5>
      <div className={styles.button_group}>
        <button className={`${styles.buttons} ${styles.delete}`}>
          <AiOutlineDelete className={styles.icons} />
        </button>
        <button className={`${styles.buttons} ${styles.edit}`}>
          <AiOutlineEdit className={styles.icons} />
        </button>
      </div>
    </div>
  );
};

export default SellerProductCard;
