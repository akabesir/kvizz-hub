import React, { useEffect } from "react";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { CssBaseline } from "@mui/material";
import Workspace from "./components/LandingPage";

const Home = () => {
  const auth = getAuth();

  return (
    <div>
      <CssBaseline />
      <Navbar></Navbar>
      <Workspace />
    </div>
  );
};

export default Home;
