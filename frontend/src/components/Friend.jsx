import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeItemFromFriends } from "../store/friends/friends.action";
import { selectFriends } from "../store/friends/friends.selector";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { selectCurrentUser, selectToken } from "../store/user/user.selector";

const Friend = ({ friend }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const friends = useSelector(selectFriends);
  const { uid, firstName, lastName, location, picture } = friend;
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend.uid === uid);

  const patchFriend = async () => {
    if (isFriend) {
      dispatch(removeItemFromFriends(friends, friend, token));
      return;
    }
    dispatch(removeItemFromFriends(friends, friend, token));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={picture} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${uid}`);
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
            {`${firstName} ${lastName}`}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {location}
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
  );
};

export default Friend;
