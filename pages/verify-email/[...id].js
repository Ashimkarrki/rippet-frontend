import { useRouter } from "next/router";
import { useEffect } from "react";
import style from "../../styles/LoadingContainer.module.css";
import axios from "axios";
import ClockLoader from "react-spinners/ClockLoader";
const Id = () => {
  const router = useRouter();

  console.log(router.query.id, "hello ")
  const VerifiedEmail = async (id, role) => {
    const instance = axios.create({
      withCredentials: true,
      headers: { authorization: "Bearer" },
    });
    instance
      .post(`users/verify-email/${id}/${role}`)
      .then((data) => {
        console.log(data);
        router.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if(router?.query?.id){
      const id = router?.query?.id[0];
      const role = router?.query?.id[1];
        VerifiedEmail(id, role);
        console.log(id);
    }
    
  }, [router.query.id]);

  return (
    <div className={style.loadingcomponent}>
      <ClockLoader color="#36d7b7" />
    </div>
  );
};

export default Id;
