import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Tv() {
  const [trendingtv, setTrendingTv] = useState([]);
  let nums = new Array(13).fill(1).map((elemnt, index) => index + 1);

  async function gettrending(pageNumber) {
    let { data } = await axios(
      `https://api.themoviedb.org/3/discover/tv?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`
    );

    setTrendingTv(data.results);
  }

  useEffect(() => {
    gettrending();
  }, []);
  return (
    <>
      <div> </div>
      {trendingtv ? (
        <div className="row  justify-content-center  ">
          {trendingtv.map((tv, i) => {
            return (
              <div key={i} className="col-md-2">
                <Link to={`/tvDetails/${tv.id}`}>
                  <img
                    className="w-100"
                    src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                    alt=""
                  />
                  <h3 className="h5">{tv.original_name}</h3>
                  <p>
                    $
                    {tv.overview.length <= 100 ? (
                      tv.overview
                    ) : (
                      <>
                        <span>{tv.overview.slice(0, 100) + "..."} </span>{" "}
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
          {nums.map((pageNums) => (
            <li
              className="page-item "
              onClick={() => gettrending(pageNums)}
              key={pageNums}
            >
              <a className="page-link  bg-transparent  text-white">
                {pageNums}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
