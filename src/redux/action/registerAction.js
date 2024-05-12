import { registerFailure, registerSuccess } from "../reducer/registerReducer";

export const registerUser =
  (email, name, password, navigate) => async (dispatch) => {
    try {
      const responseRegister = await fetch(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/register",
        {
          method: "POST",
          body: JSON.stringify({ email, name, password }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const jsonRegister = await responseRegister.json();

      if (responseRegister.status === 201) {
        dispatch(registerSuccess());
        alert("Registration Successful!");
        navigate("/login");
      } else {
        throw new Error(jsonRegister.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      dispatch(registerFailure("Registration failed."));
      alert("Registration failed. Please try again.");
    }
  };
