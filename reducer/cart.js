export const initialState = {
  items: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        items: [...action.payload],
      };
    default:
      console.log("default");
      return { ...state };
  }
};
export default cartReducer;
