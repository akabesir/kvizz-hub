import * as React from "react";
import Grid from "@mui/material/Grid";
import PageIntro from "../../components/PageIntro";
import LoginForm from "./components/LoginForm/LoginForm";

export default function SignInSide() {
  return (
    <Grid container sx={{ height: "100vh" }} className="container" item>
      <PageIntro />
      <LoginForm />
    </Grid>
  );
}
