import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setFriends } from "../../state/states";
import { setFriends, setUsers } from "../../store/friends/friends.action";
import WidgetWrapper from "../../components/WidgetWrapper";
import { selectToken } from "../../store/user/user.selector";
import {
  selectFriends,
  selectUsers,
} from "../../store/friends/friends.selector";
import { getUserFriends, getUsers } from "../../utils/firebase";

const UserListWidget = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector(selectToken);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((users) => {
      const filteredUsers = users.filter((User) => User.uid !== token.uid);
      const transformedUsers = filteredUsers.map((user) => ({
        name: `${user.firstName} ${user.lastName}`,
        location: user.location,
        userPicturePath: user.picture,
        userId: user.uid,
      }));
      setUsers(transformedUsers);
      // setList(transformedUsers);
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
        User List
      </Typography>
      {users && (
        <Box display="flex" flexDirection="column" gap="1.5rem">
          {users.map((friend) => (
            <Friend friend={friend} key={friend.userId} />
          ))}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default UserListWidget;
