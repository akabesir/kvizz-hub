import * as React from "react";

import Grid from "@mui/material/Grid";

import { useState } from "react";

import PageIntro from "../../components/PageIntro/PageIntro";
import SignUpForm from "./components/SignUpForm/SignUpForm";

export default function SignUpSide() {
 
  return (
    <Grid container sx={{ height: "100vh" }} className="container">
      <PageIntro />
      <SignUpForm />
    </Grid>
  );
}
