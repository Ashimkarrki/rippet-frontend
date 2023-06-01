import React, { useContext, useState, useMemo } from "react";
import Image from "next/image";
import { DotSpinner } from "@uiball/loaders";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

import styles from "../styles/ProductCard.module.css";
import { userContext } from "../context/userContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Router, useRouter } from "next/router";
const ProductsCard = ({ id, pic, title, price, discount }) => {
  const router = useRouter();
  const [isCartLoading, setIsCartLoading] = useState(false);
  const { addToCart, cartInfo, userInfo } = useContext(userContext);
  const isInCart = useMemo(() => {
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
    if (!userInfo.id) {
      toast.error("Not Logged In", {
        position: "bottom-left",
      });
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
        <Image src={pic} alt="product" className={styles.img} fill />
      </div>
      <h5 className={styles.title}>{title}</h5>
      <h5 className={styles.price}>
        {discount ? (
          <>
            <strike className={styles.strike}>रु {price} </strike>
            रु {price - discount}
          </>
        ) : (
          `रु  ${price}`
        )}
      </h5>
      {discount ? <h5 className={styles.discount}>- रु {discount}</h5> : ""}
      {isCartLoading ? (
        <div className={`${styles.cart} ${styles.loading_spinner}`}>
          <DotSpinner color="white" size={25} />
        </div>
      ) : isInCart ? (
        <div className={`${styles.cart} ${styles.added}`} onClick={add_cart}>
          <FiShoppingCart /> Added
        </div>
      ) : (
        <div className={styles.cart} onClick={add_cart}>
          <FiShoppingCart /> Add To Cart
        </div>
      )}
    </Link>
  );
};

export default ProductsCard;
