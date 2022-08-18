import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [trindingMoie, setTrindingMoie] = useState([]);
  const [trindingtv, setTrindingTv] = useState([]);
  const [trindingpeople, setTrindingPeople] = useState([]);

  async function getTrinding(datatype, callback) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${datatype}/week?api_key=f1aca93e54807386df3f6972a5c33b50`
    );

    callback(data.results.slice(0, 10));
  }

  useEffect(() => {
    getTrinding("movie", setTrindingMoie);
    getTrinding("tv", setTrindingTv);
    getTrinding("person", setTrindingPeople);
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-4 d-flex align-items-center justify-content-center ">
          <div>
            <div className=" mb-4 w-25 border"></div>
            <h2 className="h3">
              Trending <br /> Movies <br /> To Watch Right Now
            </h2>
            <p className="text-muted p-3">Top Trending Movies by Day</p>
            <div className=" mt-4 border"></div>
          </div>
        </div>

        {trindingMoie.map((movie, i) => {
          return (
            <div key={i} className="col-md-2">
              <Link to={`/movieDetalis/${movie.id}`}>
                <img
                  className="w-100"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt=""
                />
                <h3 className="h5">${movie.title}</h3>
                <span className="d-block">
                  $
                  {movie.overview.length <= 100 ? (
                    movie.overview
                  ) : (
                    <>
                      <span>{movie.overview.slice(0, 100) + "..."}</span>
                    </>
                  )}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="row pt-5">
        <div className="col-md-4 d-flex align-items-center justify-content-center">
          <div>
            <div className=" mb-4 w-25 border"></div>
            <h2 className="h3">
              Trending <br /> Tv <br /> To Watch Right Now
            </h2>
            <p className="text-muted p-3 ">Top Trending Tv by Day</p>
            <div className=" mt-4 border"></div>
          </div>
        </div>

        {trindingtv.map((tv, i) => {
          return (
            <div key={i} className="col-md-2">
              <Link to={`/tvDetails/${tv.id}`}>
                <img
                  className="w-100"
                  src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                  alt=""
                />
                <h3 className="h5">${tv.original_name}</h3>
                <span className="d-block">
                  $
                  {tv.overview.length <= 100 ? (
                    tv.overview
                  ) : (
                    <>
                      <span>{tv.overview.slice(0, 100) + "..."} </span>
                    </>
                  )}
                </span>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="row p-5">
        <div className="col-md-4 d-flex align-items-center justify-content-center">
          <div>
            <div className=" mb-4 w-25 border"></div>
            <h2 className="h3">
              Trending <br /> People <br /> To Watch Right Now
            </h2>
            <p className="text-muted  p-3">Top Trending People by Day</p>
            <div className=" mt-4 border"></div>
          </div>
        </div>

        {trindingpeople.map((person, i) => {
          return (
            <div key={i} className="col-md-2">
              <Link to={`/peopleDetails/${person.id}`}>
                <img
                  className="w-100"
                  src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                  alt=""
                />
                <h3 className="h5">${person.name}</h3>
                <span className="d-block">{person.overview}</span>
              </Link>
            </div>
          );
        })}
      </div>
      {/* <div className="vh-100 d-flex align-items-center justify-content-center">
        <i className="fas fa-spinner fa-spin fa-3x"></i>
      </div> */}
    </>
  );
}
