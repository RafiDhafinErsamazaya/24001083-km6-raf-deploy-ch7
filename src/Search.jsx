import { useSelector, useDispatch } from "react-redux";
import { changePage, searchMovies } from "./redux/action/searchAction";
import Nav from "./navbar";
import { useNavigate } from "react-router-dom";
import { setCurrentPage, setQuery } from "./redux/reducer/searchReducer";
import { useEffect } from "react";

export default function SearchMovie() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { movies, currentPage, totalPages, notFound, query } = useSelector(
    (state) => state.searchMovie
  );

  const submit = (e) => {
    e.preventDefault();
    dispatch(searchMovies(query, currentPage));
  };
  const change = (e) => {
    dispatch(setQuery(e.target.value));
  };

  const goToNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const goToPrevPage = () => {
    dispatch(setCurrentPage(currentPage - 1));
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

      <div className="container mt-28 mb-20">
        <div className="flex flex-col gap-4 items-center">
          <div className="border-2 border-slate-800 px-12 py-6 rounded-lg ">
            <p className="text-slate-800 font-bold text-3xl mb-4">
              Search More Movie
            </p>

            {/* inputan */}
            <div className="flex items-center justify-center">
              <form onSubmit={submit} className="flex w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search Movie"
                  value={query}
                  onChange={change}
                  className="flex-1 rounded-l-md bg-gray-800 text-slate-300 py-2 px-4 focus:outline-none focus:bg-gray-900"
                />
                <button
                  type="submit"
                  className="border bg-slate-200 hover:bg-slate-400 text-black hover:text-slate-800  font-semibold rounded-r-md px-4 py-2"
                >
                  Search
                </button>
              </form>
            </div>
          </div>

          {/* Prev and Next Button */}
          <div className="flex justify-center items-center gap-2 mt-5 ">
            {totalPages > 1 && (
              <>
                {/* Prev Button */}
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className={`${
                    currentPage === 1
                      ? "bg-slate-600"
                      : "bg-slate-800 hover:bg-slate-900"
                  } rounded-full px-2 py-2 text-white font-semibold `}
                >
                  <svg
                    className="h-3 w-3 fill-white md:h-3.5 md:w-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    strokeWidth="1.5"
                  >
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                  </svg>
                </button>
                {/* Next Button */}
                <p className="text-slate-800 text-center ">
                  {currentPage}/{totalPages}
                </p>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`${
                    currentPage === totalPages
                      ? "bg-slate-600"
                      : "bg-slate-800 hover:bg-slate-900"
                  } rounded-full px-2 py-2 text-white font-semibold`}
                >
                  <svg
                    className="h-3 w-3 fill-white md:h-3.5 md:w-3.5"
                    strokeWidth="1.5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Show "Movie not Found" message */}
          {notFound && (
            <p className="text-red-600 text-lg font-semibold mt-4">
              Movie not found
            </p>
          )}

          {/* Result Data  */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 mt-2 px-8 py-8 rounded-lg">
            {movies.map((movie) => (
              <div
                className="w-full cursor-pointer h-full overflow-hidden rounded-md text-white shadow-lg hover:shadow-slate-600 hover:shadow-lg bg-slate-800"
                key={movie.id}
                onClick={() => {
                  navigate("/detail-movie", { state: { id: movie.id } });
                }}
              >
                <img
                  className="w-full object-cover h-60"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="mx-2 mt-3 text-slate-200">
                  <div className="font-bold truncate mb-4">{movie.title}</div>
                  <div className="flex justify-between">
                    <div>{movie.release_date}</div>
                    <div className="flex justify-between items-center gap-2 mb-4">
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
                      <div>{movie.vote_average?.toFixed(1)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
