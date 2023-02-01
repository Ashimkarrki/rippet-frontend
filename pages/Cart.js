import React, { useState } from "react";

import esewa from "../public/esewa.webp";
import Image from "next/image";
import useSWR from "swr";
import { useContext } from "react";
import styles from "../styles/Cart.module.css";
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from "axios";
import { cartContext } from "../context/CartContext";
import MdDelete from "react-icons/md";

const Cart = () => {
  const shipping = 50;
  const tax = 13;
  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const { addToCart, cartInfo } = useContext(cartContext);
  const { dat, error, isLoading } = useSWR(
    "https://adorable-leather-jacket-foal.cyclic.app/api/v1/carts",
    async (url) => {
      return instance
        .get(url)
        .then((res) => {
          addToCart(res.data.data.AllCart);
          return res.data.data.AllCart;
        })
        .catch((err) => err);
    }
  );

  const [data, setData] = useState([
    {
      id: 1,
      pic: "https://imgs.search.brave.com/FeG4AY80eOpItgJx6fMGVKEBmdkuuA9P0mEATDDFhBU/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93ZWJz/dG9ja3Jldmlldy5u/ZXQvaW1hZ2VzL2Ns/aXBhcnQtYm9vay1w/ZGYtMTgucG5n",
      title:
        "Windproof/Water Repellent/ Fleece Lined Anti-Skid Touchscreen Winter Gloves For Bike",
      price: 550,
      discount: 70,
      newPrice: 480,
      inCart: 2,
    },
    {
      id: 2,
      pic: "https://imgs.search.brave.com/FeG4AY80eOpItgJx6fMGVKEBmdkuuA9P0mEATDDFhBU/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93ZWJz/dG9ja3Jldmlldy5u/ZXQvaW1hZ2VzL2Ns/aXBhcnQtYm9vay1w/ZGYtMTgucG5n",
      title:
        "Windproof/Water Repellent/ Fleece Lined Anti-Skid Touchscreen Winter Gloves For Bike",
      price: 220,
      discount: 10,
      newPrice: 210,
      inCart: 5,
    },
    {
      id: 3,
      pic: "https://imgs.search.brave.com/FeG4AY80eOpItgJx6fMGVKEBmdkuuA9P0mEATDDFhBU/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93ZWJz/dG9ja3Jldmlldy5u/ZXQvaW1hZ2VzL2Ns/aXBhcnQtYm9vay1w/ZGYtMTgucG5n",
      title:
        "Windproof/Water Repellent/ Fleece Lined Anti-Skid Touchscreen Winter Gloves For Bike",
      price: 1000,
      discount: 100,
      newPrice: 990,
      inCart: 2,
    },
  ]);
  const total = () => {
    let array = cartInfo.items.map((s) => {
      return s.quantity * s.ProductId?.newPrice
        ? s.newPrice
        : s.productId.Price;
    });
    let sum;
    if (array[0]) {
      sum = array.reduce((total, current) => total + current);
    } else {
      sum = 0;
    }
    return sum;
  };
  if (isLoading) return <h1>Loading.....</h1>;
  console.log(error);
  // if (error) return <h1>{error.message}</h1>;
  // else return <h1>hello</h1>;
  return (
    <div>
      <div className={styles.cartContainer}>
        <div className={styles.cart}>
          <div className={styles.item_wrapper}>
            <h3 className={styles.cartprimaryheading}>
              YOUR CART ({cartInfo.items.length})
            </h3>
            {/* here _id is cart id and id is productId */}
            {cartInfo.items.map(
              ({
                _id,
                productId: { MainImage, Name, discount, Price, newPrice, id },
                quantity,
              }) => {
                return (
                  <div key={_id} className={styles.item}>
                    <div className={styles.imagetextcart}>
                      <img
                        className={styles.image}
                        src={MainImage}
                        alt="products"
                      />
                      <div className={styles.deletebuttonandtext}>
                        <h4 className={styles.carttitle}>{Name}</h4>
                        <button
                          className={styles.deletebutton}
                          onClick={async () => {
                            const res = await instance.delete(
                              "carts/delete/" + _id
                            );
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
                                  _id: _id,
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
                                _id: _id,
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
