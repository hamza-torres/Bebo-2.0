import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeItemFromFriends,
} from "../store/friends/friends.action";
import { selectFriends, selectUsers } from "../store/friends/friends.selector";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { selectCurrentUser, selectToken } from "../store/user/user.selector";
import { useEffect, useState } from "react";
import { getUsers } from "../utils/firebase";

const Friend = ({ friendId }) => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const friends = useSelector(selectFriends);
  // const friend = users.find(user => user.uid === friendId)
  // const [friend, setFriend] = useState(null);
  const friend = useSelector(selectCurrentUser)
  // const { uid, firstName, lastName, location, picture } = friend;
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  // useEffect(() => {
  //   getUsers().then((users) => {
  //     if (users) {
  //       dispatch(setUsers(users));
  //       setFriend(users.find((user) => user.uid === friendId));
  //     }
  //   });
  //   // const getFriend = async () => {
  //   // getUser(friendId).then((info) => {
  //   //   if (info) {
  //   //     setFriend(info);
  //   //   }
  //   //   console.log("info is: ", info);
  //   // });
  //   // };
  //   // getFriend();
  // }, []);

  useEffect(() => {
		const loadAccounts = async () => {
			const usr = await getUsers();
			setUsers(usr);
      const fr = usr.filter(obj => obj.uid === friendId);
      console.log("This is the friend", fr)
      // setFriend(usr.find((user) => user.uid === friendId));
			console.log('users stuff', usr);
		};
		loadAccounts();
	}, []);





  const isFriend = friends.find((frnd) => frnd.uid === friend.uid);

  const patchFriend = async () => {
    if (isFriend) {
      dispatch(removeItemFromFriends(friends, friend, token));
      return;
    }
    dispatch(removeItemFromFriends(friends, friend, token));
  };

  return (
    <>
      {friend && (
        <FlexBetween>
          <FlexBetween gap="1rem">
            <UserImage image={friend.picture} size="55px" />
            <Box
              onClick={() => {
                navigate(`/profile/${friend.uid}`);
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
                {`${friend.firstName} ${friend.lastName}`}
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
