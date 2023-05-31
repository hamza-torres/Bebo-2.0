import { createAction } from '../../utils/reducer/reducer.utils';
import { FRIENDS_ACTION_TYPES } from './friends.types';

export const setFriendsArray = (friendArray) =>
	createAction(FRIENDS_ACTION_TYPES.SET_FRIENDS, friendArray);

const removeFriend = (friends, friendToRemove) => {
	return friends.filter(
		(friend) => friend.title !== friendToRemove.title
	);
};

const addFriend = (friends, friendToAdd) => {
	return [...friends, friendToAdd];
};

export const removeItemFromFriends = (friends, friendToRemove, currentUser) => {
	const newFriendsItems = removeFriend(friends, friendToRemove);
	setFriends(newFriendsItems, currentUser);
	return createAction(FRIENDS_ACTION_TYPES.SET_FRIENDS, newFriendsItems);
};

export const addItemToFriends = (friends, friendToAdd, currentUser) => {
	const newFriendsItems = addFriend(friends, friendToAdd);
	setFriends(newFriendsItems, currentUser);
	return createAction(FRIENDS_ACTION_TYPES.SET_FRIENDS, newFriendsItems);
};