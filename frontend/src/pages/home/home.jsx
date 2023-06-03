import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import Navbar from "../navbar/navbar";
import UserWidget from "../widgets/UserWidget";
import PostWidget from "../widgets/PostWidget";
import PostsWidget from "../widgets/PostsWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import AdvertWidget from "../widgets/AdvertWidget";
import Friend from "../../components/Friend";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectImg,
  selectToken,
} from "../../store/user/user.selector";
import { setCurrentUser } from "../../store/user/user.action";
import { getUser } from "../../utils/firebase";
import UserListWidget from "../widgets/UserListWidget";

const Home = () => {
  console.log("home now");

  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectToken);

  // const picturePath = useSelector(selectImg)
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobile ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobile ? "26%" : undefined}>
          {/* <UserWidget userId={user.uid} picturePath={picturePath} /> */}
          <UserWidget userId={token.uid} />
          <Box m="2rem 0" />
          <UserListWidget />
          {/* <FriendListWidget userId={token} userlist/> */}
        </Box>
        <Box
          flexBasis={isNonMobile ? "42%" : undefined}
          mt={isNonMobile ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picture} />
          <PostsWidget userId={token.uid} />
        </Box>
        {isNonMobile && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={token.uid} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
