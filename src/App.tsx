import React from "react";
import { Routes, Route, Router } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import SignInSide from "./pages/Login/Login";
import SignUpSide from "./pages/Signup/Signup";

import { AuthProvider } from "./contexts/AuthContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LandingPage from "./pages/Home/components/LandingPage/LandingPage";
import Workspace from "./pages/Home/components/LandingPage/Workspace/Workspace";
import QuizForm from "./components/QuizForm/QuizForm";
import EditQuiz from "./components/QuizForm/EditQuiz";
import QuizAnswer from "./components/QuizForm/QuizAnswer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const theme = createTheme();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer/>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/login" element={<SignInSide />} />
            <Route path="/signup" element={<SignUpSide />} />
            <Route path="/newQuiz" element={<QuizForm />}></Route>
            <Route path="/edit-quiz/:quizId" element={<EditQuiz/>} />
            <Route path="/quiz/:quizId" element={<QuizAnswer/>}></Route>
       
          </Routes>
          
        </AuthProvider>
      </ThemeProvider>
      
    </div>
  );
}

export default App;
