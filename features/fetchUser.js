import axios from "axios";
import useSWR from "swr";
import { useContext } from "react";
import { userContext } from "../context/userContext";
const useFetchUser = () => {
  const { addDetails, loadSession } = useContext(userContext);

  const { isLoading, data, isError, error } = useSWR(
    "https://adorable-leather-jacket-foal.cyclic.app/api/v1/users/isme",
    async (url) => {
      // let cartInfo = JSON.parse(sessionStorage.getItem("cartInfo"));
      // let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      // if (cartInfo) {
      //   console.log(cartInfo);
      //   loadSession({ cartInfo, userInfo });
      //   return { cartInfo, userInfo };
      // } else {
      const instance = axios.create({
        withCredentials: true,
        headers: { authorization: "Bearer" },
      });
      const res = await instance.get(url);
      addDetails(res.data.user);
      // let mainData = res.data.user;
      // let items = mainData.Cart.map(({ productId, quantity, _id }) => {
      //   return {
      //     Name: productId?.Name,
      //     Price: productId?.Price,
      //     id: productId?.id,
      //     quantity: quantity,
      //     MainImage: productId?.MainImage,
      //     cartId: _id,
      //   };
      // });
      // let user = {
      //   email: mainData.Email,
      //   isVerified: mainData.IsVerified,
      //   role: mainData.Role,
      //   userName: mainData.Username,
      //   id: mainData.id,
      // };
      // sessionStorage.setItem(
      //   "userInfo",
      //   JSON.stringify({
      //     user,
      //     res,
      //   })
      // );
      // sessionStorage.setItem(
      //   "cartInfo",
      //   JSON.stringify({
      //     items,
      //     results: items.length,
      //   })
      // );
      return res;
      // }
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
