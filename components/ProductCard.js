import React, { useContext, useState, useMemo } from "react";
import Image from "next/image";
import { DotSpinner } from "@uiball/loaders";
import Link from "next/link";
import { BsCartDash } from "react-icons/bs";
import styles from "../styles/ProductCard.module.css";
import { userContext } from "../context/userContext";
import axios from "axios";
const ProductsCard = ({ id, pic, title, price, newPrice, discount }) => {
  const [isCartLoading, setIsCartLoading] = useState(false);
  const { addToCart, cartInfo } = useContext(userContext);
  const isInCart = useMemo(() => {
    console.log("in Memo");
    let result = false;
    cartInfo?.items.map((s) => {
      if (s.id === id) {
        result = true;
      }
    });
    return result;
  }, [cartInfo, id]);
  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const add_cart = async (e) => {
    e.preventDefault();
    if (isInCart) {
      return;
    }
    setIsCartLoading(true);
    try {
      const res = await instance.post("/carts", {
        productId: id,
        quantity: 1,
      });
      addToCart(res.data.data);
      setIsCartLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
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
      {isCartLoading ? (
        <div className={`${styles.cart} ${styles.loading_spinner}`}>
          <DotSpinner color="#231F20" size={25} />
        </div>
      ) : (
        <div className={styles.cart} onClick={add_cart}>
          <BsCartDash /> {isInCart ? "Added" : "Add To Cart"}
        </div>
      )}
    </Link>
  );
};

export default ProductsCard;
