import userReducer, { initialState } from "../reducer/cart";
import { createContext, useReducer } from "react";
export const userContext = createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const addToCart = (payload) => {
    dispatch({ type: "ADD_TO_CART", payload: payload });
  };
  const addDetails = (payload) => {
    dispatch({ type: "ADD_CART_AND_USER", payload: payload });
  };
  const addSeller = (payload) => {
    dispatch({ type: "ADD_SELLER", payload: payload });
  };
  const loadSession = (payload) => {
    dispatch({ type: "LOAD_SESSION", payload: payload });
  };
  return (
    <userContext.Provider
      value={{
        addToCart,
        addDetails,
        loadSession,
        addSeller,
        sellerInfo: state.seller,
        userInfo: state.user,
        cartInfo: state.cart,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
