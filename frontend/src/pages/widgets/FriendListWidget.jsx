import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setFriends } from "../../state/states";
import { setFriends, setUsers } from "../../store/friends/friends.action";
import WidgetWrapper from "../../components/WidgetWrapper";
import { selectToken } from "../../store/user/user.selector";
import { selectFriends } from "../../store/friends/friends.selector";
import { getUserFriends, getUsers } from "../../utils/firebase";

const FriendListWidget = ({ user, userlist = false }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector(selectToken);
  const friends = useSelector(selectFriends);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!userlist) {
      getUserFriends(user).then((friends) => {
        dispatch(setFriends(friends));
        setList(friends);
      });
      return;
    }
    getUsers().then((users) => {
      dispatch(setUsers(users));
      setList(users);
    });
  }, []);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        {!userlist ? "Friend List" : "User List"}
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {list.map((friend) => (
          <Friend
            friend={{
              userId: friend.uid,
              name: `${friend.firstName} ${friend.lastName}`,
              location: friend.location,
              userPicturePath: friend.picture,
            }}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
