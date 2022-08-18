import Axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const navigate = useNavigate();
  const [errorList, setErrorList] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  function getUesrData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
  async function submitLoginForm(e) {
    e.preventDefault();

    setIsLoding(true);
    let validationRusalt = validatinForm();
    if (validationRusalt.error) {
      setErrorList(validationRusalt.error.details);
    } else {
      const { data } = await Axios.post(
        "https://route-egypt-api.herokuapp.com/signin",
        user
      );
      if (data.message === "success") {
        localStorage.setItem("usertoken", data.token);
        props.saveUserDatat();

        navigate("/home");
        setIsLoding(false);
      } else {
        setIsLoding(false);
      }
    }

    console.log(validationRusalt);
  }
  function validatinForm() {
    let scheme = Joi.object({
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
        <h2>Login now</h2>
        {errorList.map((error) => (
          <div className="alert py-2 alert-danger">{error.message}</div>
        ))}
        <form onSubmit={submitLoginForm}>
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

          <button className="btn btn-outline-info mt-2" type="submit">
            {isLoding === true ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
