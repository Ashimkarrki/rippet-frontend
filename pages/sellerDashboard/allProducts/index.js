import React, { useContext, useState } from "react";
import useFetchUser from "../../../features/fetchUser";
import useSWR from "swr";
import axios from "axios";
import { userContext } from "../../../context/userContext";
import SellerProductCard from "../../../components/SellerProductCard";
import styles from "../../../styles/AllProducts.module.css";
import ProductDeletePopup from "../../../components/ProductDeletePopup";
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [deleteItem, setDeleteItem] = useState("");

  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  useFetchUser();
  const { userInfo } = useContext(userContext);
  const { data, error, isLoading } = useSWR(
    `https://adorable-leather-jacket-foal.cyclic.app/api/v1/products/${userInfo.id}/seller`,
    async (url) => {
      if (!userInfo.id) return;
      try {
        const res = await instance.get(url);
        setProducts(res.data.data);
        console.log(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
  );
  return (
    <div className={styles.allProduct}>
      {deleteItem && (
        <ProductDeletePopup
          deleteItem={deleteItem}
          setDeleteItem={setDeleteItem}
        />
      )}
      <h3 className={styles.heading}>Top Products </h3>
      <div className={styles.image_grid}>
        {products.map((s) => {
          return (
            <SellerProductCard
              key={s.id}
              data={s}
              deleteItem={deleteItem}
              setDeleteItem={setDeleteItem}
            />
          );
        })}
      </div>
      <h3 className={styles.heading}>Other Products ({products.length})</h3>
      <div className={styles.image_grid}>
        {products.map((s) => {
          return (
            <SellerProductCard
              key={s.id}
              data={s}
              deleteItem={deleteItem}
              setDeleteItem={setDeleteItem}
            />
          );
        })}
        {products.map((s) => {
          return (
            <SellerProductCard
              key={s.id}
              data={s}
              deleteItem={deleteItem}
              setDeleteItem={setDeleteItem}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
