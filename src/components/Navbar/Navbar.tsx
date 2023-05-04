import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";





export default function PrimarySearchAppBar() {




  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#112240" }}>
        <Toolbar>
        
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{marginLeft:"4.5rem"}}
          >
            KvizzHub
          </Typography>
      

       
        </Toolbar>
      </AppBar>
     
    </Box>
  );
}
