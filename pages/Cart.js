import React, { useState } from "react";
import Image from "next/image";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import cat from "../public/cat.jpg";
import styles from "../styles/Cart.module.css";
const Cart = () => {
  const [data, setData] = useState([
    {
      id: 1,
      pic: cat,
      title: "Atomic",
      price: 550,
      discount: 70,
      newPrice: 480,
      inCart: 2,
    },
    {
      id: 2,
      pic: cat,
      title: "Power Of Habit",
      price: 220,
      discount: 10,
      newPrice: 210,
      inCart: 5,
    },
    {
      id: 3,
      pic: cat,
      title: "Laptop",
      price: 100000,
      discount: 1000,
      newPrice: 909000,
      inCart: 2,
    },
  ]);
  const total = () => {
    let array = data.map((s) => {
      return s.inCart * s.newPrice;
    });
    let sum = array.reduce((total, current) => total + current);
    return sum;
  };
  return (
    <div>
      <Navbar />
      <div className={styles.cart}>
        <div className={styles.item_wrapper}>
          <h3 className={styles.item_header}>YOUR CART ({data.length})</h3>
          {data.map(({ id, pic, title, price, discount, newPrice, inCart }) => {
            return (
              <div key={id} className={styles.item}>
                <Image className={styles.image} src={pic} alt="products" />
                <div className={styles.item_info}>
                  <h4>{title}</h4>
                  <h5>
                    {discount ? (
                      <>
                        <strike>Rs {price} </strike>
                        Rs {newPrice}
                      </>
                    ) : (
                      ` Rs${price}`
                    )}
                  </h5>
                  <div className={styles.button_group}>
                    <button
                      className={styles.button}
                      onClick={() => {
                        setData((prev) => {
                          let temp = prev.filter((s) => s.id !== id);
                          return temp;
                        });
                      }}
                    >
                      REMOVE
                    </button>
                    <button
                      className={styles.button}
                      onClick={() => {
                        let temp = data.map((s) => {
                          if (s.id === id && s.inCart !== 1) {
                            return {
                              ...s,
                              inCart: s.inCart + 1,
                            };
                          }
                          return s;
                        });
                        setData(temp);
                      }}
                    >
                      +
                    </button>
                    <button className={styles.button}>{inCart}</button>
                    <button
                      className={styles.button}
                      onClick={() => {
                        let temp = data.map((s) => {
                          if (s.id === id && s.inCart !== 1) {
                            return {
                              ...s,
                              inCart: s.inCart - 1,
                            };
                          }
                          return s;
                        });
                        setData(temp);
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.summary}>
          <h3 className={styles.summary_heading}>YOUR SUMMARY</h3>
          <div className={styles.st_line}></div>
          <div className={styles.account}>
            <table>
              <tbody>
                {data.map((s) => {
                  return (
                    <tr key={s.id + "a"}>
                      {/* className={styles.account_info}> */}
                      <td>
                        {s.title}*{s.inCart}
                      </td>
                      <td>
                        Rs {s.newPrice}*{s.inCart}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td>TOTAL</td>
                  <td>Rs {total()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
