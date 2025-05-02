import { useRouter } from "next/router";
import { useEffect } from "react";
import style from "../../styles/LoadingContainer.module.css";
import axios from "axios";
import useSWR from "swr";
import IsAuth from "../../utils/IsAuth";
import ClockLoader from "react-spinners/ClockLoader";
const Id = () => {
  const router = useRouter();

  useSWR(
    router?.query?.id?.at(0)
      ? `users/verify-email/${router?.query?.id[0]}/${router?.query?.id[1]}`
      : null,
    async (url) => {
      const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });
      instance
        .post(url)
        .then((data) => {
          router.replace("/");
        })
        .catch((err) => {});
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
