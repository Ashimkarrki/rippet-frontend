import React from "react";
import Image from "next/image";
import styles from "../styles/MyOrders.module.css";

import Link from "next/link";
const UserComponent = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1 className={styles.black}>Order History</h1>
        <p className={styles.grey}>Check the status of recent orders</p>
      </div>
      <div className={styles.flex}>
        {data?.map((s) => {
          return (
            <div key={s.id}>
              <div className={styles.order_info}>
                <div className={styles.order_info_item}>
                  <p className={styles.black}>Date Placed</p>
                  <p> {new Date(s.CreatedAt).toDateString()} </p>
                </div>
                <div className={styles.order_info_item}>
                  <p className={styles.black}>Order Number</p>
                  <p> {s.id}</p>
                </div>
                <div className={styles.order_info_item}>
                  <p className={styles.black}>Total Amount</p>
                  <p> Rs {s.Amount}</p>
                </div>
              </div>
              <div className={styles.grid}>
                <div className={styles.top}>
                  <p>Product</p>
                  <p>Price</p>
                  <p>Status</p>
                  <p className={styles.grid_last}>Info</p>
                </div>
                <div className={styles.line}></div>
                {s.OrderedItems.map((k) => {
                  return (
                    <div key={k._id}>
                      <div className={styles.item}>
                        <div className={styles.flex_row}>
                          <div className={styles.image_wrapper}>
                            <Image
                              className={styles.img}
                              src={k.productId.MainImage}
                              alt={k.productId.Name}
                              fill
                            />
                          </div>
                          <h5 className={styles.black}>{k.productId.Name}</h5>
                        </div>
                        <p>Rs {k.productId.Price}</p>
                        <p>
                          {k.recieved
                            ? "Delivered"
                            : k.approved
                            ? "Approved"
                            : "Not Approved"}
                        </p>

                        <Link
                          href={"product/" + k.productId.id}
                          className={styles.grid_last}
                        >
                          {console.log(k.productId.id)}
                          <p className={styles.blue}>View Product</p>
                        </Link>
                      </div>
                      <div className={styles.line}></div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserComponent;
