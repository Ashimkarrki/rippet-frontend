export const initialState = {
  items: [],
};

const cartReducer = (state, action) => {
  console.log(action);
  console.log("dispatch");
  switch (action.type) {
    case "ADD":
      console.log("Add");
      return {
        ...state,
        items: [
          ...state?.items,
          {
            id: action.payload.id,
            amt: action.payload.amt,
          },
        ],
      };
    default:
      console.log("default");
      return { ...state };
  }
};
export default cartReducer;
