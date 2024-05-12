import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./redux/action/loginAction";
import { setEmail, setPassword } from "./redux/reducer/LoginReducer";
import GoogleLogin from "./googlelogin";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state) => state.login.email);
  const password = useSelector((state) => state.login.password);

  const handleLogin = () => {
    dispatch(loginUser(email, password, navigate));
  };

  useEffect(() => {
    console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") !== null) {
      alert("kamu sudah login");
      navigate("/");
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <input
          className="w-full border border-black rounded-md py-2 px-3 mb-4"
          placeholder="Email"
          value={email}
          onChange={(event) => dispatch(setEmail(event.target.value))}
        />
        <input
          className="w-full border border-black rounded-md py-2 px-3 mb-8"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => dispatch(setPassword(event.target.value))}
        />
        <GoogleLogin buttonText="google login" />
        <div className="flex items-center justify-center mb-4">
          <button
            className="bg-primary text-white font-semibold py-3 px-16 rounded-md transition duration-300 hover:bg-red-700 mr-8"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="bg-blue-600 text-white font-semibold py-3 px-14 rounded-md transition duration-300 hover:bg-gray-400"
            onClick={() => {
              navigate("/register");
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
