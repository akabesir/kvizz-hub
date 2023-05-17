import { Box, Button, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

import quizLanding from "../../assets/Question_1.mp4";
import CustomButton from "../CustomButton/CustomButton";

const Hero = () => {

  const handleLogin = () => {
    window.location.href = '/login';
  };
  
  const handleRegister = () => {
    window.location.href = '/signup';
  };
  
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  return (
    <Box sx={{ minHeight: "100vh", marginLeft: "5rem" }}>
      <Container >
        <CustomBox >
          <Box sx={{ flex: "1" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#e6e6e6",
                fontWeight: "500",
                mt: 10,
                mb: 4,
              }}
            >
              Let's Get Started!
            </Typography>
            <Title variant="h1" sx={{ color: "#add8e6"}}>
              Quiz Your Mind and Have Fun on KvizzHub!
            </Title>
            <Typography
              variant="body2"
              sx={{ fontSize: "18px", color: "#e6e6e6", my: 4 }}
            >
              KvizzHub: Engage your mind and expand your horizons with our
              diverse range of entertaining and educational quizzes. Join a
              welcoming community of trivia enthusiasts.
            </Typography>
            <CustomButton
              backgroundColor="#0F1B4C"
              color="#fff"
              buttonText="Login"
              heroBtn={true}
              onClick={handleLogin}
            />
            <CustomButton
            backgroundColor="#FF3333"
            color="#fff"
            buttonText="Register"
            heroBtn={true}
            onClick={handleRegister}
          />
          </Box>

          <Box sx={{ flex: "1.25" }}>
            <video
              src={quizLanding}
              style={{
                maxWidth: "100%",
                marginBottom: "2rem",
                marginLeft: "5rem",
              }}
            />
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Hero;
