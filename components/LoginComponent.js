import style from "../styles/FormComponent.module.css";
import Image from "next/image";
import Googlelogo from "../public/google.png";
import Link from "next/link";
const LoginComponent = () => {
  return (
    <div className={style.FormContainer}>
      <div className={style.FormSubContainer}>
        <div>
          <div className={style.inputContainer}>
            <label className={style.formlabel}>Email*</label>
            <input
              className={style.forminput}
              type="text"
              placeholder="Please Enter Your Email"
            />
          </div>
          <div className={style.inputContainer}>
            <label className={style.formlabel}>Password*</label>
            <input
              className={style.forminput}
              type="text"
              placeholder="Please Enter Your Password"
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
      </div>
    </div>
  );
};

export default LoginComponent;
