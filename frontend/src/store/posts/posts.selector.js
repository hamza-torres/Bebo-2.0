import { createSelector } from "reselect";

const selectPostsReducer = (state) => state.posts;

export const selectPosts = createSelector(
  [selectPostsReducer],
  (postsSlice) => postsSlice.posts
);
