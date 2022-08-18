import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            noxe
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto  mb-lg-0 mb-2 ">
              {props.userData ? (
                <>
                  <li className="nav-item active">
                    <Link className="nav-link" to="home">
                      Home <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="movies">
                      Movies
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="tv">
                      Tv
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="people">
                      People
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
        <ul className="navbar-nav mb-2 mb-lg-0">
          <li className="nav-item  d-flex align-items-center   order-lg-first  order-last">
            <i className="fab mx-2 fa-facebook"></i>
            <i className="fab mx-2 fa-twitter"></i>
            <i className="fab mx-2 fa-instagram"></i>
            <i className="fab mx-2 fa-soundcloud"></i>
          </li>
          {props.userData ? (
            <>
              <li className="nav-item  order-lg-last  order-first">
                <Link className="nav-link" onClick={props.logout} to="logout">
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item   order-lg-last  order-first">
                <Link className="nav-link  " to="login">
                  Login
                </Link>
              </li>
              <li className="nav-item  order-lg-last  order-first">
                <Link className="nav-link" to="regaister">
                  Rrgaister
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
