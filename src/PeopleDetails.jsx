import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function PeopleDetails() {
  let prams = useParams();
  const [peopleDetalis, setPeopleDetalis] = useState(null);

  async function getTvDetails(id) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/person/${id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`
    );
    setPeopleDetalis(data);
  }
  useEffect(() => {
    getTvDetails(prams.id);
    console.log(prams.id);
  }, []);

  return (
    <div>
      {peopleDetalis ? (
        <div className="row">
          <div className="col-md-3">
            <img
              className="w-100"
              src={
                `https://image.tmdb.org/t/p/w500` + peopleDetalis.profile_path
              }
              alt=""
            />
          </div>
          <div className="col-md-9">
            <h2>{peopleDetalis.name}</h2>
            <p className="text-muted py-5">{peopleDetalis.biography}</p>
            <ul>
              <li>place_of_birth : {peopleDetalis.place_of_birth}</li>
              <li>popularity : {peopleDetalis.popularity}</li>
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
