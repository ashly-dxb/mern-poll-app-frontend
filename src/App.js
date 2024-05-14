import { useState, useEffect } from "react";
import React, { Suspense } from "react";
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
import FileUpload from "./FileUpload";
// import FileDetails from "./FileDetails";

import CreatePoll from "./poll-components/create-poll";
import NewPollDetails from "./poll-components/new-poll-details";
import EditPoll from "./poll-components/edit-poll";
import ListPoll from "./poll-components/list-poll";
import Poll from "./poll-components/poll";
import PollResult from "./poll-components/poll-result";
import PollAdmin from "./poll-components/poll-admin";

import ChangePassword from "./ChangePassword";
import Settings from "./Settings";
import TestAPI from "./Test";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeContext } from "./ThemeContext";

import { useParams } from "react-router-dom";

const FileDetails = React.lazy(() => import("./FileDetails"));

function App() {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(null);

  const { fileID } = useParams();

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
          <Suspense
            fallback={
              <div className="d-flex flex-md-row p-5 m-5 fw-bolder bg-primary text-white ">
                Loading...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/home" element={<Home />} />

              <Route path="/tasks" element={<TaskMain />} />
              <Route path="/file-upload" element={<FileUpload />} />
              <Route path="/file-details" element={<FileDetails />} />

              <Route path="/polls" element={<ListPoll />} />
              <Route path="/create-poll" element={<CreatePoll />} />
              <Route path="/new-poll-details" element={<NewPollDetails />} />
              <Route path="/edit-poll" element={<EditPoll />} />
              <Route path="/poll-vote" element={<Poll />} />
              <Route path="/poll-result" element={<PollResult />} />
              <Route path="/poll-admin" element={<PollAdmin />} />

              <Route path="/settings" element={<Settings />} />
              <Route path="/change-password" element={<ChangePassword />} />

              <Route path="/test" element={<TestAPI />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>

          <Footer />
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
