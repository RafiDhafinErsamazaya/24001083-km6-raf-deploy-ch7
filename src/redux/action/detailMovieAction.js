// actions/DetailActions.js
import axios from "axios";
import { setDetailData } from "../reducer/DetailMovieReducer";

const API_KEY = "0389f7dff3b6002ad073a6a720cee29b";

export const fetchMovieDetail = (movieId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=${API_KEY}`,
      { headers: { accept: "application/json" } }
    );
    dispatch(setDetailData(response.data));
    console.log("response", response);
  } catch (error) {
    console.error("Error fetching movie detail: ", error);
  }
};
