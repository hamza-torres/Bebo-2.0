import { FRIENDS_ACTION_TYPES } from "./friends.types";
export const FRIENDS_INITIAL_STATE = {
  friends: [],
  users: [],
};

export const friendsReducer = (state = FRIENDS_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case FRIENDS_ACTION_TYPES.SET_FRIENDS:
      return {
        ...state,
        friends: payload,
      };
    case FRIENDS_ACTION_TYPES.SET_USERS:
      return {
        ...state,
        users: payload,
      };
    default:
      return state;
  }
};
