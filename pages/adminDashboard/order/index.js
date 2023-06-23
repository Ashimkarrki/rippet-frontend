import React, { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import Image from "next/image";
import styles from "../../../styles/SellerOrder.module.css";
import placeStyles from "../../../styles/substyle/DashboardContainer.module.css";
import { useContext } from "react";
import { userContext } from "../../../context/userContext";
import IsAuth from "../../../utils/IsAuth";
import Loading from "../../../components/Loading";
import ProductDetailPopup from "../../../components/SubComponent/ProductDetailPopup";
const Orders = () => {
  const [popUpProduct, setPopUpProduct] = useState("");
  const [changing, setChanging] = useState("");
  const filterOut = (arr) => {
    let temp = arr.map((s) => {
      return {
        ...s,
        OrderedItems: s.OrderedItems.filter((k) => {
          return sellerInfo.id === k.sellerId;
        }),
      };
    });
    return temp;
  };
  const submitHandeler = async (content, order, product) => {
    setChanging(order);
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    try {
      const res = await instance.patch(
        "orders/" + order + "/" + content + "/" + product
      );
      setChanging("");
      mutate(res.data.data.updateOrder);
    } catch (err) {
      console.log(err);
    }
  };
  const { sellerInfo } = useContext(userContext);
  console.log(sellerInfo.id);
  const { data, isLoading, mutate } = useSWR(
    "/orders/seller/Sellerorder/",
    async (url) => {
      const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });
      try {
        const res = await instance.get(url);
        console.log(filterOut(res.data.order));
        return filterOut(res.data.order);
      } catch (err) {
        console.log(err);
      }
    }
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={placeStyles.container}>
      {popUpProduct && (
        <ProductDetailPopup
          id={popUpProduct}
          setPopUpProduct={setPopUpProduct}
        />
      )}
      {data.map((s) => {
        return (
          <div
            key={s._id}
            className={`${styles.item} ${changing === s._id && styles.change}`}
          >
            <div>
              <h5>Name : {s.User.Username}</h5>
              <h5> Email : {s.User.Email}</h5>
              <h5> Orders : {new Date(s.CreatedAt).toDateString()}</h5>
            </div>
            <div>
              <h5>Location : {s.Location}</h5>
              <h5>Mobile : {s.PhoneNumber}</h5>
              <h5>Total : {s.Amount}</h5>
            </div>
            <div className={`${styles.sub_grid} ${styles.top}`}>
              <h5>Image</h5>
              <h5>Name</h5>
              <h5>Price</h5>
              <h5>Discount</h5>
              <h5>Check</h5>
            </div>
            <div className={styles.grid_col}>
              {s.OrderedItems.map((k) => {
                return (
                  <div key={k._id} className={styles.sub_grid}>
                    <div className={styles.img_wrapper}>
                      <Image
                        className={styles.img}
                        fill
                        src={k.productId.MainImage}
                        alt={k.productId.Name}
                        onClick={() => {
                          setPopUpProduct(k.productId._id);
                        }}
                      />
                    </div>
                    <h5>{k.productId.Name}</h5>
                    <h5>{k.productId.Price}</h5>
                    <h5>{k.productId.Discount}</h5>
                    {k.received ? (
                      <button className={`${styles.btn} ${styles.green}`}>
                        Received
                      </button>
                    ) : k.approved ? (
                      <button
                        className={`${styles.btn} ${styles.yellow}`}
                        onClick={async () => {
                          submitHandeler("received", s._id, k.productId._id);
                        }}
                      >
                        Not Received
                      </button>
                    ) : (
                      <button
                        className={`${styles.btn} ${styles.red}`}
                        onClick={() => {
                          submitHandeler("approved", s._id, k.productId._id);
                        }}
                      >
                        Not Approved
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            {/* /orders/:orderId/approved/:productId */}
          </div>
        );
      })}
    </div>
  );
};

export default IsAuth(Orders);
