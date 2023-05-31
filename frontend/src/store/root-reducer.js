// import { combineReducers } from 'redux';
import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './user/user.reducer';
import { friendsReducer } from './friends/friends.reducer';
import { postsReducer } from './posts/posts.reducer';
import { modeReducer } from './mode/mode.reducer';


export const rootReducer = combineReducers({
	user: userReducer,
	mode : modeReducer,
	posts: postsReducer,
	friends: friendsReducer,
});
