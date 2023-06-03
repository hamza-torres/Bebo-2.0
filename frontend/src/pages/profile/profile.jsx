import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/navbar";
import UserWidget from "../widgets/UserWidget";
import PostWidget from "../widgets/PostWidget";
import PostsWidget from "../widgets/PostsWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import AdvertWidget from "../widgets/AdvertWidget";
import Friend from "../../components/Friend";
import { selectToken } from "../../store/user/user.selector";
import { getUser } from "../../utils/firebase";
import UserFriendListWidget from "../widgets/UserFriendListWidget";
import UserPostsWidget from "../widgets/UserPostsWidget";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector(selectToken);
  const isNonMobile = useMediaQuery("(min-width:1000px)");

  useEffect(() => {
    getUser(userId).then((data) => {
      setUser(data);
    });
  }, []);

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobile ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobile ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          {/* <FriendListWidget userId={user} /> */}
          <UserFriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobile ? "45%" : undefined}
          mt={isNonMobile ? '-2rem' : "2rem"}
        >
          {<UserPostsWidget user={user} /> || "No posts"}
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
