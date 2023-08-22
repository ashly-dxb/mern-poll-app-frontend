import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import baseURL from "../components/Config";
import axios from "axios";

import Notification from "./notification";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function Poll({ location }) {
  const navigate = useNavigate();

  const [pollID, setPollID] = useState("");
  const [question, setQuestion] = useState("");
  const [localkey, setLocalkey] = useState("");

  const [options, setOptions] = useState([{ id: "", options: "", count: 0 }]);
  const [response, setResponse] = useState({ id: "", options: "", count: 0 });
  const [verifier, setVerifier] = useState({ id: "", selected: "", show: 0 });
  const [toast, setToast] = useState({ snackbaropen: false, msg: "", not: "" });

  const snackbarclose = (event) => {
    setToast({
      snackbaropen: false,
    });
  };

  useEffect(() => {
    setLocalkey(question.toLowerCase().trim().slice(0, 2) + pollID.slice(0, 4));
    var cache = JSON.parse(localStorage.getItem(localkey));
    if (cache != null) {
      if (cache.id === pollID) {
        // history.push("/poll-result/?id=" + pollID);
        navigate("/poll-result/?id=" + pollID);
      }
    }
  }, [navigate]);

  useEffect(() => {
    // var x = queryString.parse(location.search);
    // const id = x.id;

    const id = new URLSearchParams(window.location.search).get("id");
    console.log("ID from URL: ", id);

    setPollID(id);

    axios
      .get(baseURL + `/polls/getpoll/${id}`)
      .then(function (response) {
        const data = response.data;
        setQuestion(data.question);

        let medium = [];
        data.options.map((option) => {
          medium.push(option);
          return medium;
        });

        console.log("medium:", medium);

        setOptions(medium);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function settingResponse({ option }) {
    var response = {
      id: option.id,
      options: option.options,
      count: option.count + 1,
      pollID: pollID,
    };

    setResponse(response);

    console.log("settingResponse", response);

    setVerifier({ id: pollID, selected: option.options, show: 0 });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (response.options != "") {
      setToast({
        snackbaropen: true,
        msg: "Vote submitted! Thank you!",
        not: "success",
      });

      localStorage.setItem(localkey, [JSON.stringify(verifier)]);

      axios
        .post(baseURL + "/polls/setvote", response)
        .then(function (res) {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setToast({
        snackbaropen: true,
        msg: "Please select an option!",
        not: "error",
      });
    }
  };

  return (
    <div className="flex-container m-3">
      <div className="ui-container py-5 px-2">
        <div>
          <h2 className="heading" style={{ wordWrap: "break-word" }}>
            {question}
          </h2>

          <div className="flex flex-column">
            <form>
              {options.map((option) => (
                <div
                  className="py-3 mb-4 shadow-lg hover-zoom rounded bg-white radio-label"
                  key={option.id}
                >
                  <div className="d-flex align-items-center">
                    <input
                      type="radio"
                      id={option.id}
                      name="option"
                      value={option.options}
                      checked={response.options === option.options}
                      onChange={() => settingResponse({ option })}
                      className="d-inline-block me-2 ms-3 mb-2"
                      // style={{ marginBottom: "6px", marginLeft: "3px" }}
                    />

                    <label htmlFor={option.id}>
                      <h5
                        className="d-inline-block fw-bold"
                        style={{
                          wordWrap: "break-word",
                          width: "100%",
                        }}
                      >
                        {option.options}
                      </h5>
                    </label>
                  </div>
                </div>
              ))}

              <div className="mt-2 d-flex flex-column flex-md-row">
                <div className="col-0 col-md-8 d-flex justify-content-center justify-content-md-start">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="fw-bold focus-shadow w-25 bg-success border-0 text-white py-3 px-2 shadow-lg hover-shadow-lg rounded-lg"
                  >
                    Submit Vote
                  </button>
                </div>

                <Notification
                  switcher={toast.snackbaropen}
                  close={snackbarclose}
                  message={toast.msg}
                  nottype={toast.not}
                />

                <div className="col-0 col-md-4 float-right text-secondary fw-bold focus-shadow">
                  <Link to={"/poll-result/?id=" + pollID}>
                    View Results <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Poll;
