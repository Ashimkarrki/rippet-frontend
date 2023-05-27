export const initialState = {
  cart: {
    results: 0,
    items: [],
  },
  user: {
    email: "",
    userName: "",
    id: "",
    role: "",
    userName: "",
  },
};
const formatCart = (payload) => {
  let temp = payload?.map(({ productId, quantity, _id }) => {
    return {
      Name: productId?.Name,
      Price: productId?.Price,
      id: productId?.id,
      quantity: quantity,
      MainImage: productId?.MainImage,
      cartId: _id,
    };
  });
  return temp;
};
const userReducer = (state, action) => {
  let cartArray;
  switch (action.type) {
    case "ADD_TO_CART":
      cartArray = formatCart(action?.payload);
      if (cartArray?.length) {
        return {
          ...state,
          cart: {
            results: cartArray?.length,
            items: [...cartArray],
          },
        };
      }
    case "LOAD_SESSION":
      return {
        cart: action?.payload?.cartInfo,
        user: action?.payload?.userInfo,
      };
    case "ADD_CART_AND_USER":
      cartArray = formatCart(action?.payload?.Cart);

      return {
        cart: {
          results: cartArray?.length,
          items: [...cartArray],
        },
        user: {
          email: action?.payload.Email,
          isVerified: action?.payload.IsVerified,
          role: action?.payload.Role,
          userName: action?.payload.Username,
          id: action?.payload.id,
        },
      };
    default:
      return { ...state };
  }
};
export default userReducer;
