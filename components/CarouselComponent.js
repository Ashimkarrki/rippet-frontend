import React from "react";
import "react-multi-carousel/lib/styles.css";
import PrevButton from "./PrevButton";
import ProductsCard from "./ProductCard";
import styles from "../styles/CarouselComponent.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import NextButton from "./NextButton";
const CarouselComponent = ({ list, title }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    rows: 2,
    responsive: [
      {
        breakpoint: 3000,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1090,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 812,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 542,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
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
        <h3>{title}</h3>
      </div>
      <Slider {...settings}>
        {list.map(({ id, title, pic, price, discount, newPrice }) => {
          return (
            <ProductsCard
              key={id}
              id={id}
              title={title}
              pic={pic}
              price={price}
              discount={discount}
              newPrice={newPrice}
            />
          );
        })}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
