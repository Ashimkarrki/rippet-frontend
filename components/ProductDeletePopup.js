import React, { useState } from "react";
import styles from "../styles/ProductDeletePopop.module.css";
import { AiOutlineDelete, AiOutlineCloseCircle } from "react-icons/ai";
import { DotSpinner } from "@uiball/loaders";
import axios from "axios";
const ProductDeletePopup = ({ deleteItem, setDeleteItem, setProducts }) => {
  const [isLoading, setIsLoading] = useState(false);
  const deleteProduct = async () => {
    console.log("delete");
    setIsLoading(true);
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    try {
      const res = await instance.delete(
        `https://adorable-leather-jacket-foal.cyclic.app/api/v1/products/${deleteItem.id}`
      );
      console.log(res);
      setProducts((prev) => {
        return prev.filter((s) => s.id !== deleteItem.id);
      });
      setDeleteItem("");
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(deleteItem);
  return (
    <div className={styles.pop_up} onClick={() => setDeleteItem()}>
      <div className={styles.pop_up_child} onClick={(e) => e.stopPropagation()}>
        <img
          src={deleteItem.MainImage}
          className={styles.image}
          alt={deleteItem.Name}
        />
        <h4 className={styles.heading}>Name : {deleteItem.Name}</h4>
        <h4 className={styles.heading}>Category : {deleteItem.Category}</h4>
        <h4 className={styles.heading}>Discount : {deleteItem.Discount}</h4>
        <h4 className={styles.heading}>
          AverageRating : {deleteItem.AverageRating}
        </h4>
        <h4 className={styles.heading}>Price : {deleteItem.Price}</h4>
        <div>
          <h4 className={styles.heading}>Description : </h4>
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
          {isLoading ? (
            <button
              className={`${styles.buttons} ${styles.delete} ${styles.delete_loader}`}
            >
              <DotSpinner color="#231F20" size={25} />
            </button>
          ) : (
            <button
              className={`${styles.buttons} ${styles.delete}`}
              onClick={deleteProduct}
            >
              Confirm
              <AiOutlineDelete className={styles.icons} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDeletePopup;
