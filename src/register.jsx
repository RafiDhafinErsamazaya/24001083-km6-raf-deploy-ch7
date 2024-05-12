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
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md">
        <h2 className="text-2xl font-semibold mb-4">SIGN UP</h2>
        <input
          className="w-full border rounded-md py-2 px-3 mb-4"
          placeholder="Email"
          value={email}
          onChange={(event) => dispatch(setEmail(event.target.value))}
        />
        <input
          className="w-full border rounded-md py-2 px-3 mb-4"
          placeholder="Name"
          value={name}
          onChange={(event) => dispatch(setName(event.target.value))}
        />
        <input
          className="w-full border rounded-md py-2 px-3 mb-14"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => dispatch(setPassword(event.target.value))}
        />
        <div className="flex items-center justify-center mb-4">
          <button
            className="bg-primary text-white font-semibold py-3 px-14 rounded-md transition duration-300 hover:bg-red-700 mr-8"
            onClick={handleRegister}
          >
            Register
          </button>
          <button
            className="bg-slate-300 text-black font-semibold py-3 px-6 rounded-md transition duration-300 hover:bg-gray-400"
            onClick={() => {
              navigate("/login");
            }}
          >
            Back To Login
          </button>
        </div>
      </div>
    </div>
  );
}
