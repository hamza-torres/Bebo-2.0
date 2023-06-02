import { createSelector } from "reselect";

const selectFriendsReducer = (state) => state.friends;
const selectUsersReducer = (state) => state.users;

export const selectFriends = createSelector(
  [selectFriendsReducer],
  (friendsSlice) => friendsSlice.friends
);

export const selectUsers = createSelector(
  [selectUsersReducer],
  (usersSlice) => usersSlice.users
);
