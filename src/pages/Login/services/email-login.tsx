import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../firebase/firebase";

const emailLogin = (e: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      console.log(userCredentials);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default emailLogin;
