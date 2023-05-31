import { createAction } from "../../utils/reducer/reducer.utils";
import { POSTS_ACTION_TYPES } from "./posts.types";

// Set initial Array
export const setPosts = (postsArray) =>
  createAction(POSTS_ACTION_TYPES.SET_POSTS, postsArray);

const removePost = (posts, postToRemove) => {
  return posts.filter((post) => post.name !== postToRemove.name);
};

const addPost = (posts, postToAdd) => {
  return [...posts, postToAdd];
};

export const removeItemFromPosts = (posts, postToRemove) => {
  const newPostsItems = removePost(posts, postToRemove);
  return createAction(POSTS_ACTION_TYPES.SET_POSTS, newPostsItems);
};

export const addItemToPosts = (posts, postToAdd) => {
  const newPostsItems = addPost(posts, postToAdd);
  return createAction(POSTS_ACTION_TYPES.SET_POSTS, newPostsItems);
};
