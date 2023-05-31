import {POSTS_ACTION_TYPES } from "./posts.types";
export const POSTS_INITIAL_STATE = {
  posts: [],
};

export const postsReducer = (state = POSTS_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case POSTS_ACTION_TYPES.SET_POSTS:
      return {
        ...state,
        posts: payload,
      };
    default:
      return state;
  }
};
