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
  className="bg-slate-700 hover:bg-slate-900 text-white font-semibold py-2 w-full mb-8 rounded-md focus:outline-none transition duration-300"
  onClick={googleLoginHandler}
>
  <div className="flex items-center justify-center">
    <svg
      className="w-2 h-4 mr-2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M12 6c1.66 0 2.99-1.34 2.99-3S13.66 0 12 0 9 1.34 9 3s1.34 3 3 3zM21.19 11h-2.47c-.25-1.24-.73-2.41-1.38-3.42l2.13-2.12c1.15 1.64 1.82 3.58 1.72 5.54zM12 18c-1.25 0-2.41-.25-3.5-.68l-2.14 2.14C8.17 21.05 10.03 22 12 22c4.41 0 8-3.59 8-8s-3.59-8-8-8c-2.18 0-4.16.88-5.62 2.3l-1.48-1.48C6.62 2.55 9.23 2 12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10z"></path>
    </svg>
    Login with Google
  </div>
</button>

    </>
  );
}

export default GoogleLogin;
