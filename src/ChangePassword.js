import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import baseURL from "./components/Config";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeContext } from "./ThemeContext";

function ChangePassword() {
  const { user, setUser } = useContext(ThemeContext); //dark theme

  // const [name, setName] = useState();
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState(null);

  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const navigate = useNavigate();

  const errorDiv = error ? (
    <div className="alert alert-danger" role="alert">
      {error}
    </div>
  ) : (
    "-"
  );

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get(baseURL + "/users/checkauth")
      .then((result) => {
        if (result.data.valid) {
          console.log("Auth is valid in ChangePass page");
          setAuth(true);
        } else {
          setAuth(false);
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    axios
      .post(baseURL + "/users/change-password", {
        currentPassword,
        newPassword,
        confirmPassword,
      })
      .then((result) => {
        if (result.data.success) {
          console.log("Change pass:", result);
          navigate("/home");
        } else {
          console.log("#### ERROR ####", result.data.errorMsg);
          setError(result.data.errorMsg);
        }
      })
      .catch((err) => console.log(err));
  };

  return auth ? (
    <div className="flex-container m-3">
      <div className="ui-container py-5 px-2">
        <div className="col-md-3 p-2 border">
          <div className="headerStrip">
            <h3>Change Password</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3 pt-3">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                placeholder="Enter Current Password"
                autoComplete="off"
                className="form-control rounded-0"
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="NewPassword">New Password</label>
              <input
                type="password"
                name="NewPassword"
                id="NewPassword"
                placeholder="Enter New Password"
                autoComplete="off"
                className="form-control rounded-0"
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="ConfirmPassword">Confirm Password</label>
              <input
                type="password"
                name="ConfirmPassword"
                id="ConfirmPassword"
                placeholder="Re-enter New Password"
                autoComplete="off"
                className="form-control rounded-0"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-3">{errorDiv}</div>

            <button type="submit" className="btn btn-primary w-100 rounded-0">
              Save Password
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex-container m-3">
      <div className="ui-container py-5 px-2">
        <div>Not Authorised</div>
      </div>
    </div>
  );
}

export default ChangePassword;
