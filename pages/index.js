import Banner from "../components/Banner";
import styles from "../styles/Home.module.css";
import CarouselComponent from "../components/CarouselComponent";
import Services from "../components/Services";
import Category from "../components/Category";
import SellerHomecomponenet from "../components/SellerHomeComponenet";
import IsAuth from "../utils/IsAuth";
import fetching from "../utils/fetchinstance";
function Home({
  allProducts,
  latestProducts,
  popularProducts,
  banner,
  ratedProducts,
}) {
  return (
    <>
      <div className={styles.home}>
        <Banner banner={banner.message[0]} />
        <CarouselComponent
          list={latestProducts?.data}
          title={"Latest Products"}
          more={"latest/1"}
        />
        <CarouselComponent
          list={popularProducts?.data}
          title={"Popular Products"}
          more={"popular/1"}
        />

        <Services />
        <CarouselComponent
          list={ratedProducts?.data}
          title={"Top Rated Products"}
          more={"rated/1"}
        />
      </div>
      <SellerHomecomponenet />
    </>
  );
}
export default IsAuth(Home);
export async function getServerSideProps(context) {
  const res1 = await fetching("products");
  const allProducts = await res1.json();
  const res2 = await fetching("products/latestProduct/product");
  const latestProducts = await res2.json();
  const res3 = await fetching("products/popular/product");
  const popularProducts = await res3.json();
  const res4 = await fetching("products/rated/product");
  const ratedProducts = await res4.json();
  const res5 = await fetching("banner");
  const banner = await res5.json();
  return {
    props: {
      allProducts,
      latestProducts,
      popularProducts,
      banner,
      ratedProducts,
    },
  };
}
