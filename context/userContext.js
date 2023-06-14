import userReducer, { initialState } from "../reducer/cart";
import { createContext, useReducer } from "react";
export const userContext = createContext({
  addToCart: () => {},
  addDetails: () => {},
  loadSession: () => {},
  addSeller: () => {},
  sellerInfo: {},
  userInfo: {},
  cartInfo: {},
});

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
  const dataFetched = (payload) => {
    dispatch({ type: "DATA_FETCHED", payload: payload });
  };
  const setAdmin = (payload) => {
    dispatch({ type: "SET_ADMIN", payload: payload });
  };
  return (
    <userContext.Provider
      value={{
        addToCart,
        addDetails,
        loadSession,
        addSeller,
        dataFetched,
        isDataFetched: state.isDataFetched,
        sellerInfo: state.seller,
        userInfo: state.user,
        cartInfo: state.cart,
        setAdmin,
        isAdmin: state.isAdmin,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
