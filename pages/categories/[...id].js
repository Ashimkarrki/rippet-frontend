import React from "react";
import { useRouter } from "next/router";
import ProductsCard from "../../components/ProductCard";
import styles from "../../styles/CategoriesProduct.module.css";
import { BiChevronsUp, BiChevronsDown } from "react-icons/bi";
import Link from "next/link";
import Pagination from "../../components/Pagination";
const CategoriesProducts = ({ data }) => {
  const { asPath } = useRouter();
  const List = data.data;
  const repeat = (time) => {
    let array = [];
    for (let i = 1; i <= time; i++) {
      array.push(<button className={styles.button}>{i}</button>);
    }
    return array;
  };
  console.log(data);
  return (
    <div className={styles.categoriesProducts_wrapper}>
      <Pagination data={data} from={"category"} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const res = await fetch(
    "https://rappitnepal.cyclic.app/api/v1/products/search/categories/" +
      context.params.id[0] +
      "/" +
      context.params.id[1] +
      "/" +
      context.params.id[2] +
      "/" +
      context.params.id[3]
  );
  const data = await res.json();
  if (!data.totalPages) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data },
  };
}

export default CategoriesProducts;
