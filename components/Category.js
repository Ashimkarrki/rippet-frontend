import React from "react";
import PrevButton from "./PrevButton";
import NextButton from "./NextButton";
import { CgShapeCircle } from "react-icons/cg";

import styles from "../styles/Category.module.css";
import Slider from "react-slick";
const Category = ({ list }) => {
  const settings = {
    dots: false,
    infinite: true,
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
    <div className={styles.category_wrapper}>
      <div className={styles.header}>
        <CgShapeCircle className={styles.yellow} />

        <h3 className={styles.title}>Choose Category</h3>
      </div>
      <div className={styles.category}>
        <Slider {...settings}>
          {console.log(list)}
          {list.map(({ id, pic, name }) => {
            return (
              <div className={styles.category_item} key={id}>
                <img className={styles.image} src={pic} alt={name} />
                <h4 className={styles.align}>{name}</h4>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Category;
