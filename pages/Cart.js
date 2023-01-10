import React, { useState } from "react";
import Image from "next/image";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import cat from "../public/cat.jpg";
import styles from "../styles/Cart.module.css";
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
      pic: cat,
      title: "Atomic",
      price: 550,
      discount: 70,
      newPrice: 480,
      inCart: 2,
    },
    {
      id: 2,
      pic: cat,
      title: "Power Of Habit",
      price: 220,
      discount: 10,
      newPrice: 210,
      inCart: 5,
    },
    {
      id: 3,
      pic: cat,
      title: "Laptop",
      price: 100000,
      discount: 1000,
      newPrice: 909000,
      inCart: 2,
    },
  ]);
  const total = () => {
    let array = data.map((s) => {
      return s.inCart * s.newPrice;
    });
    let sum = array.reduce((total, current) => total + current);
    return sum;
  };
  return (
    <div>
      <Navbar />
      <div className={styles.cart}>
        <div className={styles.item_wrapper}>
          <h3 className={styles.item_header}>YOUR CART ({data.length})</h3>
          {data.map(({ id, pic, title, price, discount, newPrice, inCart }) => {
            return (
              <div key={id} className={styles.item}>
                <img className={styles.image} src={pic} alt="products" />
                <div className={styles.item_info}>
                  <h4>{title}</h4>
                  <h5>
                    {discount ? (
                      <>
                        <strike>Rs {price} </strike>
                        Rs {newPrice}
                      </>
                    ) : (
                      ` Rs${price}`
                    )}
                  </h5>
                  <div className={styles.button_group}>
                    <button
                      className={styles.button}
                      onClick={() => {
                        setData((prev) => {
                          let temp = prev.filter((s) => s.id !== id);
                          return temp;
                        });
                      }}
                    >
                      REMOVE
                    </button>
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
                    <button className={styles.button}>{inCart}</button>
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.summary}>
          <h3 className={styles.summary_heading}>YOUR SUMMARY</h3>
          <div className={styles.st_line}></div>
          <div className={styles.account}>
            <table>
              <tbody>
                {data.map((s) => {
                  return (
                    <tr key={s.id + "a"}>
                      {/* className={styles.account_info}> */}
                      <td>
                        {s.title}*{s.inCart}
                      </td>
                      <td>
                        Rs {s.newPrice}*{s.inCart}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td>TOTAL</td>
                  <td>Rs {total()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
