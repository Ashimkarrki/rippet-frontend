import Head from "next/head";
import Image from "next/image";
import cat from "../public/cat.jpg";

import LatestProductsHome from "../components/LatestProductsHome";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import CarouselComponent from "../components/CarouselComponent";
import Services from "../components/Services";
import Footer from "../components/Footer";
export default function Home() {
  const data = [
    {
      id: 0,
      pic: cat,
      title: "Tedy",
      price: 1000,
      // discountt,
      // newPrice
    },
    {
      id: 1,

      pic: cat,
      title: "Atomic",
      price: 550,
      discount: 70,
      newPrice: 480,
    },
    {
      id: 2,

      pic: cat,
      title: "Tedy",
      price: 1000,
      // discountt,
      // newPrice
    },
    {
      id: 3,

      pic: cat,
      title: "Atomic",
      price: 550,
      discount: 70,
      newPrice: 480,
    },
    {
      id: 4,

      pic: cat,
      title: "Tedy",
      price: 1000,
      // discountt,
      // newPrice
    },
    {
      id: 5,

      pic: cat,
      title: "Atomic",
      price: 550,
      discount: 70,
      newPrice: 480,
    },
    {
      id: 6,

      pic: cat,
      title: "Tedy",
      price: 1000,
      // discountt,
      // newPrice
    },
    {
      id: 7,

      pic: cat,
      title: "Atomic",
      price: 550,
      discount: 70,
      newPrice: 480,
    },
    {
      id: 8,

      pic: cat,
      title: "Tedy",
      price: 1000,
      // discountt,
      // newPrice
    },
    {
      id: 9,

      pic: cat,
      title: "Atomic",
      price: 550,
      discount: 70,
      newPrice: 480,
    }
  ];

  return (
    <div className={styles.home}>
      <Navbar />
      <CarouselComponent list={data} title={"Latest Products"} />
      <CarouselComponent list={data} title={"Popular Products"} />
      <Services />
      <Footer />
    </div>
  );
}
