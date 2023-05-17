import style from "../styles/FormComponent.module.css";
import Image from "next/image";
import Googlelogo from "../public/google.png";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { DotSpinner } from "@uiball/loaders";

export const SignUpComponent = () => {
  const router = useRouter();
  const URL = "http://localhost:4000/";
  const [isLoading, setIsLoading] = useState(false);

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
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isLoading) {
      setIsLoading(true);
      const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });
      instance
        .post(`${URL}api/v1/users/signup`, userData)
        .then((data) => {
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };
  return (
    <div className={style.FormContainer}>
      <form className={style.FormSubContainer} onSubmit={submitHandler}>
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
              type="email"
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
          {isLoading ? (
            <button className={style.formbutton}>
              <DotSpinner color="#231F20" size={25} />
            </button>
          ) : (
            <button className={style.formbutton} type="submit">
              Sign Up
            </button>
          )}
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
