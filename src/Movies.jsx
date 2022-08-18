import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Movies() {
  const [trindingMoie, setTrindingMoie] = useState([]);
  let num = new Array(13).fill(1).map((element, index) => index + 1);
  async function getTrinding(pageNumber) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`
    );

    setTrindingMoie(data.results);
  }

  useEffect(() => {
    getTrinding(1);
  }, []);

  return (
    <>
      {trindingMoie ? (
        <div className="row justify-content-center">
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
                  <p>
                    $
                    {movie.overview.length <= 100 ? (
                      movie.overview
                    ) : (
                      <>
                        <span>{movie.overview.slice(0, 100) + "..."} </span>{" "}
                        <a>more</a>
                      </>
                    )}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <i className="fas fa-spinner fa-spin fa-3x"></i>
        </div>
      )}

      <nav aria-label="...">
        <ul className="pagination pagination-sm py-5  d-flex  justify-content-center">
          {num.map((pageNum) => (
            <li
              className="page-item "
              onClick={() => getTrinding(pageNum)}
              key={pageNum}
            >
              <a className="page-link  bg-transparent  text-white">{pageNum}</a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
