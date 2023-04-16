import React from "react";
import { Routes, Route, Router } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Home from "./pages/Home/Home";
import { AuthProvider } from "./contexts/AuthContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignInSide from "./pages/Login/Login";
import SignUpSide from "./pages/Signup/Signup";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const theme = createTheme();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Routes>
            {/* <Route element={<PrivateRoute/>}>  */}
            <Route path="/" element={<Home />} />
            {/* </Route> */}

            <Route path="/login" element={<SignInSide />} />
            <Route path="/signup" element={<SignUpSide />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
