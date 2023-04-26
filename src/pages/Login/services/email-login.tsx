import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../firebase/firebase";
import { useNavigate } from "react-router";

const emailLogin = (e: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      console.log(userCredentials);
      window.location.href = "/workspace";
    })
    .catch((error) => {
      console.log(error);
    });
};

export default emailLogin;
