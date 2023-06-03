import { setFireFriends } from '../../utils/firebase';
import { createAction } from '../../utils/reducer/reducer.utils';
import { FRIENDS_ACTION_TYPES } from './friends.types';

export const setFriends = (friendArray) =>
	createAction(FRIENDS_ACTION_TYPES.SET_FRIENDS, friendArray);

export const setUsers = (userArray) =>
	createAction(FRIENDS_ACTION_TYPES.SET_USERS, userArray);

const removeFriend = (friends, friendToRemove) => {
	return friends.filter(
		(friend) => friend.uid !== friendToRemove.uid
	);
};

const addFriend = (friends, friendToAdd) => {
	return [...friends, friendToAdd];
};

export const removeItemFromFriends = (friends, friendToRemove, currentUser) => {
	const newFriendsItems = removeFriend(friends, friendToRemove);
	setFireFriends(newFriendsItems, currentUser);
	return createAction(FRIENDS_ACTION_TYPES.SET_FRIENDS, newFriendsItems);
};

export const addItemToFriends = (friends, friendToAdd, currentUser) => {
	const newFriendsItems = addFriend(friends, friendToAdd);
	setFireFriends(newFriendsItems, currentUser);
	return createAction(FRIENDS_ACTION_TYPES.SET_FRIENDS, newFriendsItems);
};