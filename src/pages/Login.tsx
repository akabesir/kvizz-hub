import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import GoogleIcon from "@mui/icons-material/Google";
import LoginIcon from '@mui/icons-material/Login';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from 'react';
import { auth } from "../firebase/firebase";

import { Copyright } from '../components/Copyright';



const theme = createTheme();

export default function SignInSide() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   
  };

  const [email,setEmail] = useState("")
  const[password,setPassword] = useState("")

  const handleReset=()=>{
    setEmail("");
    setPassword("");
  }
  return (
  
      <Grid container sx={{ height: "100vh" }} className="container">
        <CssBaseline />
        
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
                Welcome to KvizzHub!
              </Typography>
              <div style={{ marginTop: "1rem" }}>
                <Typography variant="h5" align="center" color="#b0bec5">
                  KvizzHub is an innovative online platform that allows users to
                  create and share interactive quizzes. Whether you want to test
                  your knowledge or challenge others, KvizzHub offers
                  user-friendly experience for building, watching, and solving
                  quizzes.
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  style={{ marginTop: "1rem", marginBottom: "1rem" }}
                  color="#b0bec5"
                >
                  With a wide range of quiz topics and customizable options,
                  KvizzHub is a hub of engaging and educational quizzes for
                  users of all ages and interests. Join the community of quiz
                  enthusiasts and explore the world of knowledge!
                </Typography>
              </div>
            </div>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square sx={{width:"100%"}}>
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
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              
              <Grid container spacing={2}>
                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    inputRef={setEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    inputRef={setPassword}
                  />
                </Grid>
               
              </Grid>
            
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                startIcon={<LoginIcon />}
                sx={{ mt: 3, mb: 1 }}
                onClick={(e)=>{
                  e.preventDefault();
                  signInWithEmailAndPassword(auth,email,password)
                  .then((userCredentials) =>{
                      console.log(userCredentials)
                  }).catch((error)=>{
                      console.log(error)
                  })
                  handleReset();
              }}
              >
                Sign In
              </Button>

              <Button
                fullWidth
                variant="contained"
                startIcon={<GoogleIcon />}
                style={{ borderColor: "#DB4437", backgroundColor: "#DB4437" }}
                sx={{ mb: 2 }}
                onClick={async(e)=>{
                  e.preventDefault();
                  const provider = new GoogleAuthProvider();
                  return signInWithPopup(auth,provider);
              }}
              >
                Sign In with Google
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
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
      </Grid>
  
  );
}
