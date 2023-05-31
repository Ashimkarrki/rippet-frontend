import React, { useState } from "react";
import ProductCard from "../../components/ProductCard";
import styles from "../../styles/SearchPage.module.css";
import Link from "next/link";
import IsAuth from "../../utils/IsAuth";
import { useRouter } from "next/router";
const SearchPage = ({ data }) => {
  const [filter, setFilter] = useState("");

  console.log(data);
  const router = useRouter();
  const repeat = (time) => {
    let array = [];
    for (let i = 1; i <= time; i++) {
      array.push(
        <button
          className={`${styles.button} ${
            Number(data.currentPage) === i && styles.active
          } ${i === 1 && styles.button_start} ${
            i === time && styles.button_end
          }`}
        >
          {i}
        </button>
      );
    }
    return array;
  };

  const onSortChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    if (value === "p_Dsc") {
      router.push(`/search/${data.searchTerm}/no/dsc/1`);
    } else if (value === "p_Asc") {
      router.push(`/search/${data.searchTerm}/no/asc/1`);
    } else if (value === "r_Dsc") {
      router.push(`/search/${data.searchTerm}/dsc/no/1`);
    } else if (value === "r_Asc") {
      router.push(`/search/${data.searchTerm}/asc/no/1`);
    } else if (value === "") {
      router.push(`/search/${data.searchTerm}/no/no/1`);
    }
  };
  return (
    <div className={styles.search_wrapper}>
      <div value={filter} className={styles.sort}>
        <select onChange={onSortChange} className={styles.select}>
          <option className={styles.option} value="">
            Sort By
          </option>
          <option className={styles.option} value="p_Dsc">
            By Price (High &gt; Low)
          </option>
          <option className={styles.option} value="p_Asc">
            By Price (Low &gt; High)
          </option>
          <option className={styles.option} value="r_Dsc">
            By Rating (High &gt; Low){" "}
          </option>
          <option className={styles.option} value="r_Asc">
            By Rating (Low &lt; High){" "}
          </option>
        </select>{" "}
      </div>
      <div className={styles.button_grp}>
        {repeat(data.totalpages).map((s, index) => (
          <Link
            key={index}
            href={
              "/search/" +
              data.searchTerm +
              "/" +
              data.reviewSort +
              "/" +
              data.priceSort +
              "/" +
              Number(index + 1)
            }
          >
            {s}
          </Link>
        ))}
      </div>
      <div className={styles.search}>
        {data?.data?.product?.map((s) => {
          return (
            <div className={styles.wrapper} key={s.id}>
              <ProductCard
                id={s.id}
                pic={s.MainImage}
                title={s.Name}
                price={s.Price}
                discount={s.Discount}
              />
            </div>
          );
        })}{" "}
        {data?.data?.product?.map((s) => {
          return (
            <div className={styles.wrapper} key={s.id + "1"}>
              <ProductCard
                id={s.id}
                pic={s.MainImage}
                title={s.Name}
                price={s.Price}
                discount={s.Discount}
              />
            </div>
          );
        })}{" "}
        {data?.data?.product?.map((s) => {
          return (
            <div className={styles.wrapper} key={s.id + "2"}>
              <ProductCard
                id={s.id}
                pic={s.MainImage}
                title={s.Name}
                price={s.Price}
                discount={s.Discount}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.button_grp}>
        {repeat(data.totalpages).map((s, index) => (
          <Link
            key={index}
            href={
              "/search/" +
              data.searchTerm +
              "/" +
              data.reviewSort +
              "/" +
              data.priceSort +
              "/" +
              Number(index + 1)
            }
          >
            {s}
          </Link>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const res = await fetch(
    "https://expensive-cod-handkerchief.cyclic.app/api/v1/products/search/" +
      context.params.id[0] +
      "/" +
      context.params.id[1] +
      "/" +
      context.params.id[2] +
      "/" +
      context.params.id[3]
  );
  const data = await res.json();
  if (!data.totalpages) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data },
  };
};
export default IsAuth(SearchPage);
