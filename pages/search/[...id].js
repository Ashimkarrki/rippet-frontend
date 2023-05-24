import React from "react";
import ProductCard from "../../components/ProductCard";
import styles from "../../styles/SearchPage.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
const SearchPage = ({ data }) => {

  const { asPath } = useRouter();
  console.log(data);
  const repeat = (time) => {
    let array = [];
    for (let i = 1; i <= time; i++) {
      array.push(<button className={styles.button}>{i}</button>);
    }
    return array;
  };
  return (
    <div className={styles.search_wrapper}>
      <div className={styles.button_grp}>
        {repeat(data.totalpages).map((s, index) => (
          <Link
            key={index}
            href={`/search/${asPath.split("/")[2]}/${index + 1}`}
          >
            {s}
          </Link>
        ))}
      </div>
      <div className={styles.search}>
        {data?.data?.product?.map((s) => {
          return (
            <ProductCard
              key={s.id}
              id={s.id}
              pic={s.MainImage}
              title={s.Name}
              price={s.Price}
              discount={s.Discount}
            />
          );
        })}
      </div>
      <div className={styles.button_grp}>
        {repeat(data.totalpages).map((s, index) => (
          <Link
            key={index}
            href={`/search/${asPath.split("/")[2]}/${index + 1}`}
          >
            {s}
          </Link>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  console.log(context.params.id);
  const number =    (context.params.id[1] == 1 )?context.params.id[1]: 1
  const res = await fetch(
    "https://adorable-leather-jacket-foal.cyclic.app/api/v1/products/search/" +
      context.params.id[0] +
      "/" + "no/" + "no/" + `${number}`
   
  );
  console.log(res);
  const data = await res.json();
  console.log(data);
  return {
    props: { data },
  };
};
export default SearchPage;
