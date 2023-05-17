import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import GoogleIcon from "@mui/icons-material/Google";
import LoginIcon from "@mui/icons-material/Login";

import { Copyright } from "../../../../components/Copyright/Copyright";
import GoogleLogin from "../../services/google-login";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase/firebase";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailLogin = (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.location.href = "/workspace";
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={5}
      component={Paper}
      elevation={6}
      square
      sx={{ width: "100%" }}
    >
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={emailLogin}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
      
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>

          <FormControlLabel
            control={
              <Checkbox
                value={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                color="primary"
              />
            }
            label="Show Password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            startIcon={<LoginIcon />}
            sx={{ mt: 3, mb: 1 }}
          >
            Sign In
          </Button>

          {errorMessage.length > 0 && (
            <Typography component="p" variant="body1" sx={{ color: "red", margin:"0.3rem" }}>
              {errorMessage}
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            startIcon={<GoogleIcon />}
            style={{ borderColor: "#DB4437", backgroundColor: "#DB4437" }}
            sx={{ mb: 2 }}
            onClick={GoogleLogin}
          >
            Sign In with Google
          </Button>
          {errorMessage.length > 0 && (
            <Typography component="p" variant="body1" sx={{ color: "red", margin:"0.3rem" }}>
              {errorMessage}
            </Typography>
          )}
          <Grid container>
           
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Box>
    </Grid>
  );
};

export default LoginForm;
