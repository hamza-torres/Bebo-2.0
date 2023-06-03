import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Auth from "./pages/auth/auth";
import Profile from "./pages/profile/profile";
import Navbar from "./pages/navbar/navbar";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import {
  createUserDocumentFromAuth,
  getAllPosts,
  getUser,
  getUsers,
  onAuthStateChangedListener,
  updatePostLikes,
} from "./utils/firebase";
import { setCurrentUser, setToken } from "./store/user/user.action";
import { selectCurrentUser } from "./store/user/user.selector";
import { selectMode } from "./store/user/user.selector";
import MyPostWidget from "./pages/widgets/MyPostWidget";
import UserWidget from "./pages/widgets/UserWidget";
import { setUsers } from "./store/friends/friends.action";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser)
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
        dispatch(setToken(user));
        console.log("user is: ", user);
        getUser(user.uid).then((info) => {
          if (info) {
            dispatch(setCurrentUser(info));
          }
          console.log("info is: ", info);
        });
        getUsers().then((users) => {
          if (users) {
            dispatch(setUsers(users));
          }
          console.log("users is: ", users);
        });
      }
    });
    
    return unsubscribe;
  }, []);




  const mode = useSelector(selectMode);
  // const mode = 'light'
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  // const user = useSelector(selectCurrentUser);
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              {/* <Route
                path="/"
                element={user ? <Navigate to="/home" /> : <Auth />}
              /> */}
              <Route path="/auth" element={<Auth />} />
              {/* <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} /> */}
              <Route path="/" element={<Home />} />
              <Route
                path="/profile/:userId"
                element={user ? <Profile /> : <Navigate to="/" />}
              />
              <Route path="/nav" element={<Navbar />} />
              <Route path="/post" element={<MyPostWidget />} />
              <Route path="/user" element={<UserWidget />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
