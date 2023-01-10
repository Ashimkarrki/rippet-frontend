import Head from "next/head";
import Image from "next/image";
import cat from "../public/cat.jpg";
import axios from "axios";
import LatestProductsHome from "../components/LatestProductsHome";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import CarouselComponent from "../components/CarouselComponent";
import Services from "../components/Services";
import Footer from "../components/Footer";
export default function Home({ data }) {
  const lists = data.data.products;
  console.log(lists);
  const list1 = lists.filter((s, i) => {
    return i < data.results / 2;
  });
  console.log(list1);
  const list2 = lists.filter((s, i) => {
    return i >= data.results / 2;
  });

  axios.defaults.withCredentials = true;
  console.log(data);
  return (
    <div className={styles.home}>
      <Navbar />
      <CarouselComponent list={list1} title={"Latest Products"} />
      <CarouselComponent list={list2} title={"Popular Products"} />
      <Services />
      <Footer />
    </div>
  );
}
export async function getServerSideProps() {
  const res = await fetch(
    "https://adorable-leather-jacket-foal.cyclic.app/api/v1/products"
  );
  const data = await res.json();
  return {
    props: { data },
  };
}
