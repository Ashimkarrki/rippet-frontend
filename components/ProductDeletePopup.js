import React, { useState } from "react";
import styles from "../styles/ProductDeletePopop.module.css";
import { AiOutlineDelete, AiOutlineCloseCircle } from "react-icons/ai";
import { DotSpinner } from "@uiball/loaders";
import useSWR, { useSWRConfig } from "swr";
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
      const res = await instance.delete(`products/${deleteItem.id}`);

      // setProducts((prev) => {
      //   return prev.filter((s) => s.id !== deleteItem.id);
      // });
      mutate("products/seller/allproducts");
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

        <h4 className={styles.heading}>
          <span>Name :</span> {deleteItem.Name}
        </h4>
        <div className={styles.subdetail}>
          <h4 className={styles.heading}>
            <span>AverageRating : </span>
            {deleteItem.AverageRating}
          </h4>

          <h4 className={styles.heading}>
            <span>Price : </span>
            {deleteItem.Price}
          </h4>
          <h4 className={styles.heading}>
            <span>Discount :</span> {deleteItem.Discount}
          </h4>
        </div>

        {/* <div>
          <h4 className={styles.heading}>Description : </h4>
          <p className={styles.desc}>{deleteItem.Description} </p>
        </div> */}
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
