import axios from "axios";
import { clearError, setError, setUser } from "../reducer/googleLoginReducer";

export const loginWithGoogle = (accessToken, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://shy-cloud-3319.fly.dev/api/v1/auth/google`,
      {
        access_token: accessToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { token } = response.data.data;
    localStorage.setItem("token", token);
    dispatch(setUser(response.data));
    dispatch(clearError());
    navigate("/", { state: { token: token } });
    alert("Login Successful, Welcome!");
  } catch (error) {
    console.error("Error during Google login:", error);
    dispatch(setError("Google login failed. Please try again."));
  }
};
