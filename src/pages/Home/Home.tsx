import React, { useEffect } from "react";
import { signOut, getAuth } from "firebase/auth";

import { CssBaseline } from "@mui/material";
import Workspace from "./components/LandingPage/Workspace/Workspace";
const Home = () => {
  const auth = getAuth();

  return (
    <div>
      <CssBaseline />
      <Workspace></Workspace>
    </div>
  );
};

export default Home;
