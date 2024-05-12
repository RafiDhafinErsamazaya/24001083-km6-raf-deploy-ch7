// store/index.js

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import MovieReducer from "./reducer/MovieReducer";
import DetailMovieReducer from "./reducer/DetailMovieReducer";
import searchReducer from "./reducer/searchReducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { thunk } from "redux-thunk";
import LoginReducer from "./reducer/LoginReducer";
import registerReducer from "./reducer/registerReducer";
import googleLoginReducer from "./reducer/googleLoginReducer";

const rootReducers = combineReducers({
  movie: MovieReducer,
  detail: DetailMovieReducer,
  searchMovie: searchReducer,
  login: LoginReducer,
  register: registerReducer,
  google: googleLoginReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export const persistor = persistStore(store);
