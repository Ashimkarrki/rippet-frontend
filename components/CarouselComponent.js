import React from "react";
// import "react-multi-carousel/lib/styles.css";
import { CgShapeCircle } from "react-icons/cg";
import PrevButton from "./PrevButton";
import ProductsCard from "./ProductCard";
import styles from "../styles/CarouselComponent.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import NextButton from "./NextButton";
const CarouselComponent = ({ list, title }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    rows: 1,
    responsive: [
      {
        breakpoint: 3000,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: false,
          dots: false,
        },
      },
      // {
      //   breakpoint: 1320,
      //   settings: {
      //     slidesToShow: 4,
      //     slidesToScroll: 4,
      //     infinite: true,
      //     dots: false,
      //   },
      // },
      {
        breakpoint: 1090,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 812,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 594,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },
    ],
    prevArrow: <PrevButton />,
    nextArrow: <NextButton />,
  };
  return (
    <div className={styles.carousel_wrapper}>
      <div className={styles.header}>
        <CgShapeCircle className={styles.yellow} />
        <h3 className={styles.title}>{title}</h3>
      </div>
      <Slider className={styles.slider} {...settings}>
        {list.map(({ id, Name, MainImage, Price, Discount }) => {
          return (
            <ProductsCard
              key={id}
              id={id}
              title={Name}
              pic={MainImage}
              price={Price}
              discount={Discount}
            />
          );
        })}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
