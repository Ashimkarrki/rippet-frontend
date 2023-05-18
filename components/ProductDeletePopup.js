import React from "react";
import styles from "../styles/ProductDeletePopop.module.css";
import { AiOutlineDelete, AiOutlineCloseCircle } from "react-icons/ai";

const ProductDeletePopup = ({ deleteItem, setDeleteItem }) => {
  console.log(deleteItem);
  return (
    <div className={styles.pop_up}>
      <div className={styles.pop_up_child}>
        <img
          src={deleteItem.MainImage}
          className={styles.image}
          alt={deleteItem.Name}
        />
        <h4>Name : {deleteItem.Name}</h4>
        <h4>Category :{deleteItem.Category}</h4>
        <h4>Discount :{deleteItem.Discount}</h4>
        <h4>AverageRating :{deleteItem.AverageRating}</h4>
        <h4>Price : {deleteItem.Price}</h4>
        <div>
          <h4>Description : </h4>
          <p className={styles.desc}>{deleteItem.Description} </p>
        </div>
        <div className={styles.button_group}>
          <button
            className={`${styles.buttons} ${styles.cancel}`}
            onClick={() => setDeleteItem("")}
          >
            Cancel
            <AiOutlineCloseCircle className={styles.icons} />
          </button>
          <button className={`${styles.buttons} ${styles.delete}`}>
            Confirm
            <AiOutlineDelete className={styles.icons} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDeletePopup;
