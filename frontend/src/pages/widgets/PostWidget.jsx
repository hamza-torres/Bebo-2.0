import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setPost } from "../../state/states";
import {
  addItemToPosts,
  removeItemFromPosts,
} from "../../store/posts/posts.action";
import { selectToken } from "../../store/user/user.selector";
import { getUserPosts, updatePostLikes } from "../../utils/firebase";

const PostWidget = ({ post }) => {

  // const [friend, setFriend] = useState(null);
  const {
    postId,
    userId,
    name,
    description,
    location,
    picture,
    userPicturePath,
    likes,
    comments,
  } = post;
  const friend = {userId, name, userPicturePath, location}
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectToken);
  // const isLiked = likes.includes(user.uid);
  const [isLiked, setIsliked] = useState(false);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  console.log('this is the uid being passed through the post', userId)

  const patchLike = async () => {
    if (isLiked) {
      await updatePostLikes(userId, postId, user.uid, "remove");
      post.likes = post.likes.filter((like) => like !== user.uid);
      setIsliked(false);
    } else {
      await updatePostLikes(userId, postId, user.uid, "add");
      post.likes.push(user.uid);
      setIsliked(true);
    }
  };

  useEffect(() => {
    setIsliked(likes.includes(user.uid))
  }, [])



  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friend={friend}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picture && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={picture}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
