import React, { Fragment, useContext, useState, useEffect } from "react";
import { Link, useNavigate, useHistory } from "react-router-dom";
import baseURL from "./Config";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

import { ThemeContext } from "../ThemeContext";

function Navbar() {
  const { user, setUser, authenticated, setAuthenticated } =
    useContext(ThemeContext);

  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const currentRoute = window.location.pathname;

  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios
      .get(baseURL + "/users/logout")
      .then((result) => {
        console.log("Logged out success!", result.data);

        setUser({});
        setAuthenticated(result.data.authenticated);

        navigate("/login", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  const handleLinkClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="main-header navbar  fixed-top navbar-expand-sm">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* <div className="collapse navbar-collapse" id="navbarNavAltMarkup"> */}
        <div
          id="navbarNavAltMarkup"
          className={
            isOpen
              ? "collapse navbar-collapse"
              : "collapse navbar-collapse show"
          }
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!authenticated ? (
              <>
                <li className="nav-item">
                  <Link
                    className={
                      currentRoute.endsWith("/login")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/login"
                    onClick={handleLinkClick}
                  >
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={
                      currentRoute.endsWith("/register")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/register"
                    onClick={handleLinkClick}
                  >
                    Register
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={
                      currentRoute.endsWith("/polls")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/polls"
                    onClick={handleLinkClick}
                  >
                    Polls
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={
                      currentRoute.endsWith("/create-poll")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/create-poll"
                    onClick={handleLinkClick}
                  >
                    Create Poll
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={
                      currentRoute.endsWith("/test")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/test"
                    onClick={handleLinkClick}
                  >
                    Test API
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}

            {authenticated ? (
              <Fragment>
                <li className="nav-item">
                  <Link
                    className={
                      currentRoute.endsWith("/home") ||
                      currentRoute.endsWith("/")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/home"
                    onClick={handleLinkClick}
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={
                      currentRoute.endsWith("/tasks")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/tasks"
                    onClick={handleLinkClick}
                  >
                    Tasks
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={
                      currentRoute.endsWith("/file-upload")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/file-upload"
                    onClick={handleLinkClick}
                  >
                    Files
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={
                      currentRoute.endsWith("/polls")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/polls"
                    onClick={handleLinkClick}
                  >
                    Polls
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={
                      currentRoute.endsWith("/create-poll")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/create-poll"
                    onClick={handleLinkClick}
                  >
                    Create Poll
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={
                      currentRoute.endsWith("/settings")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/settings"
                    onClick={handleLinkClick}
                  >
                    Settings
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={
                      currentRoute.endsWith("/change-password")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/change-password"
                    onClick={handleLinkClick}
                    aria-current="page"
                  >
                    Change Password
                  </Link>
                </li>
              </Fragment>
            ) : (
              ""
            )}
          </ul>

          <div className="d-flex">
            <b>{user?.name}</b>
            &nbsp;
            {authenticated ? (
              <button className="btn btn-outline-secondary bg-light">
                <Link onClick={handleLogout}>Logout</Link>
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
