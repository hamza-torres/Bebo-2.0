// import { combineReducers } from 'redux';
import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './user/user.reducer';
import { friendsReducer } from './friends/friends.reducer';
import { postsReducer } from './posts/posts.reducer';


export const rootReducer = combineReducers({
	user: userReducer,
	posts: postsReducer,
	friends: friendsReducer,
});
