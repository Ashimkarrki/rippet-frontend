import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import style from "../../styles/FormComponent.module.css";
import toast from "react-hot-toast";

const Id = () => {
  const router = useRouter();
  const [resetdata, setResetdata] = useState({
    Password: "",
    ConfirmPassword: "",
  });

  const changeHandeler = (e) => {
    setResetdata({
      ...resetdata,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const id = router?.query?.id[0];
    const role = router?.query?.id[1];
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });

    instance
      .patch(`users/resetpassword/${id}/${role}`, resetdata)
      .then((data) => {
        console.log(data);
        router.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
    const myPromise = instance.patch(
      `users/resetpassword/${id}/${role}`,
      resetdata
    );
    toast.promise(
      myPromise,
      {
        loading: "Loading",
        success: (data) => "Password Change Successfully",
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
  };

  return (
    <div className={style.FormContainer}>
      <form className={style.FormSubContainer}>
        <div className={style.inputContainer}>
          <label className={style.formlabel}>Password</label>
          <input
            className={style.forminput}
            type="password"
            name="Password"
            required
            onChange={(e) => changeHandeler(e)}
          />
        </div>
        <div className={style.inputContainer}>
          <label className={style.formlabel}>Confirm Password</label>
          <input
            className={style.forminput}
            type="password"
            name="ConfirmPassword"
            required
            onChange={(e) => changeHandeler(e)}
          />
        </div>
        <button className={style.formbutton} onClick={submitHandler}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Id;
