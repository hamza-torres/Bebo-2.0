import { setFireFriends } from "../../utils/firebase";
import { createAction } from "../../utils/reducer/reducer.utils";
import { FRIENDS_ACTION_TYPES } from "./friends.types";

export const setFriends = (friendArray) =>
  createAction(FRIENDS_ACTION_TYPES.SET_FRIENDS, friendArray);

export const setUsers = (userArray) =>
  createAction(FRIENDS_ACTION_TYPES.SET_USERS, userArray);

const removeFriend = (friends, friendToRemove) => {
  return friends.filter((friend) => friend.userId !== friendToRemove.userId);
};

const addFriend = (friends, friendToAdd) => {
  const isFriendAlreadyAdded = friends.find(
    (friend) => friend.userId === friendToAdd.userId
  );
  if (isFriendAlreadyAdded) {
	return friends;
  }
  return [...friends, friendToAdd];
};

export const removeItemFromFriends = (friends, friendToRemove, currentUser) => {
  const newFriendsItems = removeFriend(friends, friendToRemove);
  setFireFriends(currentUser, newFriendsItems);
  return createAction(FRIENDS_ACTION_TYPES.SET_FRIENDS, newFriendsItems);
};

export const addItemToFriends = (friends, friendToAdd, currentUser) => {
  const newFriendsItems = addFriend(friends, friendToAdd);
  setFireFriends(currentUser, newFriendsItems);
  return createAction(FRIENDS_ACTION_TYPES.SET_FRIENDS, newFriendsItems);
};
