import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import baseURL from "./components/Config";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeContext } from "./ThemeContext";

function Home() {
  const { user, setUser, authenticated, setAuthenticated } =
    useContext(ThemeContext); //dark theme

  const [name, setName] = useState();
  const [auth, setAuth] = useState(false);

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get(baseURL + "/users")
      .then((result) => {
        if (result.data.valid) {
          console.log("Auth is valid in Home");
          setName(result.data.name);
          setAuth(true);
        } else {
          setAuth(false);
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  return auth ? (
    <div className="flex-container m-3">
      <div className="ui-container py-5 px-2">
        <div className="">
          <div className="d-flex justify-content-between flex-column flex-md-row align-items-baseline">
            <div>
              <h3>Dashboard</h3>
            </div>
          </div>

          {auth ? (
            <div className="row">
              <div>Welcome {name}!</div>
            </div>
          ) : (
            <div className="row">
              <div>
                <Link to="/login">Login</Link>
              </div>
            </div>
          )}
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

export default Home;
