import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useGoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "./redux/action/googleLoginAction";

function GoogleLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = (responseGoogle) => {
    const accessToken = responseGoogle.access_token;
    dispatch(loginWithGoogle(accessToken, navigate));
  };

  const googleLoginHandler = useGoogleLogin({
    onSuccess: (responseGoogle) => {
      localStorage.setItem("login", "google function");
      handleGoogleLogin(responseGoogle);
    },
  });

  return (
    <>
      <button
        className="border border-black py-2 w-full mb-8 rounded-md"
        onClick={googleLoginHandler}
      >
        Google Login
      </button>
    </>
  );
}

export default GoogleLogin;
