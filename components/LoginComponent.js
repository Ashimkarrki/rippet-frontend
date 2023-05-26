import style from "../styles/FormComponent.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { DotSpinner } from "@uiball/loaders";
import { toast } from "react-toastify";

const LoginComponent = ({ role }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const URL = "https://adorable-leather-jacket-foal.cyclic.app/";

  const [userData, setuserData] = useState({
    Email: "",
    Password: "",
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
      console.log("submit");
      setIsLoading(true);
      const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });
      const sendingData = {
        ...userData,
        Role: role,
      };
      instance
        .post(`${URL}api/v1/users/login`, sendingData)
        .then((data) => {
          console.log(data);
          if (role == "user") {
            router.push("/");
          } else if (role === "seller") {
            router.push("/sellerDashboard");
          }
        })
        .catch((err) => {
          console.log(err);
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
          });
          setIsLoading(false);
        });
    }
  };
  return (
    <div className={style.FormContainer}>
      <form className={style.FormSubContainer} onSubmit={submitHandler}>
        <div>
          <div className={style.inputContainer}>
            <label className={style.formlabel}>Email*</label>
            <input
              className={style.forminput}
              type="text"
              name="Email"
              placeholder="Please Enter Your Email"
              onChange={change}
              required
            />
          </div>
          <div className={style.inputContainer}>
            <label className={style.formlabel}>Password*</label>
            <input
              className={style.forminput}
              type="password"
              name="Password"
              placeholder="Please Enter Your Password"
              onChange={change}
            />
          </div>
          <Link href={"/forgot-password"}>
            <h1>forgot password?</h1>
          </Link>
        </div>
        <div>
          {isLoading ? (
            <button className={style.formbutton}>
              <DotSpinner color="#231F20" size={25} />
            </button>
          ) : (
            <input className={style.formbutton} value="Login" type="submit" />
          )}

          <div className={style.orlogin}>
            <p>
              or{" "}
              <Link href={role == "user" ? "/signup" : "/seller/signup"}>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
