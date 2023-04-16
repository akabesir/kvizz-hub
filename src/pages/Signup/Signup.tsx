import * as React from "react";

import Grid from "@mui/material/Grid";

import { useState } from "react";

import PageIntro from "../../components/PageIntro/PageIntro";
import SignUpForm from "./components/SignUpForm/SignUpForm";

export default function SignUpSide() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Grid container sx={{ height: "100vh" }} className="container">
      <PageIntro />
      <SignUpForm />
    </Grid>
  );
}
