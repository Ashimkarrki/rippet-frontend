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
  seller: {
    email: "",
    sellerName: "",
    shopName: "",
    phoneNumber: "",
    role: "",
    id: "",
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
      if (!cartArray) {
        return {
          ...state,
          cart: {
            results: 0,
            items: [],
          },
        };
      }
      return {
        ...state,
        cart: {
          results: cartArray?.length,
          items: [...cartArray],
        },
      };
    case "LOAD_SESSION":
      return {
        cart: action?.payload?.cartInfo,
        user: action?.payload?.userInfo,
      };
    case "ADD_CART_AND_USER":
      cartArray = formatCart(action?.payload?.Cart);
      if (!cartArray) {
        return {
          ...state,
          cart: {
            results: 0,
            items: [],
          },
        };
      }
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
    case "ADD_SELLER":
      return {
        email: action.payload.Email,
        sellerName: action.payload.UserName,
        shopName: action.payload.Shopname,
        phoneNumber: action.payload.PhoneNumber,
        role: action.payload.Role,
        id: action.payload.id,
      };
    default:
      return { ...state };
  }
};
export default userReducer;
