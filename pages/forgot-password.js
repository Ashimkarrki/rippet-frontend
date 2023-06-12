import React from "react";
import style from "../styles/FormComponent.module.css";
import { useState } from "react";
import axios from "axios";
import IsAuth from "../utils/IsAuth";
const Forgot_password = () => {
  const [Email, setEmail] = useState({ Email: "" });
  const [Emailsent, setEmailsent] = useState(false);
  const changeHandeler = (e) => {
    setEmail({ Email: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });
      instance
        .post(`users/forgotpassword/user`, Email)
        .then((data) => {
          console.log(data);
          setEmailsent(true);
        })
        .catch((err) => {});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={style.FormContainer}>
      {!Emailsent ? (
        <div className={style.FormSubContainer}>
          <h1 className={style.heading}>Forgot Password ?</h1>
          <div className={style.inputContainer}>
            <label className={style.formlabel}>Email</label>
            <input
              className={style.forminput}
              type="text"
              name="Email"
              placeholder="Please Enter Your Email"
              required
              onChange={(e) => changeHandeler(e)}
            />
          </div>
          <button onClick={submitHandler} className={style.formbutton}>
            Submit
          </button>
        </div>
      ) : (
        <div className={style.FormSubContainer}>
          <h1 className={style.heading}>Email Sent Check Your Inbox.</h1>
        </div>
      )}
    </div>
  );
};

export default IsAuth(Forgot_password);
