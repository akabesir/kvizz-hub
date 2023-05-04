import React from "react";

import { Box, Typography } from "@mui/material";

import PrimarySearchAppBar from "../../../../../components/Navbar/Navbar";

const Workspace = () => {
  return (
    <div style={{ backgroundColor: "#ccd6f6" }}>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <div style={{ display: "flex", minHeight: "100vh" }}>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",

            flexDirection: "column",
            "@media screen and (min-width: 768px)": {
              flexDirection: "row",
            },
          }}
        >
        
          
        </Box>
      </div>
    </div>
  );
};

export default Workspace;
