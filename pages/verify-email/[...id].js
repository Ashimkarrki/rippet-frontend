import { useRouter } from "next/router";
import { useEffect } from "react";
import style from "../../styles/LoadingContainer.module.css";
import axios from "axios";
import useSWR from "swr";
import IsAuth from "../../utils/IsAuth";
import ClockLoader from "react-spinners/ClockLoader";
const Id = () => {
  const router = useRouter();
  // const VerifiedEmail = async (id, role) => {
  //   const instance = axios.create({
  //     withCredentials: true,
  //     headers: { authorization: "Bearer" },
  //   });
  //   instance
  //     .post(`users/verify-email/${id}/${role}`)
  //     .then((data) => {
  //       console.log(data);
  //       router.replace("/");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // useEffect(() => {
  //   if (router?.query?.id) {
  //     const id = router?.query?.id[0];
  //     const role = router?.query?.id[1];
  //     console.log(id, role);
  //     VerifiedEmail(id, role);
  //     console.log(id);
  //   }
  // }, [router.query.id]);

  useSWR(
    router?.query?.id?.at(0)
      ? `users/verify-email/${router?.query?.id[0]}/${router?.query?.id[1]}`
      : null,
    async (url) => {
      const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });
      console.log("req", router.query.id);
      console.log(url);
      instance
        .post(url)
        .then((data) => {
          console.log(data);
          router.replace("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );

  return (
    <div className={style.loadingcomponent}>
      <ClockLoader color="#36d7b7" />
    </div>
  );
};

export default IsAuth(Id);
