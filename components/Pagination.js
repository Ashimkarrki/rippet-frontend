import React, { useState } from "react";
import { useRouter } from "next/router";
import ProductCard from "./ProductCard";
import Link from "next/link";
import styles from "../styles/Pagination.module.css";
const Pagination = ({ data, from }) => {
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
    if (from === "search") {
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
    }
    if (from === "category") {
      if (value === "p_Dsc") {
        router.replace(`/categories/${data.categoryName}/no/dsc/1`);
      } else if (value === "p_Asc") {
        router.replace(`/categories/${data.categoryName}/no/asc/1`);
      } else if (value === "r_Dsc") {
        router.replace(`/categories/${data.categoryName}/dsc/no/1`);
      } else if (value === "r_Asc") {
        router.replace(`/categories/${data.categoryName}/asc/no/1`);
      } else if (value === "") {
        router.replace(`/categories/${data.categoryName}/no/no/1`);
      }
    }
  };
  return (
    <div className={styles.search_wrapper}>
      <div className={styles.wrap}>
        <h2 className={styles.center}>
          {from !== "search" && from !== "category" && from}
        </h2>
      </div>
      {from === "search" ||
        (from === "category" && (
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
            </select>
          </div>
        ))}
      <div className={styles.button_grp}>
        {repeat(data.totalpages || data.totalPages).map((s, index) => {
          if (from === "Latest") {
            return (
              <Link key={index} href={"/latest/" + Number(index + 1)}>
                {s}
              </Link>
            );
          }
          if (from === "Popular") {
            return (
              <Link key={index} href={"/popular/" + Number(index + 1)}>
                {s}
              </Link>
            );
          }
          if (from === "search") {
            return (
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
            );
          }
          if (from === "category") {
            return (
              <Link
                key={index}
                href={
                  "/categories/" +
                  data.categoryName +
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
            );
          }
        })}
      </div>
      <div className={styles.search}>
        {from === "search"
          ? data?.data?.product?.map((s) => {
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
            })
          : data?.data?.map((s) => {
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
            })}
      </div>
      <div className={styles.button_grp}>
        {repeat(data.totalpages || data.totalPages).map((s, index) => {
          if (from === "Latest") {
            return (
              <Link key={index} href={"/latest/" + Number(index + 1)}>
                {s}
              </Link>
            );
          }
          if (from === "Popular") {
            return (
              <Link key={index} href={"/popular/" + Number(index + 1)}>
                {s}
              </Link>
            );
          }
          if (from === "search") {
            return (
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
            );
          }
          if (from === "category") {
            return (
              <Link
                key={index}
                href={
                  "/categories/" +
                  data.categoryName +
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
            );
          }
        })}
      </div>
    </div>
  );
};

export default Pagination;
