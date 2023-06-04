import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  PersonOutlineOutlined
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { downloadFile, getProfilePhoto, getUser } from "../../utils/firebase";
import { selectCurrentUser, selectImg } from "../../store/user/user.selector";
import { selectFriends } from "../../store/friends/friends.selector";

const UserWidget = ({ userId }) => {
  const [info, setInfo] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const [picturePath, setPicturePath] = useState(null);
  const friends = useSelector(selectFriends);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  // const getUser = async () => {
  //   const response = await fetch(`http://localhost:3001/users/${userId}`, {
  //     method: "GET",
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   const data = await response.json();
  //   setUser(data);
  // };

  useEffect(() => {
    const getUserInfo = async () => {
      const data = await getUser(userId);
      setInfo(data);
      const url = await getProfilePhoto(userId);
      setPicturePath(data.picture);
    };
    return getUserInfo;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!info) {
    return null;
  }

  const { firstName, lastName, location, bio, viewedProfile, impressions } =
    info;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
            {/* <Typography color={medium}>10 friends</Typography> */}
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <PersonOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{bio}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img
              src="https://cdn-icons-png.flaticon.com/512/124/124021.png"
              alt="twitter"
              width="40px"
              height="40px"
              style={{ borderRadius: '10px' }}
            />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/800px-LinkedIn_logo_initials.png"
              // src="https://static-00.iconduck.com/assets.00/linkedin-icon-2048x2048-ya5g47j2.png"
              alt="linkedin"
              width="40px"
              height="40px"
              style={{ borderRadius: '10px' }}
            />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
