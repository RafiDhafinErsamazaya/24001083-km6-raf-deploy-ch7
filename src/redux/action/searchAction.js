// actions/searchMovieActions.js

import axios from "axios";
import {
  setCurrentPage,
  setMovies,
  setNotFound,
  setTotalPages,
  setQuery,
} from "../reducer/searchReducer";

const API_KEY = "0389f7dff3b6002ad073a6a720cee29b";

export const searchMovies = (query, currentPage) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&language=en-US&page=${currentPage}`
    );
    dispatch(setQuery(query));
    if (response.data.results.length === 0) {
      dispatch(setNotFound(true));
    } else {
      dispatch(setNotFound(false));
      dispatch(setMovies(response.data.results));
      dispatch(setTotalPages(response.data.total_pages));
    }
  } catch (error) {
    console.error("Error fetching movies: ", error);
  }
};

export const changePage = (page) => (dispatch) => {
  dispatch(setCurrentPage(page));
};
