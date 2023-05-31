import { createSelector } from 'reselect';

const selectFriendsReducer = (state) => state.friends;


export const selectFriends = createSelector(
	[selectFriendsReducer],
	(friendsSlice) => friendsSlice.friends
);
