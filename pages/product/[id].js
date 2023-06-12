import React, { useState, useMemo } from "react";
import styles from "../../styles/Product.module.css";
import QuestionAnswer from "../../components/QuestionAnswer";
import PopUpMessgenger from "../../components/PopUpMessgenger";
import { AiOutlineHeart } from "react-icons/ai";
import Review from "../../components/Review";
import { useContext } from "react";
import { userContext } from "../../context/userContext";
import { DotSpinner } from "@uiball/loaders";
import axios from "axios";
import IsAuth from "../../utils/IsAuth";
import { Router, useRouter } from "next/router";
import Image from "next/image";
import { toast } from "react-hot-toast";
const Product = ({ data }) => {
  console.log("[id]", data);
  const router = useRouter();
  const [isCartLoading, setIsCartLoading] = useState(false);
  const instance = axios.create({
    withCredentials: true,
    headers: { authorization: "Bearer" },
  });
  const [isPopUpMessenger, setIsPopUpMessenger] = useState(false);
  const [noOfItem, setNoOfItem] = useState(1);
  const [which, setWhich] = useState(1);
  const [headPic, setHeadPic] = useState(0);
  const [reviewsInfo, setReviewsInfo] = useState({});
  const { addToCart, cartInfo, userInfo } = useContext(userContext);
  const [dataInfo, setDataInfo] = useState(data.data.product);
  console.log(dataInfo);
  const [cartId, setCartId] = useState();
  const ispresent = useMemo(() => {
    let x = false;
    cartInfo.items.map((s) => {
      if (s.id === dataInfo.id) {
        x = true;
        setCartId(s.cartId);
      }
    });
    return x;
  }, [cartInfo, dataInfo.id]);
  return (
    <div>
      <div className={styles.productContainer}>
        {isPopUpMessenger && (
          <PopUpMessgenger
            sellerId={dataInfo.sellerId}
            productId={dataInfo.id}
            setIsPopUpMessenger={setIsPopUpMessenger}
          />
        )}
        <div className={styles.product}>
          <button
            className={styles.message}
            onClick={() => {
              setIsPopUpMessenger(!isPopUpMessenger);
            }}
          >
            Message Seller
          </button>
          <div className={styles.image_section}>
            <div className={styles.header_image_wrapper}>
              <Image
                fill
                priority={true}
                src={dataInfo.Images[headPic]}
                className={styles.header_image}
                alt={data.title}
              />
            </div>
            <div className={styles.choose_image_wrapper}>
              {dataInfo.Images[0] && (
                <div className={styles.sub_image_wrapper}>
                  <Image
                    fill
                    onClick={() => {
                      setHeadPic(0);
                    }}
                    className={`${styles.sub_image} ${
                      headPic === 0 ? styles.outline : ""
                    }`}
                    src={dataInfo?.Images[0]}
                    alt={dataInfo.name}
                  />
                </div>
              )}
              {dataInfo.Images[1] && (
                <div className={styles.sub_image_wrapper}>
                  <Image
                    fill
                    onClick={() => {
                      setHeadPic(1);
                    }}
                    className={`${styles.sub_image} ${
                      headPic === 1 ? styles.outline : ""
                    }`}
                    src={dataInfo?.Images[1]}
                    alt={dataInfo.name}
                  />
                </div>
              )}
              {dataInfo.Images[2] && (
                <div className={styles.sub_image_wrapper}>
                  <Image
                    fill
                    onClick={() => {
                      setHeadPic(2);
                    }}
                    className={`${styles.sub_image} ${
                      headPic === 2 ? styles.outline : ""
                    }`}
                    src={dataInfo?.Images[2]}
                    alt={dataInfo.name}
                  />
                </div>
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
            {!ispresent ? (
              <div className={styles.button_group}>
                <div className={styles.button_add}>
                  <button
                    className={`${styles.buttons} ${styles.button_minus}`}
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
                    className={`${styles.buttons} ${styles.button_plus}`}
                    onClick={() => setNoOfItem((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
                {isCartLoading ? (
                  <button
                    className={`${styles.buttons} ${styles.add_to_cart} ${styles.loading_spinner}`}
                  >
                    <DotSpinner color="white" size={18} />
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      if (!userInfo.id) {
                        toast.error("Not Logged In", {
                          position: "bottom-left",
                        });
                        return;
                      }
                      setIsCartLoading(true);
                      try {
                        const res = await instance.post("/carts", {
                          productId: dataInfo.id,
                          quantity: noOfItem,
                        });
                        addToCart(res.data.data);
                        setIsCartLoading(false);
                      } catch (error) {
                        console.log(error.message);
                      }
                    }}
                    className={`${styles.buttons} ${styles.add_to_cart}`}
                  >
                    <h4> ADD TO CART</h4>
                  </button>
                )}

                {/* <button className={styles.buttons}>
                  <AiOutlineHeart className={styles.heart} />
                </button> */}
              </div>
            ) : isCartLoading ? (
              <div className={styles.added_to_cart_container}>
                <button
                  className={`${styles.add_to_cart} ${styles.added_to_cart} ${styles.loading_spinner}`}
                >
                  <DotSpinner color="white" size={18} />
                </button>
              </div>
            ) : (
              <div className={styles.added_to_cart_container}>
                <button
                  className={`${styles.add_to_cart} ${styles.added_to_cart}`}
                  onClick={async () => {
                    setIsCartLoading(true);
                    try {
                      const res = await instance.delete(
                        "carts/delete/" + cartId
                      );
                      setCartId();
                      addToCart(res.data.data);
                      setIsCartLoading(false);
                      setNoOfItem(1);
                    } catch (error) {
                      console.log(error.message);
                    }
                  }}
                >
                  <h4> ADDED TO CART</h4>
                </button>
              </div>
            )}

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
              <div className={styles.hidden_content}>
                {dataInfo.Description}
              </div>
            )}

            {which == 2 && (
              <div className={styles.hidden_content}>
                meta info Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Delectus cum sit nam veritatis aliquid impedit ab fugiat
                accusamus repudiandae temporibus laborum, aliquam soluta
                mollitia, alias blanditiis harum molestias laboriosam. Eaque.
              </div>
            )}
          </div>
        </div>
        <Review
          reviews={dataInfo?.reviews}
          averagerating={dataInfo?.AverageRating}
          noofrating={dataInfo?.NumberRating}
          id={dataInfo.id}
          sellerId={dataInfo.sellerId}
          dataInfo={dataInfo}
          setDataInfo={setDataInfo}
          reviewsInfo={reviewsInfo}
          setReviewsInfo={setReviewsInfo}
        />

        <QuestionAnswer
          qa={dataInfo.asks}
          id={dataInfo.id}
          sellerId={dataInfo.sellerId}
          dataInfo={dataInfo}
          setDataInfo={setDataInfo}
        />
      </div>
    </div>
  );
};
export async function getServerSideProps(context) {
  const res = await fetch(
    "https://rappitnepal.cyclic.app/api/v1/products/" + context.params.id
  );
  const data = await res.json();
  return {
    props: { data },
  };
}
export default IsAuth(Product);
