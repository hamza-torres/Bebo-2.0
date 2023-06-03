import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addItemToFriends,
  removeItemFromFriends,
  setFriends,
} from "../store/friends/friends.action";
import { selectFriends, selectUsers } from "../store/friends/friends.selector";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { selectCurrentUser, selectToken } from "../store/user/user.selector";
import { useEffect, useState } from "react";
import { getUserFriends, getUsers } from "../utils/firebase";

const Friend = ({ friend }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const friends = useSelector(selectFriends);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  useEffect(() => {
    getUserFriends(token).then((friends) => {
      if (friends) {
        const filteredFriends = friends.filter(
          (friend) => friend.userId !== token.uid
        );
        dispatch(setFriends(filteredFriends));
      }
    });
  }, []);

  const isFriend = friends.find((frnd) => frnd.userId === friend.userId);

  const patchFriend = async () => {
    if (isFriend) {
      dispatch(removeItemFromFriends(friends, friend, token));
      return;
    }
    dispatch(addItemToFriends(friends, friend, token));
  };

  return (
    <>
      {friend && (
        <FlexBetween>
          <FlexBetween gap="1rem">
            <UserImage image={friend.userPicturePath} size="55px" />
            <Box
              onClick={() => {
                navigate(`/profile/${friend.userId}`);
                navigate(0);
              }}
            >
              <Typography
                color={main}
                variant="h5"
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {friend.name}
                {/* {`${friend.firstName} ${friend.lastName}`} */}
              </Typography>
              <Typography color={medium} fontSize="0.75rem">
                {friend.location}
              </Typography>
            </Box>
          </FlexBetween>
          <IconButton
            onClick={() => patchFriend()}
            sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
          >
            {isFriend ? (
              <PersonRemoveOutlined sx={{ color: primaryDark }} />
            ) : (
              <PersonAddOutlined sx={{ color: primaryDark }} />
            )}
          </IconButton>
        </FlexBetween>
      )}
    </>
  );
};

export default Friend;
