import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMovies,
  fetchPopularPeople,
  fetchUserData,
} from "./redux/action/movieAction";
import Nav from "./navbar";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    movieData,
    movieCurrentPage,
    movieTotalPages,
    peopleData,
    peopleCurrentPage,
    peopleTotalPages,
    userData,
  } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(fetchMovies(movieCurrentPage));
    dispatch(fetchPopularPeople(peopleCurrentPage));
    dispatch(fetchUserData());
  }, [dispatch, movieCurrentPage, peopleCurrentPage]);

  const goToPrevMoviePage = () => {
    if (movieCurrentPage > 1) {
      dispatch(fetchMovies(movieCurrentPage - 1));
    }
  };

  const goToNextMoviePage = () => {
    if (movieCurrentPage < movieTotalPages) {
      dispatch(fetchMovies(movieCurrentPage + 1));
    }
  };

  const goToPrevPeoplePage = () => {
    if (peopleCurrentPage > 1) {
      dispatch(fetchPopularPeople(peopleCurrentPage - 1));
    }
  };

  const goToNextPeoplePage = () => {
    if (peopleCurrentPage < peopleTotalPages) {
      dispatch(fetchPopularPeople(peopleCurrentPage + 1));
    }
  };

  useEffect(() => {
    console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      alert("silahkan login dulu");
      navigate("/login");
    }
  }, []);

  return (
    <div>
      {/* Navbar */}
      <Nav />

      {/* Hero Section */}
      <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center">
        {/* Background Image */}
        <img
          src="image/JJK.GIF"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Blur */}
        <div className="absolute inset-0 bg-black opacity-20 z-10"></div>
        {/* Content */}
        <div className="relative z-20 text-white text-center">
          <h1 className="text-2xl md:text-6xl font-bold mb-10">
            Welcome {userData?.data?.name}
          </h1>
          <a
            href="#popularmovie"
            className="hover:text-slate-800 border bg-slate-200 font-normal text-black cursor-pointer hover:font-semibold rounded-full px-8 py-1.5 hover:bg-slate-400 text-xl mt-6"
          >
            Start Watching
          </a>
        </div>
      </div>

      {/* List Movie */}
      <section id="popularmovie" className="container mt-[750px] mb-16">
        <div className="my-8">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-bold text-slate-900">
              Popular List Movie
            </h1>
            <div className="flex gap-2 items-center">
              {/* Prev Button */}
              <button
                onClick={goToPrevMoviePage}
                disabled={movieCurrentPage === 1}
                className={`${
                  movieCurrentPage === 1
                    ? "bg-slate-600"
                    : "bg-slate-800 hover:bg-slate-900"
                } rounded-full px-2 py-2 text-white font-semibold`}
              >
                &lt;
              </button>
              <p className="text-slate-800 text-center">
                {movieCurrentPage}/{movieTotalPages}
              </p>
              {/* Next Button */}
              <button
                onClick={goToNextMoviePage}
                disabled={movieCurrentPage === movieTotalPages}
                className={`${
                  movieCurrentPage === movieTotalPages
                    ? "bg-slate-600"
                    : "bg-slate-800 hover:bg-slate-900"
                } rounded-full px-2 py-2 text-slate-400 font-semibold`}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4">
          {Array.isArray(movieData) &&
            movieData.map((e) => (
              <div
                key={e.id}
                className="w-full cursor-pointer h-full overflow-hidden rounded-md text-white shadow-lg hover:shadow-slate-600 hover:shadow-lg bg-slate-800"
                onClick={() => {
                  navigate("/detail-movie", { state: { id: e?.id } });
                }}
              >
                <img
                  className="w-full object-cover h-60"
                  src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                  alt={e.title}
                />
                <div className="pt-3 pb-2 px-3">
                  <div className="min-h-8">
                    <p className="text-sm font-bold leading-tight line-clamp-2">
                      {e.title}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-normal">{e.release_date}</p>
                    <div className="flex items-center gap-1">
                      <div className="w-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="#FFD43B"
                            d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                          />
                        </svg>
                      </div>
                      <div className="text-sm font-semibold">
                        {e?.vote_average?.toFixed(1)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* List Popular People */}
      <section className="container mt-16 mb-16">
        <div className="w-full h-0.5 bg-gradient-to-r from-slate-800 my-8"></div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-lg font-bold text-slate-900">People</h1>
          <div className="flex gap-2 items-center">
            {/* Prev Button */}
            <button
              onClick={goToPrevPeoplePage}
              disabled={peopleCurrentPage === 1}
              className={`${
                peopleCurrentPage === 1
                  ? "bg-slate-600"
                  : "bg-slate-800 hover:bg-slate-900"
              } rounded-full px-2 py-2 text-white font-semibold`}
            >
              &lt;
            </button>
            <p className="text-slate-800 text-center">
              {peopleCurrentPage}/{peopleTotalPages}
            </p>
            {/* Next Button */}
            <button
              onClick={goToNextPeoplePage}
              disabled={peopleCurrentPage === peopleTotalPages}
              className={`${
                peopleCurrentPage === peopleTotalPages
                  ? "bg-slate-600"
                  : "bg-slate-800 hover:bg-slate-900"
              } rounded-full px-2 py-2 text-slate-400 font-semibold`}
            >
              &gt;
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-4">
          {peopleData.map((e) => (
            <div
              key={e.id}
              className="w-full overflow-hidden rounded-md text-white shadow-lg bg-slate-800 hover:shadow-slate-900 hover:shadow-lg"
            >
              {e.profile_path !== null ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${e.profile_path}`}
                  className="w-full object-cover h-60"
                />
              ) : (
                <img
                  src="image/profile.JPG"
                  className="w-full object-cover h-60"
                />
              )}
              <div className="py-4">
                <div className="text-md font-bold text-center mb-4 py-2">
                  {e?.name}
                </div>
                <div className="text-sm text-red-500 text-center mb-1">
                  {e?.known_for_department}
                </div>
                <div className="text-sm text-center mb-1">
                  {e?.original_name}
                </div>
                <div className="text-sm text-center">{e?.popularity}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Homepage;
