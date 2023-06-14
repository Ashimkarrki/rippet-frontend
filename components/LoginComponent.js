import style from "../styles/FormComponent.module.css";
import Link from "next/link";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { DotSpinner } from "@uiball/loaders";
import { userContext } from "../context/userContext";
import toast from "react-hot-toast";

const LoginComponent = ({ role }) => {
  const { dataFetched } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
        .post(`/users/login`, sendingData)
        .then((data) => {
          console.log(data);
          console.log(data.Role);

          if (data.data.Role === "user") {
            dataFetched(false);
            router.replace("/");
          } else if (data.data.Role === "seller") {
            dataFetched(false);
            router.replace("/sellerDashboard");
          } else if (data.data.Role === "admin") {
            dataFetched(false);
            router.replace("/adminDashboard");
          }
        })
        .catch((err) => {
          console.log(err);
          console.log(err?.response?.data?.message);

          setIsLoading(false);
        });
      const myPromise = instance.post(`/users/login`, sendingData);
      toast.promise(
        myPromise,
        {
          loading: "Loading",
          success: (data) => "Welcome Back " + data.data.Login.Username,
          error: (err) =>
            err?.response?.data?.message || "Internal Error Occured",
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
      <form className={style.FormSubContainer} onSubmit={submitHandler}>
        <div>
          <div className={style.inputContainer}>
            <h5 className={style.formlabel}>Email</h5>
            <input
              className={style.forminput}
              type="email"
              name="Email"
              onChange={change}
              required
            />
          </div>
          <div className={style.inputContainer}>
            <h5 className={style.formlabel}>Password</h5>
            <input
              className={style.forminput}
              type="password"
              name="Password"
              required
              onChange={change}
            />
          </div>
          <Link href={"/forgot-password"}>
            <h5 className={`${style.formlabel} ${style.forgot}`}>
              Forgot Password?{" "}
            </h5>
          </Link>
        </div>
        <div>
          {isLoading ? (
            <button className={style.formbutton}>
              <DotSpinner color="white" size={20} />
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
