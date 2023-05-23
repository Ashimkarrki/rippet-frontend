import React from "react";
import { useRouter } from "next/router";
import ProductsCard from "../../components/ProductCard";
import styles from "../../styles/CategoriesProduct.module.css";
import { BiChevronsUp, BiChevronsDown } from "react-icons/bi";
import Link from "next/link";
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
  return (
    <div className={styles.categoriesProducts_wrapper}>
      <div className={styles.category_info}>
        <div>
          <h4 className={styles.heading}>Category : {asPath.split("/")[2]}</h4>
          <h5 className={styles.heading}>{List.length} items</h5>
        </div>
        <div className={styles.sort}>
          <select>
            <option>Sort By</option>
            <option>By Price (High &gt; Low)</option>
            <option>By Price (Low &gt; High)</option>
            <option>By Rating (High &gt; Low) </option>
            <option>By Rating (Low &lt; High) </option>
          </select>{" "}
        </div>
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
  const res = await fetch(
    "https://adorable-leather-jacket-foal.cyclic.app/api/v1/products/search/categories/" +
      context.params.id[0] +
      "/" +
      context.params.id[1]
  );
  const data = await res.json();
  if (!data.data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data },
  };
}

export default CategoriesProducts;
