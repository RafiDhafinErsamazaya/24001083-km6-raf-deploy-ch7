import axios from "axios";
import {
  setPeopleCurrentPage,
  setPeopleData,
  setPeopleTotalPages,
  setmovieCurrentPage,
  setmovieData,
  setmovieTotalPages,
  setUserData,
} from "../reducer/MovieReducer";

const API_KEY = "0389f7dff3b6002ad073a6a720cee29b";

export const fetchMovies = (page) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=${page}`
    );
    dispatch(setmovieData(response.data.results));
    dispatch(setmovieTotalPages(response.data.total_pages));
    dispatch(setmovieCurrentPage(page));
  } catch (error) {
    console.error("Error fetching movies: ", error);
  }
};

export const fetchPopularPeople = (page) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&page=${page}&language=en-US`
    );
    dispatch(setPeopleData(response.data.results));
    dispatch(setPeopleTotalPages(response.data.total_pages));
    dispatch(setPeopleCurrentPage(page));
  } catch (error) {
    console.error("Error fetching popular people: ", error);
  }
};

export const fetchUserData = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const userData = response.data;
    console.log("Data pengguna: ", userData);
    dispatch(setUserData(userData));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert("Token kadaluarsa");
    } else {
      alert("Terjadi kesalahan saat mengambil data pengguna");
      console.error("Error: ", error);
    }
  }
};
