import React, { useContext, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import SellerProductCard from "../../components/SellerProductCard";
import styles from "../../styles/AllProducts.module.css";
import ProductDeletePopup from "../../components/ProductDeletePopup";
import EditProductPopUp from "../../components/EditProductPopUp";
import IsAuth from "../../utils/IsAuth";
import Loading from "../../components/Loading";
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [deleteItem, setDeleteItem] = useState();
  const [editItem, setEditItem] = useState();
  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const { data, error, isLoading } = useSWR(
    `products/seller/allproducts`,
    async (url) => {
      try {
        const res = await instance.get(url);
        console.log("fetching");
        setProducts(res.data.data);
        return res.data.data;
      } catch (err) {
        console.log(err);
      }
    }
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={styles.allProduct}>
      {deleteItem && (
        <ProductDeletePopup
          deleteItem={deleteItem}
          setDeleteItem={setDeleteItem}
          setProducts={setProducts}
          products={products}
        />
      )}
      {editItem && (
        <EditProductPopUp product={editItem} setEditItem={setEditItem} />
      )}
      <div className={styles.headingContainer}>
        <h3 className={styles.heading}>Top Products </h3>
      </div>
      <div className={styles.image_grid}>
        {data?.map((s) => {
          return (
            <SellerProductCard
              key={s.id}
              data={s}
              deleteItem={deleteItem}
              setDeleteItem={setDeleteItem}
              setEditItem={setEditItem}
            />
          );
        })}
      </div>
      <div className={styles.headingContainer}>
        <h3 className={styles.heading}>Other Products ({data?.length})</h3>
      </div>
      <div className={styles.image_grid}>
        {data?.map((s) => {
          return (
            <SellerProductCard
              key={s.id}
              data={s}
              deleteItem={deleteItem}
              setDeleteItem={setDeleteItem}
              setEditItem={setEditItem}
            />
          );
        })}
        {data?.map((s) => {
          return (
            <SellerProductCard
              key={s.id}
              data={s}
              deleteItem={deleteItem}
              setDeleteItem={setDeleteItem}
              setEditItem={setEditItem}
            />
          );
        })}
      </div>
    </div>
  );
};

export default IsAuth(AllProducts);
