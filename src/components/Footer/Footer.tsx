import React from 'react';


import { Typography,Grid, IconButton, Link } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Footer = () => {
  const iconButtonStyle = {
    margin: '0px 5px',
    color: '#f5f5f5',
   
    
  };

  const gridStyle = {
    backgroundColor: '#f5f5f5',
    padding: '10px',
    marginTop: 'auto',
    textAlign: 'center',
  };

  return (
    <div style={{backgroundColor:"#112240", padding:"10px", marginTop:"auto", textAlign:"center"}}>
      <Grid container spacing={2} sx={{alignItems:"center", justifyContent:"center",}}>
        <Grid item>
          <Typography variant="body2" color="#fff">
            © {new Date().getFullYear()} KvizzHub 
          </Typography>
        </Grid>
        <Grid item>
          <Link href="#" target="_blank" rel="noopener">
            <IconButton style={iconButtonStyle}>
              <FacebookIcon></FacebookIcon>
            </IconButton>
          </Link>
          <Link href="#" target="_blank" rel="noopener">
            <IconButton style={iconButtonStyle}>
            <InstagramIcon></InstagramIcon>
            </IconButton>
          </Link>
          <Link href="#" target="_blank" rel="noopener">
            <IconButton style={iconButtonStyle}>
              <GitHubIcon></GitHubIcon>
            </IconButton>
          </Link>
          <Link href="#" target="_blank" rel="noopener">
            <IconButton style={iconButtonStyle}>
        <LinkedInIcon></LinkedInIcon>
            </IconButton>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
