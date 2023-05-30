import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import Navbar from "../navbar/navbar";
import UserWidget from "../widgets/UserWidget";
import PostWidget from "../widgets/PostWidget";
import PostsWidget from "../widgets/PostsWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import AdvertWidget from "../widgets/AdvertWidget";
import Friend from "../../components/Friend";

const Home = () => {
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
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
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobile ? "42%" : undefined}
          mt={isNonMobile ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobile && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
