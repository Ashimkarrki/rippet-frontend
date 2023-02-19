import React from "react";
import { useContext } from "react";
import { userContext } from "../context/userContext";
import useFetchUser from "../features/fetchUser";
const PlaceOrder = () => {
  const { cartInfo } = useContext(userContext);
  useFetchUser();
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
    <div>
      <div className="bill_details">
        <div className="input_wrapper">
          <h5>First Name</h5>
          <input type="text" />
        </div>
        <div className="input_wrapper">
          <h5>Last Name</h5>
          <input type="text" />
        </div>
        <div className="input_wrapper">
          Street Address
          <input type="text" />
        </div>
        <div className="input_wrapper">
          Town / City
          <input type="text" />
        </div>
        <div className="input_wrapper">
          State
          <select name="state" id="state">
            <option value="Province No.1">Province No.1</option>
            <option value="Madesh">Madesh </option>
            <option value="Gandaki">Gandaki </option>
            <option value="Lumbini">Lumbini </option>
            <option value="Karnali">Karnali </option>
            <option value="Bagmati">Bagmati </option>
            <option value="Sudurpashchim">Sudurpashchim </option>
          </select>
        </div>
        <div className="input_wrapper">
          Phone
          <input type="number" />
        </div>
        <div className="input_wrapper">
          Email Address
          <input type="email" value="something@gmail.com" readOnly />
        </div>
      </div>
      <div className="your_order">
        <h2>Your Order</h2>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Sub Total</th>
            </tr>
          </thead>
          <tbody>
            {cartInfo.items.map((s) => {
              return (
                <tr key={s.id}>
                  <td>
                    {s.Name} * {s.quantity}
                  </td>
                  <td>Rs {s.Price * s.quantity}</td>
                </tr>
              );
            })}
            <tr>
              <td>Sub Total</td>
              <td>Rs {total()} </td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>Rs 60</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>Rs {total() + 60}</td>
            </tr>
          </tbody>
        </table>
        <button>Place Order</button>
      </div>
    </div>
  );
};

export default PlaceOrder;
