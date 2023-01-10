import React, { useState } from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import cat from "../../public/cat.jpg";
import luffy from "../../public/luffy.jpeg";
import dog from "../../public/dog.jpeg";
import styles from "../../styles/Product.module.css";
import QuestionAnswer from "../../components/QuestionAnswer";
import { AiOutlineHeart } from "react-icons/ai";
import { useRouter } from "next/router";

const Product = ({ data }) => {
  const [noOfItem, setNoOfItem] = useState(0);
  const [which, setWhich] = useState(1);
  const [headPic, setHeadPic] = useState(0);
  const dataInfo = data.data.product;
  console.log(dataInfo);
  return (
    <div>
      <Navbar />
      <div className={styles.product}>
        <div className={styles.image_section}>
          {/* <PictureInPictureMagnifier
            imageSrc={data.pic[headPic]}
            imageAlt="Example"
            largeImageSrc={data.pic[headPic]} // Optional
          /> */}
          <img
            className={styles.header_image}
            src={dataInfo.Images[headPic]}
            alt={data.title}
          />
          <div className={styles.choose_image_wrapper}>
            {dataInfo.Images[0] && (
              <img
                onClick={() => {
                  setHeadPic(0);
                }}
                className={`${styles.sub_image} ${
                  headPic === 0 ? styles.outline : ""
                }`}
                src={dataInfo?.Images[0]}
                alt={dataInfo.name}
              />
            )}
            {dataInfo.Images[1] && (
              <img
                onClick={() => {
                  setHeadPic(1);
                }}
                className={`${styles.sub_image} ${
                  headPic === 1 ? styles.outline : ""
                }`}
                src={dataInfo?.Images[1]}
                alt={dataInfo.name}
              />
            )}
            {dataInfo.Images[2] && (
              <img
                onClick={() => {
                  setHeadPic(2);
                }}
                className={`${styles.sub_image} ${
                  headPic === 2 ? styles.outline : ""
                }`}
                src={dataInfo?.Images[2]}
                alt={dataInfo.name}
              />
            )}
          </div>
        </div>
        <div className={styles.desc_section}>
          <h3 className={styles.header}>{dataInfo?.Name}</h3>
          <div className={styles.st_line}></div>
          <h4>
            {dataInfo.discount ? (
              <>
                <strike>Rs {dataInfo.Price} </strike>
                Rs {dataInfo?.newPrice}
              </>
            ) : (
              ` Rs ${dataInfo?.Price}`
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
            <button className={styles.buttons}>
              <AiOutlineHeart className={styles.heart} />
            </button>
            {/* <button className={styles.buttons}>?</button>  -->no idea */}
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
            META INFORMATION
          </button>
          {which === 1 && (
            <div className={styles.hidden_content}>{dataInfo.Description}</div>
          )}

          {which == 2 && (
            <div className={styles.hidden_content}>
              meta info Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Delectus cum sit nam veritatis aliquid impedit ab fugiat accusamus
              repudiandae temporibus laborum, aliquam soluta mollitia, alias
              blanditiis harum molestias laboriosam. Eaque.
            </div>
          )}
        </div>
      </div>
      <QuestionAnswer qa={dataInfo.asks} />
      <Footer />
    </div>
  );
};
export async function getServerSideProps(context) {
  const res = await fetch(
    "https://adorable-leather-jacket-foal.cyclic.app/api/v1/products/" +
      context.params.id
  );
  const data = await res.json();
  return {
    props: { data },
  };
}
export default Product;
