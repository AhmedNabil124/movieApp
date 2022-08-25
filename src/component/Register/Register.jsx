import axios from "axios";
import styleRegister from "../Register/register.module.css";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
export default function Register() {
  // ***************************************** useNavigate  ***************
  let navigate = useNavigate();
  // ***************************************** Loading  *******************
  const [loading, setLoading] = useState(false);
  // ***************************************** errorApi  *******************
  const [errorApi, setError] = useState(null);
  // ***************************************** errorList  *******************
  const [errorList, setErrorList] = useState([]);
  // ***************************************** Object User *******************
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: "",
    password: "",
    email: "",
  });

  // ***************************************** function validData ===> Joi  ***************
  function validData() {
    let validUser = Joi.object({
      first_name: Joi.string().min(3).max(10).required(),
      last_name: Joi.string().min(3).max(10).required(),
      age: Joi.number().min(16).max(80).required(),
      email: Joi.string()
        .email({ tlds: ["net", "com", "eg"] })
        .required(),
      password: Joi.string().pattern(new RegExp("^[A-Z][a-z0-9]{3,10}$")),
    });
    return validUser.validate(user, { abortEarly: false });
  }
  // ***************************************** function getUserData *******************
  function getUserData(e) {
    let myUser = { ...user }; // Deep Copy
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  // *********************************************************function submitData *******************

  async function submitData(e) {
    setLoading(true);
    e.preventDefault();
    let resultValid = validData();
    if (resultValid.error == null) {
      let { data } = await axios.post(
        "https://route-egypt-api.herokuapp.com/signup",
        user
      );
      console.log(data.message);
      if (data.message == "success") {
        // go to login\
        navigate("/login");
        setLoading(false);
      } else {
        setError(data.message);
        setLoading(false);
      }
    } else {
      setLoading(false);
      setErrorList(resultValid.error.details);
    }
  }

  return (
    <div className="mt-5">
      <h1 className="mb-5">Registerition Form</h1>
      {errorApi ? (
        <div className="alert alert-danger">
          {errorApi}{" "}
          <Link to="/login" className={styleRegister.linkLogin}>
            Login?
          </Link>{" "}
        </div>
      ) : (
        ""
      )}

      {/* ******************************** */}
      <form onSubmit={submitData}>
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          name="first_name"
          className="form-control bg-transparent text-white mt-2"
          onChange={getUserData}
        />
        {/* ***************************  Error List  ******************** */}
        {errorList.map((element, i) => {
          if (element.path[0] == "first_name") {
            return (
              <div key={i} className="alert alert-primary mt-3">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`bi w-100 bi-exclamation-triangle-fill flex-shrink-0 me-2 ${styleRegister.svgWidth}`}
                  viewBox="0 0 16 16"
                  role="img"
                  aria-label="Warning:"
                >
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                First Name Must Be Start With Capital Letters
              </div>
            );
          }
        })}
        <label htmlFor="last_name" className="mt-4">
          Last Name
        </label>
        <input
          type="text"
          name="last_name"
          className="form-control bg-transparent text-white mt-2"
          onChange={getUserData}
        />
        {/* ***************************  Error List  ******************** */}
        {errorList.map((element, i) => {
          if (element.path[0] == "last_name") {
            return (
              <div
                key={i}
                className="alert alert-primary  d-flex align-items-center mt-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`bi w-100 bi-exclamation-triangle-fill flex-shrink-0 me-2 ${styleRegister.svgWidth}`}
                  viewBox="0 0 16 16"
                  role="img"
                  aria-label="Warning:"
                >
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                Last Name Must Be Start With Capital Letters
              </div>
            );
          }
        })}
        <label htmlFor="age" className="mt-4">
          Age
        </label>
        <input
          type="number"
          name="age"
          className="form-control bg-transparent text-white mt-2"
          onChange={getUserData}
        />
        {/* ***************************  Error List  ******************** */}
        {errorList.map((element, i) => {
          if (element.path[0] == "age") {
            return (
              <div key={i} className="alert alert-primary mt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`bi w-100 bi-exclamation-triangle-fill flex-shrink-0 me-2 ${styleRegister.svgWidth}`}
                  viewBox="0 0 16 16"
                  role="img"
                  aria-label="Warning:"
                >
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                Age Must Be Start From 16 Years
              </div>
            );
          }
        })}
        <label htmlFor="email" className="mt-4">
          E-mail
        </label>
        <input
          type="email"
          name="email"
          className="form-control bg-transparent text-white mt-2"
          onChange={getUserData}
        />
        {/* ***************************  Error List  ******************** */}
        {errorList.map((element, i) => {
          if (element.path[0] == "email") {
            return (
              <div key={i} className="alert alert-primary mt-3">
                 <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`bi w-100 bi-exclamation-triangle-fill flex-shrink-0 me-2 ${styleRegister.svgWidth}`}
                  viewBox="0 0 16 16"
                  role="img"
                  aria-label="Warning:"
                >
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                Email Must Be example@gmail.com
              </div>
            );
          }
        })}
        <label htmlFor="password" className="mt-4">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="form-control bg-transparent text-white mt-2"
          onChange={getUserData}
        />
        {/* ***************************  Error List  ******************** */}
        {errorList.map((element, i) => {
          if (element.path[0] == "password") {
            return (
              <div key={i} className="alert alert-primary mt-3">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`bi w-100 bi-exclamation-triangle-fill flex-shrink-0 me-2 ${styleRegister.svgWidth}`}
                  viewBox="0 0 16 16"
                  role="img"
                  aria-label="Warning:"
                >
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                Password Must Be Start With Capital Letters
              </div>
            );
          }
        })}
        <button type="submit" className="btn btn-outline-info mt-3">
          {loading ? <i className="spinner-border"></i> : "Register"}
        </button>
      </form>
    </div>
  );
}
