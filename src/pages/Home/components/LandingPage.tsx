import * as React from "react";
import { useState } from "react";
import { Button, Container, Typography, Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import SideBar from "../../../components/Sidebar/SideBar";
import GetStarted from "../../../components/GetStarted/GetStarted";
import Work from "../../../components/Work/Work";
import Contact from "../../../components/Contact/Contact";

import Footer from "../../../components/Footer/Footer";
import Review from "../../../components/Reviews/Review";


const LandingPage = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",

          height: "100vh",
          backgroundColor: "#1e2b33",
        }}
      >
        <GetStarted />
      </Box>
      <Work></Work>
     
     <Box sx={{backgroundColor: "#1e2b33",}}>
     <Review></Review>
     </Box>
      
      
       
      <Contact></Contact>
    

        
        <Footer></Footer>
        </>
  );
};

export default LandingPage;
