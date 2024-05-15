import React, { useState, useEffect } from "react";
import Nav from "./navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const API_KEY = "0389f7dff3b6002ad073a6a720cee29b";
const defaultProfileImage = "/image/profile.JPG"; // Ganti dengan path gambar default Anda

function DetailPeople() {
  const location = useLocation();
  const [person, setPerson] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.person) {
      setPerson(location.state.person);
    } else {
      fetchPersonDetail();
    }
  }, [location]);

  const fetchPersonDetail = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${location.state.id}?api_key=${API_KEY}&language=en-US`
      );
      console.log("Detail person data ", response.data);
      setPerson(response.data);
    } catch (error) {
      console.error("Error fetching person data: ", error);
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

      {/* Data Detail Person */}
      <section>
        <div className="mt-20 text-left">
          {person && (
            <div className="container">
              <div className="flex gap-6 mt-12 border-4 border-white rounded-lg items-center bg-slate-800">
                <div className="w-1/4">
                  {person.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`}
                      alt={person.name}
                      className="w-full object-cover rounded-lg shadow-slate-800 shadow-lg text-left"
                    />
                  ) : (
                    <img
                      src={defaultProfileImage}
                      alt={person.name}
                      className="w-full object-cover rounded-lg shadow-slate-800 shadow-lg text-left"
                    />
                  )}
                </div>
                <div className="w-3/4 flex flex-col justify-between text-white">
                  <div className="flex flex-col">
                    <p className="text-4xl font-bold mb-14">{person.name}</p>
                    <div className="w-full h-0.5 bg-gradient-to-r from-white"></div>
                    <p className="text-2xl font-bold mt-14 mb-4">{person.original_name}</p>
                    <h1 className="text-lg text-left mb-4">
                      Known For: {person.known_for_department}
                    </h1>
                  </div>
                  <h1 className="text-lg text-left">
                    popularity: {person.popularity}
                  </h1>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default DetailPeople;
