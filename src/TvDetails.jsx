import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function TvDetails() {
  let prams = useParams();
  const [tvDetalis, settvDetalis] = useState(null);

  async function getTvDetails(id) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`
    );
    settvDetalis(data);
  }
  useEffect(() => {
    getTvDetails(prams.id);
    console.log(prams.id);
  }, []);

  return (
    <div>
      {tvDetalis ? (
        <div className="row">
          <div className="col-md-3">
            <img
              className="w-100"
              src={`https://image.tmdb.org/t/p/w500` + tvDetalis.poster_path}
              alt=""
            />
          </div>
          <div className="col-md-9">
            <h2>{tvDetalis.name}</h2>
            <p className="text-muted py-5">{tvDetalis.overview}</p>
            <ul>
              <li> budget : {tvDetalis.budget}</li>
              <li>popularity : {tvDetalis.popularity}</li>
              <li>vote_average : {tvDetalis.vote_average}</li>
              <li>vote_count : {tvDetalis.vote_count}</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <i className="fas fa-spinner fa-spin fa-3x"></i>
        </div>
      )}
    </div>
  );
}
