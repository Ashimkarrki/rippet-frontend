import React, { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import cat from "../public/cat.jpg";
import luffy from "../public/luffy.jpeg";
import dog from "../public/dog.jpeg";
import styles from "../styles/Product.module.css";
const Product = () => {
  const [noOfItem, setNoOfItem] = useState(0);
  const [which, setWhich] = useState(1);
  const [headPic, setHeadPic] = useState(0);

  const data = {
    id: 1,
    pic: [cat, luffy, dog],
    title: "Atomic",
    price: 550,
    discount: 70,
    newPrice: 480,
  };

  return (
    <div>
      <Navbar />
      <div className={styles.product}>
        <div className={styles.image_section}>
          <Image
            className={styles.header_image}
            src={data.pic[headPic]}
            alt={data.title}
          />
          <div className={styles.choose_image_wrapper}>
            <Image
              onClick={() => {
                setHeadPic(0);
              }}
              className={`${styles.sub_image} ${
                headPic === 0 ? styles.outline : ""
              }`}
              src={data?.pic[0]}
              alt={data.title}
            />
            <Image
              onClick={() => {
                setHeadPic(1);
              }}
              className={`${styles.sub_image} ${
                headPic === 1 ? styles.outline : ""
              }`}
              src={data?.pic[1]}
              alt={data.title}
            />
            <Image
              onClick={() => {
                setHeadPic(2);
              }}
              className={`${styles.sub_image} ${
                headPic === 2 ? styles.outline : ""
              }`}
              src={data?.pic[2]}
              alt={data.title}
            />
          </div>
        </div>
        <div className={styles.desc_section}>
          <h3 className={styles.header}>{data?.title}</h3>
          <div className={styles.st_line}></div>
          <h4>
            {data.discount ? (
              <>
                <strike>Rs {data.price} </strike>
                Rs {data?.newPrice}
              </>
            ) : (
              ` Rs${data?.price}`
            )}
          </h4>
          <div className={styles.button_group}>
            <div className={styles.button_add}>
              <button
                className={styles.buttons}
                onClick={() =>
                  setNoOfItem((prev) => (prev != 0 ? prev - 1 : 0))
                }
              >
                -
              </button>
              <button className={`${styles.buttons} ${styles.no_pointer}`}>
                {noOfItem}
              </button>
              <button
                className={styles.buttons}
                onClick={() => setNoOfItem((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <button className={`${styles.buttons} ${styles.add_to_cart}`}>
              <h4> ADD TO CART</h4>
            </button>
            <button className={styles.buttons}>H</button>
            <button className={styles.buttons}>?</button>
          </div>

          <button
            onClick={() => setWhich(1)}
            className={`${styles.not_so_button} ${
              which == 1 ? styles.toggle_active : ""
            }`}
          >
            DESCRIPTION
          </button>
          <button
            onClick={() => setWhich(2)}
            className={`${styles.not_so_button} ${
              which == 2 ? styles.toggle_active : ""
            }`}
          >
            REVIEWS(0)
          </button>
          <button
            onClick={() => setWhich(3)}
            className={`${styles.not_so_button} ${
              which == 3 ? styles.toggle_active : ""
            }`}
          >
            META INFORMATION
          </button>
          {which === 1 && (
            <div className={styles.hidden_content}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Doloremque enim ipsam, nostrum accusantium facere id et porro
              natus rerum aliquam!
            </div>
          )}
          {which == 2 && (
            <div className={styles.hidden_content}>
              revies of user s are here Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Delectus saepe eligendi, tempore inventore vero
              corrupti est accusamus ullam totam fugiat!
            </div>
          )}
          {which == 3 && (
            <div className={styles.hidden_content}>
              meta info Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Delectus cum sit nam veritatis aliquid impedit ab fugiat accusamus
              repudiandae temporibus laborum, aliquam soluta mollitia, alias
              blanditiis harum molestias laboriosam. Eaque.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
