import React from 'react'
import { useRouter } from "next/router";
import ProductsCard from "../../components/ProductCard";
import styles from "../../styles/CategoriesProduct.module.css"
const CategoriesProducts = ({data}) => {
    const router = useRouter();
    console.log(data.data)
    const List = data.data;
  return (
    <div className={styles.categoriesProducts}>
    {
    List.length &&
    <>
    { List.map((data)=>{
      const {id, Name, MainImage, Price, discount, newPrice} = data;
      return  <ProductsCard
              key={id}
              id={id}
              title={Name}
              pic={MainImage}
              price={Price}
              discount={discount}
              newPrice={newPrice}
            />
    })
    }
      </>
    }
    </div>
  )
};

export async function getServerSideProps(context) {
    const res = await fetch(
      'https://adorable-leather-jacket-foal.cyclic.app/api/v1/products/search/categories/' +
        context.params.id
    );
    const data = await res.json();
    return {
      props: { data },
    };
  }

export default CategoriesProducts