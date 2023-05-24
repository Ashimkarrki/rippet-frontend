import style from "../../styles/FormComponent.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { DotSpinner } from "@uiball/loaders";
import {  toast } from 'react-toastify';

 const SignUpComponent = () => {
  const router = useRouter();
  const URL = "https://adorable-leather-jacket-foal.cyclic.app/";
  const [isLoading, setIsLoading] = useState(false);

  const [userData, setuserData] = useState({
    Username: "",
    Password: "",
    Email: "",
    ConfirmPassword: "",
    PhoneNumber: 0,
    Shopname:""


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
      const sendingData = {...userData, Role: "seller"}
      instance
        .post(`${URL}api/v1/users/signup`, sendingData)
        .then((data) => {
          router.push("/seller/login");
        })
        .catch((err) => {
          console.log(err?.response?.data?.message);
          let error_string = err?.response?.data?.message;
          toast.error(error_string, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "colored",
            });          setIsLoading(false);
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
            <label className={style.formlabel}>Phone Number*</label>
            <input
              className={style.forminput}
              type="number"
              name="PhoneNumber"
              onChange={change}
              required
              placeholder="Please Enter Your Phone Number"
            />
          </div>
          <div className={style.inputContainer}>
            <label className={style.formlabel}>Shop Name*</label>
            <input
              className={style.forminput}
              type="text"
              name="Shopname"
              onChange={change}
              required
              placeholder="Please Enter Your shop name"
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
          <div className={style.orlogin}>
            <p>
              or <Link href="/seller/login">Login</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpComponent