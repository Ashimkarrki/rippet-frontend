import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/SellerNavbar.module.css";
const SellerNavbar = () => {
  const router = useRouter();
  console.log(router);
  return (
    <nav className={styles.navbar}>
      <ul className={styles.ul}>
        <li>Products</li>
        <ul className={styles.ul}>
          <li>
            <Link href={"/sellerDashboard/addProduct"}> Add Product</Link>
          </li>
          <li>
            <Link href={"/sellerDashboard/allProducts"}>All Product</Link>
          </li>
        </ul>
        <li>Order</li>
        <li>FAQ</li>
        <li>QNA</li>
        <li>Reports</li>
      </ul>
    </nav>
  );
};

export default SellerNavbar;
