import React from "react";
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    alert("Sukses logout");
  };

  return (
    <nav className="bg-gray-800 opacity-105 p-4 flex items-center justify-between px-20 fixed top-0 left-0 w-full z-50">
      {/* Nav kembali ke Homepage */}
      <a href="/" className="text-white text-xl font-bold hover:text-slate-400">
        Movie List
      </a>

      {/* Fitur Search untuk menuju page search */}
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => {
          navigate("/search-movie");
        }}
      >
        <p className="hover:text-slate-800 border bg-slate-200 font-normal cursor-pointer hover:font-semibold rounded-full px-5 py-1 hover:bg-slate-400">
          More Movies
        </p>
      </div>

      {/* Tombol Logout */}
      <button
        className="bg-red-500 hover:bg-red-700 px-5 py-1 rounded-full text-white font-semibold"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}

export default Nav;
