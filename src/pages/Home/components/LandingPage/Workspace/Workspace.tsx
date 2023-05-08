import React from "react";

import PrimarySearchAppBar from "../../../../../components/Navbar/Navbar";
import QuizList from "./QuizList";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Workspace = () => {
  return (
    <div style={{ backgroundColor: "#ccd6f6", minHeight: "100vh" }}>
      <PrimarySearchAppBar />
      <Link to="/newQuiz" style={{textDecoration:"none"}}>
      <Button
        variant="contained"
        sx={{
          display: "block",
       
          margin: "15px auto 0",
          borderRadius: 50,
          color: "#3f51b5",
          fontWeight: "bold",
          padding: "16px 32px",
          background: "linear-gradient(45deg, #ECEFF1 30%, #CFD8DC 90%)",
          boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "linear-gradient(45deg, #CFD8DC 30%, #ECEFF1 90%)",
            transform: "scale(1.05)",
            boxShadow: "0 5px 8px 3px rgba(0, 0, 0, .5)",
          },
          
        }}
      >
        Create Quiz
      </Button>
      </Link>
      <QuizList></QuizList>
    </div>
  );
};

export default Workspace;
