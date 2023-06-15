import React from "react";
import styles from "../styles/SellerProductCard.module.css";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Image from "next/image";
const SellerProductCard = ({
  data,
  deleteItem,
  setDeleteItem,
  setEditItem,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.img_name_wrapper}>
        <div className={styles.image_wrapper}>
          <Image
            src={data.MainImage}
            alt={data.Name}
            fill
            className={styles.img}
          />
        </div>
        <h5 className={styles.title}>{data.Name}</h5>
      </div>
      <div className={styles.button_group}>
        <button
          className={`${styles.buttons} ${styles.delete}`}
          onClick={() => setDeleteItem(data)}
        >
          <AiOutlineDelete className={styles.icons} />
        </button>
        <button
          className={`${styles.buttons} ${styles.edit}`}
          onClick={() => setEditItem(data)}
        >
          <AiOutlineEdit className={styles.icons} />
        </button>
      </div>
    </div>
  );
};

export default SellerProductCard;
