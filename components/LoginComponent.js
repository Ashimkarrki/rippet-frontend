import style from "../styles/FormComponent.module.css";
import Image from "next/image";
import Googlelogo from "../public/google.png";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios"
const LoginComponent = () => {
  const router = useRouter()
  const URL = "http://localhost:4000/"

  const [userData, setuserData] = useState({
    Email: "",
    Password: ""
  });

  const change = (e) => {
    setuserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) =>{
    e.preventDefault();
    const instance = await axios.create({
      withCredentials: true,
      headers: {authorization: "Bearer"}
    })
    instance.post(`${URL}api/v1/users/login`,userData ).then((data)=>{
      console.log(data)
      router.push('/');
    }).catch((err)=>{
      console.log(err)
    })
  }

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
        </div>
        <div>
          <button className={style.formbutton}>Login Up</button>
          <p className={style.formparagraph}>or login with</p>
          <button className={style.googlebutton}>
            <Image src={Googlelogo} width={"20"} height={"20"} alt="google" />
            Login in with Google
          </button>
          <div className={style.orlogin}>
            <p>
              or <Link href="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
