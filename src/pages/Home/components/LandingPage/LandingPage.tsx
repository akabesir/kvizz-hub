import * as React from "react";

import { Button, Container, Typography, Box, Grid } from "@mui/material";

import GetStarted from "../../../../components/GetStarted/GetStarted";
import Work from "../../../../components/Work/Work";

import Footer from "../../../../components/Footer/Footer";
import PrimarySearchAppBar from "../../../../components/Navbar/Navbar";

const LandingPage = () => {
  return (
    <>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",

          minHeight: "100vh",
          backgroundColor: "#1e2b33",
        }}
      >
        <GetStarted />
      </Box>
      <Work></Work>
     
     <Box sx={{backgroundColor: "#1e2b33",}}>

     </Box>
      
      
       

    

        
        <Footer></Footer>
        </>
  );
};

export default LandingPage;
