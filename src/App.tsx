import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import SignInSide from "./pages/Login";
import SignUpSide from "./pages/Signup";
import Home from "./pages/Home";
import { AuthProvider } from "./contexts/AuthContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
function App() {
  const theme = createTheme();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignInSide />} />
            <Route path="/signup" element={<SignUpSide />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
