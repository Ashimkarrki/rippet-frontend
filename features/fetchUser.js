import axios from "axios";
import useSWR from "swr";
import { useContext } from "react";
import { userContext } from "../context/userContext";
const useFetchUser = () => {
  const { addDetails, userInfo, cartInfo } = useContext(userContext);

  const { isLoading, data, isError, error } = useSWR(
    "https://adorable-leather-jacket-foal.cyclic.app/api/v1/users/isme",
    async (url) => {
      if (userInfo.id) {
        return { ...userInfo, ...cartInfo };
      } else {
        const instance = axios.create({
          withCredentials: true,
          headers: { authorization: "Bearer" },
        });
        const res = await instance.get(url);
        // console.log(res.data.user);
        addDetails(res.data.user);
        return res;
      }
    }
  );
  return {
    isLoading,
    data,
    isError,
    error,
  };
};
export default useFetchUser;
