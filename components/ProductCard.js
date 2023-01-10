import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/ProductCard.module.css";
const ProductsCard = ({ id, pic, title, price, newPrice, discount }) => {
  return (
    <Link className={styles.card} href={`/product/${id}`}>
      <img src={pic} alt="product" className={styles.img} />
      <h5>{title}</h5>
      <h5>
        {discount ? (
          <>
            <strike>Rs{price} </strike>
            Rs{newPrice}
          </>
        ) : (
          ` Rs${price}`
        )}
      </h5>
      {discount ? <h5 className={styles.discount}>- Rs {discount}</h5> : ""}
    </Link>
  );
};

export default ProductsCard;
