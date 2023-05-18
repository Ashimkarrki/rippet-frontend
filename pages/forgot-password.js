import React from 'react'
import style from "../styles/ForgotPassword.module.css";
import { useState } from 'react';
import axios from "axios";
const  forgot_password =()=>{
    const URL = "https://adorable-leather-jacket-foal.cyclic.app/";
        const [Email, setEmail] = useState({"Email": ""});
        const [Emailsent, setEmailsent] = useState(false)
        const changeHandeler = (e) =>{
            console.log(e.target.value)
                setEmail({Email:e.target.value})
        }
        const submitHandler = async(e)=>{
            e.preventDefault();
                try{
                    const instance = axios.create({
                        withCredentials: true,
                        headers: { authorization: "Bearer" },
                      });
                      instance
                      .post(`${URL}api/v1/users/forgotpassword`, Email)
                      .then((data) => {
                        console.log(data);
                        setEmailsent(true)
                      })
                      .catch((err) => {
                      })

                }catch(err){
                    console.log(err)
                }
        }


  return (
    <div className={style.forgotContainer} >
    {
    (!Emailsent) ? 
        <div className={style.forgotsubcontainer}>
            <h1>Forgot Password?</h1>
            <label className={style.formlabel}>Email*</label>
            <input
              className={style.forminput}
              type="text"
              name="Email"
              placeholder="Please Enter Your Email"
              required
              onChange={(e) => changeHandeler(e) }
            />
            <button onClick={submitHandler} className={style.forgotButton}>Submit</button>
        </div> :
        <div className={style.forgotsubcontainer}>
                <h1 className={style.emailsentconfirm}>Email sent. Check your inbox.</h1>
        </div>
    }
    </div>
  )
}

export default forgot_password