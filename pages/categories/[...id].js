import React from "react";
import { useRouter } from "next/router";
import ProductsCard from "../../components/ProductCard";
import styles from "../../styles/CategoriesProduct.module.css";
import Link from "next/link";
const CategoriesProducts = ({ data }) => {
  const { asPath } = useRouter();
  console.log(asPath.split("/"));
  const List = data.data;
  const repeat = (time) => {
    let array = [];
    for (let i = 1; i <= time; i++) {
      array.push(<button className={styles.button}>{i}</button>);
    }
    return array;
  };
  return (
    <div className={styles.categoriesProducts_wrapper}>
      <div className={styles.categoriesProducts}>
        {List.length && (
          <>
            {List.map((data) => {
              const { id, Name, MainImage, Price, discount, newPrice } = data;
              return (
                <ProductsCard
                  key={id}
                  id={id}
                  title={Name}
                  pic={MainImage}
                  price={Price}
                  discount={discount}
                  newPrice={newPrice}
                />
              );
            })}
          </>
        )}
      </div>

      <div className={styles.button_grp}>
        {repeat(data.totalPages).map((s, index) => (
          <Link
            key={index}
            href={`/categories/${asPath.split("/")[2]}/${index + 1}`}
          >
            {s}
          </Link>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  console.log(context.params);
  const res = await fetch(
    "https://adorable-leather-jacket-foal.cyclic.app/api/v1/products/search/categories/" +
      context.params.id[0] +
      "/" +
      context.params.id[1]
  );
  const data = await res.json();
  return {
    props: { data },
  };
}

export default CategoriesProducts;
