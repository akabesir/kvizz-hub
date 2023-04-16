import * as React from "react";
import Grid from "@mui/material/Grid";

import LoginForm from "./components/LoginForm/LoginForm";
import PageIntro from "../../components/PageIntro/PageIntro";

export default function SignInSide() {
  return (
    <Grid container sx={{ height: "100vh" }} className="container" item>
      <PageIntro />
      <LoginForm />
    </Grid>
  );
}
