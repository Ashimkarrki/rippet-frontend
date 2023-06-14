import React, { useState, useContext } from "react";
import styles from "../styles/Order.module.css";
import { userContext } from "../context/userContext";
import IsAuth from "../utils/IsAuth";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
const Order = () => {
  const charge = 20;
  const router = useRouter();
  const { userInfo, cartInfo } = useContext(userContext);
  const [data, setData] = useState({
    PhoneNumber: "",
    StreetName: "",
    Apartment: "",
    Town: "",
    State: "",
    Zip: "",
  });
  console.log(cartInfo);
  const submitHandeler = async (e) => {
    e.preventDefault();
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    try {
      const res = instance.post("/orders", {
        PhoneNumber: data.PhoneNumber,
        Amount: total() + charge,
        Location:
          data.StreetName +
          "," +
          data.Apartment +
          "/" +
          data.Town +
          "/" +
          data.State +
          "/" +
          data.Zip,
        OrderedItems: cartInfo.items.map((s) => {
          return {
            productId: s.id,
            quantity: s.quantity,
            price: s.Price,
          };
        }),
      });
      router.replace("/");
    } catch (err) {
      console.log(err);
    }
  };
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
  const onChangeState = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className={styles.ordercontainer}>
      <div className={styles.order}>
      <form className={styles.userInform} onSubmit={submitHandeler}>
        <h3 className={styles.head_heading}>Details</h3>
        <div className={styles.userInfo_child}>
          <label for="Name">Name</label>
          <input
            className={styles.input}
            type="text"
            disabled
            name="Name"
            value={userInfo.userName}
            required
          />
        </div>
        <div className={styles.userInfo_child}>
          <label for="Email">Email</label>
          <input
            disabled
            className={styles.input}
            type="email"
            name="Email"
            value={userInfo.email}
            required
          />
        </div>
        <div className={styles.userInfo_child}>
          <label for="PhoneNumber">Phone Number</label>
          <input
            className={styles.input}
            type="number"
            name="PhoneNumber..."
            placeholder="Enter PhoneNumber"
            value={data.PhoneNumber}
            required
            onChange={onChangeState}
          />
        </div>
        <div className={styles.userInfo_child}>
          <label for="streetAddress">Street Address</label>
          <input
            className={styles.input}
            type="text"
            name="StreetName"
            placeholder="House Number And Street Name"
            value={data.StreetName}
            required
            onChange={onChangeState}
          />
          <input
            placeholder="Apartment,Suite,Unit (Optional)"
            className={styles.input}
            type="text"
            name="Apartment"
            value={data.Apartment}
            onChange={onChangeState}
          />
        </div>
        <div className={styles.userInfo_child}>
          <label for="Town">Town / City</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter Town/city...."
            name="Town"
            value={data.Town}
            required
            onChange={onChangeState}
          />
        </div>
        <div className={styles.userInfo_child}>
          <label for="State">State</label>
          <input
            className={styles.input}
            type="text"
            name="State"
            placeholder="Enter state..."
            value={data.State}
            required
            onChange={onChangeState}
          />
        </div>
        <div className={styles.userInfo_child}>
          <label for="Zip">Postcode / Zip</label>
          <input
            className={styles.input}
            type="number"
            placeholder="Enter Postcode..."
            name="Zip"
            value={data.Zip}
            required
            onChange={onChangeState}
          />
        </div>
        <input type="submit" value="Order" className={styles.submit} />
      </form>
      <div className={styles.cartInform}>
        <h3 className={styles.head_heading}>Your Order</h3>
        <div className={styles.product_top}>
          <h5 className={`${styles.heading} ${styles.heading_first}`}>
            Product
          </h5>
          <h5 className={styles.heading}>Quantity</h5>
          <h5 className={styles.heading}>Price</h5>
        </div>
        <div className={styles.products}>
          {cartInfo.items.map((s) => {
            return (
              <Link
                  className={styles.productItem}
                  href={"/product/" + s.id}
                >
              <div className={styles.product} key={s.id}>
                  <h5 className={styles.heading}>{s.Name}</h5>{" "}
                  <h5 className={styles.heading}>{s.quantity}</h5>
                  <h5 className={styles.heading}> {s.Price}</h5>
              </div>
              </Link>
            );
          })}
        </div>
        {/* <div> */}
        <div className={styles.product_bottom}>
          <h5 className={`${styles.heading} ${styles.heading_first}`}>
            Sub total
          </h5>
          <h5 className={`${styles.heading} ${styles.heading_last}`}>
            {total()}
          </h5>
        </div>
        <div className={styles.product_bottom}>
          <h5 className={`${styles.heading} ${styles.heading_first}`}>
            Charge
          </h5>
          <h5 className={`${styles.heading} ${styles.heading_last}`}>
            {charge}
          </h5>
        </div>
        <div className={styles.product_bottom}>
          <h5 className={`${styles.heading} ${styles.heading_first}`}>Total</h5>
          <h5 className={`${styles.heading} ${styles.heading_last}`}>
            {total() + charge}
          </h5>
        </div>
        {/* </div> */}
      </div>
      </div>
    </div>
  );
};

export default IsAuth(Order);
