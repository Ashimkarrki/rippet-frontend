import React, { useState } from "react";
import Link from "next/link";
import esewa from "../public/esewa.webp";
import Image from "next/image";
import useFetchUser from "../features/fetchUser";
import { useContext } from "react";
import styles from "../styles/Cart.module.css";
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from "axios";
import { userContext } from "../context/userContext";
const Cart = () => {
  const { isLoading, isError, error } = useFetchUser();

  const shipping = 50;
  const tax = 13;
  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const { addToCart, cartInfo } = useContext(userContext);
  const total = () => {
    let sum = 0;
    let array = cartInfo.items.map((s) => {
      return s.quantity * (s.newPrice ? s.newPrice : s.Price);
    });
    if (array[0]) {
      sum = array.reduce((total, current) => total + current);
    }
    return sum;
  };
  console.log(isLoading);
  if (isLoading) return <h1>Loading.....</h1>;
  if (error) return <h1>{error.message}</h1>;
  return (
    <div>
      <div className={styles.cartContainer}>
        <div className={styles.cart}>
          <div className={styles.item_wrapper}>
            <h3 className={styles.cartprimaryheading}>
              YOUR CART ({cartInfo?.results})
            </h3>
            {cartInfo.items.map(
              ({
                MainImage,
                Name,
                discount,
                Price,
                newPrice,
                id,
                cartId,
                quantity,
              }) => {
                return (
                  <div href={"/product/" + id} key={id} className={styles.item}>
                    <div className={styles.imagetextcart}>
                      <img
                        className={styles.image}
                        src={MainImage}
                        alt="products"
                      />
                      <div className={styles.deletebuttonandtext}>
                        <Link href={"/product/" + id}>
                          <h4 className={styles.carttitle}>{Name}</h4>
                        </Link>
                        <button
                          className={styles.deletebutton}
                          onClick={async () => {
                            const res = await instance.delete(
                              "carts/delete/" + cartId
                            );
                            console.log(res.data.data);
                            addToCart(res.data.data);
                          }}
                        >
                          <RiDeleteBin6Fill className={styles.delete_icon} />
                        </button>
                      </div>
                    </div>
                    <div className={styles.item_info}>
                      <h5 className={styles.realprice}>
                        {discount ? (
                          <>
                            <strike className={styles.discounttext}>
                              Rs. {Price}{" "}
                            </strike>
                            Rs. {newPrice}
                          </>
                        ) : (
                          ` Rs. ${Price}`
                        )}
                      </h5>
                      <div className={styles.button_group}>
                        <div>
                          <button
                            className={styles.button}
                            onClick={async () => {
                              if (!(quantity <= 1)) {
                                const res = await instance.patch("/carts", {
                                  productId: id,
                                  quantity: quantity - 1,
                                  _id: cartId,
                                });
                                addToCart(res.data.data.UpdateCart);
                              }
                            }}
                          >
                            -
                          </button>
                          <button className={styles.button}>{quantity}</button>
                          <button
                            className={styles.button}
                            onClick={async () => {
                              const res = await instance.patch("/carts", {
                                productId: id,
                                quantity: quantity + 1,
                                _id: cartId,
                              });
                              addToCart(res.data.data.UpdateCart);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
          <div className={styles.summary}>
            <div className={styles.headingContainer}>
              <h3 className={styles.summary_heading}>YOUR SUMMARY</h3>
            </div>
            <div className={styles.subtotal}>
              <p className={styles.subtotalPrimary}>SUBTOTAL</p>
              <p className={styles.subtotalSecondary}>Rs. {total()}</p>
            </div>
            <div className={styles.shipping}>
              <p className={styles.shippingPrimary}>SHIPPING CHARGE</p>
              <p className={styles.shippingSecondary}>Rs. {shipping}</p>
            </div>
            <div className={styles.tax}>
              <p className={styles.taxPrimary}>TAX</p>
              <p className={styles.taxSecondary}>Rs. {tax}</p>
            </div>
            <div className={styles.total}>
              <p className={styles.totalPrimary}>TOTAL</p>
              <p className={styles.totalSecondary}>
                Rs. {total() - shipping - (tax / 100) * total()}
              </p>
            </div>
            <div className={styles.submitProducts}>
              <button className={styles.checkoutbutton}>CHECKOUT</button>
              <p>OR</p>
              <button className={styles.checkoutesewa}>
                Checkout with <Image src={esewa} width={"30"} height={"30"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
