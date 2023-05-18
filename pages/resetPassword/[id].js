import React, { useState } from 'react'
import { useRouter } from "next/router";
import axios from "axios"
import style from "../../styles/ResetPassword.module.css"
const resetpasswordhandler = ()=>{
    const router = useRouter();
    const URL = "https://adorable-leather-jacket-foal.cyclic.app/";

    const id = router.query.id;
    const [resetdata, setResetdata] = useState({
        Password: "",
        ConfirmPassword:""
    })

    const changeHandeler = (e) =>{
        setResetdata({
            ...resetdata,
            [e.target.name]: e.target.value,
          });
    }

    const submitHandler =(e) =>{
        e.preventDefault();
        const instance = axios.create({
            withCredentials: true,
            headers: { authorization: "Bearer" },
          });
          instance
            .patch(`${URL}api/v1/users/resetpassword/${id}`, resetdata)
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
                console.log(err)
            })   
    }


    return(
        <div className={style.resetContainer}>
                <div className={style.resetsamllContainer}>
                <label className={style.formlabel}>Password*</label>
            <input
              className={style.forminput}
              type="password"
              name="Password"
              placeholder="Please Enter Password"
              required
              onChange={(e) => changeHandeler(e) }
            />
            <label className={style.formlabel}>ConfirmPassword*</label>
            <input
              className={style.forminput}
              type="password"
              name="ConfirmPassword"
              placeholder="Please Confirm Password"
              required
              onChange={(e) => changeHandeler(e) }
            />
                <button className={style.resetButton} onClick={submitHandler} >Submit</button>
                </div>
        </div>
    )

}

export default resetpasswordhandler;
