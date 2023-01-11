import React from "react";
import styles from "../styles/Banner.module.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";

const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    rows: 1,
  };
  return (
    <div className={styles.banner}>
      {/* <Slider {...settings}> */}
      <img
        className={styles.image}
        alt="banner"
        src="https://static.vecteezy.com/system/resources/previews/001/637/223/non_2x/big-sale-discount-banner-template-vector.jpg"
      />

      {/* </Slider> */}
    </div>
  );
};

export default Banner;
