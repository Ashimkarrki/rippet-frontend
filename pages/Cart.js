import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import esewa from "../public/esewa.webp";
import Image from "next/image";
import styles from "../styles/Cart.module.css";
import { RiDeleteBin6Fill } from "react-icons/ri";
// import MdDelete from "react-icons/md";
/*
const addQuantity = async() =>{
        if(quantityState<5){
            let passingArgument = {
                productId: data.productId._id,
                _id:data._id,
                quantity: quantityState+1 
            }   
            const instance = await axios.create({
                withCredentials: true
            })
              instance.patch(${URL}api/v1/cart,passingArgument).then((data)=>{
                console.log(data?.data?.data?.updateUser?.Cart, "hes")
                const Amount = calculatingAmout(data?.data?.data?.updateUser?.Cart)
                const passingArgument =
                { Cart: data?.data?.data?.updateUser?.Cart,
                  Amount
                }
                dispatch({type: "ADDSUB_CART",
                        payload: passingArgument
                    });
            setQuantityState((prev)=> {
                return(prev + 1)});
              });
        }else{
            setQuantityState(5)
        }
    }
    
    const subQuantity = async() =>{
        if((quantityState>1)){
            let passingArgument = {
                productId: data.productId._id,
                _id:data._id,
                quantity: quantityState-1 
            }
            const instance = await axios.create({
                withCredentials: true
            })
              instance.patch(${URL}api/v1/cart,passingArgument).then((data)=>{
                const Amount = calculatingAmout(data?.data?.data?.updateUser?.Cart)
                const passingArgument =
                { Cart: data?.data?.data?.updateUser?.Cart,
                  Amount
                }
                dispatch({type: "ADDSUB_CART",
                        payload: passingArgument
            })
            setQuantityState((prev)=> {return(prev - 1)});
              });
        }else{
            setQuantityState(1)
        }
    }


    const deleteHandler = async(e) =>{
        console.log(data._id, "hello world")
        let CartId = data._id;
        e.preventDefault();
        const instance = await axios.create({
            withCredentials: true
          })
          instance.post(${URL}api/v1/cart/delete/${CartId}).then((data)=>{
            console.log(data.data.data.Cart)

            const Amount = calculatingAmout(data.data.data.Cart)
            const passingArgument = {
                Cart:data?.data?.data?.Cart,
                Amount: Amount
            }
            dispatch({type:"UPDATE__CART", payload:passingArgument})

          });
    }*/
const Cart = () => {
  const [data, setData] = useState([
    {
      id: 1,
      pic: "https://imgs.search.brave.com/FeG4AY80eOpItgJx6fMGVKEBmdkuuA9P0mEATDDFhBU/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93ZWJz/dG9ja3Jldmlldy5u/ZXQvaW1hZ2VzL2Ns/aXBhcnQtYm9vay1w/ZGYtMTgucG5n",
      title:
        "Windproof/Water Repellent/ Fleece Lined Anti-Skid Touchscreen Winter Gloves For Bike",
      price: 550,
      discount: 70,
      newPrice: 480,
      inCart: 2,
    },
    {
      id: 2,
      pic: "https://imgs.search.brave.com/FeG4AY80eOpItgJx6fMGVKEBmdkuuA9P0mEATDDFhBU/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93ZWJz/dG9ja3Jldmlldy5u/ZXQvaW1hZ2VzL2Ns/aXBhcnQtYm9vay1w/ZGYtMTgucG5n",
      title:
        "Windproof/Water Repellent/ Fleece Lined Anti-Skid Touchscreen Winter Gloves For Bike",
      price: 220,
      discount: 10,
      newPrice: 210,
      inCart: 5,
    },
    {
      id: 3,
      pic: "https://imgs.search.brave.com/FeG4AY80eOpItgJx6fMGVKEBmdkuuA9P0mEATDDFhBU/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93ZWJz/dG9ja3Jldmlldy5u/ZXQvaW1hZ2VzL2Ns/aXBhcnQtYm9vay1w/ZGYtMTgucG5n",
      title:
        "Windproof/Water Repellent/ Fleece Lined Anti-Skid Touchscreen Winter Gloves For Bike",
      price: 1000,
      discount: 100,
      newPrice: 990,
      inCart: 2,
    },
  ]);
  const total = () => {
    let array = data.map((s) => {
      return s.inCart * s.newPrice;
    });
    let sum;
    if (!array) {
      sum = array?.reduce((total, current) => total + current);
    } else {
      sum = 0;
    }
    return sum;
  };
  return (
    <div>
      <div className={styles.cartContainer}>
        <div className={styles.cart}>
          <div className={styles.item_wrapper}>
            <h3 className={styles.cartprimaryheading}>
              YOUR CART ({data.length})
            </h3>
            {data.map(
              ({ id, pic, title, price, discount, newPrice, inCart }) => {
                return (
                  <div key={id} className={styles.item}>
                    <div className={styles.imagetextcart}>
                      <img className={styles.image} src={pic} alt="products" />
                      <div className={styles.deletebuttonandtext}>
                        <h4 className={styles.carttitle}>{title}</h4>
                        <button
                          className={styles.deletebutton}
                          onClick={() => {
                            setData((prev) => {
                              let temp = prev.filter((s) => s.id !== id);
                              return temp;
                            });
                          }}
                        >
                          <RiDeleteBin6Fill className={styles.delete_icon} />
                        </button>
                      </div>
                    </div>
                    <div className={styles.item_info}>
                      <h5 className={styles.realprice}>
                        {discount ? (
                          <>
                            <strike className={styles.discounttext}>
                              Rs. {price}{" "}
                            </strike>
                            Rs. {newPrice}
                          </>
                        ) : (
                          ` Rs. ${price}`
                        )}
                      </h5>
                      <div className={styles.button_group}>
                        <div>
                          <button
                            className={styles.button}
                            onClick={() => {
                              let temp = data.map((s) => {
                                if (s.id === id && s.inCart !== 1) {
                                  return {
                                    ...s,
                                    inCart: s.inCart - 1,
                                  };
                                }
                                return s;
                              });
                              setData(temp);
                            }}
                          >
                            -
                          </button>
                          <button className={styles.button}>{inCart}</button>
                          <button
                            className={styles.button}
                            onClick={() => {
                              let temp = data.map((s) => {
                                if (s.id === id && s.inCart !== 1) {
                                  return {
                                    ...s,
                                    inCart: s.inCart + 1,
                                  };
                                }
                                return s;
                              });
                              setData(temp);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
          <div className={styles.summary}>
            <div className={styles.headingContainer}>
              <h3 className={styles.summary_heading}>YOUR SUMMARY</h3>
            </div>
            <div className={styles.subtotal}>
              <p className={styles.subtotalPrimary}>SUBTOTAL</p>
              <p className={styles.subtotalSecondary}>Rs. {total()}</p>
            </div>
            <div className={styles.shipping}>
              <p className={styles.shippingPrimary}>SHIPPING CHARGE</p>
              <p className={styles.shippingSecondary}>Rs. 0</p>
            </div>
            <div className={styles.tax}>
              <p className={styles.taxPrimary}>TAX</p>
              <p className={styles.taxSecondary}>Rs. 0</p>
            </div>
            <div className={styles.total}>
              <p className={styles.totalPrimary}>TOTAL</p>
              <p className={styles.totalSecondary}>Rs. {total()}</p>
            </div>
            <div className={styles.submitProducts}>
              <button className={styles.checkoutbutton}>CHECKOUT</button>
              <p>OR</p>
              <button className={styles.checkoutesewa}>
                Checkout with <Image src={esewa} width={"30"} height={"30"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
