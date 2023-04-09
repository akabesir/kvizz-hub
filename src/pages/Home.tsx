import React, { useEffect } from "react";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const auth = getAuth();

  return (
    <div>
      Home
      <button
        onClick={() => {
          auth
            .signOut()
            .then(() => {
              console.log("sign out successful");
              window.location.href = "/login";
            })
            .catch((error) => console.log(error));
        }}
      >
        Sign out!!
      </button>
    </div>
  );
};

export default Home;
