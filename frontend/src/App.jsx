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
  getUser,
  onAuthStateChangedListener,
} from "./utils/firebase";
import { setCurrentUser } from "./store/user/user.action";
import { selectCurrentUser } from "./store/user/user.selector";
import { selectMode } from "./store/user/user.selector";
import MyPostWidget from "./pages/widgets/MyPostWidget";
import UserWidget from "./pages/widgets/UserWidget";


function App() {
  console.log("Current mode:")
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
        dispatch(setCurrentUser(user));
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
              <Route
                path="/auth"
                element={<Auth />}
              />
              {/* <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} /> */}
              <Route path="/" element={<Home />} />
              {/* <Route
                path="/profile/:userId"
                element={user ? <Profile /> : <Navigate to="/" />}
              /> */}
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
