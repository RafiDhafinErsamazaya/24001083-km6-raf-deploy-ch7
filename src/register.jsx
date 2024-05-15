import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./redux/action/registerAction";
import {
  setEmail,
  setName,
  setPassword,
} from "./redux/reducer/registerReducer";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state) => state.register.email);
  const name = useSelector((state) => state.register.name);
  const password = useSelector((state) => state.register.password);

  const handleRegister = () => {
    dispatch(registerUser(email, name, password, navigate));
  };

  useEffect(() => {
    console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") !== null) {
      alert("token kamu masih aktif, harap logout terlebih dahulu ");
      navigate("/");
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 to-blue-500">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Create an Account</h2>
        <input
          className="w-full border-b-2 border-gray-400 focus:border-primary rounded-md py-2 px-3 mb-4 focus:outline-none transition duration-300"
          placeholder="Email"
          value={email}
          onChange={(event) => dispatch(setEmail(event.target.value))}
        />
        <input
          className="w-full border-b-2 border-gray-400 focus:border-primary rounded-md py-2 px-3 mb-4 focus:outline-none transition duration-300"
          placeholder="Name"
          value={name}
          onChange={(event) => dispatch(setName(event.target.value))}
        />
        <input
          className="w-full border-b-2 border-gray-400 focus:border-primary rounded-md py-2 px-3 mb-14 focus:outline-none transition duration-300"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => dispatch(setPassword(event.target.value))}
        />
        <div className="flex justify-around items-center mx-10 mb-6">
          <button
            className="bg-blue-500 text-white font-semibold py-3 px-10 rounded-md hover:bg-blue-700 focus:outline-none transition duration-300"
            onClick={handleRegister}
          >
            Register
          </button>
          <button
            className="bg-slate-500 text-white font-semibold py-3 px-10 rounded-md hover:bg-slate-700 focus:outline-none transition duration-300"
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
  
}
