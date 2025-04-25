import { REGISTER } from "../actionTypes";

const initialState = {
  items: [
    { id: 1, username: "admin", password: "admin123", role: "admin" },
    { id: 2, username: "user1", password: "user123", role: "user" },
    { id: 3, username: "user2", password: "user123", role: "user" }
  ],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // case LOGIN:
    //   return {
    //     ...state,
    //     items: [...state.items, action.payload],
    //   };

    case REGISTER:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    default:
      return state;
  }
};