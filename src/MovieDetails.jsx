import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
  let prams = useParams();
  const [movieDetalis, setMovieDetalis] = useState(null);

  async function getMovieDetails(id) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`
    );
    setMovieDetalis(data);
  }
  useEffect(() => {
    getMovieDetails(prams.id);
  }, []);

  return (
    <div>
      {movieDetalis ? (
        <div className="row">
          <div className="col-md-3">
            <img
              className="w-100"
              src={`https://image.tmdb.org/t/p/w500` + movieDetalis.poster_path}
              alt=""
            />
          </div>
          <div className="col-md-9">
            <h2>{movieDetalis.original_title}</h2>
            <p className="text-muted py-5">{movieDetalis.overview}</p>
            <ul>
              <li> budget : {movieDetalis.budget}</li>
              <li>popularity : {movieDetalis.popularity}</li>
              <li>vote_average : {movieDetalis.vote_average}</li>
              <li>vote_count : {movieDetalis.vote_count}</li>
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
