import React, { useState, useContext } from "react";
import styles from "../styles/Order.module.css";
import { userContext } from "../context/userContext";
import useFetchUser from "../features/fetchUser";
const Order = () => {
  const charge = 20;
  useFetchUser();
  const { userInfo, cartInfo } = useContext(userContext);
  const [data, setData] = useState({
    PhoneNumber: "",
    StreetName: "",
    Apartment: "",
    Town: "",
    State: "",
    Zip: "",
  });
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
    <div className={styles.order}>
      <form className={styles.userInfo}>
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
            name="PhoneNumber"
            value={data.PhoneNumber}
            required
            onChange={onChangeState}
          />
        </div>

        <div className={styles.userInfo_child}>
          <label for="streetAddress">Street Address</label>
          <input
            className={styles.input}
            type="name"
            name="streetAddress"
            value={data.StreetName}
            required
            onChange={onChangeState}
          />
          <input
            className={styles.input}
            type="name"
            name="Apartment"
            value={data.Apartment}
            onChange={onChangeState}
          />
        </div>
        <div className={styles.userInfo_child}>
          <label for="Town">Town / City</label>
          <input
            className={styles.input}
            type="number"
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
            type="number"
            name="State"
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
            name="Zip"
            value={data.Zip}
            required
            onChange={onChangeState}
          />
        </div>
      </form>
      <div className={styles.cartInfo}>
        Products:
        <div className={styles.products}>
          {cartInfo.items.map((s) => {
            return (
              <div className={styles.product} key={s.id}>
                <img className={styles.image} src={s.MainImage} alt={s.Name} />
                <div>
                  <h5>Name : {s.Name}</h5>
                  <h5>Price : {s.Price}</h5>
                  <h5>Quantity : {s.quantity}</h5>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.math}>
          <h5>Total Price: {total()} </h5>
          <h5>Charge : {charge}</h5>
          <h5>Net Total : {total() - charge}</h5>
        </div>
      </div>
    </div>
  );
};

export default Order;
