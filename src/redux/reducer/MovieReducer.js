import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieData: [],
  movieCurrentPage: 1,
  movieTotalPages: 1,
  peopleData: [],
  peopleCurrentPage: 1,
  peopleTotalPages: 1,
  userData: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setmovieData: (state, action) => {
      state.movieData = action.payload;
    },
    setmovieCurrentPage: (state, action) => {
      state.movieCurrentPage = action.payload;
    },
    setmovieTotalPages: (state, action) => {
      state.movieTotalPages = action.payload;
    },
    setPeopleData: (state, action) => {
      state.peopleData = action.payload;
    },
    setPeopleCurrentPage: (state, action) => {
      state.peopleCurrentPage = action.payload;
    },
    setPeopleTotalPages: (state, action) => {
      state.peopleTotalPages = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const {
  setmovieData,
  setmovieCurrentPage,
  setmovieTotalPages,
  setPeopleData,
  setPeopleCurrentPage,
  setPeopleTotalPages,
  setUserData,
} = movieSlice.actions;

export default movieSlice.reducer;
