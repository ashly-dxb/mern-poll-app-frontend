import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import baseURL from "./components/Config";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeContext } from "./ThemeContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faRefresh } from "@fortawesome/free-solid-svg-icons";

function Login() {
  sessionStorage.setItem("apiPathURL", "http://localhost:8080/api");

  const { user, setUser, authenticated, setAuthenticated } =
    useContext(ThemeContext);

  const [email, setEmail] = useState("ashlythomas@gmail.com");
  const [password, setPassword] = useState("abcd1234");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const errorDiv = error ? (
    <div className="alert alert-danger" role="alert">
      {error}
    </div>
  ) : (
    ""
  );

  axios.defaults.withCredentials = true;

  useEffect(() => {
    sessionStorage.setItem("apiPathURL", "http://localhost:8080/api");

    axios
      .get(baseURL + "/users/checkauth")
      .then((result) => {
        if (result.data.valid) {
          console.log("valid:  success");
          navigate("/");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  const handleLoginClick = (e) => {
    e.preventDefault();

    // e.currentTarget.disabled = true;
    // console.log(e.currentTarget, e.currentTarget.disabled);

    setError(null);
    setIsLoading(true);

    axios
      .post(baseURL + "/users/login", {
        email,
        password,
      })
      .then((result) => {
        if (result.data.authenticated) {
          console.log("Login success...", result.data.user);

          setUser(result.data.user);
          setAuthenticated(result.data.authenticated);

          navigate("/home");
        } else {
          setError(result.data.error);
          console.log("Login failed...");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-5">
        <h3>Login</h3>

        <form onSubmit={handleLoginClick}>
          <div className="form-group mb-3 pt-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              autoComplete="off"
              autoFocus
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              autoComplete="off"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">{errorDiv}</div>

          <button
            type="submit"
            className="btn btn-primary w-100 h-50 rounded-0"
          >
            {isLoading ? (
              <>
                <FontAwesomeIcon
                  icon={isLoading ? faSpinner : faRefresh}
                  className="fa-1x spinner"
                  alt="Loading"
                  title="Loading"
                />
                &nbsp; Loading ...
              </>
            ) : (
              "Login"
            )}
          </button>

          <p></p>

          <div className="d-flex justify-content-end">
            <Link to="/register">Register?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
