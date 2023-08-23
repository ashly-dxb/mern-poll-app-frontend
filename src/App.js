import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import baseURL from "./components/Config";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import TaskMain from "./TaskMain";
import ChangePassword from "./ChangePassword";
import Settings from "./Settings";

import CreatePoll from "./poll-components/create-poll";
import ListPoll from "./poll-components/list-poll";
import NewPollDetails from "./poll-components/new-poll-details";
import EditPoll from "./poll-components/edit-poll";
import Poll from "./poll-components/poll";
import PollResult from "./poll-components/poll-result";
import PollAdmin from "./poll-components/poll-admin";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeContext } from "./ThemeContext";

function App() {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(null);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get(baseURL + "/users/checkauth")
      .then((result) => {
        if (result.data.valid) {
          console.log("Auth valid in APP component, setting context data");
          console.log(result.data);

          // setUser(result.data.user); //to do for user data(as name is lost in refresh)
          setAuthenticated(result.data.valid);
        } else {
          // navigate("/login");
          console.log("Auth NOT valid in APP component...");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      <ThemeContext.Provider
        value={{ user, setUser, authenticated, setAuthenticated }}
      >
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/tasks" element={<TaskMain />} />
            <Route path="/home" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/change-password" element={<ChangePassword />} />

            <Route path="/polls" element={<ListPoll />} />
            <Route path="/create-poll" element={<CreatePoll />} />
            <Route path="/new-poll-details" element={<NewPollDetails />} />
            <Route path="/edit-poll" element={<EditPoll />} />
            <Route path="/poll-vote" element={<Poll />} />
            <Route path="/poll-result" element={<PollResult />} />
            <Route path="/poll-admin" element={<PollAdmin />} />

            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
