import React, { useEffect, useState } from "react";
import styles from "../styles/Banner.module.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import PrevButton from "./PrevButton";
import NextButton from "./NextButton";
import Image from "next/image";

const Banner = ({ banner }) => {
  console.log(banner);
  const settings = {
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    rows: 1,
  };
  return (
    <div className={styles.banner}>
      <div className={styles.mainImage}>
        <Slider {...settings} className={styles.slider}>
          {banner.MainImages.map((data) => {
            return (
              <div className={styles.main_image_container} key={data._id}>
                <Image
                  fill
                  className={styles.image}
                  alt="banner"
                  src={data.Imagesource}
                />
              </div>
            );
          })}
        </Slider>
      </div>
      <div className={styles.subImagecontainer}>
        <div className={styles.sub_image_container}>
          <Image
            fill
            className={styles.subimage}
            alt="banner"
            src={banner?.RightTopImage?.Imagesource}
          />
        </div>
        <div className={styles.sub_image_container}>
          <Image
            fill
            className={styles.subimage}
            alt="banner"
            src={banner?.RightMiddleImage?.Imagesource}
          />
        </div>
        <div className={styles.sub_image_container}>
          <Image
            fill
            className={styles.subimage}
            alt="banner"
            src={banner?.RightBottomImage?.Imagesource}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
