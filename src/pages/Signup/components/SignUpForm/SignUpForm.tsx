import React, {useState} from "react";
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
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Copyright } from "../../../../components/Copyright/Copyright";
import { createUserWithEmailAndPassword } from "firebase/auth";

import GoogleSignUp from "../../services/GoogleSignup";
import { auth } from "../../../../firebase/firebase";


const SignUpForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const SignUpLogic = (e: any, email: string, password: string) => {
    e.preventDefault();
  
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
        window.location.href = "/workspace";
      })
      .catch((error) => {
        setErrorMessage(error.message)

        if (!firstName) {
          setErrorMessage("Please enter your First Name!");
          return;
        }

        if (firstName.length<2) {
          setErrorMessage("Please enter your First Name!");
          return;
        }

        if (lastName.length<2) {
          setErrorMessage("Please enter your Last Name!");
          return;
        }

        if (!lastName ) {
          setErrorMessage("Please enter your Last Name!");
          return;
        }
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
          Sign Up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
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
            startIcon={<LockOpenIcon />}
            sx={{ mt: 3, mb: 1 }}
            onClick={(e) => SignUpLogic(e, email, password)}
          >
            Sign Up with Form
          </Button>

          <Button
            fullWidth
            variant="contained"
            startIcon={<GoogleIcon />}
            style={{ borderColor: "#DB4437", backgroundColor: "#DB4437" }}
            sx={{ mb: 2 }}
            onClick={GoogleSignUp}
          >
            Sign Up with Google
          </Button>
          {errorMessage.length > 0 && (
            <Typography component="p" variant="body1" sx={{ color: "red", margin:"0.3rem" }}>
              {errorMessage}
            </Typography>
          )}
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Box>
    </Grid>
  );
};

export default SignUpForm;
