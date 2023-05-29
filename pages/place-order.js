import React, { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import { userContext } from "../context/userContext";
import styles from "../styles/place-order.module.css";
import IsAuth from "../utils/IsAuth";
const PlaceOrder = () => {
  const ref = useRef();
  const [detail, setDetail] = useState({
    fname: "",
    lname: "",
    streetAddress: "",
    city: "",
    phone: "",
    state: "",
  });
  const changeHandeler = (e) => {
    setDetail({
      ...detail,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    ref.current.focus();
    console.log(ref);
  }, []);
  const { cartInfo, userInfo } = useContext(userContext);
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
  return (
    <div className={styles.order}>
      <form
        className={styles.bill_details}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h4 className={styles.heading}>Your Detail</h4>
        <div className={styles.input_wrapper}>
          <h5 className={styles.input_heading}>First Name</h5>
          <input
            ref={ref}
            type="text"
            required
            name="fname"
            value={detail.fname}
            onChange={changeHandeler}
          />
        </div>
        <div className={styles.input_wrapper}>
          <h5 className={styles.input_heading}>Last Name</h5>
          <input
            type="text"
            required
            name="lname"
            value={detail.lname}
            onChange={changeHandeler}
          />
        </div>
        <div className={styles.input_wrapper}>
          <h5 className={styles.input_heading}>Street Address</h5>
          <input
            type="text"
            required
            value={detail.streetAddress}
            name="streetAddress"
            onChange={changeHandeler}
          />
        </div>
        <div className={styles.input_wrapper}>
          <h5 className={styles.input_heading}>Town / City</h5>
          <input
            type="text"
            required
            name="city"
            value={detail.city}
            onChange={changeHandeler}
          />
        </div>
        <div className={styles.input_wrapper} required>
          <h5 className={styles.input_heading}>Phone</h5>
          <input
            type="number"
            className={styles.number_field}
            name="phone"
            value={detail.phone}
            maxLength="10"
            onChange={changeHandeler}
          />
        </div>
        <div className={styles.input_wrapper}>
          <h5 className={styles.input_heading}>State</h5>

          <select
            value={detail.state}
            name="state"
            id="state"
            onChange={changeHandeler}
          >
            <option value="Province No.1">Province No.1</option>
            <option value="Madesh">Madesh </option>
            <option value="Gandaki">Gandaki </option>
            <option value="Lumbini">Lumbini </option>
            <option value="Karnali">Karnali </option>
            <option value="Bagmati">Bagmati </option>
            <option value="Sudurpashchim">Sudurpashchim </option>
          </select>
        </div>

        <div className={styles.input_wrapper}>
          <h5 className={styles.input_heading}>Email Address</h5>
          <input
            type="email"
            value={userInfo?.email ? userInfo.email : "something@gmail.com"}
            readOnly
          />
        </div>
        <button type="submit" className={styles.submit}>
          Place Order
        </button>
      </form>

      <div className={styles.your_order}>
        <h4 className={styles.heading}>Your Order</h4>
        <table className={styles.table} border="1">
          <thead>
            <tr>
              <th className={styles.th}>Product</th>
              <th className={styles.th}>Sub Total</th>
            </tr>
          </thead>
          <tbody>
            {cartInfo.items.map((s) => {
              return (
                <tr key={s.id}>
                  <td className={styles.td}>
                    {s.Name}
                    <span className={styles.into}> ( x {s.quantity})</span>
                  </td>
                  <td className={styles.td}>Rs {s.Price * s.quantity}</td>
                </tr>
              );
            })}
            <tr>
              <td className={styles.td}>Sub Total</td>
              <td className={styles.td}>Rs {total()} </td>
            </tr>
            <tr>
              <td className={styles.td}>Shipping</td>
              <td className={styles.td}>Rs 60</td>
            </tr>
            <tr>
              <td className={styles.td}>Total</td>
              <td className={styles.td}>Rs {total() + 60}</td>
            </tr>
            <tr></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IsAuth(PlaceOrder);
