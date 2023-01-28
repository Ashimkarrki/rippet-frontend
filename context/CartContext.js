import cartReducer, { initialState } from "../reducer/cart";
import { createContext, useReducer } from "react";
export const cartContext = createContext();

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const addToCart = (payload) => {
    dispatch({ type: "ADD", payload });
  };
  console.log(state);
  return (
    <cartContext.Provider value={{ addToCart, state }}>
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;
