import style from "../styles/FormComponent.module.css"
import Image from "next/image"
import Googlelogo from "../public/google.png"
import Link from "next/link"
export const SignUpComponent = () => {
  return (

    <div className={style.FormContainer}>
    <div className={style.FormSubContainer}>
    <div>
        <div className={style.inputContainer}>
        <label className={style.formlabel}>Full name*</label>
        <input className={style.forminput}  type="text"  placeholder="Please Enter Your Full Name"/>
        </div>
        <div className={style.inputContainer}>
        <label className={style.formlabel}>Email*</label>
        <input className={style.forminput}  type="text"  placeholder="Please Enter Your Email"/>
        </div>
        <div className={style.inputContainer}>
        <label className={style.formlabel}>Password*</label>
        <input className={style.forminput}  type="text"  placeholder="Please Enter Your Password"/>
        </div>
        <div className={style.inputContainer}>
        <label className={style.formlabel}>Confirm Password*</label>
        <input className={style.forminput}  type="text"  placeholder="Please Confirm Your Password"/>
        </div>
    </div>
    <div >
        <button className={style.formbutton}>
            Sign Up
        </button>
        <p className={style.formparagraph}>By clicking “SIGN UP”, I agree to Rappit's Terms of <a href="#">Privacy Policy</a></p>
        <p className={style.formparagraph}>or sign up with</p>
        <button className={style.googlebutton}>
            <Image src={Googlelogo} width={'20'} height={'20'} />
            Sign in with Google
        </button>
        <div className={style.orlogin}>
        <p>or <Link href="login">Login</Link></p>
        </div>
    </div>
    </div>
    </div>
  )
}
