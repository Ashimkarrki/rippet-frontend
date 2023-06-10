import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import style from "../../styles/ResetPassword.module.css";
const Id = () => {
  const router = useRouter();

  console.log(router.query.id, "hello query")

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
    const id = router?.query?.id[0]
    const role = router?.query?.id[1];
    e.preventDefault();
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    instance
      .patch(`users/resetpassword/${id}/${role}`, resetdata)
      .then((data) => {
        console.log(data);
        router.replace('/')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={style.resetContainer}>
      <div className={style.resetsamllContainer}>
        <label className={style.formlabel}>Password*</label>
        <input
          className={style.forminput}
          type="password"
          name="Password"
          placeholder="Please Enter Password"
          required
          onChange={(e) => changeHandeler(e)}
        />
        <label className={style.formlabel}>ConfirmPassword*</label>
        <input
          className={style.forminput}
          type="password"
          name="ConfirmPassword"
          placeholder="Please Confirm Password"
          required
          onChange={(e) => changeHandeler(e)}
        />
        <button className={style.resetButton} onClick={submitHandler}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Id;
