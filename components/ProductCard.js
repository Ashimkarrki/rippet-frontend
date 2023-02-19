import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsCartDash } from "react-icons/bs";
import styles from "../styles/ProductCard.module.css";
const ProductsCard = ({ id, pic, title, price, newPrice, discount }) => {
  return (
    <Link className={styles.card} href={`/product/${id}`}>
      <div className={styles.image_wrapper}>
        <img src={pic} alt="product" className={styles.img} />
      </div>
      <h5 className={styles.title}>{title}</h5>
      <h5 className={styles.price}>
        {discount ? (
          <>
            <strike className={styles.strike}>रु {price} </strike>
            रु {newPrice}
          </>
        ) : (
          `रु  ${price}`
        )}
      </h5>
      {discount ? <h5 className={styles.discount}>- रु {discount}</h5> : ""}
      <div className={styles.cart}>
        <BsCartDash /> Add To Cart
      </div>
    </Link>
  );
};

export default ProductsCard;
