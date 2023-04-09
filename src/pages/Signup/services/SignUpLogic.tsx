import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../firebase/firebase";

const SignUpLogic = (e: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      console.log(userCredentials);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default SignUpLogic;
