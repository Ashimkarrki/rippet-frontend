import React, { useState } from "react";
import formStyle from "../../../styles/substyle/SearchBar.module.css";
import tableStyle from "../../../styles/substyle/Table.module.css";
import positionStyles from "../../../styles/substyle/DashboardContainer.module.css";

import axios from "axios";
const Search = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState();

  return (
    <div className={positionStyles.container}>
      <form
        className={formStyle.form}
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const instance = axios.create({
              withCredentials: true,
              headers: { authorization: "Bearer" },
            });
            const res = await instance.get("admin/orderSearch/" + value);
            console.log(res.data);
            setData(res.data.order);
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <input
          className={formStyle.input}
          type="text"
          placeholder={"Search  Order"}
          required
          value={value}
          onChange={(e) => {
            console.log(e.target.value);
            setValue(e.target.value);
          }}
        />
        <input className={formStyle.btn} type="submit" value="Search" />
      </form>
      {data ? (
        <table className={tableStyle.table} border="1">
          <thead className={tableStyle.head}>
            <tr>
              <th className={tableStyle.data}>Product</th>
              <th className={tableStyle.data}>Price</th>
              <th className={tableStyle.data}>Quantity</th>
              <th className={tableStyle.data}>Status</th>
              <th className={tableStyle.data}>Seen </th>
              <th className={tableStyle.data}>User</th>
              <th className={tableStyle.data}>User Phone Number</th>
              <th className={tableStyle.data}>Date Placed</th>
              <th className={tableStyle.data}>Order Number</th>
              <th className={tableStyle.data}>Shop Name</th>
            </tr>
          </thead>
          <tbody className={tableStyle.body}>
            {data.OrderedItems.map((k) => {
              return (
                <tr key={k._id}>
                  <td className={tableStyle.data}>{k.productId.Name}</td>
                  <td className={tableStyle.data}>{k.productId.Price}</td>
                  <td className={tableStyle.data}>{k.quantity}</td>
                  <td className={tableStyle.data}>
                    {data.received
                      ? "Recived"
                      : data.approved
                      ? "Approved"
                      : "Not Approved"}
                  </td>
                  <td className={tableStyle.data}>
                    {k.SeenByseller ? "Yes" : "No"}
                  </td>
                  <td className={tableStyle.data}>{data.User.Username}</td>
                  <td className={tableStyle.data}>{data.PhoneNumber}</td>
                  <td className={tableStyle.data}>
                    {new Date(data.CreatedAt).toDateString()}
                  </td>
                  <td className={tableStyle.data}>{data.id}</td>
                  <td className={tableStyle.data}>{k.sellerId.Shopname}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h1>No Orders</h1>
      )}
    </div>
  );
};

export default Search;
