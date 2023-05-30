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
import { setLogin } from "./state";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      const setUser = async () => {
        const user_doc = await getUser(user.uid);
        dispatch(
          setLogin(user_doc)
        );
      }
      setUser();
    });
    return unsubscribe;
  }, []);

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = useSelector((state) => state.user);
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              {/* <Route
                path="/"
                element={isAuth ? <Navigate to="/home" /> : <Auth />}
              /> */}
              <Route
                path="/auth"
                element={<Auth />}
              />
              {/* <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/" />} /> */}
              <Route path="/" element={<Home />} />
              <Route
                path="/profile/:userId"
                element={isAuth ? <Profile /> : <Navigate to="/" />}
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
