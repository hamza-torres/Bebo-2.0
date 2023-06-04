import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
  currentUser: {
    picture:
      "https://is3-ssl.mzstatic.com/image/thumb/Podcasts115/v4/a0/49/14/a0491493-7b7a-e2e9-c4c0-154521cbdec8/mza_14223063978308988767.jpg/300x300bb-75.jpg",
    firstName: "John",
    lastName: "Doe",
  },
  mode: "light",
  img: null,
  token: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    case USER_ACTION_TYPES.SET_MODE:
      return { ...state, mode: state.mode === "light" ? "dark" : "light" };
    case USER_ACTION_TYPES.SET_IMG:
      return { ...state, img: payload };
    case USER_ACTION_TYPES.SET_TOKEN:
      return { ...state, token: payload };
    default:
      return state;
  }
};
