import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import baseURL from "./components/Config";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import "./my-sass.scss";

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("baseURL: ", baseURL);

    axios
      .post(baseURL + "/users/register", {
        name,
        email,
        password,
      })
      .then((result) => {
        console.log("Register:", result);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-5 w-75">
        <h3>Register</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3 pt-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Name"
              autoComplete="off"
              autoFocus
              className="form-control rounded-0"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              autoComplete="off"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
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

          <button type="submit" className="btn btn-primary w-100 rounded-0">
            Register
          </button>

          <p>&nbsp;</p>
          <div className="d-flex justify-content-end">
            Already have an account? &nbsp;
            <Link to="/login">Login</Link>
          </div>

          {/* <button
            className="btn btn-default w-100 rounded-0 bg-dark text-white-50"
            onClick={() => navigate("/login")}
          >
            Login
          </button> */}
        </form>
      </div>
    </div>
  );
}

export default Signup;
