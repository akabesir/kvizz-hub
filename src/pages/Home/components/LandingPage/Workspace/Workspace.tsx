import React from "react";
import PrimarySearchAppBar from "../../../../../components/Navbar/Navbar";
import SideBar from "../../../../../components/Sidebar/SideBar";
import { Box, Typography } from "@mui/material";
import Card from "../Cards/Card";

const Workspace = () => {
  return (
    <div style={{ backgroundColor: "#ccd6f6" }}>
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <SideBar></SideBar>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "column",
              "@media screen and (min-width: 768px)": {
                flexDirection: "row",
              },
            }}
          >
            <Card></Card>
          </Box>
          
        </Box>
      </div>
    </div>
  );
};

export default Workspace;
