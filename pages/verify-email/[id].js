import { useRouter } from "next/router";
import { useEffect } from "react";
import style from "../../styles/LoadingContainer.module.css";
import axios from "axios";
import ClockLoader from "react-spinners/ClockLoader";
const Id = () => {
  const URL = "http://localhost:4000/";
  const router = useRouter();
  const id = router.query.id;
  const VerifiedEmail = async (id) => {
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    instance
      .post(`users/verify-email/${id}`)
      .then((data) => {
        console.log(data);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    VerifiedEmail(id);
    console.log(id);
  }, [id]);

  return (
    <div className={style.loadingcomponent}>
      <ClockLoader color="#36d7b7" />
    </div>
  );
};

export default Id;
