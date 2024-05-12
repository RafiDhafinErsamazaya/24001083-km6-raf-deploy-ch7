import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  currentPage: 1,
  totalPages: 1,
  notFound: false,
  query: "",
};

const searchMovieSlice = createSlice({
  name: "searchMovie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setNotFound: (state, action) => {
      state.notFound = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const {
  setMovies,
  setCurrentPage,
  setTotalPages,
  setNotFound,
  setQuery,
} = searchMovieSlice.actions;

export default searchMovieSlice.reducer;
