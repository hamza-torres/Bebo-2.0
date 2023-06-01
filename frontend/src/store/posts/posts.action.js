import { setFirePosts } from "../../utils/firebase";
import { createAction } from "../../utils/reducer/reducer.utils";
import { POSTS_ACTION_TYPES } from "./posts.types";

// Set initial Array
export const setPosts = (postsArray) =>
  createAction(POSTS_ACTION_TYPES.SET_POSTS, postsArray);

const removePost = (posts, postToRemove) => {
  return posts.filter((post) => post.name !== postToRemove.name);
};

const addPost = (posts, postToAdd) => {
  console.log("This is the posts being passed" ,posts)
  return [...posts, postToAdd];
};

export const removeItemFromPosts = (user, posts, postToRemove) => {
  const newPostsItems = removePost(posts, postToRemove);
  setFirePosts(user, newPostsItems)
  return createAction(POSTS_ACTION_TYPES.SET_POSTS, newPostsItems);
};

export const addItemToPosts = (user, posts, postToAdd) => {
  const newPostsItems = addPost(posts, postToAdd);
  setFirePosts(user, newPostsItems)
  return createAction(POSTS_ACTION_TYPES.SET_POSTS, newPostsItems);
};



// export const setPipelinesArray = (pipelineArray) =>
// 	createAction(PIPELINES_ACTION_TYPES.SET_PIPELINES, pipelineArray);

// const removePipeline = (pipelines, pipelineToRemove) => {
// 	return pipelines.filter(
// 		(pipeline) => pipeline.title !== pipelineToRemove.title
// 	);
// };

// const addPipeline = (pipelines, pipelineToAdd) => {
// 	return [...pipelines, pipelineToAdd];
// };

// export const removeItemFromPipelines = (pipelines, pipelineToRemove, currentUser) => {
// 	const newPipelinesItems = removePipeline(pipelines, pipelineToRemove);
// 	setPipelines(newPipelinesItems, currentUser);
// 	return createAction(PIPELINES_ACTION_TYPES.SET_PIPELINES, newPipelinesItems);
// };

// export const addItemToPipelines = (pipelines, pipelineToAdd, currentUser) => {
// 	const newPipelinesItems = addPipeline(pipelines, pipelineToAdd);
// 	setPipelines(newPipelinesItems, currentUser);
// 	return createAction(PIPELINES_ACTION_TYPES.SET_PIPELINES, newPipelinesItems);
// };