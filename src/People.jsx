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
      `https://api.themoviedb.org/3/trending/person/week?api_key=f1aca93e54807386df3f6972a5c33b50&language&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`
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
          {trindingMoie.map((person, i) => {
            return (
              <div key={i} className="col-md-2">
                <Link to={`/peopleDetails/${person.id}`}>
                  <img
                    className="w-100"
                    src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                    alt=""
                  />
                  <h3 className="h5">{person.name}</h3>
                  <p>{person.overview}</p>
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
              className="page-item"
              role="button"
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
