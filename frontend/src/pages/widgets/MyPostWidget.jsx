import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../store/posts/posts.action";
import { selectPosts } from "../../store/posts/posts.selector";
import { addItemToPosts } from "../../store/posts/posts.action";
import {
  selectCurrentUser,
  selectImg,
  selectToken,
} from "../../store/user/user.selector";
import { v4 as uuidv4 } from "uuid";
import {
  getProfilePhoto,
  getUser,
  setFirePosts,
  uploadFile,
} from "../../utils/firebase";
import { setCurrentUser } from "../../store/user/user.action";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const [picPath, setPicPath] = useState(null);
  const { palette } = useTheme();
  const token = useSelector(selectToken);
  const posts = useSelector(selectPosts);
  const user = useSelector(selectCurrentUser);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  useEffect(() => {
    const getUserInfo = async () => {
      const url = await getProfilePhoto(token.uid);
      setPicPath(url);
    };
    return getUserInfo;
  }, []);

  const processPostImage = async (postId, userId) => {
    try {
      const response = await fetch('/api/process-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, userId }),
      });
  
      if (response.ok) {
        const result = await response.json();
        // Process the result received from the backend
        console.log(result);
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Request failed with error:', error);
    }
  };

  const handlePost = async () => {
    const data = {
      postId: uuidv4(),
      userId: token.uid || "",
      name: `${user.firstName} ${user.lastName}`,
      description: post || " ",
      location: user.location || "",
      picture: "",
      likes: [],
      comments: [],
      tags: {
        adult: "NONE",
        medical: "NONE",
        spoofed: "NONE",
        violence: "NONE",
        racy: "NONE",
      },
      userPicturePath: user.picture,
    };
    const makePost = async () => {
      getUser(user.uid).then((info) => {
        if (info) {
          dispatch(setCurrentUser(info));
        }
      });
      if (isImage) {
        console.log("there is an image");
        const res = await uploadFile(token, image, "post");
        console.log("image url", res);
        data.picture = res;
      }
      console.log(data);
      dispatch(addItemToPosts(token, posts, data));
      getAllPosts().then((data) => {
        setPosts(data);
      });
    } 
    makePost().then(() => {
      processPostImage(data.postId, data.userId);
      
    });
    setIsImage(false);
    setImage(null);
    setPost("");
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picPath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
