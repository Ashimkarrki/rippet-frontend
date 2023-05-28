import useSWR from "swr";
import axios from "axios";
import { useContext } from "react";
import { userContext } from "../context/userContext";

const useFetchSeller = () => {
  const { addSeller, sellerInfo } = useContext(userContext);
  const { data, isLoading, error } = useSWR("users/isme", async (url) => {
    if (!sellerInfo.id) {
      try {
        const instance = axios.create({
          withCredentials: true,
          headers: { authorization: "Bearer" },
        });
        const res = await instance.get(url);
        addSeller(res.data.user);
      } catch (err) {
        console.log(err);
      }
    }
  });
};
export default useFetchSeller;
