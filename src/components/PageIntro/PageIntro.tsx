import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
const PageIntro = () => {
  
  return (
    <Grid
      item
      sm={false}
      md={7}
      sx={{
        background: "linear-gradient(to right, #141e30, #243b55)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <div
          style={{
            margin: "0 auto",
            padding: "1rem",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Typography variant="h2" align="center" color="#cfd8dc">
            Get Quizzing & Have Fun!
          </Typography>
          <div style={{ marginTop: "1rem" }}>
            <Typography variant="h5" align="center" color="#b0bec5">
              KvizzHub is an innovative online platform that allows users to
              create and share interactive quizzes. Whether you want to test
              your knowledge or challenge others, KvizzHub offers user-friendly
              experience for building, watching, and solving quizzes.
            </Typography>
            <Typography
              variant="h5"
              align="center"
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
              color="#b0bec5"
            >
              With a wide range of quiz topics and customizable options,
              KvizzHub is a hub of engaging and educational quizzes for users of
              all ages and interests. Join the community of quiz enthusiasts and
              explore the world of knowledge!
            </Typography>
          </div>
        </div>
      </Box>
    </Grid>
  );
};

export default PageIntro;
