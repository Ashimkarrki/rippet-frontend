import style from "../styles/FormComponent.module.css";
import Image from "next/image";
import Googlelogo from "../public/google.png";
import Link from "next/link";
import { useState } from "react";
export const SignUpComponent = () => {
  const [userData, setuserData] = useState({
    Username: "",
    Password: "",
    Email: "",
    ConfirmPassword: "",
  });
  const change = (e) => {
    setuserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className={style.FormContainer}>
      <form className={style.FormSubContainer}>
        <div>
          <div className={style.inputContainer}>
            <label className={style.formlabel}>Full name*</label>
            <input
              className={style.forminput}
              type="text"
              name="Username"
              placeholder="Please Enter Your Full Name"
              onChange={change}
              required
            />
          </div>
          <div className={style.inputContainer}>
            <label className={style.formlabel}>Email*</label>
            <input
              className={style.forminput}
              type="text"
              name="Email"
              onChange={change}
              required
              placeholder="Please Enter Your Email"
            />
          </div>
          <div className={style.inputContainer}>
            <label className={style.formlabel}>Password*</label>
            <input
              className={style.forminput}
              type="password"
              name="Password"
              onChange={change}
              required
              placeholder="Please Enter Your Password"
            />
          </div>
          <div className={style.inputContainer}>
            <label className={style.formlabel}>Confirm Password*</label>
            <input
              className={style.forminput}
              type="password"
              name="ConfirmPassword"
              onChange={change}
              required
              placeholder="Please Confirm Your Password"
            />
          </div>
        </div>
        <div>
          <button className={style.formbutton} type="submit">
            Sign Up
          </button>
          <p className={style.formparagraph}>
            By clicking “SIGN UP”, I agree to Rappits Terms of{" "}
            <a href="#">Privacy Policy</a>
          </p>
          <p className={style.formparagraph}>or sign up with</p>
          <button className={style.googlebutton}>
            <Image src={Googlelogo} width={"20"} height={"20"} alt="google" />
            Sign in with Google
          </button>
          <div className={style.orlogin}>
            <p>
              or <Link href="login">Login</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
