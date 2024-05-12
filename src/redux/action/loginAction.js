import axios from "axios";
import { loginFailure, loginSuccess } from "../reducer/LoginReducer";

export const loginUser = (email, password, navigate) => async (dispatch) => {
  try {
    const responseLogin = await axios.post(
      "https://shy-cloud-3319.fly.dev/api/v1/auth/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = responseLogin;

    dispatch(loginSuccess(data.data.token));
    localStorage.setItem("token", data.data.token);
    navigate("/", { state: { token: data.data.token } });
    alert("Login Successful, Welcome!");
    console.log("Data:", data);
    console.log("Response Login:", responseLogin);
  } catch (error) {
    console.log(error);
    dispatch(loginFailure("Invalid username or password! Please try again."));
    alert("Invalid username or password! Please try again.");
  }
};
