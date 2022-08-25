import React from "react";
import { Link } from "react-router-dom";
import navStyle from './navbar.module.css'
export default function Navbar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-tarnsparent navbar-dark">
        <div className="container-fluid ms-3 me-3">
          <Link className="navbar-brand" to="home">
            Noxes
          </Link>
          <button
            className={`navbar-toggler ${navStyle.navbarToggler}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars text-white"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {props.userData ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="home"
                    >
                      Home
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="movies">
                      Movies
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="person">
                      Person
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="tv">
                      Tv
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="about">
                      About
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav d-flex  mb-2 mb-lg-0">
              {props.userData ? (
                <li className="nav-item order-lg-last order-first">
                  <span onClick={props.logOut} className="nav-link">
                    Logout <i className="fa-solid fa-right-from-bracket"></i>
                  </span>
                </li>
              ) : (
                <>
                  <li className="nav-item order-lg-last order-first">
                    <Link className="nav-link" to="register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item order-lg-last order-first">
                    <Link className="nav-link" to="login">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

