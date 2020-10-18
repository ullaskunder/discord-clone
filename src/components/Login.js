import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../config/firebase";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://cdn0.iconfinder.com/data/icons/free-social-media-set/24/discord-256.png"
          alt=""
        />
      </div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}

export default Login;
