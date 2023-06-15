import style from "../styles/FormComponent.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { DotSpinner } from "@uiball/loaders";
import { toast } from "react-hot-toast";
export const SignUpComponent = () => {
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);

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
      const sendingData = { ...userData, Role: "user" };
      const myPromise = instance.post(`users/signup`, sendingData);
      toast.promise(
        myPromise,
        {
          loading: "Loading",
          success: (data) => {
            setEmailSent(true);
            return "Email Sent";
          },
          error: (err) => {
            setIsLoading(false);
            return err?.response?.data?.message || "Internal Error Occurred";
          },
        },
        {
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
        }
      );
    }
  };
  return (
    <div className={style.FormContainer}>
      {!emailSent ? (
        <form className={style.FormSubContainer} onSubmit={submitHandler}>
          <div>
            <div className={style.inputContainer}>
              <label className={style.formlabel}>Full name</label>
              <input
                className={style.forminput}
                type="text"
                name="Username"
                onChange={change}
                required
              />
            </div>
            <div className={style.inputContainer}>
              <label className={style.formlabel}>Email</label>
              <input
                className={style.forminput}
                type="email"
                name="Email"
                onChange={change}
                required
              />
            </div>
            <div className={style.inputContainer}>
              <label className={style.formlabel}>Password</label>
              <input
                className={style.forminput}
                type="password"
                name="Password"
                onChange={change}
                required
              />
            </div>
            <div className={style.inputContainer}>
              <label className={style.formlabel}>Confirm Password</label>
              <input
                className={style.forminput}
                type="password"
                name="ConfirmPassword"
                onChange={change}
                required
              />
            </div>
          </div>
          <div>
            {isLoading ? (
              <button className={style.formbutton}>
                <DotSpinner color="white" size={20} />
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
                or <Link href="login">Login</Link>
              </p>
            </div>
          </div>
        </form>
      ) : (
        <div className={style.FormSubContainer}>
          <h1 className={style.heading}>Email Sent Check Your Inbox.</h1>
        </div>
      )}
    </div>
  );
};
