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
import { setMode } from "./store/user/user.action";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
        getUser(user)
        .then(response => response.json())
        .then(data => {dispatch(setCurrentUser(data))})
      }

      // const setUser = async () => {
      //   const user_doc = await getUser(user.uid);
      //   dispatch(
      //     setLogin(user_doc)
      //   );
      // }
      // setUser();
    });
    return unsubscribe;
  }, []);

  const mode = useSelector(selectMode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const user = useSelector(selectCurrentUser);
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
              <Route
                path="/profile/:userId"
                element={user ? <Profile /> : <Navigate to="/" />}
              />
              <Route path="/nav" element={<Navbar />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
