import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../firebase/firebase";

const googleLogin = () => {
  const provider = new GoogleAuthProvider();

  return signInWithPopup(auth, provider).then(() => {
    window.location.href = "/workspace";
  });
};

export default googleLogin;
