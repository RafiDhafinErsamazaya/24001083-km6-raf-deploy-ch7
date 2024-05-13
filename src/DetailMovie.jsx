import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./navbar";
import { fetchMovieDetail } from "./redux/action/detailMovieAction";
import { useLocation, useNavigate } from "react-router-dom";

function Movie() {
  const detailData = useSelector((state) => state.detail.detailData);
  console.log("detailData", detailData);
  const dispatch = useDispatch();
  let location = useLocation();
  const movieId = location.state?.id;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMovieDetail(movieId));
  }, [movieId]);

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

      {/* Data Detail Movie */}
      <section>
        <div className="mt-60 text-left" key={detailData?.title}>
          <div className="absolute top-0 left-0 w-full h-screen flex">
            <img
              src={`https://image.tmdb.org/t/p/w500/${detailData?.poster_path}`}
              className="w-full h-screen object-cover"
              alt={detailData?.title}
            />
            <div className="absolute top-0 left-0 w-full h-screen bg-black/80 flex items-center">
              <div className="container">
                <div className="flex gap-6 mt-12 border-4 border-white rounded-lg items-center bg-slate-800">
                  <div className="w-1/4">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${detailData?.poster_path}`}
                      className="w-full object-cover rounded-lg shadow-slate-800 shadow-lg text-left"
                      alt={detailData?.title}
                    />
                  </div>
                  <div className="w-3/4 flex flex-col justify-between text-white">
                    <div className="flex flex-col">
                      <p className="text-6xl font-bold mb-8 ">
                        {detailData?.title}
                      </p>
                      <div className="w-full h-0.5 bg-gradient-to-r from-white"></div>
                      <p className="mt-4 mb-4">{detailData?.overview}</p>
                      <h1 className="text-lg font-semibold text-left mt-4">
                        Production Companies:
                      </h1>
                      <ul className="list-disc text-white font-normal text-base ps-4 text-left">
                        {detailData?.production_companies &&
                          detailData?.production_companies.map(
                            (company, index) => (
                              <li key={index}>{company?.name}</li>
                            )
                          )}
                      </ul>
                    </div>
                    <h1 className="text-lg font-semibold mt-6 text-left">
                      Genres:
                    </h1>
                    <div className="flex gap-2">
                      {detailData?.genres &&
                        detailData?.genres.map((genre, index) => (
                          <p
                            key={index}
                            className="text-white font-normal text-base py-4"
                          >
                            <div className="text-slate-900 bg-slate-200 rounded-full px-3 py-1.5">
                              {genre?.name}
                            </div>
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Movie;
