import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../firebase/firebase";


const SignUpLogic = (e: any, email: string, password: string) => {
  e.preventDefault();

  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      console.log(userCredentials);
      window.location.href = "/workspace";
    })
    .catch((error) => {
      console.log(error);
    });
};

export default SignUpLogic;
