import React from "react";
import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
// import HomeIcon from '@mui/icons-material/Home';
import { useDispatch, useSelector } from "react-redux";
// import { setMode, seLogout } from "../../state/states";
// import { setMode } from "../../store/mode/mode.action";
import { setCurrentUser, setMode } from "../../store/user/user.action";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { signOutUser } from "../../utils/firebase";
import { setFriends } from "../../store/friends/friends.action";
import { setPosts } from "../../store/posts/posts.action";
import { selectCurrentUser } from "../../store/user/user.selector";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  // const firstName = 'John'
  // const lastName = 'Doe'
  // const fullName = `${firstName} ${lastName}`
  const fullName = `${user.firstName} ${user.lastName}`;

  const logout = async () => {
    await signOutUser();
    dispatch(
      setCurrentUser({
        picture:
          "https://is3-ssl.mzstatic.com/image/thumb/Podcasts115/v4/a0/49/14/a0491493-7b7a-e2e9-c4c0-154521cbdec8/mza_14223063978308988767.jpg/300x300bb-75.jpg",
        firstName: "John",
        lastName: "Doe",
      })
    );
    dispatch(setMode("dark"));
    dispatch(setFriends([]));
    dispatch(setPosts([]));
    navigate("/auth");
  };

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              cursor: "pointer",
              color: primaryLight,
            },
          }}
        >
          Bebo
        </Typography>
        {isNonMobile && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {isNonMobile ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>

          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={logout}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu />
        </IconButton>
      )}
      {!isNonMobile && isMobileMenuOpen && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={logout}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
