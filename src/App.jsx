import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./Home";
import Navbar from "./Navbar";
import Movies from "./Movies";
import People from "./People";
import PeopleDetails from "./PeopleDetails";
import Tv from "./Tv";
import TvDetails from "./TvDetails";
import MovieDetalis from "./MovieDetails";
import Regaister from "./Regaister";
import Notfound from "./Notfound";
import Footer from "./Footer";
import Login from "./Login";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";

export default function App() {
  const [userData, setUsreData] = useState(null);
  function saveUserDatat() {
    let encoded = localStorage.getItem("usertoken");
    let decoded = jwtDecode(encoded);
    setUsreData(decoded);
  }
  useEffect(() => {
    if (localStorage.getItem("usertoken")) {
      saveUserDatat();
    }
  }, []);

  function ProtectedRoute(props) {
    if (localStorage.getItem("usertoken") === null) {
      return <Navigate to="/Login" />;
    } else {
      return props.children;
    }
  }
  function logout() {
    setUsreData(null);
    localStorage.removeItem("usertoken");
    Navigate("/login");
  }

  return (
    <>
      <Navbar logout={logout} userData={userData} />
      <div className="container-fluid">
        <Routes>
          <Route
            path=""
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="movies"
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path="movieDetalis"
            element={
              <ProtectedRoute>
                <MovieDetalis />
              </ProtectedRoute>
            }
          >
            {" "}
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <MovieDetalis />
                </ProtectedRoute>
              }
            />{" "}
          </Route>
          <Route
            path="tv"
            element={
              <ProtectedRoute>
                <Tv />
              </ProtectedRoute>
            }
          />
          <Route
            path="tvDetails"
            element={
              <ProtectedRoute>
                <TvDetails />
              </ProtectedRoute>
            }
          >
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <TvDetails />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="people"
            element={
              <ProtectedRoute>
                <People />
              </ProtectedRoute>
            }
          />

          <Route
            path="peopleDetails"
            element={
              <ProtectedRoute>
                <PeopleDetails />
              </ProtectedRoute>
            }
          >
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <PeopleDetails />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* <Route
            path="peopleDetails"
            element={
              <ProtectedRoute>
                <PeopleDetails />
              </ProtectedRoute>
            }
          >
          <Route
            path=":id"
            element={
              <ProtectedRoute>
                <PeopleDetails />
              </ProtectedRoute>
            }
          >
          <Route /> */}
          <Route
            path="login"
            element={<Login saveUserDatat={saveUserDatat} />}
          />
          <Route path="regaister" element={<Regaister />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
