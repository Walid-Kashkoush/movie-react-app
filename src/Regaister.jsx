import Axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Regaister() {
  const [isLoding, setIsLoding] = useState(false);
  const navigate = useNavigate();
  const [errorList, setErrorList] = useState([]);

  const [signupErrorMessage, setSignupErrorMessage] = useState(null);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    password: ""
  });

  function getUesrData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;

    if (e.target.name === "email") {
      setSignupErrorMessage(null);
    }
    setUser(myUser);
  }
  async function submitRegaisterForm(e) {
    e.preventDefault();
    setIsLoding(true);
    let validationRusalt = validatinForm();
    if (validationRusalt.error) {
      setErrorList(validationRusalt.error.details);
    } else {
      const { data } = await Axios.post(
        "https://route-egypt-api.herokuapp.com/signup",
        user
      );

      if (data.message === "success") {
        setIsLoding(false);

        navigate("/login");
      } else {
        setSignupErrorMessage(data.message);
        setIsLoding(false);
      }
    }

    console.log(validationRusalt);
  }
  function validatinForm() {
    let scheme = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(25).required(),
      last_name: Joi.string().alphanum().min(3).max(25).required(),
      age: Joi.number().min(16).max(80).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] }
        })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[A-Z][a-z}]{3,15}$"))
        .required()
    });

    return scheme.validate(user, { abortEarly: false });
  }

  return (
    <>
      <div className="w-75 mt-4 mx-auto">
        <h2>Regasiter now</h2>
        {errorList.map((error) => (
          <div className="alert py-2 alert-danger">{error.message}</div>
        ))}
        {/* {errorList.map((error, i) => (
          <div key={i} className="alert py-2 alert-danger">
            {error.message}{" "}
          </div>
        ))} */}
        <form onSubmit={submitRegaisterForm}>
          <label htmlFor="First_name">First_name :</label>
          <input
            onChange={getUesrData}
            type="text"
            className="form-control mb-2"
            id="First_name"
            name="first_name"
          />

          <label htmlFor="last_name">last_name :</label>
          <input
            onChange={getUesrData}
            type="text"
            className="form-control mb-2"
            id="last_name"
            name="last_name"
          />

          <label htmlFor="age">age :</label>
          <input
            onChange={getUesrData}
            type="number"
            className="form-control mb-2"
            id="age"
            name="age"
          />

          <label htmlFor="email">email :</label>
          <input
            onChange={getUesrData}
            type="email"
            className="form-control mb-2"
            id="email"
            name="email"
          />

          <label htmlFor="password">password :</label>
          <input
            onChange={getUesrData}
            type="password"
            className="form-control mb-2"
            id="password"
            name="password"
          />

          {signupErrorMessage ? (
            <div className="alert alert-danger">{signupErrorMessage} </div>
          ) : (
            ""
          )}
          <button className="btn btn-outline-info mt-2" type="submit">
            {isLoding === true ? (
              <i className="fas fa-spinner fa-spin "></i>
            ) : (
              "Rrgaister"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
